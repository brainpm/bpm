var _ = require('lodash');

module.exports.walk = walk;
module.exports.getMenu = getMenu;
module.exports.getOptions = getOptions;
module.exports.collectKnowledge = collectKnowledge;

// return the next n episodes of each track
// (this may include some episodes that are not available yet with
// the given knowledge)
//
function getMenu(toc, history, knowledge, n) {
    var episodes = [];
    tracks = _.uniq(_.map(toc, function(episode) {return episode.pkg.brain.track;}));
    walk(toc, history, knowledge, function visit(k,o,e) {
        e.enabled = _.difference(e.pkg.brain.requires, knowledge).length === 0;
        episodes.push(e); 
    });
    episodes = _.groupBy(episodes, function(e) {
        return e.pkg.brain.track || null;
    });
    var result = {};
    _.each(tracks, function(t) {
        result[t] = _.sortBy((episodes[t] || []).slice(0, n), function(e) {
            return !e.enabled;
        });
    });
    return result;
}

// return a list of episodes that can
// be understood with the given knowledge
function getOptions(episodes, knowledge) {
    return _.filter(episodes, function(e) {
        return _.difference(e.pkg.brain.requires || [], knowledge).length === 0;
    });
}

function collectKnowledge(visited) {
    return _(visited).map(function(e) {
        return e.pkg.brain.provides || [];
    }).flatten().uniq().value();
}

// toc: an array of {repo:, pkg:} objects
// history: array of names of visited episodes
// knowledge: array of strings. if undefined, is auto-filled with
// knowledge provided by the episodes given in history.
// Calls callback with
//      err: unreachable episodes
//      episodes: in order of visiting

function walk(episodes, history, knowledge, visit, cb) {
    function episodeNameInHistory(e) {
        return _(history).includes(e.pkg.name); 
    }

    var visited = _.filter(episodes, episodeNameInHistory);
    var left = _.difference(episodes, visited);

    if (knowledge === undefined) {
        knowledge = collectKnowledge(visited);
    }

    for(;;) {
        var options = getOptions(episodes, knowledge);
        options = _.difference(options, visited);

        if (options.length === 0) {
            // The episodes that are left are unreachable.
            // We give them back to the caller.
            return left;
        }
        // we always pick the first option
        // this leads to ONE possible path through
        // the episodes.
        var pick = options[0];
        visit(knowledge, options, pick);
        visited.push(pick);
        left = _.without(left, pick);
        knowledge = _.union(knowledge, pick.pkg.brain.provides);
    }
}
