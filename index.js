(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"messages-and-signals","version":"1.0.0","description":"about messages and signals in nature","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/messages-and-signals.git"},"brain":{"requires":["encoding"],"provides":["signal","message"],"track":"yellow"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/messages-and-signals/issues"},"homepage":"https://github.com/shecodes-content/messages-and-signals"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"messages-and-signals_messages-and-signals\" class=\"anchor\" href=\"#messages-and-signals_messages-and-signals\"><span class=\"header-link\"></span></a>Messages and Signals</h1><p>All living things communicate in some way: The flower signals the bee that it has some interesting resources to offer by means of vibrant coloured blooms and a nice fragrant. At home in the hive, the bee tells their friends where to find that altruistic flower by encoding its position into a dance performance! (And the flower, not being that altruistic after all, is pretty happy to have its DNA spread across the land, but that is a different story)</p>\n<p>Some codes are being used for inter-species communication (flower to bee), others, like the bee-dance, can only be decoded by members of the same species.</p>\n<p>One of them, humans, invented two new categories – codes for human-machine communication and codes for machine-machine communication. How and why this happened is a story of love, death and despair and we’ll get to it in a bit.</p>\n";
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

},{}],2:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"passion","version":"1.0.0","description":"on real programmers","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/passion.git"},"brain":{"provides":["real-programmers"],"track":"blue"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/passion/issues"},"homepage":"https://github.com/shecodes-content/passion"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"passion_passion\" class=\"anchor\" href=\"#passion_passion\"><span class=\"header-link\"></span></a>Passion</h1><p>There are people that will tell you that there’s no point in learning to program when you are an adult. If you did not grow up with a home computer in the 80s, they say, spending three days without sleeping, drinking 50 cans of coke and hacking away on your C64 to write a game in 6502 assembler, then you’ll never be a <em>real programmer</em>. Programming is a passion, you either have it or you don’t, they continue. “If your sole purpose of learning a programming language is to earn money, you’ll fail!”, usually concludes this statement.</p>\n<p>Well, that is bullshit. Most car drivers never drove a Formula One racing car or a motorbike. Many do not even have any desire to ever do so, because frankly, they think it’s stupid to risk their health or even life. They simply use cars to transport themselves or goods from one point to another. They learned to drive a car without ever having driven a racing car. And there’s nothing wrong with it.</p>\n<p>Times have changed, that <em>real programmer</em> model is outdated. Collaboration is the key to building awesome software today. Communication skills and empathy along with creativity, problem solving skills and mastering the craft of software development are the critical ingredients.</p>\n<p>You will learn to code, if you are determined and motivated and if you enjoy learning in the first place, because for a software developer learning never ends. And while you grow your knowledge and skills, passion will come to you almost certainly. Try to refrain from spending too many full nights coding in a row though!</p>\n";
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

},{}],3:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"remote-thought-control","version":"1.0.2","description":"how we routinely encode and decode thoughts","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/remote-throught-control.git"},"brain":{"provides":["code","encoding","decoding"],"track":"yellow"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/remote-throught-control/issues"},"homepage":"https://github.com/shecodes-content/remote-throught-control"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"remote-thought-control_remote-thought-control\" class=\"anchor\" href=\"#remote-thought-control_remote-thought-control\"><span class=\"header-link\"></span></a>Remote Thought Control</h1><p>While you read this text, your brain does an incredible thing. It produces a voice inside your head that is talking to you, my voice. It is much like if I, the author, would be sitting right next to you, speaking these words into your ears. My thoughts have been recorded and are being reproduced inside your head right now. It’s quite amazing isn’t it? Those thoughts even traveled through time and space to get to wherever you are right now, long after they were formed. It must have been quite scary and magical when this technique was invented roughly 4000 years ago.</p>\n<p>Your eyes stare onto a screen, scanning line by line from left to right, producing a huge amount of sensory input. In that stream of graphical data, that stream of edges, lines and curves, the visual cortex inside your brain is recognizing patterns, letters of the roman alphabet, punctuation signs and whole words. For the part that then deals with understanding the meaning of what is being said, it does not matter anymore, if the words originate from your ears or from your eyes.</p>\n<p>This works because you learned the codes I am using to encode my message to you. You learned the roman alphabet and the indian digits that I am using. You’ve also learned how to combine these symbols into words that we both associate with the same things (more or less). This communication works, because we have a whole lot in common, we know how to encode thoughts and decode written text.</p>\n<p>Written words are a code for spoken language. Vowels and consonants are codes for sounds we make when speaking. Punctuation signs are codes for rhythm, pauses and melody in a sentence. Written language, like musical notation, makes a lasting recording of passing acoustic sensations. It encodes that sensation in a graphical form that can be stored, transported and accessed later to reproduce the original sensation. Your brain is doing a hell of a lot decoding work right now and you barely notice it! Take a second to reflect on the awesomeness of this accomplishment!  (stop reading, otherwise I keep controlling your thoughts, muting yours)<br>Compared to what your brain is doing here right now, programming a machine is a walk in the park!</p>\n<p>Our letters are roman, our numbers come from India (if that surprises you, then watch the following video), the programming languages are made by nerds. If you learned the first two, you can learn the last one too!</p>\n<p><a href=\"https://www.youtube.com/watch?v=Ar7CNsJUm58\">youtube</a></p>\n";
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

},{}],4:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"steganography","version":"1.0.0","description":"how to hide secrets in plain sight","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git@github.com:shecodes-content/steganography.git"},"brain":{"provides":["steganography","Francis-Bacon","baconian-cipher","encryption"],"requires":["message","encoding"],"track":"yellow"},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0","bugs":{"url":"https://github.com/shecodes-content/steganography/issues"},"homepage":"https://github.com/shecodes-content/steganography"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<p>Crypto 01  steganography example:  Baconian Cipher</p>\n<h1><a name=\"steganography_hidden-in-plain-sight\" class=\"anchor\" href=\"#steganography_hidden-in-plain-sight\"><span class=\"header-link\"></span></a>Hidden in plain sight</h1><p>Having a secret code and a seal is an improvement over unsecured messaging. However, if someone can steal the message and discover that it is encrypted, that someone might use a lot of resources to crack the code, because the fact that the message was encoded is an indicator for its importance. Even worse: the recipient might not get the message precisely because that bad person in the middle (typically called ‘man in the middle’) considers it important and therefore holds it back. It would be much more desirable to hide the fact that the message is important by hiding the fact that it is encrypted. That however can only work when the encrypted message looks like a normal, profane message to the uninitiated.</p>\n<p>In 1605, multi-talent Francis Bacon invented a method of doing just that. It is called the Baconian Cipher. (Cipher is another term for ‘method of encryption’’ and encryption is another term for ‘encoding for the purpose of secrecy’)</p>\n<p>Read <a href=\"http://en.wikipedia.org/wiki/Bacon%27s_cipher\">this article</a> to find out how it works.</p>\n";
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

},{}],5:[function(require,module,exports){
module.exports.pkg = PKGJSON={"name":"terminal-emulator","version":"1.2.0","description":"where modern terminal emulators come from","main":"index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"brain":{"track":"black","provides":["terminal-emulator"],"requires":["video-terminal","tty"]},"author":"Jan Bölsche <jan@lagomorph.de> (http://regular.codes)","license":"CC-SA-BY-3.0"}/*PKGJSON*/;
getHTML = module.exports.getHTML = function() {
    return "<h1><a name=\"terminal-emulator_terminal-emulators\" class=\"anchor\" href=\"#terminal-emulator_terminal-emulators\"><span class=\"header-link\"></span></a>Terminal Emulators</h1><p>Today, computers are smaller and cheaper, and they typically are now right below your keyboard (in case you have a laptop). The text-based way to interact with a computer has been replaced by touchpads, mice, and graphical user interfaces like Windows or Mac OS.</p>\n<p>Wait. Has it really?</p>\n<p>There is one group of people that still prefers to use a text terminal over a graphical user interface, a group that prefers a keyboard over a mouse or touchpad. These people are a certain kind of programmer. They typically build things that are connected to the Internet (like web applications), they want to work as fast and efficiently as possible and therefore need ways to automate tedious tasks. They often work with servers, which until today are humming, blinking boxes in basements in a data center far away.</p>\n<p>Of course we do not use 1960s technology anymore. While the basic principle of the terminal stayed the same, today it is not a piece of hardware anymore, instead it is a piece of software on your computer that mimics the behavior of a video terminal. It now supports color and emojis, underlined and bold text, transparent background images, copy and paste and many more improvements over the original hardware. The terminal is more popular than ever. All operating systems these days come with a terminal emulator.</p>\n";
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

},{}],6:[function(require,module,exports){
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

},{}]},{},[6,4]);
