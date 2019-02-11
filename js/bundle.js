(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
//import page which you want to load in the main bundle/ at the beggning of the app
const homePage = require('./pages/homePage/page');

//declare the firest page module here
const startPage = homePage;
const baseHref = null;

//------------------------------------------------------------------------------
//dont fuck with anything below

engine.router.set.baseHref(baseHref);

if(engine.router.active.page == null){
  loadPage();
}

function loadPage(){
  engine.router.active.page = startPage.ref;
  engine.router.built.page.push(startPage.ref);
  startPage.init();
}

},{"./pages/homePage/page":10}],4:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-footer';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  let cont = engine.make.div({
    id:'footer',
    parent:compId,
    class:'footer-cont'
  });

    //tag
    engine.make.div({
      id:'tag',
      parent:cont,
      class:'footer-tag',
      text:'Made with Love by Akku'
    });

}

module.exports = {init:init,ref:compRef,type:type}

},{}],5:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-loader';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

  return compId;

}

//build the dom for comp here
function build(){

  let cont = engine.make.div({
    id:'loader',
    parent:compId,
    class:'loader-cont'
  });

    engine.make.div({
      id:'back',
      parent:cont,
      class:'loader-back'
    });

    let box = engine.make.div({
      id:'box',
      parent:cont,
      class:'card loader-box'
    });

      let animate = engine.make.div({
        id:'box',
        parent:box,
        class:'loader-box-animate'
      });

        engine.make.div({
          id:'loading',
          parent:animate,
          class:'loader-loading'
        });

      let text = engine.make.div({
        id:'text',
        parent:box,
        class:'loader-box-text',
        text:'Loading ...'
      });

    engine.view.hide(compId);  


}

module.exports = {init:init,ref:compRef,type:type}

},{}],6:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menu';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

async function route(page){
  if(!window.pageModules[page]){
    engine.loader.load.page(page)
    .then(()=>{
      engine.router.navigate.to.page(window.pageModules[page]);
    })
    .catch((error)=>{
      console.log(error);
    });
  } else {
    engine.router.navigate.to.page(window.pageModules[page]);
  }
}



//build the dom for comp here
function build(){

  route('docsPage');

  engine.common.tell('building',log);

  let menuCont = engine.make.div({
    id:'menu',
    parent:compId,
    class:'menu-cont'
  });

    let logoCont = engine.make.div({
      id:'logo',
      parent:menuCont,
      class:'logo-cont'
    });

      engine.make.button({
        id:'logo',
        parent:logoCont,
        class:'logo-button',
        value:"Vegana Js",
        function:(id,data)=>{
          engine.set.pageTitle('Vegana Home || Introduction || git || npm || contact || twitter');
          close();
          engine.global.function.loader().show();
          route('homePage');
          engine.global.function.loader().hide();
        }
      });

    let linksCont = engine.make.div({
      id:'links',
      parent:menuCont,
      class:'links-cont'
    });

      let linksButtonCont = engine.make.div({
        id:'buttons',
        parent:linksCont,
        class:'links-buttons-cont'
      });

        engine.make.button({
          id:'close',
          parent:linksButtonCont,
          class:'links-close-button',
          value:'close',
          function:(id,data)=>{
            close();
          }
        });

        engine.make.button({
          id:'docs',
          parent:linksButtonCont,
          class:'links-button',
          value:'docs',
          function:(id,data)=>{
            engine.set.pageTitle('Vegana Book || Learn Vegana || Docs Latest');
            close();
            engine.global.function.loader().show();
            route('docsPage');
            engine.global.function.loader().hide();
          }
        });

        engine.make.button({
          id:'community',
          parent:linksButtonCont,
          class:'links-button',
          value:'community',
          function:(id,data)=>{
            engine.set.pageTitle('Vegana Community || Forum');
            close();
            engine.global.function.loader().show();
            route('communityPage');
            engine.global.function.loader().hide();
          }
        });

        engine.make.button({
          id:'about',
          parent:linksButtonCont,
          class:'links-button',
          value:'about',
          function:(id,data)=>{
            engine.set.pageTitle('About Vegana || A brief introduction to Vegana');
            close();
            engine.global.function.loader().show();
            route('aboutPage');
            engine.global.function.loader().hide();
          }
        });

    let linksToggleCont = engine.make.div({
      id:'toggle',
      parent:linksCont,
      class:'links-toggle-cont'
    });

      engine.make.button({
        id:'menu',
        parent:linksToggleCont,
        class:'links-toggle-button',
        value:'menu',
        function:(id,data)=>{

          let control = engine.data.get("menuToggle");

          if(control == null){
            engine.data.set("menuToggle",true);
            engine.view.show(linksButtonCont);
            return;
          }

          if(control == "true"){
            engine.view.hide(linksButtonCont);
            engine.data.reset("menuToggle",false);
          } else {
            engine.view.show(linksButtonCont);
            engine.data.reset("menuToggle",true);
          }

        }
      });

      function close(){
        if(engine.get.body.width() <= 480){
          engine.data.reset("menuToggle",false);
          engine.view.hide(linksButtonCont);
        }
      }

}

module.exports = {init:init,ref:compRef,type:type}

},{}],7:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-intro';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  // let iconCont = engine.make.div({
  //   id:'icon',
  //   parent:compId,
  //   class:'home-comp-intro-icon-cont'
  // });
  //
  //   engine.make.image({
  //     id:'icon',
  //     parent:iconCont,
  //     class:'home-comp-intro-icon',
  //     type:'local',
  //     location:'assets/images/logo.png'
  //   });

  let intro = engine.make.div({
    id:'intro',
    parent:compId,
    class:'home-comp-intro-cont'
  });

  let welcomeCont = engine.make.div({
    id:'welcome',
    parent:intro,
    class:'home-comp-welcome-cont'
  });

    engine.make.image({
      id:'welcome',
      parent:welcomeCont,
      class:'home-comp-welcome-image',
      type:'local',
      location:'assets/images/bear.png'
    });

    // engine.make.div({
    //   id:'text',
    //   parent:welcomeCont,
    //   class:'home-comp-welcome-text',
    //   text:'Welcome'
    // });

  let textCont = engine.make.div({
    id:'text',
    parent:intro,
    class:'home-comp-intro-text-cont'
  });

    engine.make.div({
      id:'title',
      parent:textCont,
      class:'home-comp-intro-title-cont',
      text:'Welcome'
    });

    let para = "<p>This is a brief of why did i made it. ";
    para = para + "Angular routing sucks, code management and redability is horse shit, ";
    para = para + "i wanted easy tools to call apis and access data across components which was missing ";
    para = para + "and bundle sizes were like a hammer useless.</p>";
    para = para + "<p>Thus vegana with super fast no bull shit cli, ";
    para = para + "vegana follows a defined document structure making code redability and management a breeze for any team size.</p>";
    para = para + "<p>I dont like html while using js it fucks me up so vegana provides ";
    para = para + "fast and easy dom apis to make any possible element with minimal code and complicacy.</p>";
    para = para + "<p>Sass have native support with live reloading and i am not imposing any file structure thank me later.</p>";
    para = para + "<p>Live reloading is present for any change in the app directory.</p>";
    para = para + "<p>Speed was the priority while i was making it, so all the tools are optional and super optimized.</p>";
    para = para + "<p>Finally you get super fast and small bundle,easy code redability and management, team size agnostic and the fastest framework to develop anything in i promise.</p>";

    engine.make.div({
      id:'para',
      parent:textCont,
      class:'home-comp-intro-para-cont',
      text:para
    });

}

module.exports = {init:init,ref:compRef,type:type}

},{}],8:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-tags';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var tagsCont;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  tagsCont = engine.make.div({
    id:'tagsCont',
    parent:compId,
    class:'home-page-tags-cont'
  });

  tagify({
    id:'twitter',
    image:'assets/images/twitter.png',
    url:'https://twitter.com/myCrazyGoat',
    title:'Twitter'
  });

  tagify({
    id:'git',
    image:'assets/images/github.png',
    url:'https://github.com/gzbakku/vegana#readme',
    title:'github'
  });

  tagify({
    id:'npm',
    image:'assets/images/npm.png',
    url:'https://www.npmjs.com/package/vegana',
    title:'npm'
  });

}

function tagify(data){

  let cont = engine.make.div({
    id:data.id,
    parent:tagsCont,
    class:'home-page-tag-cont',
    function:()=>{
      window.location = data.url;
    }
  });

    engine.make.image({
      id:'tagsCont',
      parent:cont,
      class:'home-page-tag-image',
      type:'local',
      location:data.image
    });

    engine.make.div({
      id:'title',
      parent:cont,
      class:'home-page-tag-title',
      text:data.title
    });

}

module.exports = {init:init,ref:compRef,type:type}

},{}],9:[function(require,module,exports){


const loaderComp = require('../comps/loaderComp/comp');

module.exports = {init:init};

//this function loades the function to global functions
function init(){
  engine.add.function('loader',loader);
}

function loader(what){
  if(engine.data.get('loaderId') == null){
     engine.data.set('loaderId',loaderComp.init(engine.router.active.page));
  }
  return {
    show:()=>{
      engine.view.show(engine.data.get('loaderId'));
    },
    hide:()=>{
      engine.view.hide(engine.data.get('loaderId'));
    }
  }
}

},{"../comps/loaderComp/comp":5}],10:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-home";
const pageName = 'homePage';
const menuComp = require('../comps/menuComp/comp');
const footerComp = require('../comps/footerComp/comp');
const glob = require('./global');

