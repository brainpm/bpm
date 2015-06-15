(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"logic","version":"1.0.0","description":"about logic and truth tables","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/logic.git"},"brain":{"provides":["logic","truth-tables"],"requires":["binary"],"content-transform":["brainpm-youtube"],"main":"index.js","track":"yellow"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/logic/issues"},"homepage":"https://github.com/shecodes-content/logic","devDependencies":{"brainpm-youtube":"1.x.x"},"dependencies":{"lazy-youtube":"^2.0.1"}}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"logic_logic\" class=\"anchor\" href=\"#logic_logic\"><span class=\"header-link\"></span></a>Logic</h1><p>A single bit can represent a number of things. For example, it can indicate whether a switch is in the <code>on</code> or <code>off</code> position, whether a particular dot on a screen is black or white, or whether a statement like “It is currently raining” is true or false.</p>\n<p>This last example – representing the truthfulness of a statement with a single bit – is what <em>logic</em> is all about. Learn about the fundamentals of logic from this video.</p>\n<p><div class=\"video\"><div class=\"lazyYT\" data-youtube-id=\"OLGVhszBlq4\"></div><div class=\"credits\"><span class=\"title\">Introduction to Logic</span><span class=\"channel\"><a href=\"https://www.youtube.com/channel/UCUHFjPIW4pH-itdifojJbUA\">ProfessorSerna</a></span><span class=\"license\">youtube</span><span class=\"publishedAt\">2011-12-23T23:23:41.000Z</span></div></div></p>\n<p><strong>Question 1.</strong> What is the negation of the statement:</p>\n<blockquote>\n<p>“If I have enough time, I will become an awesome programmer”<br>In logic the two possible states are called ‘true’ and ‘false’ and the operator that combines two statements into a compound statement is called ‘connective’. There is one unary connective (the negation), and two binary connectives (and, or). It is important to stress that the word ‘binary’ refers to the number of statements that are combined. A binary connective combines TWO statements, hence it is called BINARY. The negation connective, in contrast, is just dealing with ONE statement, hence it is called UNARY. (so, the ‘binary’ in ‘binary connective’ and the binary in ‘binary digit’ mean different things!)<br><a href=\"http://en.wikipedia.org/wiki/Logical_connective\">Wikipedia</a></p>\n</blockquote>\n";
};
getDocumentFragment = module.exports.getDocumentFragment = function() {
    var html = getHTML();
    var frag = document.createDocumentFragment();
    var div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) frag.appendChild(div.firstChild);
    
        require("/Users/regular/.bpm/clones/logic/index.js")(frag);
    
    return frag;
};

