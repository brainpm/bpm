var request = require('request');
var async = require('async');
var _ = require('lodash')._;

module.exports = function(config) {
    var api = {};

    function getEpisodeURL (org, name) {
        return 'https://'+ org +'.github.io/' + name +'/package.json';
    }

    function getPackageJSON(repo, cb) {
        var episodeUrl = getEpisodeURL(repo.owner.login, repo.name);
        request(optionsFromUrl(episodeUrl), function(err, response, body) {
            if (err) return cb(err);
            if (response.statusCode !== 200) {
                return cb(new Error('problem downloading ' + episodeUrl));
            }
            var data = null;
            try {
                data = JSON.parse(body);
            } catch(e) {
                return cb(e);
            }
            cb(null, data);
        });
    }

    function getPackageJSONFromRepos(repos, cb) {
        async.map(repos, function(repo, cb) {
            getPackageJSON(repo, function(err, pkg) {
                if (err) return cb(err);
                var ret = {};
                ret.name = repo.name;
                ret.updated_at = repo.updated_at;
                ret.pkg = pkg;
                cb(null, ret);
            });
        }, cb);
    }

    function optionsFromUrl(url) {
        return {
            url: url,
            headers: {
                'User-Agent': config.github_user
            }
        };
    }

    api.listRepos = function(cb) {
        var listReposUrl = "https://api.github.com/orgs/"+ config.github_organisation +"/repos?type=public";
        var options = optionsFromUrl(listReposUrl);
        request(options, function(err, response, data) {
            if (err) return cb(err);
            if (response.statusCode !== 200) {
                cb(new Error(data));
            }
            var repos = null;
            try {
                repos = JSON.parse(data);
            } catch(e) {
                console.log(data);
                return cb(e);
            }
            //getPackageJSONFromRepos(repos, cb); 
            var ret = _(repos).map(function(r) {
                return {
                    owner: r.owner.login,
                    name: r.name,
                    updated_at: r.updated_at,
                    url: r.ssh_url
                };
            }).value();
            cb(null, ret);
        });
    };
    return api;
};
