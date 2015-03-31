var _ = require('lodash');

module.exports.walk = walk;
module.exports.getOptions = getOptions;

function getOptions(episodes, knowledge) {
    return _.filter(episodes, function(e) {
        return _.difference(e.pkg.brain.requires || [], knowledge).length === 0;
    });
}

// toc: an array of {repo:, pkg:} objects
// history: array of names of visited episodes
// returns
//      err: unreachable episodes
//      episodes: in order of visiting

function walk(episodes, history, visit, cb) {
    var visited = _.filter(episodes, function(e) {
        return _(history).includes(e.pkg.name); 
    });

    var left = _.difference(episodes, visited);

    var knowledge = _(episodes).filter(episodeNameInHistory).map(function(e) {
        return e.pkg.brain.provides || [];
    }).flatten().value();

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
