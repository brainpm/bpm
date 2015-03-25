#!/usr/bin/env node
var nopt = require('nopt');
var opts = nopt();

if (opts.argv.remain.length === 0) {
    console.error('Please specify a sub command');
    process.exit(1);
}
var command = opts.argv.remain[0];

switch(command) {
    case 'init':
        require('./init').init(opts);
        break;
    case 'bundle':
        require('./bundle').bundle(opts);
        break;
    case 'publish':
        require('./publish').publish(opts);
        break;
    default:
          console.error('Unknown sub command:', command);
          process.exit(2);
}