// event-based JSONP support
if (typeof(window) !== 'undefined' && window.events) {
    window.events.emit('append_episode', module.exports);
}

},{"/Users/regular/.bpm/clones/logic/index.js":2}],2:[function(require,module,exports){
var lazyYoutube = require('lazy-youtube');
var styleNode = require('./node_modules/lazy-youtube/lazyyt.css');

module.exports = function(fragment) {
    var divs = fragment.querySelectorAll('div.lazyYT[data-youtube-id]');
    for(var i=0; i<divs.length; ++i) {
        lazyYoutube(divs[i]);
    }
};

},{"./node_modules/lazy-youtube/lazyyt.css":4,"lazy-youtube":3}],3:[function(require,module,exports){
/*!
* lazyYT (lazy load YouTube videos)
* v1.0.1 - 2014-12-30
* (CC) This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
* http://creativecommons.org/licenses/by-sa/4.0/
* Contributors: https://github.com/tylerpearson/lazyYT/graphs/contributors || https://github.com/daugilas/lazyYT/graphs/contributors
* 
* Usage: <div class="lazyYT" data-youtube-id="laknj093n" data-parameters="rel=0">loading...</div>
*/

/**
 * lazy-youtube fork
 * http://creativecommons.org/licenses/by-sa/4.0/
 * https://github.com/micnews/lazy-youtube/graphs/contributors
 */

'use strict';

var elementClass = require('element-class');
var on = require('dom-events').on;

function youtubeImageUrl(videoId, imageName) {
  return 'http://img.youtube.com/vi/' + videoId + '/' + imageName + '.jpg';
}

var innerHtml = [
  '<div class="ytp-thumbnail">',
    '<div class="ytp-large-play-button">',
      '<svg>',
        '<path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"></path>',
        '<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>',
      '</svg>',
    '</div>',
  '</div>'
].join('');

function loadYoutubeImage(url, cb) {
  var image = new Image();
  var err = new Error('youtube image load error');
  var done = false;

  image.onload = function (event) {
    if (done) {
      return;
    }

    done = true;
    if (this.width < 200 || this.height < 200) {
      return cb(err);
    }

    return cb(null, event);
  };

  image.onerror = function () {
    if (done) {
      return;
    }

    done = true;
    return cb(err);
  };

  image.src = url;
}

function setBackgroundImage(thumbnail, url) {
  thumbnail.style.backgroundImage = 'url(' + url + ')';
}

function init(element, opts) {
  opts = opts || {};
  var youtubeId = element.getAttribute('data-youtube-id');
  var params = opts.youtubeParameters || '';
  element.style.paddingBottom = (9 / 16 * 100) + '%';
  element.innerHTML = innerHtml;

  var urlMaxres = youtubeImageUrl(youtubeId, 'maxresdefault');
  var urlDefault = youtubeImageUrl(youtubeId, '0');
  var thumbnail = element.querySelector('.ytp-thumbnail');

  if (!thumbnail) {
    return;
  }

  setBackgroundImage(thumbnail, urlMaxres);

  loadYoutubeImage(urlMaxres, function (err) {
    if (err) {
      setBackgroundImage(thumbnail, urlDefault);
      return;
    }
  });

  var thumbnailClass = elementClass(thumbnail);
  thumbnailClass.add('lazyYT-image-loaded');

  on(thumbnail, 'click', function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    
    if (thumbnail.className && thumbnailClass.has('lazyYT-image-loaded') &&
        !elementClass(element).has('lazyYT-video-loaded')) {
      elementClass(element).add('lazyYT-video-loaded');
      element.innerHTML = '<iframe src="//www.youtube.com/embed/'
        + youtubeId + '?autoplay=1&' + params
        + '" frameborder="0" allowfullscreen></iframe>';
    }
  });
}

module.exports = function (element, opts) {
  opts = opts || {};
  var containerClass = opts.container || 'lazyYT-container';
  if (element.className && elementClass(element).has(containerClass)) {
    return;
  }

  if (!element.className) {
    element.className = '';
  }

  elementClass(element).add(containerClass);
  init(element, opts);
};

},{"dom-events":5,"element-class":9}],4:[function(require,module,exports){
var css = "/*!\n* lazyYT (lazy load YouTube videos)\n* v1.0.1 - 2014-12-30\n* (CC) This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.\n* http://creativecommons.org/licenses/by-sa/4.0/\n* Contributors: https://github.com/tylerpearson/lazyYT/graphs/contributors || https://github.com/daugilas/lazyYT/graphs/contributors\n*/\n\n.lazyYT-container {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0 0 56.25% 0;\n  overflow: hidden;\n  background-color: #000000;\n}\n\n.lazyYT-container iframe {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n/*\n * Thumbnail\n */\n\n.ytp-thumbnail {\n  padding-bottom: inherit;\n  cursor: pointer;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  -webkit-background-size: cover;\n     -moz-background-size: cover;\n       -o-background-size: cover;\n          background-size: cover;\n}\n\n/*\n * Play button (YouTube style)\n */\n\n.ytp-large-play-button {\n  position: absolute;\n  top: 50% !important;\n  left: 50% !important;\n  width: 86px !important;\n  height: 60px !important;\n  padding: 0 !important;\n  margin: -29px 0 0 -42px !important;\n  font-size: normal !important;\n  font-weight: normal !important;\n  line-height: 1 !important;\n  opacity: .9;\n}\n\n.ytp-large-play-button-svg {\n  opacity: .9;\n  fill: #1f1f1f;\n}\n\n.lazyYT-image-loaded:hover .ytp-large-play-button-svg,\n.ytp-large-play-button:focus .ytp-large-play-button-svg {\n  opacity: 1;\n  fill: #cc181e;\n}\n"; (require("./../../../../../dev/bpm-bundle/node_modules/cssify"))(css); module.exports = css;
},{"./../../../../../dev/bpm-bundle/node_modules/cssify":10}],5:[function(require,module,exports){

var synth = require('synthetic-dom-events');

var on = function(element, name, fn, capture) {
    return element.addEventListener(name, fn, capture || false);
};

var off = function(element, name, fn, capture) {
    return element.removeEventListener(name, fn, capture || false);
};

var once = function (element, name, fn, capture) {
    function tmp (ev) {
        off(element, name, tmp, capture);
        fn(ev);
    }
    on(element, name, tmp, capture);
};

var emit = function(element, name, opt) {
    var ev = synth(name, opt);
    element.dispatchEvent(ev);
};

if (!document.addEventListener) {
    on = function(element, name, fn) {
        return element.attachEvent('on' + name, fn);
    };
}

if (!document.removeEventListener) {
    off = function(element, name, fn) {
        return element.detachEvent('on' + name, fn);
    };
}

if (!document.dispatchEvent) {
    emit = function(element, name, opt) {
        var ev = synth(name, opt);
        return element.fireEvent('on' + ev.type, ev);
    };
}

module.exports = {
    on: on,
    off: off,
    once: once,
    emit: emit
};

},{"synthetic-dom-events":6}],6:[function(require,module,exports){

// for compression
var win = window;
var doc = document || {};
var root = doc.documentElement || {};

// detect if we need to use firefox KeyEvents vs KeyboardEvents
var use_key_event = true;
try {
    doc.createEvent('KeyEvents');
}
catch (err) {
    use_key_event = false;
}

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=16735
function check_kb(ev, opts) {
    if (ev.ctrlKey != (opts.ctrlKey || false) ||
        ev.altKey != (opts.altKey || false) ||
        ev.shiftKey != (opts.shiftKey || false) ||
        ev.metaKey != (opts.metaKey || false) ||
        ev.keyCode != (opts.keyCode || 0) ||
        ev.charCode != (opts.charCode || 0)) {

        ev = document.createEvent('Event');
        ev.initEvent(opts.type, opts.bubbles, opts.cancelable);
        ev.ctrlKey  = opts.ctrlKey || false;
        ev.altKey   = opts.altKey || false;
        ev.shiftKey = opts.shiftKey || false;
        ev.metaKey  = opts.metaKey || false;
        ev.keyCode  = opts.keyCode || 0;
        ev.charCode = opts.charCode || 0;
    }

    return ev;
}

// modern browsers, do a proper dispatchEvent()
var modern = function(type, opts) {
    opts = opts || {};

    // which init fn do we use
    var family = typeOf(type);
    var init_fam = family;
    if (family === 'KeyboardEvent' && use_key_event) {
        family = 'KeyEvents';
        init_fam = 'KeyEvent';
    }

    var ev = doc.createEvent(family);
    var init_fn = 'init' + init_fam;
    var init = typeof ev[init_fn] === 'function' ? init_fn : 'initEvent';

    var sig = initSignatures[init];
    var args = [];
    var used = {};

    opts.type = type;
    for (var i = 0; i < sig.length; ++i) {
        var key = sig[i];
        var val = opts[key];
        // if no user specified value, then use event default
        if (val === undefined) {
            val = ev[key];
        }
        used[key] = true;
        args.push(val);
    }
    ev[init].apply(ev, args);

    // webkit key event issue workaround
    if (family === 'KeyboardEvent') {
        ev = check_kb(ev, opts);
    }

    // attach remaining unused options to the object
    for (var key in opts) {
        if (!used[key]) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

var legacy = function (type, opts) {
    opts = opts || {};
    var ev = doc.createEventObject();

    ev.type = type;
    for (var key in opts) {
        if (opts[key] !== undefined) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

// expose either the modern version of event generation or legacy
// depending on what we support
// avoids if statements in the code later
module.exports = doc.createEvent ? modern : legacy;

var initSignatures = require('./init.json');
var types = require('./types.json');
var typeOf = (function () {
    var typs = {};
    for (var key in types) {
        var ts = types[key];
        for (var i = 0; i < ts.length; i++) {
            typs[ts[i]] = key;
        }
    }

    return function (name) {
        return typs[name] || 'Event';
    };
})();

},{"./init.json":7,"./types.json":8}],7:[function(require,module,exports){
module.exports={
  "initEvent" : [
    "type",
    "bubbles",
    "cancelable"
  ],
  "initUIEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail"
  ],
  "initMouseEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget"
  ],
  "initMutationEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "relatedNode",
    "prevValue",
    "newValue",
    "attrName",
    "attrChange"
  ],
  "initKeyboardEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ],
  "initKeyEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ]
}

},{}],8:[function(require,module,exports){
module.exports={
  "MouseEvent" : [
    "click",
    "mousedown",
    "mouseup",
    "mouseover",
    "mousemove",
    "mouseout"
  ],
  "KeyboardEvent" : [
    "keydown",
    "keyup",
    "keypress"
  ],
  "MutationEvent" : [
    "DOMSubtreeModified",
    "DOMNodeInserted",
    "DOMNodeRemoved",
    "DOMNodeRemovedFromDocument",
    "DOMNodeInsertedIntoDocument",
    "DOMAttrModified",
    "DOMCharacterDataModified"
  ],
  "HTMLEvents" : [
    "load",
    "unload",
    "abort",
    "error",
    "select",
    "change",
    "submit",
    "reset",
    "focus",
    "blur",
    "resize",
    "scroll"
  ],
  "UIEvent" : [
    "DOMFocusIn",
    "DOMFocusOut",
    "DOMActivate"
  ]
}

},{}],9:[function(require,module,exports){
module.exports = function(opts) {
  return new ElementClass(opts)
}

function indexOf(arr, prop) {
  if (arr.indexOf) return arr.indexOf(prop)
  for (var i = 0, len = arr.length; i < len; i++)
    if (arr[i] === prop) return i
  return -1
}

function ElementClass(opts) {
  if (!(this instanceof ElementClass)) return new ElementClass(opts)
  var self = this
  if (!opts) opts = {}

  // similar doing instanceof HTMLElement but works in IE8
  if (opts.nodeType) opts = {el: opts}

  this.opts = opts
  this.el = opts.el || document.body
  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
}

ElementClass.prototype.add = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return el.className = className
  var classes = el.className.split(' ')
  if (indexOf(classes, className) > -1) return classes
  classes.push(className)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.remove = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return
  var classes = el.className.split(' ')
  var idx = indexOf(classes, className)
  if (idx > -1) classes.splice(idx, 1)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.has = function(className) {
  var el = this.el
  if (!el) return
  var classes = el.className.split(' ')
  return indexOf(classes, className) > -1
}

},{}],10:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}]},{},[1]);