let featuresCont;

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
async function build(){

  glob.init();

  engine.set.pageTitle('Vegana Home || Introduction || git || npm || contact || twitter');

  menuComp.init(pageId);

  const intro = require('./comps/introComp/comp');

  intro.init(pageId);

  engine.make.div({
    id:'featuresTitle',
    parent:pageId,
    class:'home-page-features-page-title',
    text:'Features'
  });

  featuresCont = engine.make.div({
    id:'features',
    parent:pageId,
    class:'home-page-features-cont'
  });

  feature({
    id:'cli',
    image:'assets/images/cli.png',
    title:'Node js Cli',
    comment:'Native Node js Cli makes development and code management easy.'
  });

  feature({
    id:'documents',
    image:'assets/images/lazy.png',
    title:'Defined Components Structure',
    comment:'Vegana components Structure reduces overall bundle size increases loading times upto 100%, easy code management and usefull for giant teams.'
  });

  feature({
    id:'read',
    image:'assets/images/read.png',
    title:'Code Redability',
    comment:'Defined components structure makes the code super easy to understand for new devs.'
  });

  feature({
    id:'sass',
    image:'assets/images/sass.png',
    title:'Native Sass Support',
    comment:'Sass is implimented without any document structure thank me later for it.'
  });

  feature({
    id:'html',
    image:'assets/images/html.png',
    title:'Native Dom Elements',
    comment:'Only JS HTML elements makes demelopment faster and minimizes code, making development faster.'
  });

  feature({
    id:'tools',
    image:'assets/images/tools.png',
    title:'Native tools for Api, Auth and Local Database.',
    comment:'Native tools makes Auth , Api calls ,Local Data Management and lots other super easy, just try it.'
  });

  const tags = require('./comps/tagsComp/comp');

  tags.init(pageId);

  footerComp.init(pageId);

}

