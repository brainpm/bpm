var init = require('init-package-json');
var path = require('path');
var npm = require('npm');

module.exports.init = function(config) {
    var dir = process.cwd();
    npm.load(config, function (er, npm) {
        if (er) throw er;
        init_module = require.resolve('./default-input');
        //console.log(init_module);

        init(dir, init_module, npm.config, function (er, data) {
            if (er) throw er;
            console.log('written successfully');
        });
    });
};
