var request = require('request');
var async = require('async');
var _ = require('lodash')._;
var getEpisodeUrl = require('../lib/urls').getEpisodeUrl;
var debug = require('debug')('toc');

module.exports = function(config) {
    var api = {};

    function getPackageJSON(repo, cb) {
        var episodeUrl = getEpisodeUrl(repo.owner.login, repo.name);
        debug('HTTP GET %s', episodeUrl);
        request(optionsFromUrl(episodeUrl), function(err, response, body) {
            if (err) return cb(err);
            if (response.statusCode !== 200) {
                debug('Failed! HTTP GET %s', episodeUrl);
                return cb(new Error('problem downloading ' + episodeUrl));
            }
            var data = null;
            try {
                debug('scraping package.json from bundle');
                json = body.match(/PKGJSON=(.*)\/\*PKGJSON/)[1];
                data = JSON.parse(json);
            } catch(e) {
                var err = new Error('Failed scraping package.json from bundle of episode: ' + repo.full_name);
                return cb(err);
            }
            var ret = {
                repo: repo,
                pkg: data
            };
            cb(null, ret);
        });
    }

    function optionsFromUrl(url) {
        return {
            url: url,
            headers: {
                'User-Agent': config.github_user
            }
        };
    }

    api.toc = function(cb) {
        api.listRepos(function(err, repos) {
            if (err) return cb(err);
            async.map(repos, getPackageJSON, cb); 
        });
    };

    api.listRepos = function(cb) {
        var listReposUrl = "https://api.github.com/orgs/"+ config.github_organisation +"/repos?type=public";
        var options = optionsFromUrl(listReposUrl);
        debug('HTTP GET %s', options.url);
        request(options, function(err, response, data) {
            if (err) return cb(err);
            if (response.statusCode !== 200) {
                return cb(new Error('HTTP status code ' + response.statusCode + ' from github API'));
            }
            var repos = null;
            debug('parsing JSON reply from github API');
            try {
                repos = JSON.parse(data);
                debug('found %d repositories', repos.length);
            } catch(e) {
                debug('Error parsing JSON reply from github', data);
                return cb(e);
            }
            // reject organisation's repo
            repos = _.reject(repos, function(r) {
                return r.name === r.owner.login;
            }); 
            debug('%d repositories left after filtering', repos.length);
            /*
            var repos = _(repos).map(function(r) {
                return {
                    owner: r.owner.login,
                    name: r.name,
                    updated_at: r.updated_at,
                    url: r.ssh_url
                };
            }).value();
            */
            cb(null, repos);
        });
    };
    return api;
};