function feature(data){

  let holder = engine.make.div({
    id:data.id,
    parent:featuresCont,
    class:'home-page-feature-cont'
  });

  let cont = engine.make.div({
    id:data.id,
    parent:holder,
    class:'home-page-feature-box'
  });

    engine.make.div({
      id:'title',
      parent:cont,
      class:'home-page-feature-title',
      text:data.title
    });

    let imageCont = engine.make.div({
      id:'imgCont',
      parent:cont,
      class:'home-page-feature-image-cont'
    });

      engine.make.image({
        id:'img',
        parent:imageCont,
        class:'home-page-feature-image',
        type:'local',
        location:data.image
      });

   engine.make.div({
     id:'text',
     parent:cont,
     class:'home-page-feature-comment',
     text:data.comment
   });

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{}
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;

},{"../comps/footerComp/comp":4,"../comps/menuComp/comp":6,"./comps/introComp/comp":7,"./comps/tagsComp/comp":8,"./global":9}],11:[function(require,module,exports){
const engineModule = require('vegana-engine');
window.pageModules = {};
window.pageList = {};
window.engine = engineModule;
const app = require('./app/index.js');

},{"./app/index.js":3,"vegana-engine":22}],12:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],13:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],14:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],15:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":12,"crypt":13,"is-buffer":14}],16:[function(require,module,exports){
(function (process){
/* 
(The MIT License)
Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(typeof __webpack_require__ !== 'function'){
    var mac = '', networkInterfaces = require('os').networkInterfaces();
    for(interface_key in networkInterfaces){
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for(var i = 0; i < length; i++){
            if(networkInterface[i].mac && networkInterface[i].mac != '00:00:00:00:00:00'){
                mac = networkInterface[i].mac; break;
            }
        }
    }
    address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
} 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }
module.exports.process = function(prefix){ return (prefix || '') + pid + now().toString(36); }
module.exports.time    = function(prefix){ return (prefix || '') + now().toString(36); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

}).call(this,require('_process'))
},{"_process":2,"os":1}],17:[function(require,module,exports){
const common = require('./common');
const log = false;

module.exports = {

  object : function(key,object){
    common.tell('adding global function',log);
    if(!key){
      return common.error('not_found-key');
    }
    if(!object){
      return common.error('not_found-object');
    }
    engine['global']['object'][key] = object;
    return true;
  },

  function : function(key,func){
    common.tell('adding global function',log);
    if(!key){
      return common.error('not_found-key');
    }
    if(!func){
      return common.error('not_found-func');
    }
    engine['global']['function'][key] = func;
    return true;
  },

  comp : function(key,mod){
    common.tell('adding global comp',log);
    if(!key){
      return common.error('not_found-key');
    }
    if(!mod){
      return common.error('not_found-module');
    }
    engine['global']['comp'][key] = mod;
    return true;
  }

};

},{"./common":19}],18:[function(require,module,exports){
const common = require('./common');
const router = require('./router');
const view = require('./view');
const log = false;

module.exports= {

  click : function(id,func){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }
    if(func == null){
      return common.error('no_function_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    get.addEventListener('click',func);
    return id;

  },

  text : function(id){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    return get.value;

  },

  number : function(id){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(Number(get.value)){
      return Number(get.value);
    } else {
      return false;
    }

  },

  value : function(id){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(get.value){
      return get.value;
    } else if(get.innerHTML){
      return get.innerHTML;
    } else {
      return false;
    }

  },

  active : function(id){

    if(id == null){
      return common.error('no_id_found');
    }
    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(get.checked){
      return true;
    } else {
      return false;
    }

  },

  boolean : function(id){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    let value = get.value;

    try{
      return JSON.parse(value);
    } catch(err){
      return null;
    }

  }

};

},{"./common":19,"./router":38,"./view":47}],19:[function(require,module,exports){
module.exports= {

  kill : false,

  tell : function(message,control){
    if(control == true || this.kill == true){
      console.log('>>> ' + message);
    }
    return true;
  },

  error : function(error){
    console.log('!!! ' + error);
    return false;
  }

};

},{}],20:[function(require,module,exports){
const common = require('./common');
var db = {};

module.exports = {

  get : function(tag,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }

    if(where == 'mem'){
      if(db.hasOwnProperty(tag) == false){
        return null;
      } else {
        return db[tag];
      }
    }
    if(where == 'session'){
      if(sessionStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return sessionStorage[tag];
      }
    }
    if(where == 'local'){
      if(localStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return localStorage[tag];
      }
    }

  },

  set : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    if(typeof(value) == 'object'){
      value = JSON.stringify(value);
    }
    if(typeof(value) !== 'string'){
      value = value.toString();
    }

    if(where == 'mem'){
      if(!db[tag]){
        db[tag] = value;
        return true;
      } else {
        return false;
      }
    }
    if(where == 'session'){
      if(!sessionStorage[tag]){
        sessionStorage.setItem(tag,value);
        return true;
      } else {
        return false;
      }
    }
    if(where == 'local'){
      if(!localStorage[tag]){
        localStorage.setItem(tag,value);
        return true;
      } else {
        return false;
      }
    }

  },

  reset : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    if(typeof(value) == 'object'){
      value = JSON.stringify(value);
    }
    if(typeof(value) !== 'string'){
      value = value.toString();
    }

    if(where == 'mem'){
      db[tag] = value;
      return true;
    }
    if(where == 'session'){
      sessionStorage.setItem(tag,value);
      return true;
    }
    if(where == 'local'){
      localStorage.setItem(tag,value);
      return true;
    }

  }

}

},{"./common":19}],21:[function(require,module,exports){
const common = require('./common');

module.exports = {

  contName : function(contId){

    if(!contId || typeof(contId) !== 'string'){
      return common.error('invalid/not_found-contId');
    }

    if(!contId.match('-')){
      return common.error('invalid-contId');
    }

    let name = contId.split('-')[3];
    return name + 'Cont';

  },

  contModule : function(pageName,contName){

    if(!pageName || typeof(pageName) !== 'string'){
      return common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return common.error('invalid/not_found-contName');
    }

    let pool = window.pageModules[pageName].contModules;

    if(pool[contName]){
      return pool[contName];
    } else {
      return false;
    }

  },

  PanelModule : function(pageName,contName,panelName){

    if(!pageName || typeof(pageName) !== 'string'){
      return common.error('invalid/not_found-pageName');
    }
    if(!contName || typeof(contName) !== 'string'){
      return common.error('invalid/not_found-contName');
    }
    if(!panelName || typeof(panelName) !== 'string'){
      return common.error('invalid/not_found-panelName');
    }

    let pool = window.pageModules[pageName].contModules[contName].panelModules[panelName];

    if(pool[contName]){
      return pool[contName];
    } else {
      return false;
    }

  },

  rowByTdId : function(id){

    if(id==null){
      return common.error('not_found-td_id');
    }
    if(!id.match('-') || !id.match('row')){
      return common.error('invalid-td_id');
    }
    let array = id.split('-');
    let rowIndex = array.indexOf('row') + 2;
    let rowId = null;
    for(var i=0;i<rowIndex;i++){
      if(rowId == null){
        rowId = array[i];
      } else {
        rowId = rowId + '-' + array[i];
      }
    }
    return rowId;
  },

  divIdByEvent : function(e){

    if(navigator.userAgent.indexOf("Chrome") != -1){
      return e.path[0].id;
    }
    if(navigator.userAgent.indexOf("Firefox") != -1){
      return e.target.id;
    }

    return false;

  },

  body : {

    width : function(){
      return document.body.offsetWidth;
    },

    height : function(){
      return document.body.offsetHeight;
    }

  },

};

},{"./common":19}],22:[function(require,module,exports){
const make = require('./make');
const view = require('./view');
const router = require('./router');
const common = require('./common');
const binder = require('./binder');
const loader = require('./loader');
const session = require('./session');
const request = require('./request');
const get = require('./get');
const wet = require('./wet');
const validate = require('./validate');
const set = require('./set');
const add = require('./add');
const data = require('./data');
const time = require('./time');
const params = require('./params');

const md5 = require('md5');
const uniqid = require('uniqid');

//common.tell('one');

module.exports = {
  add:add,
  binder:binder,
  make:make,
  view:view,
  router:router,
  common:common,
  loader:loader,
  session:session,
  request:request.send,
  validate:validate,
  get:get,
  wet:wet,
  set:set,
  data:data,
  time:time,
  params:params,
  global:{
    function:{},
    comp:{},
    object:{}
  },
  md5:md5,
  uniqid:uniqid
};

},{"./add":17,"./binder":18,"./common":19,"./data":20,"./get":21,"./loader":23,"./make":24,"./params":36,"./request":37,"./router":38,"./session":43,"./set":44,"./time":45,"./validate":46,"./view":47,"./wet":52,"md5":15,"uniqid":16}],23:[function(require,module,exports){
const common = require('./common');
const log = false;
const httpMarker = 'http://';

module.exports = {

  load : {

    page : function(pageName){

      return new Promise((resolve,reject)=>{

        common.tell('loading page module',log);

        let error;

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(window.pageList[pageName] == 'onboard'){
          error = 'pageModule-already-loaded';
          reject(error);
        }

        let location = baseHref + '/js/pages/' + pageName + '/page.js';

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('page_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange = function(){
          common.tell('page_loaded',log);
          resolve(true);
        };

        scp.onerror = function(){
          common.error('failed-pageLoad');
          error = 'failed-pageLoad';
          reject(error);
        }

        parent.appendChild(scp);
        window.pageList[pageName] = 'onboard';

      });

    },

    cont : function(pageName,contName){

      return new Promise((resolve,reject)=>{

        let error;

        common.tell('loading cont module',log);


        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(window.pageModules[pageName].contList[contName] == 'onboard'){
          error = 'cont-already-loaded';
          reject(error);
        }

        let location = baseHref + 'js/pages/' + pageName + '/conts/' + contName + '/cont.js';

        //console.log(location);

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('cont_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          common.tell('cont_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    },

    panel : function(pageName,contName,panelName){

      return new Promise((resolve,reject)=>{

        let error;

        common.tell('loading panel module',log);

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(!panelName || typeof(panelName) !== 'string'){
          error = 'invalid/not_found-panelName';
          reject(error);
        }

        let location = baseHref + '/js/pages/' + pageName + '/conts/' + contName + '/panels/' + panelName + '/panel.js';

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          common.tell('panel_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          common.tell('panel_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    }

  },

  css : function(fileName){

    return new Promise((resolve,reject)=>{

      let error;

      common.tell('loading page module',log);

      if(!fileName || typeof(fileName) !== 'string'){
        error = 'invalid/not_found-css_file_name';
        reject(error);
      }

      let location = baseHref + '/css/' + fileName + '.css';

      let parent = document.getElementsByTagName("head")[0];

      let css = document.createElement('link');
      css.rel  = 'stylesheet';
      css.type = 'text/css';
      css.href = location;
      css.media = 'all';
      parent.appendChild(link);

      resolve(true);

    });

  }

};

},{"./common":19}],24:[function(require,module,exports){
const initImport = require('./make/init');
const viewersImport = require('./make/viewers');
const inputsImport = require('./make/inputs');
const tableImport = require('./make/table');
const listImport = require('./make/list');
const customImport = require('./make/custom');
const tabsImport = require('./make/tabs');

module.exports = {

  //init
  init : initImport,
  //viewers
  div:viewersImport.div,
  card:viewersImport.card,
  text:viewersImport.text,
  image:viewersImport.image,
  tabs:viewersImport.tabs,
  dropdown:viewersImport.dropdown,
  message:viewersImport.message,
  addClass:viewersImport.addClass,
  removeClass:viewersImport.removeClass,
  tabs:tabsImport,

  //inputs
  select:inputsImport.select,
  input:inputsImport.input,
  textarea:inputsImport.textarea,
  checkBox:inputsImport.checkBox,
  button:inputsImport.button,
  enableButton:inputsImport.enableButton,

  //table
  table:tableImport.table,
  tableRow:tableImport.tableRow,
  tableRows:tableImport.tableRows,

  //lists
  list:listImport.list,
  listItem:listImport.listItem,
  listItems:listImport.listItems,

  //custom
  element:customImport.element

};

},{"./make/custom":27,"./make/init":28,"./make/inputs":29,"./make/list":30,"./make/table":31,"./make/tabs":32,"./make/viewers":35}],25:[function(require,module,exports){
const common = require('../common');
const log = false;

module.exports = {

  make : {

    card : function(options){

      common.tell('+++ building card',log);

      let cardId = options.parent + '-div-card-' + options.id;
      let cardObject = document.createElement('div');
      cardObject.id = cardId;
      if(options.function){
        cardObject.addEventListener('click',options.function);
      }
      if(options.hasOwnProperty('class') == true){
        cardObject.className = options.class;
      } else {
        cardObject.className = 'card';
      }

      //check if the close button is required but header test is not found
      if(options.hasOwnProperty('close') == true){
        if(options.close == true){
          if(options.hasOwnProperty('headerText') == false){
            return common.error('card_close-called without card header text property');
          }
        }
      }

      if(options.hasOwnProperty('headerText') == true){

        //make card header object
        let cardHeaderObject = document.createElement('div');
        cardHeaderObject.id = cardId + '-header';
        if(options.hasOwnProperty('headerClass') == true){
          cardHeaderObject.className = options.headerClass;
        } else {
          cardHeaderObject.className = 'card-header';
        }
        cardObject.appendChild(cardHeaderObject);

        //make card header text cont
        let headerTextContObject = document.createElement('div');
        headerTextContObject.id = cardHeaderObject.id + '-cont-text';
        if(options.headerTextContClass){
          headerTextContObject.className = options.headerTextContClass;
        } else {
          headerTextContObject.className = 'card-header-text-cont';
        }
        headerTextContObject.innerHTML = options.headerText;
        cardHeaderObject.appendChild(headerTextContObject);

        //make card header action cont
        if(options.hasOwnProperty('close') == true){
          if(options.close == true){

            //make card header action cont here
            let headerActionContObject = document.createElement('div');
            headerActionContObject.id = cardHeaderObject.id + '-cont-action';
            if(options.headerActionContClass){
              headerActionContObject.className = options.headerActionContClass;
            } else {
              headerActionContObject.className = 'card-header-action-cont';
            }
            cardHeaderObject.appendChild(headerActionContObject);

            //make card action close button
            let closeButtonObject = document.createElement('button');
            if(options.hasOwnProperty('closeButtonClass') == true){
              closeButtonObject.className = options.closeButtonClass;
            } else {
              closeButtonObject.className = 'card-header-close-button';
            }
            closeButtonObject.innerHTML = 'close';
            headerActionContObject.appendChild(closeButtonObject);

            //check close button function
            if(options.hasOwnProperty('closeButtonFunction') == true){
              closeButtonObject.addEventListener('click',()=>{
                options.closeButtonFunction(cardId);
              });
            }

          }
        }
      }
      //card header buolder ends here

      //add card body
      let cardBodyId = cardId + '-body'
      let cardBodyObject = document.createElement('div');
      cardBodyObject.id = cardBodyId;
      if(options.hasOwnProperty('cardBodyClass') == true){
        cardBodyObject.className = options.cardBodyClass;
      } else {
        cardBodyObject.className = 'card-body';
      }

      //add card body object to card object
      cardObject.appendChild(cardBodyObject);

      //add card object to the parent
      let get = document.getElementById(options.parent);
      get.appendChild(cardObject);

      return cardId;

    },

    table : function(options){

      let tabelId = options.parent + '-table-' + options.id;
      let tabelObject = document.createElement("table");
      if(options.class){
        tabelObject.className = options.class;
      }
      tabelObject.id = tabelId;

      if(options.headers.length == 0 || !options.headers.length){
        return common.error('headers not_found/invalid : ' + options);
      }

      //make table row
      let row = document.createElement('tr');
      row.id = tabelId + '-row-heading';
      //console.log(row.id);
      if(options.rowCls){
        //console.log(rowCls);
        row.className = rowCls;
      }

      //make table header items
      for(var i=0;i<options.headers.length;i++){
        let key = options.headers[i];
        if(typeof(key) == 'string'){
          //create td
          let th = document.createElement('th');
          if(options.thClass){
            //console.log(thCls);
            th.className = thCls;
            th.id = row.id + '-th-' + key.toLowerCase();
          }
          th.innerHTML = key;
          row.appendChild(th);
        }
      }

      //insert row to the table
      tabelObject.appendChild(row);
      get.appendChild(tabelObject);
      return id;

    }

  }

}

},{"../common":19}],26:[function(require,module,exports){
const common = require('../common');

module.exports = {

  check: function(object){

    if(typeof(object) !== 'object'){
      return common.error('invalid_object');
    }

    //check id property
    if(object.hasOwnProperty('id') !== true){
      return common.error('not_found-id');
    }
      if(typeof(object.id) !== 'string'){
        return common.error('not_found-id');
      }
    //check parent property
    if(object.hasOwnProperty('parent') !== true){
      return common.error('not_found-id');
    }
      if(typeof(object.parent) !== 'string'){
        return common.error('not_found-parent');
      }

    return true;

  }

};

},{"../common":19}],27:[function(require,module,exports){
const common = require('../common');
const checkBaseOptions = require('./check').check;

module.exports = {

  element : function(id,parent,cls,type,ats){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ custom_element',log);

    //security checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(options.length == 0 || options.length == undefined || options == null){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make select
    let div = document.createElement(type);
    div.id = id;
    div.className = cls;

    let keys = Object.keys(ats);

    if(keys == null || keys.length == undefined || keys.length == 0){
      return common.error('no_valid_attributes_found');
    }

    //add ats
    for(var i=0;i<keys.length;i++){
      div[keys[i]] = ats[keys];
    }

    //append select
    get.appendChild(div);
    return id;

  }

};

},{"../common":19,"./check":26}],28:[function(require,module,exports){
const common = require('../common');
const log = false;

function build(type,id,parent,cls){

  common.tell('initiating ' + type,log);

  //security checks
  if(id == null){
    return common.error('not_found-id');
  }
  if(parent == null){
    return common.error('not-found-parent');
  }

  //check parent
  let get = document.getElementById(parent);
  if(get == null){
    return common.error('invalid_parent');
  }

  //make element
  let div = document.createElement("div");
  div.id = id;
  if(cls){
    div.className = cls;
  }
  get.appendChild(div);



  let router = require('../router');

  //update router catalogs here
  if(type == 'page'){
    router.route.push(id);
    router.built.page.push(id);
    router.active.page = id;
  } else if(type == 'cont'){
    router.route.push(id);
    router.built.cont.push(id);
    router.track.cont[parent] = id;
  } else if(type == 'panel'){
    router.route.push(id);
    router.built.panel.push(id);
    router.track.panel[parent] = id;
  }

  //page-router

  return id;

}

module.exports = {

  page : function(id,cls){
    return build('page',id,'page-router',cls);
  },

  comp : function(id,parent,cls){
    return build('comp',id,parent,cls);
  },

  cont : function(id,parent,cls){
    return build('cont',id,parent,cls);
  },

  panel : function(id,parent,cls){
    return build('panel',id,parent,cls);
  }

}

},{"../common":19,"../router":38}],29:[function(require,module,exports){
const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  select : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ select',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(
      options.options.length == 0 ||
      options.options.length == undefined ||
      options.options == null
    ){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make select
    let selectId = options.parent + '-select-' + options.id;
    let selectObject = document.createElement("select");
    selectObject.id = selectId;
    if(options.class){
      selectObject.className = options.class;
    } else {
      selectObject.className = 'form-select';
    }

    //add options
    for(var i=0;i<options.options.length;i++){
      let data = options.options[i];
      if(data.text && data.value !== 'undefined'){
        let option = document.createElement("option");
        option.text = data.text;
        option.value = data.value;
        if(data.class){
          option.className = data.class;
        } else {
          option.className = 'form-select-item';
        }
        if(options.value !== undefined){
          if(options.value == data.value){
            option.selected = true;
          }
        }
        selectObject.add(option);
      }
    }

    if(options.function){
      //selectObject.oninput = options.function;
      selectObject.addEventListener('click',()=>{
        options.function(selectObject.id);
      });
    }

    //append select
    get.appendChild(selectObject);
    return selectId;

  },

  input : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ input',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.type){
      return common.error('not_found-options=>type');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make button
    let inputId = options.parent + '-input-' + options.type + '-' + options.id;
    let inputObject = document.createElement("input");
    inputObject.id = inputId;
    if(options.class){
      inputObject.className = options.class;
    } else {
      inputObject.className = 'form-input';
    }
    inputObject.type = options.type;

    if(options.placeholder){
      inputObject.placeholder = options.placeholder;
    }
    if(options.value){
      inputObject.value = options.value;
    }
    if(options.function){
      //inputObject.oninput = options.function;
      inputObject.addEventListener('input',()=>{
        options.function(inputId);
      });
    }


    get.appendChild(inputObject);
    return inputId;

  },

  checkBox : function(options){

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make label first
    let label = document.createElement("label");
    if(options.labelClass){
      label.className = options.labelClass;
    } else {
      label.className = 'form-checkbox-label';
    }
    if(options.function){
      label.addEventListener('click',()=>{
        options.function(object.id);
      });
    }

    //create object
    let object = document.createElement("input");
    object.id = options.parent + '-input-checkBox-' + options.id;
    object.type = 'checkbox';
    if(options.class){
      object.className = options.class;
    } else {
      object.className = 'form-checkbox';
    }
    if(options.checked){
      if(options.checked == true){
        object.checked = true;
      }
    }
    label.appendChild(object);
    label.appendChild(document.createElement('span'));

    get.appendChild(label);
    return object.id;

  },

  textarea : function(options){

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make oject
    let object = document.createElement('textarea');

    object.id = options.parent + '-textarea-' + options.id;

    //set object properties
    if(options.class){
      object.className = options.class;
    }
    if(options.placeholder){
      object.placeholder = options.placeholder;
    }
    if(options.rows){
      object.rows = options.rows;
    }

    //apend object and return
    get.appendChild(object);
    return object.id;

  },

  button : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ button',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.value){
      return common.error('not_found-options=>value');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make button
    let buttonId = options.parent + '-button-' + options.id;
    let buttonObject = document.createElement("button");
    buttonObject.type = 'button';
    buttonObject.id = buttonId;
    if(options.class){
      buttonObject.className = options.class;
    } else {
      buttonObject.className = 'form-button';
    }
    if(options.disabled){
      if(options.disabled == true){
        buttonObject.disabled = true;
      }
    }
    buttonObject.innerHTML = options.value;
    get.appendChild(buttonObject);

    if(options.function){
      buttonObject.addEventListener('click',()=>{
        if(options.functionData){
          options.function(buttonObject.id,options.functionData);
        } else {
          options.function();
        }
      });
    }

    return buttonId;

  },

  enableButton : function(buttonId){

    let get = document.getElementById(buttonId);
    if(get == null){
      return common.error('not-found/invalid-buttonId');
    } else {
      get.disabled = false;
      return true;
    }

  }

};

},{"../common":19,"./check":26}],30:[function(require,module,exports){
const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  list : function(options){

    //id,parent,listClass,itemClass,type,data

    common.tell('+++ list',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.type !== 'ol' && options.type !== 'ul'){
      return common.error('invalid_list_type : ' + options);
    }
    if(options.data == null || !options.data.length || options.data.length == 0){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    let listId = options.parent + '-list-' + options.id;
    let listObject = document.createElement(options.type);
    if(options.listClass){
      listObject.className = options.listClass;
    }
    listObject.id = listId;

    for(var i=0;i<options.data.length;i++){
      let thisItemData = options.data[i];
      //check this item type
      if(typeof(thisItemData) == 'string'){
        //make list item dom
        let thisItem = document.createElement('li');
        if(options.itemClass){
          thisItem.className = options.itemClass;
        }
        thisItem.id = options.parent + '-' + thisItemData.toLowerCase().replace(/\s/g, "-");
        thisItem.innerHTML = thisItemData;
        if(options.function){
          thisItem.addEventListener('click',options.function);
        }
        listObject.appendChild(thisItem);
      }
    }

    get.appendChild(listObject);

    return listId;

  },

  listItem : function(options){

    common.tell('+++ list item',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.item == null){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make list item
    let listItemId = options.parent + '-' + options.item.toLowerCase().replace(/\s/g, "-");
    let listItemObject = document.createElement('li');
    listItemObject.id = listItemId;
    if(options.itemClass){
      listItemObject.className = options.itemClass;
    }
    listItemObject.innerHTML = options.item;
    if(options.function){
      listItemObject.addEventListener('click',options.function);
    }
    get.appendChild(listItemObject);

    return listItemId;

  },

  listItems : function(options){

    //id,parent,listClass,itemClass,type,data

    common.tell('+++ list items',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.data == null || !options.data.length || options.data.length == 0){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    for(var i=0;i<options.data.length;i++){
      let thisItemData = options.data[i];
      //check this item type
      if(typeof(thisItemData) == 'string'){
        //make list item dom
        let thisItem = document.createElement('li');
        if(options.itemClass){
          thisItem.className = options.itemClass;
        }
        thisItem.id = options.parent + '-' + thisItemData.toLowerCase().replace(/\s/g, "-");
        thisItem.innerHTML = thisItemData;
        if(options.function){
          thisItem.addEventListener('click',options.function);
        }
        get.appendChild(thisItem);
      }
    }

    return options.parent;

  }

};

},{"../common":19,"./check":26}],31:[function(require,module,exports){
const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  table : function(options){

    //id,parent,headers,class,trClass,thClass

    common.tell('+++ table',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(
      options.headers == null ||
      typeof(options.headers) !== 'object'
    ){
      return common.error('no_headers_found : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //tabel object
    let tableId = options.parent + '-tabel-' + options.id;
    let tabelObject = document.createElement("table");
    tabelObject.id = tableId;
    if(options.class){
      tabelObject.className = options.class;
    }
    get.appendChild(tabelObject);

    //check header size
    if(options.headers.length == 0 || !options.headers.length){
      return common.error('headers not_found/invalid : ' + id);
    }

    //make table row
    let row = document.createElement('tr');
    row.id = tableId + '-row-th';
    if(options.trClass){
      row.className = options.trClass;
    }
    tabelObject.appendChild(row);

    //make table header items
    for(var i=0;i<options.headers.length;i++){
      let key = options.headers[i];
      if(typeof(key) == 'string'){
        let th = document.createElement('th');
        if(options.thClass){
          th.className = options.thClass;
          th.id = row.id + '-th-' + key.toLowerCase();
        }
        th.innerHTML = key;
        row.appendChild(th);
      }
    }

    return tableId;

  },

  tableRows : function(options){

    //id,parent,rowData,rowCls,tdCls

    common.tell('+++ table rows',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.rows.length || options.rows.length == 0 || !options.rows){
      return common.error('not_found-rows');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    let rows = options.rows;

    for(var j=0;j<rows.length;j++){

      let row = rows[j];

      if(row.length){
        if(row.length > 0){

          //make row
          let rowId = options.parent + '-row-' + j;
          let rowObject = document.createElement('tr');
          rowObject.id = rowId;
          if(options.trClass){
            rowObject.className = options.trClass;
          }

          //add row items
          for(var i=0;i<row.length;i++){

            let key = row[i];

            if(typeof(key) == 'string'){
              let td = document.createElement('td');
              td.id = rowId + '-td-' + key.toLowerCase().replace(/\s/g, "-");
              if(options.tdClass){
                td.className = options.tdClass;
              }
              td.innerHTML = key;
              //add td to row object
              rowObject.appendChild(td);
            }

          }

          //add row function
          if(options.function){
            rowObject.addEventListener('click',options.function);
          }

          //add row to table
          get.appendChild(rowObject);

        }
      }
      //row length check ends here

    }
    //row loop ends here

    return options.parent;

  },

  tableRow : function(options){

    //id,parent,rowData,rowCls,tdCls

    common.tell('+++ table row',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.row.length || options.row.length == 0 || !options.row){
      return common.error('not_found-rows');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make row
    let rowId = options.parent + '-row-' + options.id;
    let rowObject = document.createElement('tr');
    rowObject.id = rowId;
    if(options.trClass){
      rowObject.className = options.trClass;
    }

    let row = options.row;

    //add row items
    for(var i=0;i<row.length;i++){
      let key = row[i];
      if(typeof(key) == 'string'){
        let td = document.createElement('td');
        td.id = rowId + '-td-' + key.toLowerCase().replace(/\s/g, "-");
        if(options.tdClass){
          td.className = options.tdClass;
        }
        td.innerHTML = key;
        //add td to row object
        rowObject.appendChild(td);
      }
    }

    //add row function
    if(options.function){
      rowObject.addEventListener('click',options.function);
    }

    //add row to table
    get.appendChild(rowObject);


    return options.parent;

  }

};

},{"../common":19,"./check":26}],32:[function(require,module,exports){
"use strict";

const common = require('../common');
const checkBaseOptions = require('./check').check;
const view = require('../view');
const router = require('../router');
const log = false;
const viewers = require('./viewers');
let gets = require('../get');

const make = require('./tabs/make');
const reduce = require('./tabs/reduce');

//input object sample
/*
  {
    id:id,
    parent:'parent',
    tabsContClass:tabsCont,
    linksContClass:linksCont,
      tabClass:idleTab,
      activeTabClass:activeTab,
      navButtonClass:navButton,
    moduleContClass:viewerCont,
    tabs:[
      {value:value0,module,module0,active:true},
      {value:value1,module,module1}
    ]
  }
*/

function build(type,options,clickFunction,activeFunction){

  common.tell('+++ initiating tabs build',log);

  let check = checkBaseOptions(options);
  if(check == false){
    return common.error('invalid_options');
  }
  if(!options.tabs || !options.tabs.length || options.tabs.length == 0){
    return common.error('not_found-tabs');
  }
  if(!options.tabClass){
    options.tabClass = 'tab-idle';
  }
  if(!options.tabsContClass){
    options.tabsContClass = 'tab-cont-main';
  }
  if(!options.activeTabClass){
    options.activeTabClass = 'tab-active';
  }
  if(!options.navButtonClass){
    options.navButtonClass = 'tab-nav';
  }
  if(!options.linksContClass){
    options.linksContClass = 'tab-cont-links';
  }
  if(!options.moduleContClass){
    options.moduleContClass = 'tab-cont-module';
  }
  if(!options.navButtonClass){
    options.navButtonClass = 'tab-nav';
  }

  //check parent
  let get = document.getElementById(options.parent);
  if(get == null){
    return common.error('invalid_parent : ' + options);
  }

  let parentButtonCont,parentModuleCont = null;

  //make tabsCont
  let tabsCont = make.cont(
    options.parent,
    'tabs',
    options.tabsContClass
  );
  let linksCont = make.cont(
    tabsCont,
    'links',
    options.linksContClass
  );
  parentButtonCont = linksCont;

  //only make these conts for comp tabs routing
  if(type == 'comp'){
    let moduleCont = engine.router.init.comps(tabsCont);
    parentModuleCont = moduleCont;
  }

  let makeTabs = make.tabs(
    parentButtonCont,
    parentModuleCont,
    options.tabs,
    clickFunction,
    activeFunction,
    options.tabClass,
    options.activeTabClass
  );

  let doReduce = reduce(
    parentButtonCont,
    options.navButtonClass
  );

  return true;

}

module.exports = {

  comp : function(options){

    common.tell('+++ initiating make comp tabs',log);
    
    function clickFunction(id,mod,data,router){
      engine.router.navigate.to.comp(mod,data,router);
    }

    function activeFunction(id,mod,data,router){
      mod.init(router,data);
      engine.router.track.comp[router] = router + mod.ref;
      engine.router.built.comp.push(router + mod.ref);
    }

    return build('comp',options,clickFunction,activeFunction);

  },

  panel : function(options){

    common.tell('+++ initiating make panel tabs',log);

    function clickFunction(id,mod,data){
      engine.router.navigate.to.panel(mod,data);
    }

    function activeFunction(id,mod,data){
      mod.init(router.track.cont[router.active.page],data);
    }

    return build('panel',options,clickFunction,activeFunction);

  },

  cont : function(options){

    common.tell('+++ making cont tabs',log);

    function clickFunction(id,mod,data){
      engine.router.navigate.to.cont(mod,data);
    }

    function activeFunction(id,mod,data){
      mod.init(router.active.page,data);
    }

    return build('cont',options,clickFunction,activeFunction);

  }

};

},{"../common":19,"../get":21,"../router":38,"../view":47,"./check":26,"./tabs/make":33,"./tabs/reduce":34,"./viewers":35}],33:[function(require,module,exports){
"use strict"

const common = require('../../common');
const checkBaseOptions = require('../check').check;
const view = require('../../view');
const router = require('../../router');
const gets = require('../../get');
const log = false;
const viewers = require('../viewers');

module.exports = {

  tabs : function(parent,moduleCont,tabs,clickFunction,activeFunction,idleClass,activeClass){

    common.tell('+++ making tabs',log);

    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    for(var j=0;j<tabs.length;j++){

      let tab = tabs[j];

      if(
        tab.hasOwnProperty('value') == true &&
        tab.hasOwnProperty('module') == true
      ){

        let tabId = parent + '-tab-' + tab.value.toLowerCase();
        let tabObject = document.createElement('div');
        tabObject.id = tabId;
        tabObject.innerHTML = tab.value;
        tabObject.style.float = 'left';

        if(idleClass){
          tabObject.className = idleClass;
        } else {
          tabObject.className = 'tab-idle';
        }

        if(gets.body.width() > 640 && tabs.length <= 6){
          tabObject.style.width = 'auto';
        }

        get.appendChild(tabObject);

        let tabRef = parent + tab.module.ref;
        let data = null;
        if(tab.data){
          data = tab.data;
        }

        //set active tab class here
        if(tab.active){
          if(tab.active == true){

            //set router tabs track catalog here
            router.track.tabs[parent] = {module:tabRef,tab:tabId};
            router.built.tab.push(tabRef);

            if(activeClass){
              viewers.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              viewers.addClass({id:tabId,parent:'any',class:'tab-active'});
            }
            if(activeFunction){
              activeFunction(tabId,tab.module,data,moduleCont);
            }

          }
        }

        //set tab width to fit page size
        if(gets.body.width() <= 640){
          tabObject.style.width = '26.66%';
        }
        if(gets.body.width() <= 480){
          tabObject.style.width = '40%';
        }

        //set tab function here
        if(clickFunction){
          tabObject.addEventListener('click',()=>{

            //check for active tab
            if(router.track.tabs[parent]['tab'] == tabId){
              return true;
            }

            //remove active class from active tab
            let activeTab = router.track.tabs[parent]['tab'];
            if(activeClass){
              viewers.removeClass({id:activeTab,parent:'any',class:activeClass});
              viewers.addClass({id:tabId,parent:'any',class:activeClass});
            } else {
              viewers.removeClass({id:activeTab,parent:'any',class:'tab-active'});
              viewers.addClass({id:tabId,parent:'any',class:'tab-active'});
            }

            //hide the active tab
            /*
            if(moduleCont){

              view.hide(router.track.tabs[parent].module);

              //check if tab was buolt previously
              if(router.built.tab.indexOf(tabRef) >= 0){
                router.track.tabs[parent] = {module:tabRef,tab:tabId};
                view.show(tabRef);
                return true;
              } else {
                tab.module.init(moduleCont,data);
              }

            }
            */

            clickFunction(tabId,tab.module,data,moduleCont);

            //set comp router tags
            router.track.tabs[parent] = {module:tabRef,tab:tabId};
            router.built.tab.push(tabRef);

          });
        }

      }
    }
    //loop ends here

    return true;

  },

  cont : function(parent,type,cls){

    common.tell('+++ making cont : ' + type,log);

    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }
    if(!type){
      return common.error('not_found-cont_type');
    }

    let contId = parent + '-' + type + '-cont';
    let contObject = document.createElement('div');
    contObject.id = contId;
    if(cls){
      contObject.className = cls;
    }
    get.appendChild(contObject);

    return contId;

  },

}

},{"../../common":19,"../../get":21,"../../router":38,"../../view":47,"../check":26,"../viewers":35}],34:[function(require,module,exports){
const common = require('../../common');
const checkBaseOptions = require('../check').check;
const view = require('../../view');
const router = require('../../router');
const gets = require('../../get');
const log = false;
const viewers = require('../viewers');

module.exports = reduce;

function reduce(parent,navButtonClass){

  common.tell('reducing tabs',log);

  //check parent
  let linksCont = document.getElementById(parent);
  if(linksCont == null){
    return common.error('invalid_parent');
  }
  let linksContId = linksCont.id;

  if(!linksCont.length){
    if(linksCont.length == 0){
      return common.error('invalid_length-linksCont');
    }
  }

  let nodes = linksCont.childNodes;
  let lastNode = nodes[nodes.length - 1];

  //left button
  let leftButton = document.createElement('div');
  leftButton.id = linksContId + '-button-left';
  leftButton.style.float = 'left';
  leftButton.style.width = '10%';
  if(navButtonClass){
    leftButton.className = navButtonClass;
  }
  if(gets.body.width() > 640){
    leftButton.style.display = 'none';
  }
  leftButton.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
  linksCont.insertBefore(leftButton,nodes[0]);

  //right button
  let rightButton = document.createElement('div');
  rightButton.id = linksContId + '-button-right';
  rightButton.style.float = 'left';
  rightButton.style.width = '10%';
  if(navButtonClass){
    rightButton.className = navButtonClass;
  }
  if(gets.body.width() > 640){
    rightButton.style.display = 'none';
  }
  rightButton.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
  linksCont.appendChild(rightButton);

  if(linksCont.scrollHeight > 50){

    console.log('??? reducing initiated');

    rightButton.style.display = 'block';
    leftButton.style.display = 'block';

    //while loop counter
    let count = 2;

    //remove the excess tabs
    while(linksCont.scrollHeight > 50 && count < nodes.length){
      let hideThisTab = nodes[nodes.length - count];
      view.hide(hideThisTab.id);
      count++;
    }

    function tabSlide(hide,show){
      view.hide(hide);
      view.show(show);
    }

    let firstTabIndex = 1;
    let nextTabIndex = nodes.length - count + 1;

    rightButton.addEventListener('click',()=>{
      if(nextTabIndex < nodes.length - 1){
        tabSlide(nodes[firstTabIndex].id,nodes[nextTabIndex].id);
        firstTabIndex++,nextTabIndex++;
      }
    });

    leftButton.addEventListener('click',()=>{
      if(firstTabIndex >= 2){
        firstTabIndex--,nextTabIndex--;
        tabSlide(nodes[nextTabIndex].id,nodes[firstTabIndex].id);
      }
    });

  }
  //if statement ends here

  return true;

}

},{"../../common":19,"../../get":21,"../../router":38,"../../view":47,"../check":26,"../viewers":35}],35:[function(require,module,exports){
const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;
const builder = require('./builder');
const httpMarker = 'http://';

module.exports = {

  addClass : function(options){

    if(typeof(options) !== 'object'){
      return common.error('invalid-options');
    }
    if(!options.id){
      return common.error('not_found-id||options');
    }
    if(!options.class){
      return common.error('not_found-class||options');
    }

    let object = document.getElementById(options.id);
    let style = object.className;
    if(style.indexOf(options.class) >= 0){
      return true;
    }
    style = style + ' ' + options.class;
    object.className = style;
    return true;

  },

  removeClass : function(options){

    if(typeof(options) !== 'object'){
      return common.error('invalid-options');
    }
    if(!options.id){
      return common.error('not_found-id||options');
    }
    if(!options.class){
      return common.error('not_found-class||options');
    }

    let object = document.getElementById(options.id);
    let style = object.className;

    if(style.indexOf(options.class) < 0){
      return true;
    }

    let updated = style.replace(options.class,"");
    object.className = updated;
    return true;

  },

  div : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ div',log);

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make element
    let objectId = options.parent + '-div-' + options.id;
    let div = document.createElement("div");
    div.id = objectId;
    if(options.class){
      div.className = options.class;
    }
    if(options.function){
      div.addEventListener('click',options.function);
    }
    if(options.text !== undefined && options.text !== null){
      div.innerHTML = options.text;
    }
    if(options.style){
      div.style = options.style;
    }

    get.appendChild(div);
    return objectId;

  },

  card : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ card',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //build card
    let cardCheck = builder.make.card(options);
    if(cardCheck == false){
      return common.error('failed-build_card');
    }

    return cardCheck;

  },

  text : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ text',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.parent){
      return common.error('no_parent_found');
    }
    if(!options.text){
      return common.error('no_text_found');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent || parent : ' + options);
    }

    //set text
    get.innerHTML = options.text;
    return options.parent;

  },

  image : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ image',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.location || !options.type){
      return common.error('not_found-options=>location/type');
    }
    if(
      options.type !== 'local' &&
      options.type !== 'url'
    ){
      return common.error('invalid-type');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make image
    let imageId = options.parent + '-image-' + options.id;
    let imageObject = document.createElement("img");
    imageObject.id = imageId;
    if(options.class){
      imageObject.className = options.class;
    }
    if(options.type == 'local'){
      imageObject.src = window.baseHref + options.location;
    }
    if(options.type == 'url'){
      imageObject.src = options.location;
    }
    if(options.function){
      imageObject.addEventListener('click',options.function);
    }
    if(options.style){
      imageObject.style = options.style;
    }
    get.appendChild(imageObject);
    return imageId;

  },

  dropdown : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ dropdown',log);

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.headerText){
      return common.error('not_found-options=>headerText');
    }

    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make dropdown
    let ddObjectId = options.parent + '-dropdown-' + options.id;
    let ddObject = document.createElement('div');
    ddObject.id = ddObjectId;
    ddObject.style = 'display:none';
    if(options.class){
      ddObject.className = options.class;
    }
    get.appendChild(ddObject);

    //make dropdown header cont
    let ddHeaderId = ddObjectId + '-header-cont';
    let ddHeaderObject = document.createElement('div');
    ddHeaderObject.id = ddHeaderId;
    if(options.headerContClass){
      ddHeaderObject.className = options.headerContClass;
    }
    ddObject.appendChild(ddHeaderObject);

      //make dropdown header text cont
      let ddHeaderTextContId = ddHeaderId + '-text-cont';
      let ddHeaderTextContObject = document.createElement('div');
      ddHeaderTextContObject.id = ddHeaderTextContId;
      if(options.headerTextContClass){
        ddHeaderTextContObject.className = options.headerTextContClass;
      }
      ddHeaderTextContObject.innerHTML = options.headerText;
      ddHeaderObject.appendChild(ddHeaderTextContObject);

      //make dropdown header action cont
      let ddHeaderActionContId = ddHeaderId + '-action-cont';
      let ddHeaderActionContObject = document.createElement('div');
      ddHeaderActionContObject.id = ddHeaderTextContId;
      if(options.headerActionContClass){
        ddHeaderActionContObject.className = options.headerActionContClass;
      }
      ddHeaderObject.appendChild(ddHeaderActionContObject);

        //make close button
        let ddCloseButtonId = ddHeaderActionContId + '-button-close';
        let ddCloseButtonObject = document.createElement('button');
        ddCloseButtonObject.id = ddCloseButtonId;
        ddCloseButtonObject.innerHTML = 'close';
        if(options.closeButtonClass){
          ddCloseButtonObject.className = options.closeButtonClass;
        }
        ddCloseButtonObject.addEventListener('click',()=>{
          engine.view.hide(ddObjectId);
        });
        ddHeaderActionContObject.appendChild(ddCloseButtonObject);

    return ddObjectId;

  },

  message : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ message',log);

    //check options array
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.message){
      return common.error('not_found-message||options');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //check if the message already exists
    let messageObjectId = options.parent + '-message-' + options.id;
    let checkMessage = document.getElementById(messageObjectId);
    if(checkMessage !== null){
      engine.view.show(messageObjectId);
      return true;
    }

    //make element
    let messageObject = document.createElement("div");
    messageObject.id = messageObjectId;
    messageObject.innerHTML = options.message;

    let activeTypes = [
      'info','warning','danger','success'
    ];

    if(
      !options.type ||
      options.type == null ||
      options.type == false ||
      options.type == undefined ||
      activeTypes.indexOf(options.type) < 0
    ){
      messageObject.className = 'message message-info';
    } else if (options.type == 'info'){
      messageObject.className = 'message message-info';
    } else if (options.type == 'warning'){
      messageObject.className = 'message message-warning';
    } else if (options.type == 'danger'){
      messageObject.className = 'message message-danger';
    } else if (options.type == 'success'){
      messageObject.className = 'message message-success';
    }

    if(options.text){
      messageObject.innerHTML = options.text;
    }
    if(options.style){
      messageObject.style = options.style;
    }
    //append message object
    get.appendChild(messageObject);

    //make message close button
    let closeButtonObjectId = messageObjectId + '-button-close';
    let closeButtonObject = document.createElement('button');
    closeButtonObject.id = closeButtonObjectId;
    //close button css
    if(options.closeButtonClass){
      closeButtonObject.className = options.closeButtonClass;
    } else {
      closeButtonObject.className = 'message-close-button';
    }
    //close button value
    if(options.closeButtonValue){
      closeButtonObject.innerHTML = options.closeButtonValue;
    } else {
      closeButtonObject.innerHTML = 'close';
    }
    //close button function
    function hide(){
      engine.view.remove(messageObjectId);
    }
    closeButtonObject.addEventListener('click',hide);
    //closeButtonObject.onclick = hide;
    //append close button to mesasage div object
    messageObject.appendChild(closeButtonObject);

    let timeOut = 5000;
    if(options.time){
      timeout = options.time * 1000;
    }

    setTimeout(function () {
      engine.view.hide(messageObjectId);
    }, timeOut);

    return messageObjectId;

  }

};

},{"../common":19,"./builder":25,"./check":26}],36:[function(require,module,exports){


module.exports = {

  get : function(){

    var
    path = document.URL,
    hasParams = /\?(.+?\=.+){1}/;

    var params;

    if (hasParams.test(path)) {

      params = {};

      path.split('?')[1].split('&').forEach(function(both){
        var e = both.split('=');
        params[e[0]] = e[1];
      });

      return params;

    } else {
      return null;
    }

  }

}

},{}],37:[function(require,module,exports){
const common = require('./common');
const log = false;

module.exports = {

  send : async function(options){

    common.tell('sending request',log);

    if(typeof(options) !== 'object'){
      return common.error('invalid_options');
    }
    if(!options.body || !options.url){
      return common.error('not_found-body/headers/url/method||options');
    }

    let build = {
      method:'get',
      body:JSON.stringify(options.body)
    };

    common.tell('build configured',log);

    if(options.method){
      build['method'] = options.method;
    }
    //add header content type tag if doent exists for wet platform
    if(options.headers){
      build['headers'] = (options.headers);
      if(!options.headers['Content-Type']){
        if(typeof(options.body) == 'object'){
          build['headers']['Content-Type'] = 'application/json';
        }
      }
    }
    if(!options.headers){
      if(typeof(options.body) == 'object'){
        build['headers'] = {
          'Content-Type': 'application/json'
        }
      }
    }

    function reponseProcessor(str){
      try {
        /*
        let object = JSON.parse(str);
        if(typeof(object) == 'object'){
            return object;
        } else {
          return str;
        }
        */
        return str.json();
      } catch (err) {
        return str;
      }
    }

    let worker = await fetch(options.url,build)
    .then((response)=>{
      //console.log(response);
      if(typeof(response) == 'string'){
        return reponseProcessor(response);
      } else {
        let data = response.json();
        return data;
      }
    })
    .catch((error)=>{
      common.error('request_error : ' + error);
      return common.error('failed-request');
    });

    common.tell('worker called',log);

    return worker;

  }

};

},{"./common":19}],38:[function(require,module,exports){
const common = require('./common');
const log = false;

const initWorker = require('./router/init');
const navWorker = require('./router/nav');
const getWorker = require('./router/get');
const setWorker = require('./router/set');

let active = {
  page:null,
  cont:null,
  panel:null
};

let built = {
  page:[],
  cont:[],
  panel:[],
  tab:[],
  comp:[]
};

let route = [];

let track = {
  cont:{},
  panel:{},
  tabs:{},
  comp:{}
};

module.exports= {

  //nav data
  active:active,
  built:built,
  route:route,
  track:track,

  //functions
  get : getWorker,
  set : setWorker,
  navigate : navWorker,
  init : initWorker

};

},{"./common":19,"./router/get":39,"./router/init":40,"./router/nav":41,"./router/set":42}],39:[function(require,module,exports){
const common = require('../common');
const log = false;

module.exports = {

  pageModule : function(pageName){

    common.tell('fetching pageModule',log);

    if(!pageName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName];
    }

  },

  contModule : function(pageName,contName){

    common.tell('fetching contModule',log);

    if(!pageName || !contName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName].contModules[contName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName].contModules[contName];
    }

  },

  panelModule : function(pageName,contName,panelName){

    common.tell('fetching panelModule',log);

    if(!pageName || !contName || !panelName){
      return common.error('not_found-inputs');
    }
    if(!window.pageModules[pageName].contModules[contName].panelModules[panelName]){
      return common.error('not_found-pageModule');
    } else {
      return window.pageModules[pageName].contModules[contName].panelModules[panelName];
    }

  },

  baseHref : function(){
    return window.baseHref;
  }

}

},{"../common":19}],40:[function(require,module,exports){
const common = require('../common');
const log = false;

function build(parent,type,mod,data,cls){

  common.tell('building router',log);

  //check parent
  let get = document.getElementById(parent);
  if(get == null){
    return common.error('invalid_parent : ' + parent);
  }

  //make router
  let router = document.createElement("div");

  if(type == 'comp'){
    router.id = parent + '-router-' + engine.uniqid() + '-' + type;
  } else {
    router.id = parent + '-router-' + type;
  }

  if(cls){
    router.className = cls;
  }

  let routerApp = require('../router');

  //append router
  get.appendChild(router);
  if(mod && type == 'comp'){
    routerApp.track.comp[router.id] = router.id + mod.ref;
    routerApp.built.comp.push(router.id + mod.ref);
    mod.init(router.id,data);
  }
  return router.id;

}

module.exports = {

  conts : function(parent,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'cont',null,null,cls);
  },

  panels : function(parent,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'panel',null,null,cls);
  },

  comps : function(parent,mod,data,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'comp',mod,data,cls);
  }

};

},{"../common":19,"../router":38}],41:[function(require,module,exports){
const common = require('../common');
const log = false;

function toWorker(app,type,reset,routerId,data){

  //other modules
  let router = require('../router');
  let view = require('../view');

  //catalogs
  let active = router.active;
  let built = router.built;
  let route = router.route;
  let track = router.track;

  //check if there is a initiated page heres
  if(type == 'page'){
    if(active[type] == null){
      return common.error('no_page_initiated_from_app_starter');
    }
  }

  //security checks
  if(app == null || app == undefined){
    return common.error('not_found-app');
  }
  if(app.ref == null || app.ref == undefined){
    return common.error('invalid_app');
  }
  if(type == 'comp'){
    if(!routerId){
      return common.error('not_found-routerId');
    }
  }

  //set ref here
  let toId;
  if(type == 'page'){
    toId = app.ref;
  } else if(type == 'cont'){
    toId = active.page + '-router-cont' + app.ref;
  } else if(type == 'panel'){
    toId = track.cont[active.page] + app.ref;
  } else if(type == 'comp'){
    toId = routerId + app.ref;
  }

  if(reset == true){
    if(document.getElementById(toId)){
      document.getElementById(toId).remove();
    }
    if(track['comp'][routerId]){
      document.getElementById(track['comp'][routerId]).remove();
    }
    let toIdPos = built[type].indexOf(toId);
    built[type].splice(toIdPos, 1);
  }

  //hide the current app
  if(reset == false){
    if(type == 'page'){
      view.hide(active[type]);
    } else if(type == 'cont'){
      view.hide(track.cont[active.page + '-router-cont']);
    } else if(type == 'panel'){
      let active_cont = track.cont[active.page + '-router-cont'];
      view.hide(track.panel[active_cont]);
    } else if(type == 'comp'){
      view.hide(track['comp'][routerId]);
    }
  }

  //update track catalog with toId
  if(type == 'page'){
    active[type] = toId;
  } else if(type == 'cont'){
    track.cont[active.page + '-router-cont'] = toId;
  } else if(type == 'panel'){
    let active_cont = track.cont[active.page + '-router-cont'];
    track.panel[active_cont] = toId;
  } else if(type == 'comp'){
    track.comp[routerId] = toId;
  }

  //already built the app
  if(built[type].indexOf(toId) >= 0){
    view.show(toId);
  }

  //app not built yet
  if(built[type].indexOf(toId) < 0){

    //initiate app
    if(type == 'page'){
      app.init(data);
    } else if(type == 'cont'){
      app.init(active.page + '-router-cont',data);
    } else if(type == 'panel'){
      app.init(track.cont[active.page],data);
    } else if(type == 'comp'){
      app.init(routerId,data);
    }

    if(type == 'comp'){
      built[type].push(toId);
    }

  }

  route.push(toId);           //push appId to route catalog
  return true;

}

module.exports = {

  to : {
    page : function(app,data){
      return toWorker(app,'page',false,null,data);
    },
    cont : function(app,data){
      return toWorker(app,'cont',false,null,data);
    },
    panel : function(app,data){
      return toWorker(app,'panel',false,null,data);
    },
    comp : function(app,data,routerId){
      return toWorker(app,'comp',false,routerId,data);
    }
  },

  new : {
    page : function(app,data){
      return toWorker(app,'page',true,null,data);
    },
    cont : function(app,data){
      return toWorker(app,'cont',true,null,data);
    },
    panel : function(app,data){
      return toWorker(app,'panel',true,null,data);
    },
    comp : function(app,data,routerId){
      return toWorker(app,'comp',true,routerId,data);
    }
  }

}

},{"../common":19,"../router":38,"../view":47}],42:[function(require,module,exports){
const common = require('../common');
const log = false;

module.exports = {

  pageModule : function(pageName,controller){

    common.tell('activating pageModule : ' + controller.pageName,log);

    if(!pageName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName] = controller;
    window.pageList[pageName] = 'onboard';

    return true;

  },

  contModule : function(pageName,contName,controller){

    common.tell('activating contModule : ' + controller.contName,log);

    if(!pageName || !contName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName] = controller;
    window.pageModules[pageName].contList[contName] = 'onboard';

    return true;

  },

  panelModule : function(pageName,contName,panelName,controller){

    common.tell('activating panelModule : ' + panelName,log);

    if(!pageName || !contName || !panelName || !controller){
      return common.error('not_found-inputs');
    }
    if(typeof(controller) !== 'object'){
      return common.error('invalid-controller');
    }

    window.pageModules[pageName].contModules[contName].panelModules[panelName] = controller;
    window.pageModules[pageName].contModules[contName].panelList[panelName] = 'onboard';

    return true;

  },

  baseHref : function(url){

    common.tell('activating baseHref',log);

    let location;
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let port = window.location.port;

    if(typeof(url) == 'string'){
      if(port){
        location = protocol + '//' + host + ':' + port + '/' + url;
      } else {
        location = protocol + '//' + host + '/' + url;
      }
    } else {
      if(port){
        location = protocol + '//' + host + ':' + port + '/';
      } else {
        location = protocol + '//' + host + '/';
      }
    }

    window.baseHref = location;

    return true;

  }

};

},{"../common":19}],43:[function(require,module,exports){
const common = require('./common');
const log = false;

module.exports = {

  check : function(){
    common.tell('checking-session',log);
    if(!sessionStorage.token){
      return false;
    } else {
      return true;
    }
  },

  start : function(token,user){
    common.tell('starting-session',log);
    if(typeof(user) == 'object'){
      user = JSON.stringify(user);
    }
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',user);
    this.token = token;
    this.user = user;
    return true;
  },

  end : function(){
    common.tell('ending-session',log);
    sessionStorage.clear();
    this.token = null;
    this.uid = null;
    return true;
  },

  token : sessionStorage.getItem('token'),
  user : sessionStorage.getItem('user')

};

},{"./common":19}],44:[function(require,module,exports){
const common = require('./common');
const log = false;

module.exports = {

  pageTitle : function(title){

    common.tell('setting pageTitle',log);

    if(typeof(title) !== 'string'){
      return common.error('invalid-title-data_type');
    }

    document.title = title;
    return true;

  },

  input : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return common.error('invalid-parent');
      }
      get.value = value;
      return true;
    }

  },

  div : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return common.error('invalid-parent');
      }
      get.innerHTML = value;
      return true;
    }

  }

}

},{"./common":19}],45:[function(require,module,exports){


module.exports = {

  now : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return d.getTime();
  },

  date : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return d.getDate();
  },

  month : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getMonth() + 1);
  },

  year : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getFullYear());
  },

  day : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getDay() + 1);
  },

  diff : {

    days : function(time1,time2){

      let
      aHold = new Date(time1),
      bHold = new Date(time2),
      a,b;

      a = {
        day:aHold.getDate(),
        month:aHold.getMonth(),
        year:aHold.getFullYear(),
        hour:aHold.getHours(),
        minutes:aHold.getMinutes(),
        seconds:aHold.getSeconds()
      };

      b = {
        day:bHold.getDate(),
        month:bHold.getMonth(),
        year:bHold.getFullYear(),
        hour:bHold.getHours(),
        minutes:bHold.getMinutes(),
        seconds:bHold.getSeconds()
      };

      let base = 0;

      //check if same year
      if(a.year !== b.year){
        let yearDiff = b.year - a.year;
        base += yearDiff * 365;
      }

      //check month
      if(a.month !== b.month){
        let monthDiff = b.month - a.month;
        base += monthDiff * 30;
      }

      //check days
      if(a.day !== b.day){
        let dayDiff = b.day - a.day;
        if(dayDiff > 0){
          base += dayDiff;
        }
      }

      if(base > 0){
        return base;
      }

      //check hours
      if(a.hour !== b.hour){
        let hourDiff = b.hour - a.hour;
        base += hourDiff / 100;
      }

      return base;

    }

  }

};

},{}],46:[function(require,module,exports){
const common = require('./common');

module.exports = {
  json:json,
  email:checkEmail
};

function json(schema,data,type,maxSize){

  //if no type or maxSize is given static type and max size of 21 is automatically assumed
  if(!type){type == 'static'}
  if(type == 'dynamic' && !maxSize){maxSize = 21;}

  //check schema
  if(!schema || typeof(schema) !== 'object' || Object.keys(schema).length == 0){
    return common.error('not_found-valid_schema');
  }

  //check data
  if(!data || typeof(data) !== 'object' || Object.keys(data).length == 0){
    return common.error('not_found-valid_data');
  }

  let keys_schema = Object.keys(schema);
  let keys_data = Object.keys(data);

  //check size of both objects
  if(type == 'static' && keys_schema.length !== keys_data.length){
    return common.error('miss_matched-object_size');
  }

  //check data object keys size if maxSize property is set
  if(type == 'dynamic' && maxSize){
    if(keys_data.length > maxSize){
      return common.error('max_limit_reached-data_size');
    }
  }

  //add any further data types first
  let dataTypes = ['object','array','string','number','email','boolean'];

  const defaultStrLen = 255;

  //loop the schema and check the data
  for(var i=0;i<keys_schema.length;i++){

    let key = keys_schema[i];
    let item = schema[key];

    //check shcema item type
    if(typeof(item) !== 'object'){
      return common.error('invalid-schema_item_type-' + key);
      break;
    }

    //check if schema item have been declared
    if(!item.type || dataTypes.indexOf(item.type) < 0){
      return common.error('not_found/invalid-schema_item_type-' + key);
      break;
    }

    let
    type = item.type,
    needed = true,
    present = false;

    //check if the item is elective
    if(item.elective && item.elective == true){
      needed = false;
    }

    //check if schema key exists in data
    if(needed == true && data.hasOwnProperty(key) == false){
      return common.error('not_found-schema_key_in_data-' + key);
      break;
    }

    //check if static data exists
    if(needed == true && data[key]){
      present = true;
    }

    //check if elective data exists
    if(needed == false && data[key]){
      present = true;
    }

    //check if data type is valid
    if(present == true && type !== 'email' && checkType(data[key]) !== type){
      return common.error('invalid-data_type_for_key-' + key);
      break;
    }

    //check the array and string length for schema key in data
    if(type == 'array' || type == 'string' && present == true){

      if(item.min && data[key].length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key].length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      } else if(type == 'string' && data[key].length > defaultStrLen){
        return common.error('deafult_max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check the number for schema key in data
    if(type == 'number' && present == true){

      if(item.min && data[key] < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key] > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check the object key size for schema key in data
    if(type == 'object' && present == true){

      if(item.min && Object.keys(data[key]).length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check email and email string length for schema key in data
    if(type == 'email' && present == true){

      if(checkType(data[key]) !== 'string'){
        return common.error('invalid-schema_key_in_data-' + key);
        break;
      }

      if(item.min && Object.keys(data[key]).length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(checkEmail(data[key]) == false){
        return common.error('invalid-email_key-' + key);
        break;
      }

    }

  }
  //loop ends here

  //final functional return
  return true;

}

function checkType(data){

  if(typeof(data) == 'object'){

    if(Object.keys(data).length == 0){
      return 'object';
    }

    if(!data.length){
      return 'object';
    } else if(data.length > 0){
      return 'array';
    }

  } else {
    return typeof(data);
  }

}

function checkEmail(mail){

  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let test = re.test(String(mail).toLowerCase());

  if(test == true){
    return true;
  } else {
    return false;
  }

}

},{"./common":19}],47:[function(require,module,exports){
const common = require('./common');
const log = false;
const router = require('./router');
const loaders = require('./view/loader_index');

function hide(id){
  common.tell('hiding_div : ' + id,log);
  let get = document.getElementById(id);
  if(get == null){
    return common.error('div_not_found');
  }
  get.style.display = 'none';
  return id;
}

function show(id){
  common.tell('showing div : ' + id,log);
  let get = document.getElementById(id);
  if(get == null){
    return common.error('div_not_found');
  }
  get.style.display = 'block';
  return id;
}

function remove(id){
  common.tell('showing div : ' + id,log);
  let get = document.getElementById(id);
  if(get == null){
    return common.error('div_not_found');
  }
  get.remove();
  return true;
}

module.exports= {

  hide : hide,
  show : show,
  remove : remove, 

  loader : {
    page:{
      start:loaders.page.start,
      stop:loaders.page.stop
    },
    cont:{
      start:loaders.cont.start,
      stop:loaders.cont.stop
    },
    panel:{
      start:loaders.panel.start,
      stop:loaders.panel.stop
    },
  }

};

},{"./common":19,"./router":38,"./view/loader_index":49}],48:[function(require,module,exports){
const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the active page here

    let page = router.active.page;

    //make the router ref

    let routerRef = page + '-router-cont';
    let loaderRef = page + '-loader-cont';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
    }

    //hide the router ref
    checkRouter.style.display = 'none';

    //show the loader ref
    checkLoader.style.display = 'block';

    //return
    return true;

  },

  stop : function(){

    common.tell('page loader stopped',log);

    //get the active page here

    let page = router.active.page;

    //make the router ref

    let routerRef = page + '-router-cont';
    let loaderRef = page + '-loader-cont';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
    }

    //hide the loader ref
    checkRouter.style.display = 'block';

    //show the router ref
    checkLoader.style.display = 'none';

    //return
    return true;

  }

};

},{"../common":19,"../router":38}],49:[function(require,module,exports){
const cont = require('./loader_cont');
const page = require('./loader_page');
const panel = require('./loader_panel');

module.exports= {
  cont:cont,
  page:page,
  panel:panel
};

},{"./loader_cont":48,"./loader_page":50,"./loader_panel":51}],50:[function(require,module,exports){
const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the page workers here

    let routerRef = 'page-router';
    let loaderRef = 'page-loader';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
    }

    //hide the router ref
    checkRouter.style.display = 'none';

    //show the loader ref
    checkLoader.style.display = 'block';

    //return
    return true;

  },

  stop : function(){

    common.tell('stopping page loader',log);

    //get the page workers here

    let routerRef = 'page-router';
    let loaderRef = 'page-loader';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
    }

    //hide the loader ref
    checkRouter.style.display = 'block';

    //show the router ref
    checkLoader.style.display = 'none';

    //return
    return true;

  }

};

},{"../common":19,"../router":38}],51:[function(require,module,exports){
const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the active cont here

    let cont = router.active.cont;

    //make the router ref

    let routerRef = cont + '-router-panel';
    let loaderRef = cont + '-loader-panel';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_panel_router_loader');
    }

    //hide the router ref
    checkRouter.style.display = 'none';

    //show the loader ref
    checkLoader.style.display = 'block';

    //return
    return true;

  },

  stop : function(){

    common.tell('page loader stopped',log);

    //get the active page here

    let cont = router.active.cont;

    //make the router ref

    let routerRef = cont + '-router-panel';
    let loaderRef = cont + '-loader-panel';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_panel_router_loader');
    }

    //hide the loader ref
    checkRouter.style.display = 'block';

    //show the router ref
    checkLoader.style.display = 'none';

    //return
    return true;

  }

};

},{"../common":19,"../router":38}],52:[function(require,module,exports){
const common = require('./common');
const request = require('./request');

var address = null;

async function query(options){

  if(engine.session.check() == false){
    return common.error('not_found-session');
  }
  if(typeof(options) !== 'object'){
    return common.error('invalid_options');
  }

  let token = engine.session.token;

  if(options){
    if(typeof(options) == 'object'){
      if(!options.url){
        return common.error('not_found-url=>options');
      }
      if(!options.body){
        return common.error('not_found-body=>options');
      }
      if(options.headers){
        if(typeof(options.headers) !== 'object'){
          options.headers['td-wet-token'] = token;
        } else {
          options.headers = {
            'td-wet-token':token
          };
        }
      } else {
        options.headers = {
          'td-wet-token':token
        };
      }
    }
  }

  let worker = await request.send(options);
  if(worker == false){
    return common.error('failed-wet_query');
  }
  return worker;

}

module.exports = {

  address:address,

  api:{

    get : function(){
      return address;
    },

    set : function(url){
      address = url;
      return true;
    },

    query : async function(options){
      if(address == null){
        return common.error('please set the api address first');
      }
      if(!options){
        return common.error('not_found-options');
      }
      if(options){
        if(options.at){
          options.url = address + options.at;
          let result = await query(options);
          if(result == false){
            return common.error('failed-wet_api_query');
          } else {
            return result;
          }
        } else {
          return common.error('not_found-options=>at');
        }
      }
      return common.error('invalid-options');
    }

  },

  query : query

};

},{"./common":19,"./request":37}]},{},[11]);
