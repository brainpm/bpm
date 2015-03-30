var shellby = require('shellby');
var git = require('parse-git-config');

exports.publish = function(opts) {
    var gitConfig = git.sync();
    if (gitConfig === null) {
        console.error('This is not a git repository. Create one first and set a remote. The bpm bundle will be published on the gh-pages branch of this repository.');
        process.exit(1);
    }
    var repoUrl = gitConfig['remote "origin"'].url;
    var commands = [
        'rm -rf .git',
        'git init',
        'git remote add pages ' + repoUrl,
        'git checkout --orphan gh-pages',
        'git add index.js',
        'git add package.json',
        'git ci -am "publish"',
        'git push pages gh-pages --force'
    ];

    process.chdir('.bpm');
    shellby.series(commands, function(err) {
        if (err) throw err;
        console.log('done publishing to ' + repoUrl);
    });
};
