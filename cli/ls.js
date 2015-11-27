var _ = require('lodash');

var publisher = require('bpm-publish');
var pull = require('pull-stream');
var rc = require('rc');
var config = rc('bpm');
var debundle = require('bpm-bundle').debundle;

var retrievalStream = publisher.getRetrievalStream(config.github_organisation, config.github_user);

function displayDataInTerminal(data) {
    console.log(data.name);
    console.log('\t' + 'version ' + data.version);
    console.log('\t' + 'requires ' + data.brain.requires);
    console.log('\t' + 'provides ' + data.brain.provides);
}

function provideDataForNonTty(data) {
    var getValue = _.propertyOf(data);
    var line = _.map(
        'name version brain.provides brain.requires'
            .split(' '),
        function(path) {
            return getValue(path) || "[n/a]";
        }
    ).join(" ");
    console.log(line);
}

module.exports = function() {
    pull(
        retrievalStream,
        pull.asyncMap(debundle.getMetaData),
        pull.through(function(metaData) {
            if (process.stdout.isTTY) {
                displayDataInTerminal(metaData);
            } else {
                provideDataForNonTty(metaData);
            }
        }),
        pull.onEnd(function(err) {
            if (err) {
                console.error('Error fetching toc', err);
                process.exit(1);
            }
        })
    );
};
