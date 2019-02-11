(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-about";
const pageName = 'aboutPage';

const menuComp = require('../comps/menuComp/comp');
const footerComp = require('../comps/footerComp/comp');

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  engine.common.tell('building',log);

  engine.set.pageTitle('About Vegana || A brief introduction to Vegana');

  menuComp.init(pageId);

  body();

  footerComp.init(pageId);

  return true; //always return after the build completes

}

function body(){

  let intro = engine.make.div({
    id:'intro',
    parent:pageId,
    class:'about-page-cont'
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
      location:'assets/images/logo.png'
    });

  let textCont = engine.make.div({
    id:'text',
    parent:intro,
    class:'about-page-text-cont'
  });

    engine.make.div({
      id:'title',
      parent:textCont,
      class:'about-page-title-cont',
      text:'About || Brief Introduction'
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
      class:'about-page-para-cont',
      text:para
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

},{"../comps/footerComp/comp":2,"../comps/menuComp/comp":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
