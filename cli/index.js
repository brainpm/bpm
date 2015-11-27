#!/usr/bin/env node
var path = require('path');

var debug = require('debug')('bpm cli');
var nopt = require('nopt');
var rc = require('rc');
var opts = nopt();
var moment = require('moment');
var chalk = require('chalk');
var pull = require('pull-stream');
var columnify = require('columnify');
var spin = require('term-spinner');
var map = require('map-stream');
var concat = require('concat-stream');

var bundler = require('bpm-bundle');
var publisher = require('bpm-publish');

var urls = require('../lib/urls');
var debundle = require('bpm-bundle').debundle;

var bpmInit = require('bpm-init');
var listEpisodedata = require('./ls');

function startWait(msg) {
    console.log();
    var spinner = spin.new();
    spinner.timer = setInterval(function () {
        spinner.next();
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write([spinner.current, msg].join(" "));
    }, 125);
    return spinner;
}

function stopWait(spinner) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    clearInterval(spinner.timer);
}

var _ = require('lodash');
var walk = require('../lib/walk').walk;
var getMenu = require('../lib/walk').getMenu;

var config = rc('bpm');
//console.log(config);

if (opts.argv.remain.length === 0) {
    console.error('Please specify a sub command');
    process.exit(1);
}
var command = opts.argv.remain[0];

switch(command) {
    case 'play':
        var tracks = ['yellow', 'black', 'blue'];
        require('./toc')(config).toc(function(err, toc) {
            if (err) {
                console.error('Error fetching toc', err);
                process.exit(1);
            }
            var menu = getMenu(toc, ['intro'], ['intro'], 4);
            var option = 0;
            var options = {};
            var columns = _.map(tracks, function(t) {
                var episodes = menu[t];
                var lines = _.map(episodes, function(e) {
                    var color = e.pkg.brain.track;
                    var requires = '';
                    var optionString = '';
                    if (e.enabled === false) {
                        requires = " " + chalk.red('(' + e.pkg.brain.requires.join(', ') + ')');
                    } else {
                        options[option] = e;
                        optionString = "" + (++option) + ')';
                    }
                    return chalk.white(optionString) + " " + chalk[color](e.pkg.name) + requires;
                });
                return lines;
            });
            console.log(_.flatten(columns).join('\n'));
        });
        break;
    case 'walk':
        var visited = [];
        var knowledge = [];
        if (typeof(opts.entry) !== 'undefined') {
            visited = [opts.entry];
        }
        if (typeof(opts.knowledge) !== 'undefined') {
            knowledge = [opts.knowledge];
        }
        require('./toc')(config).toc(function(err, toc) {
            if (err) {
                console.log('Error fetching TOC', err);
                process.exit(1);
            }

            function visit(knowledge, options, pick) {
                console.log('knowledge:', knowledge);
                console.log('options are', _.map(options, function(e) {return e.pkg.name;}).join(', '));
                console.log('picking', pick.pkg.name);
                console.log('new knowledge:', pick.pkg.brain.provides);
            }
            var unreachable = walk(toc, visited, knowledge, visit);
            if (unreachable.length) {
                console.error('Unreachable episodes:', _.map(unreachable, function(e) {return e.pkg.name;}).join(', '));
                process.exit(1);
            }
        });
        break;

    case 'ls':
        listEpisodedata();
        break;
    case 'list-repositories':
        require('./toc.js')(config).listRepos(function(err, data) {
            if (err) {
                console.err('Error while fetching TOC', err);
                process.exit(1);
            }
            data.forEach(function(episode) {
                console.log(moment(episode.updated_at).format(), episode.owner, episode.name);        
                // console.log(episode.url);
            });
        });
        break;
    case 'version':
        console.log(require('../package.json').version);
        break;
    case 'init':
        bpmInit(config);
        break;
    case 'bundle':
        bundler.bundle(config, opts, '.', '.bpm/bundle', function(err) {
            if (err) {
                console.error('error while bundling', err);
                process.exit(1);
            }
        });
        break;
    case 'rebundle-all':
        require('./rebundle')(config).rebundleAll(function(err) {
            if (err) {
                console.error('errors while rebundling', err);
                process.exit(1);
            }
        });
        break;
    case 'create-remote':
        require('./create_repo').create(config, function() {
            console.log('remote repository created');
        });
        break;
    case 'publish':
        var repoDir = '.';
        var bundleDir = path.join(repoDir, '.bpm', 'bundle');
        bundler.bundle(config, opts, repoDir, bundleDir, function() {
            debug('running publisher');
            publisher.publish(config, opts, repoDir, bundleDir, function(err, data) {
                debug('publisher done');
                if (err) {
                    console.error('error while publishing', err.message);
                    process.exit(1);
                }
                console.log('published to', urls.getEpisodeUrl(data.organisation, data.repositoryName));
            });
        });
        break;
    case 'info':
        if (opts.argv.remain.length < 2) {
            console.error ("Please specify an episode");
            process.exit(1);
        }
        var episode = opts.argv.remain[1];
        require('../lib/info')(config, opts, episode, function(err, data) {
            if (err) {
                console.error('Error fetching info', err);
                process.exit(1);
            }
            var allCommits = data.masterBranchCommits.concat(data.ghPagesCommits);
            allCommits = _.sortBy(allCommits, 'date');
            allCommits = _.map(allCommits, function(commit) {
                var isPublished = commit.branch === 'gh-pages' || commit.date <= data.lastPublishedMasterBranchCommit.date;
                return {
                    ' ': isPublished ? "    " : chalk.yellow("WIP"),
                    date: moment(commit.date).fromNow(),
                    committer: commit.githubHandle + ' (' + commit.committer + ')',
                    message: commit.message
                };
            });
            console.log(columnify(allCommits));
        });
        break;

    default:
          console.error('Unknown sub command:', command);
          process.exit(2);
}
