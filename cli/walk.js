var _ = require('lodash');

module.exports = function(config) {
    var toc = require('./toc')(config).toc;
    var api = {};

    function getOptions(episodes, knowledge) {
        return _.filter(episodes, function(e) {
            return _.difference(e.brain.requires || [], knowledge).length === 0;
        });
    }

    api.walk = function(cb) {
        toc(function(err, episodes) {
            episodes = _.pluck(episodes, 'pkg');
            var left = _.clone(episodes);
            var knowledge = [];
            var visited = [];
            function pluckLeft(e) {
                return {
                    name: e.name,
                    requires: e.brain.requires
                };
            } 
            for(;;) {
                var options = getOptions(episodes, knowledge);
                options = _.difference(options, visited);

                console.log('options are', _.pluck(options, 'name').join(', '));
                if (options.length === 0) {
                    console.log('no more options');
                    console.log('unreachable:', _.map(left, pluckLeft));
                    return cb(null);
                }
                var pick = options[0];
                console.log('picking', pick.name);
                console.log('new knowledge:', pick.brain.provides);
                visited.push(pick);
                left = _.without(left, pick);
                knowledge = knowledge.concat(pick.brain.provides);
            }
        });
    };
    return api;
};
