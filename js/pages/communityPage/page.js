(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-community";
const pageName = 'communityPage';

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

  menuComp.init(pageId);

  engine.set.pageTitle('Vegana Community || Forum');

  engine.make.div({
    id:"message",
    parent:pageId,
    class:'community-page-message',
    text:'Community is Coming Soon.'
  });

  footerComp.init(pageId);

  //import conts when required to build required objects faster

  return true; //always return after the build completes

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
