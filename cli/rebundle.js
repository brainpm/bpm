var path = require('path');
var chalk = require('chalk');
var Board = require('terminal-status-board');
var pipeline = require('progress-pipeline');
var _ = require('lodash');

var spawn = require('child_process').spawn;
var util = require('util');

function shell(cmd, opts, cb) {
    if (typeof opts ===  'function') {
        cb = opts;
        opts = { stdio: 'inherit' };
    }
    var parts = cmd.split(/\s+/g);
    var p = spawn( parts[0], parts.slice(1), opts );

    p.on('error', function (err) {
        if (cb) cb(err);
    });

    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error(util.format('command %s exited with status code %s', cmd, code));
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
}

function shellJob(cmd, opts) {
    var args = Array.prototype.slice.apply(arguments);
    var job =  function(cb) {
        args.push(cb);
        shell.apply(null, args);
    };
    job.title = (opts ? opts.jobTitle : null) || cmd;
    return job;
}

module.exports = function(config) {
    var list = require('./toc')(config).listRepos;
    
    function makePipeline(episode) {
        var wd = path.join(process.env.HOME, '.bpm/clones');
        var ewd = path.join(wd, episode.name);

        var jobs = [
            shellJob('mkdir -p ' + wd),
            shellJob('rm -rf '+ ewd +' || exit 0'),
            shellJob(
                'git clone ' + episode.ssh_url + ' ' + ewd,
                {
                    jobTitle: 'cloning',
                    stdio: null
                }
            ),
            shellJob('git checkout master', {cwd: ewd}),
            shellJob('npm install', {cwd: ewd}),
            shellJob('bpm publish', {cwd: ewd})
        ];
        return pipeline(jobs);
    }

    var api = {};

    api.rebundleAll = function(cb) {
        list(function(err, episodes) {
            if (err) return cb(err);
            console.log(chalk.blue('about to republish', episodes.length, 'episodes.'), chalk.red('Please stand by ...'));
            
            var board = Board();
            var errors = [];

            _.map(episodes, function(e) {
                var p = makePipeline(e);
                p.on('error', function(err) {
                    errors.push(err);
                });
                board.add(p, e.name);
            });
            board.on('end', function() {
                console.log(util.format('done (%d errors)', errors.length));
                cb(errors.length ? errors : null);
            }).pipe(process.stdout);
        });
    };

    return api;
};
