var shellby = require('shellby');
var async = require('async');
var spawn = require('child_process').spawn;
var path = require('path');

module.exports = function(config) {
    var list = require('./toc')(config).listRepos;
    
    function rebundleEpisode(episode, cb) {
        var wd = path.join(process.env.HOME, '.bpm/clones');
        var ewd = path.join(wd, episode.name);

        console.log(episode.name);
        var commands = [
            'mkdir -p ' + wd,
            'rm -rf '+ ewd +' || exit 0',
            'git clone ' + episode.url + ' ' + ewd
        ];
        shellby.series(commands, function(err) {
            if (err) return cb(err);
            var bpm = spawn('bpm', ['publish'], { cwd: ewd, stdio: 'inherit' });
            bpm.on('close', function(code) {
                if (code !== 0) return cb(new Error('creating remote repository failed.'));
                cb(null);
            });
        });
    }

    var api = {};

    api.rebundleAll = function(cb) {
        list(function(err, episodes) {
            if (err) return cb(err);
            async.map(episodes, rebundleEpisode, cb);              
        });
    };

    return api;
};
