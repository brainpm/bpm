var test = require('tape');
var walk = require('../lib/walk');
var getOptions = walk.getOptions;
var collectKnowledge = walk.collectKnowledge;
var walk = walk.walk;

function e(name, requires, provides) {
    return { pkg: {
        name: name,
        brain: {
            requires: requires ? requires.split(' ') : [],
            provides: provides ? provides.split(' ') : []
        } 
    } };
}

test('getOptions should only return the episode if knowledge is sufficient', function(t) {
    t.plan(5);

    var e1 = e('unnamed', 'a b c');

    t.deepEqual(getOptions([], []), []);
    t.deepEqual(getOptions([e1], []), []);
    t.deepEqual(getOptions([e1], ['a']), []);
    t.deepEqual(getOptions([e1], ['a','b','c']), [e1]);
    t.deepEqual(getOptions([e1], ['a','b','c', 'd']), [e1]);
});

test('getOptions should only return episodes that don\'t require unknown stuff', function(t) {
    t.plan(3);

    var e1 = e('unnamed', 'a b c');
    var e2 = e('unnamed', 'b c d');

    t.deepEqual(getOptions([e1, e2], ['a','b','c']), [e1]);
    t.deepEqual(getOptions([e1, e2], ['a','b','c', 'd']), [e1, e2]);
    t.deepEqual(getOptions([e1, e2], ['b','c', 'd']), [e2]);
});

test('collectKnowledge should return a list of the specified episodes \' knowledge items without duplicates', function(t) {
    t.plan(6);
    var e1 = e('unnamed', undefined, 'a b e');
    var e2 = e('unnamed', undefined, 'b c d');
    var e3 = e();
    
    t.deepEqual(collectKnowledge([]), []);
    t.deepEqual(collectKnowledge([e3]), []);
    t.deepEqual(collectKnowledge([e1, e2]).sort(), 'a b c d e'.split(' '));
    t.deepEqual(collectKnowledge([e1, e2, e3]).sort(), 'a b c d e'.split(' '));
    t.deepEqual(collectKnowledge([e2]).sort(), 'b c d'.split(' '));
    t.deepEqual(collectKnowledge([e2, e2]).sort(), 'b c d'.split(' '));
    
});

test('walk should return the correct path through a given set of linked episodes given a certain history and returning any unreachable episodes', function(t) {
    var e1 = e('e1', undefined, 'a');
    var e2 = e('e2','a', 'b c');
    var e3 = e('e3','a', 'b d e');
    var e4 = e('e4','a d', 'e f');
    var e5 = e('e5','x', 'z');

    var visitCalls;
    function visit(/* knowlege, options, pick */) {
        visitCalls.push(Array.prototype.slice.apply(arguments));
    }

    t.test('no episodes, no history, no knowledge', function(t) {
        visitCalls = [];
        var unreachable = walk([],[],[], visit);
        t.deepEqual(unreachable, []);
        t.equal(visitCalls.length, 0);
        t.end();
    });

    t.test('one episode, no history, no knowledge', function(t) {
        visitCalls = [];
        unreachable = walk([e1],[],[], visit);
        t.deepEqual(unreachable, []);
        t.equal(visitCalls.length, 1);
        t.deepEqual(visitCalls[0][0], []);
        t.deepEqual(visitCalls[0][1], [e1]);
        t.equal(visitCalls[0][2], e1);
        t.end();
    });

    t.test('given an array of 5 episodes, one unreachable', function(t) {
        visitCalls = [];
        unreachable = walk([e1, e2, e3, e4, e5],[],[], visit);
        t.deepEqual(unreachable, [e5]);
        t.equal(visitCalls.length, 4);
        t.deepEqual(visitCalls[0][0], []);
        t.deepEqual(visitCalls[0][1], [e1]);
        t.deepEqual(visitCalls[1][1], [e2, e3]);
        t.equal(visitCalls[0][2], e1);
        t.equal(visitCalls[1][2], e2);
        t.end();
    });

    t.test('given an array of 5 episodes, one unreachable, as well as some in history already', function(t) {
        visitCalls = [];
        unreachable = walk([e1, e2, e3, e4, e5],['e1', 'e2'], undefined, visit);
        t.deepEqual(unreachable, [e5]);
        t.equal(visitCalls.length, 2);
        t.deepEqual(visitCalls[0], ['a b c'.split(' '), [e3], e3])  ;
        t.deepEqual(visitCalls[1], ['a b c d e'.split(' '), [e4], e4]);
        t.end();
    });

    t.test('duplicate items in history should not cause problems', function(t) {
        visitCalls = [];
        unreachable = walk([e1, e2, e3, e4, e5],['e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e2', 'e2'], undefined, visit);
        t.deepEqual(unreachable, [e5]);
        t.equal(visitCalls.length, 2);
        t.deepEqual(visitCalls[0], ['a b c'.split(' '), [e3], e3])  ;
        t.deepEqual(visitCalls[1], ['a b c d e'.split(' '), [e4], e4]);
        t.end();
    });

    t.end();
});
