#!/usr/bin/env node
var nopt = require('nopt');
var rc = require('rc');
var opts = nopt();
var moment = require('moment');
var chalk = require('chalk');
var columnify = require('columnify');

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
                console.log(err);
                process.exit(1);
            }
            var menu = getMenu(toc, ['intro'], ['intro'], tracks, 4);
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
                console.log(err);
                process.exit(1);
            }

            function visit(knowledge, options, pick) {
                console.log('knowledge:', knowledge);
                console.log('options are', _.map(options, function(e) {return e.pkg.name;}).join(', '));
                console.log('picking', pick.pkg.name);
                console.log('new knowledge:', pick.pkg.brain.provides);
            }
            walk(toc, visited, knowledge, visit, function(err) {
                if (err) {
                    console.error(err);
                    if (typeof(err.unreachable) !== 'undefined') {
                        console.error('Unreachable episodes:', _.map(err.unreachable, function(e) {return e.pkg.name;}).join(', '));
                    }
                    process.exit(1);
                }
            });
        });
        break;
    case 'toc':
        require('./toc.js')(config).toc(function(err, toc) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            walk(toc, [], function() {}, function(err, visited) {
                toc = visited;
                if (err !== null && typeof(err.unreachable) !== 'undefined') {
                    toc = toc.concat(_.map(err.unreachable, function(e) {
                        e.unreachable = true;
                        return e;
                    }));
                }
                toc = _(toc).map(function(t) {
                    return {
                        ' ': t.unreachable ? '!' : ' ',
                        name: chalk[t.pkg.brain.track || 'white'](t.pkg.name),
                        version: t.pkg.version,
                        provides: (t.pkg.brain.provides||[]).join(' '),
                        requires: (t.pkg.brain.requires||[]).join(' '),
                        // track: t.pkg.brain.track || '',
                        updated_at: moment(t.repo.updated_at).fromNow()
                    };
                }).value();
                console.log(columnify(toc, {
                    config: {
                        requires: {
                            maxWidth: 20
                        },
                        provides: {
                            maxWidth: 20 
                        }
                    }
                }));
            });
        });
        break;
    case 'list-repositories':
        require('./toc.js')(config).listRepos(function(err, data) {
            if (err) {
                console.log(err);
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
        require('./init').init(config);
        break;
    case 'bundle':
        require('./bundle').bundle(opts, function(err) {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
        });
        break;
    case 'rebundle-all':
        require('./rebundle')(config).rebundleAll(function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        break;
    case 'create_remote':
        require('./create_repo').create(config, function() {
            console.log('remote repository created');
        });
        break;
    case 'publish':
        require('./bundle').bundle(opts, function() {
            require('./publish').publish(opts);
        });
        break;
    default:
          console.error('Unknown sub command:', command);
          process.exit(2);
}
