var _ = require('lodash');

module.exports.walk = walk;
module.exports.getOptions = getOptions;
module.exports.getMenu = getMenu;

// return the next n episodes of each track
// (this may include some episodes that are not available yet with
// the given knowledge)
//
function getMenu(toc, history, knowledge, tracks, n) {
    var episodes = [];

    walk(toc, history, knowledge, function visit(k,o,e) {
        e.enabled = _.difference(e.pkg.brain.requires, knowledge).length === 0;
        episodes.push(e); 
    }, function() {});
    episodes = _.groupBy(episodes, function(e) {
        return e.pkg.brain.track || null;
    });
    var result = {};
    _.each(tracks, function(t) {
        result[t] = _.sortBy(episodes[t].slice(0, n), function(e) {
            return !e.enabled;
        });
    });
    return result;
}

// return a list of episodes that can
// be understood with the given knowledge
function getOptions(toc, knowledge) {
    return _.filter(toc, function(e) {
        return _.difference(e.pkg.brain.requires || [], knowledge).length === 0;
    });
}

// toc: an array of {repo:, pkg:} objects
// history: array of names of visited episodes
// knowledge: array of strings. if undefined, is auto-filled with
// knowledge provided by the episodes given in history.
// Calls callback with
//      err: unreachable episodes
//      episodes: in order of visiting

function walk(episodes, history, knowledge, visit, cb) {
    var visited = _.filter(episodes, function(e) {
        return _(history).includes(e.pkg.name); 
    });

    var left = _.difference(episodes, visited);

    if (knowledge === undefined) {
        knowledge = _(episodes).filter(episodeNameInHistory).map(function(e) {
            return e.pkg.brain.provides || [];
        }).flatten().value();
    }

    function episodeNameInHistory(e) {
        return _(history).includes(e.pkg.name); 
    }
    for(;;) {
        var options = getOptions(episodes, knowledge);
        options = _.difference(options, visited);

        if (options.length === 0) {
            var err = null;
            if (left.length) {
                err = new Error('some episodes are unreachable');
                err.unreachable = left;
            }
            visited = _.reject(visited, episodeNameInHistory);
            return cb(err, visited);
        }
        var pick = options[0];
        visit(knowledge, options, pick);
        visited.push(pick);
        left = _.without(left, pick);
        knowledge = knowledge.concat(pick.pkg.brain.provides);
    }
}
