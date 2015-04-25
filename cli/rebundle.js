var shellby = require('shellby');
var async = require('async');
var spawn = require('child_process').spawn;
var path = require('path');
var chalk = require('chalk');

module.exports = function(config) {
    var list = require('./toc')(config).listRepos;
    
    function rebundleEpisode(episode, cb) {
        var wd = path.join(process.env.HOME, '.bpm/clones');
        var ewd = path.join(wd, episode.name);

        var commands = [
            'mkdir -p ' + wd,
            'rm -rf '+ ewd +' || exit 0',
            ['git clone ' + episode.ssh_url + ' ' + ewd, {
                stdio: null
            }],
            ['git checkout master', {cwd: ewd}],
            ['npm install', {cwd: ewd}],
            ['bpm publish', {cwd: ewd}]
        ];
        shellby.series(commands, function(err) {
            if (err) {
                console.error('FAILED to re-bundle ' + episode.name);
            } else {
                console.log(chalk.green('\u2713'), chalk.blue(episode.name));
            }
            cb(err);
        });
    }

    var api = {};

    api.rebundleAll = function(cb) {
        list(function(err, episodes) {
            if (err) return cb(err);
            console.log(chalk.blue('about to republish', episodes.length, 'episodes.'), chalk.red('Please stand by ...'));
            async.map(episodes, rebundleEpisode, cb);
        });
    };

    return api;
};
