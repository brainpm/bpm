var request = require('request');
var _ = require('lodash');
var map = require('map');

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

    function getCommits(branch, cb) {
        gh_request(
            'https://api.github.com/repos/' +
                config.github_organisation + '/' +
                episode + '/commits?sha=' + branch,
            config.github_user,
            function(err, res, data) {
                if (err) return cb(err);
                data = JSON.parse(data);
                data = _.map(data, function(entry) {
                    return {
                        date: entry.commit.committer.date,
                        githubHandle: entry.committer.login,
                        committer: entry.commit.committer.name,
                        message: entry.commit.message,
                        branch: branch
                    };
                });
                cb(null, data);
            }
        );
    }

    map(getCommits, ['master', 'gh-pages'], function(err, data) {
        if (err) return cb(err);
        var masterCommits = data[0];
        var ghPagesCommits = data[1];
        var publishDate = _.last(ghPagesCommits).date;
        masterCommits = _.sortBy(masterCommits, function(entry) {
            return entry.date;
        });
        
        // find the latest master branch commit that still is before the last gh-pages branch commit.
        // (go through commits array, find the first one that is larger than publish date and then
        // go back to the  one before)
        var lastPublishedCommit = (_.filter(masterCommits, function(entry) {
            return entry.date < publishDate;
        })).pop();

        cb(null, {
            masterBranchCommits: masterCommits,
            lastPublishedMasterBranchCommit: lastPublishedCommit,
            ghPagesCommits: ghPagesCommits
        });
    });
};
