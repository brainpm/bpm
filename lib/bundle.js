var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var mkdirp = require('mkdirp');
var template = require.resolve('../bundle.ejs');
template = fs.readFileSync(template, 'utf-8');
var bfy = require('browserify')();

exports.bundle = function(opts, cb) {
    // load package.json
    var package_json_path = path.join(process.cwd(), 'package.json');
    var pkg = null;
    try {
        pkg = JSON.parse(fs.readFileSync(package_json_path, 'utf-8'));
    } catch(e) {
        console.error('unable to read package.json');
        throw e;
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
    var ctx = {
        markdown_path: markdown_path,
        package_json_path: package_json_path
    };
    var code = ejs.render(template, ctx);
    mkdirp('./.bpm', function(err) {
        if (err) throw err;
        fs.writeFileSync('./.bpm/_index.js', code, 'utf-8');

        bfy.add('./.bpm/_index.js');
        bfy.transform(require.resolve('markdownify'));
        
        var stream = bfy.bundle();
        stream.pipe(fs.createWriteStream('./.bpm/index.js'));
        stream.on('end', function() {
            console.log('done bundling');
            fs.unlinkSync('./.bpm/_index.js');
            cb(null);
        });
    });
};

