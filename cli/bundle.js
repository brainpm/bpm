var fs = require('fs');
var _ = require('lodash');
var ejs = require('ejs');
var path = require('path');
var mkdirp = require('mkdirp');
var template = require.resolve('../bundle.ejs');
template = fs.readFileSync(template, 'utf-8');
var bfy = require('browserify')();
var marked = require('marked');
var concat = require('concat-stream');

exports.bundle = function(opts, cb) {
    // load package.json
    var package_json_path = path.join(process.cwd(), 'package.json');
    var pkg = null;
    try {
        pkg = JSON.parse(fs.readFileSync(package_json_path, 'utf-8'));
    } catch(e) {
        console.error('unable to read package.json');
        return cb(e);
    }
    if (typeof(pkg.brain) === 'undefined')
        pkg.brain = {};
    var filenames = [pkg.brain.content || 'content.md', 'readme.md', 'ReadMe.md', 'README.md'];
    var markdown_path = null;
    for(var i=0; i<filenames.length; ++i) {
        var p = path.join(process.cwd(), filenames[i]);
        try {
            fs.statSync(p);
            markdown_path = p;
            break;
        } catch(e) {}
    }
    if (markdown_path === null) {
        throw new Error('unable to fund markdown file');
    }
    // render markdown
    var html = marked(fs.readFileSync(markdown_path, 'utf8'));
    var transforms = pkg.brain['content-transform'] || [];
    transforms = _.map(transforms, function(t) {
        var tp = path.join(process.cwd(), 'node_modules', t);
        return require(tp)();
    });
    var combined = _.reduce(transforms, function(combined, n) {
        return combined.pipe(n);
    });

    var cs = concat(htmlReady);
    combined.pipe(cs);
    combined.write(html);
    combined.end();

    function htmlReady(html) {
        var ctx = {
            content: html, 
            pkg: pkg
        };
        var code = ejs.render(template, ctx);
        mkdirp('./.bpm', function(err) {
            if (err) throw err;
            fs.writeFileSync('./.bpm/_index.js', code, 'utf-8');
            fs.writeFileSync('./.bpm/package.json', JSON.stringify(pkg), 'utf-8');
            bfy.add('./.bpm/_index.js');
            bfy.transform(require.resolve('markdownify'));

            var stream = bfy.bundle();
            stream.pipe(fs.createWriteStream('./.bpm/index.js'));
            stream.on('end', function() {
                console.log('done bundling ' + pkg.name);
                fs.unlinkSync('./.bpm/_index.js');
                cb(null);
            });
        });
    }
};

