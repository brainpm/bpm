#!/usr/bin/env node
var nopt = require('nopt');
var rc = require('rc');
var opts = nopt();

var config = rc('bpm');
//console.log(config);

if (opts.argv.remain.length === 0) {
    console.error('Please specify a sub command');
    process.exit(1);
}
var command = opts.argv.remain[0];

switch(command) {
    case 'version':
        console.log(require('../package.json').version);
        break;
    case 'init':
        require('./init').init(config);
        break;
    case 'bundle':
        require('./bundle').bundle(opts, function() {});
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
