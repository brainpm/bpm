(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"video-terminal","version":"1.0.0","description":"how ICs made video terminals possible","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/video-terminal.git"},"brain":{"provides":["video-terminal"],"requires":["tty"],"track":"black"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/video-terminal/issues"},"homepage":"https://github.com/shecodes-content/video-terminal"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"video-terminal_video-terminals\" class=\"anchor\" href=\"#video-terminal_video-terminals\"><span class=\"header-link\"></span></a>Video Terminals</h1><p>Since the mid-70s there was a desire to replace paper-based tty terminals with some device that would have a way to display characters on a screen. Only when the necessary electronic memory circuits became small and cheap enough to store one screen worth of characters (typically 80 characters per row by 25 rows), this became possible for a price below $10.000.</p>\n<p>Because there was no print head anymore, egineers needed a way to indicate to the users where the next character would appear. This was the birth of the cursor – typically a blinking white rectangle that can be positioned anywhere on the screen by sending special control characters to the video terminal.</p>\n<p>Programs on computers connected to video terminals could now be written to be much more interactive then before. Only now was it possible to do simple animations for example. And users saved a lot of paper!</p>\n<p>Here’s a very popular video terminal. It was introduced in 1978.<br><img src=\"http://upload.wikimedia.org/wikipedia/commons/9/99/DEC_VT100_terminal.jpg\" alt=\"VT100 by DEC\"></p>\n<p>We will talk in detail about how a video terminal works internally in the Science &amp; History track.</p>\n";
};
getDocumentFragment = module.exports.getDocumentFragment = function() {
    var html = getHTML();
    var frag = document.createDocumentFragment();
    var div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) frag.appendChild(div.firstChild);
    
    return frag;
};

// event-based JSONP support
if (typeof(window) !== 'undefined' && window.events) {
    window.events.emit('append_episode', module.exports);
}

},{}]},{},[1]);
