#!/usr/bin/env node
var nopt = require('nopt');
var rc = require('rc');
var opts = nopt();
var moment = require('moment');
var walk = require('../lib/walk').walk;

var config = rc('bpm');
//console.log(config);

if (opts.argv.remain.length === 0) {
    console.error('Please specify a sub command');
    process.exit(1);
}
var command = opts.argv.remain[0];

switch(command) {
    case 'walk':
        require('./toc')(config).toc(function(err, toc) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            walk(toc, function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        });
        break;
    case 'toc':
        require('./toc.js')(config).toc(function(err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            data.forEach(function(episode) {
                //console.log(episode);
                console.log(episode.pkg.name, episode.pkg.brain.provides.join(', '));        
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
        require('./bundle').bundle(opts, function() {});
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
