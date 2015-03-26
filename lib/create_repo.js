var fs = require('fs');
var shellby = require('shellby');
var pw = require('pw');
var spawn = require('child_process').spawn;

module.exports.create = function(config, cb) {
    var name = JSON.parse(fs.readFileSync('./package.json','utf-8')).name;

    process.stdout.write("github password for " + config.github_user + ':');

    pw(function(password) {
        var args = [
            "-u", config.github_user + ":" + password,
            "https://api.github.com/orgs/" + config.github_organisation + "/repos",
            "-d", '{"name":"' + name + '"}'
        ];
        var curl = spawn('curl', args, { stdio: 'inherit' });
        curl.on('close', function(code) {
            //console.log('curl returned', code);
            if (code !== 0) throw new Error('creating remote repository failed.');

            var commands = [
                "git remote add origin git@github.com:/" + config.github_organisation + "/" + name + ".git" ,
                "git remote show origin"
            ];
            shellby.series(commands, function(err) {
                if (err) throw err;
                cb(err);
            });
        });
    });
};
