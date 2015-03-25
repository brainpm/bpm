(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

getMeta = module.exports.getMeta = function() {
    return require('/Users/regular/dev/shecodes/bpm/package.json');
};
getHTML = module.exports.getHTML = function() {
    return require('/Users/regular/dev/shecodes/bpm/readme.md');
};

// event-based JSONP support
if (typeof(window) !== 'undefined' && window.events) {
    window.events.emit('append_episode', getMeta().brain.track, getMeta(), getHTML());
}

},{"/Users/regular/dev/shecodes/bpm/package.json":2,"/Users/regular/dev/shecodes/bpm/readme.md":3}],2:[function(require,module,exports){
module.exports={
  "name": "brainpm",
  "version": "1.0.1",
  "description": "a package manager for the brain",
  "bin": {
    "bpm": "lib/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jan Bölsche",
  "license": "ISC",
  "dependencies": {
    "browserify": "^9.0.3",
    "markdownify": "^0.1.0",
    "init-package-json": "^1.3.0",
    "nopt": "^3.0.1",
    "npm": "^2.7.3",
    "ejs": "^2.3.1",
    "mkdirp": "^0.5.0",
    "parse-git-config": "^0.3.0",
    "shellby": "^0.1.0"
  }
}

},{}],3:[function(require,module,exports){
module.exports = "<h1 id=\"bpm\">bpm</h1>\n<p>a package manager for the brain (very experimental)</p>\n<p>bpm is based on npm. Like npm it uses package.json. It extends package.json with a property named <code>brain</code>. brain is an object that lets you specify what knowledge is required to understand the learning material and what knowledge the learning material provides.</p>\n<pre><code class=\"lang-javascript\"><div class=\"highlight\"><pre><span class=\"p\">...</span>\n    <span class=\"s2\">&quot;brain&quot;</span><span class=\"o\">:</span> <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;requires&quot;</span><span class=\"o\">:</span> <span class=\"p\">[</span><span class=\"s2\">&quot;html&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;css&quot;</span><span class=\"p\">],</span>\n        <span class=\"s2\">&quot;provides&quot;</span><span class=\"o\">:</span> <span class=\"p\">[</span><span class=\"s2\">&quot;css:flex-box&quot;</span><span class=\"p\">]</span>\n    <span class=\"p\">}</span>\n<span class=\"p\">...</span>\n</pre></div>\n\n</code></pre>\n<h2 id=\"installation\">Installation</h2>\n<pre><code><div class=\"highlight\"><pre><span class=\"nx\">npm</span> <span class=\"nx\">install</span> <span class=\"nx\">brainpm</span>  <span class=\"o\">--</span><span class=\"nx\">global</span>\n</pre></div>\n\n</code></pre><h2 id=\"usage\">Usage</h2>\n<h3 id=\"bpm-init\">bpm init</h3>\n<p>Use <code>bpm init</code> instead of <code>npm init</code> to get the extra fields in yout package.json.</p>\n<pre><code><div class=\"highlight\"><pre><span class=\"nx\">bpm</span> <span class=\"nx\">init</span>\n</pre></div>\n\n</code></pre><h3 id=\"bpm-bundle\">bpm bundle</h3>\n<p>The <code>bundle</code> sub command takes your package.json and a markdown file (defaults to readme.md) and bundles them up as a JSONP comparible javascript file.</p>\n<pre><code><div class=\"highlight\"><pre><span class=\"nx\">bpm</span> <span class=\"nx\">bundle</span>\n</pre></div>\n\n</code></pre><h3 id=\"bpm-publish\">bpm publish</h3>\n<p><code>bpm publish</code> takes a previously created bundle and pushes it to the gh-pages branch of the git remote called &#39;origon&#39;. If the origin points to github, this means the bundle becomes available on the web. </p>\n<pre><code><div class=\"highlight\"><pre><span class=\"nx\">bpm</span> <span class=\"nx\">publish</span>\n</pre></div>\n\n</code></pre>";
},{}]},{},[1]);
