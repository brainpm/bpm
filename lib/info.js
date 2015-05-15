var request = require('request');

function gh_request(url, github_user, cb) {
    var options = {
        url: url,
        headers: {
            'User-Agent': github_user
        }
    };
    request(options, cb);
}

module.exports = function(config, opts, episode, cb) {
    gh_request('https://api.github.com/repos/'+config.github_organisation+'/'+episode+'/commits?sha=master', config.github_user, function(err, res, data) {
        cb(err, data);        
    });
};
