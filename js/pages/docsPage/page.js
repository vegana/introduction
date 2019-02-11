(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-block';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var holder;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  if(!data || typeof(data) !== 'object'){
    return engine.common.error('invalid-data_type-block_comp');
  }

  holder = data;
  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

let blockCont,leftCont,rightCont;

//build the dom for comp here
function build(){

  blockCont = engine.make.div({
    id:engine.uniqid(),
    parent:compId,
    class:'block-cont'
  });

    leftCont = engine.make.div({
      id:'left',
      parent:blockCont,
      class:'block-left-cont'
    });

      //title
      if(holder.title && typeof(holder.title) == 'string'){
        engine.make.div({
          id:'title',
          parent:leftCont,
          class:'block-left-title',
          text:holder.title
        });
      }

      //para
      if(holder.para && typeof(holder.para) == 'string'){
        engine.make.div({
          id:'para',
          parent:leftCont,
          class:'block-left-para',
          text:holder.para
        });
      }

      //table
      if(holder.table && typeof(holder.table) == 'object'){
        table(holder.table);
      }

    //example
    if(holder.example && typeof(holder.example) == 'object'){
      rightCont = engine.make.div({
        id:engine.uniqid(),
        parent:blockCont,
        class:'block-right-cont',
        text:'<pre>' + JSON.stringify(holder.example,null,2) + '</pre>'
      });
    }

}
//build ends here

function table(data){

  let cont = engine.make.div({
    id:'table',
    parent:leftCont,
    class:'block-table-cont'
  });

    for(var i=0;i<data.length;i++){

      let hold = data[i];

      let row = engine.make.div({
        id:'row-' + engine.uniqid(),
        parent:cont,
        class:'block-row-cont'
      });

      for(var j=0;j<hold.length;j++){

        engine.make.div({
          id:engine.uniqid(),
          parent:row,
          class:'block-row-coloum',
          text:hold[j]
        });

      }
      //coloum loop

    }
    //main loop

}
//table function ends here

module.exports = {init:init,ref:compRef,type:type}

},{}],4:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-para';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var para;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  para = data;
  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  engine.make.div({
    id:"para-" + engine.uniqid(),
    parent:compId,
    class:'article-para',
    text:para
  });

}

module.exports = {init:init,ref:compRef,type:type}

},{}],5:[function(require,module,exports){
//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-title';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var title;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  title = data;
  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  engine.make.div({
    id:"title-" + engine.uniqid(),
    parent:compId,
    class:'article-title',
    text:title
  });

}

module.exports = {init:init,ref:compRef,type:type}

},{}],6:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-introduction';
const pageName = 'docsPage';
const contName = 'introductionCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

//build the cont dom here
function build(){

  engine.global.comp.title.init(contId,
    'Welcome to the community.'
  );

  engine.global.comp.para.init(contId,
    'Vegana is a js framework for single page web apps and use native Nodejs enviorment for development, ' +
    'to get a better sense of the enviorments features you must take the following course in full. ' +
    'Before getting started the developer must posses basic knowledge of Javascript,Sass,Css and Html.'
  );

}

//do not change current exports you are free to add your own though.
const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{}
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;

},{}],7:[function(require,module,exports){
//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-docs";
const pageName = 'docsPage';

const menuComp = require('../comps/menuComp/comp');
const footerComp = require('../comps/footerComp/comp');

const blockComp = require('./comps/blockComp/comp');
const paraComp = require('./comps/paraComp/comp');
const titleComp = require('./comps/titleComp/comp');

let navCont,routerCont,contRouter;

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  engine.add.comp('block',blockComp);
  engine.add.comp('title',titleComp);
  engine.add.comp('para',paraComp);

  engine.set.pageTitle('Vegana Book || Learn Vegana || Docs Latest');
  menuComp.init(pageId);
  make();
  //footerComp.init(pageId);
  return true;

}

function make(){

    navCont = engine.make.div({
      id:'nav',
      parent:pageId,
      class:'docs-page-nav-cont'
    });

      contRouter = engine.router.init.conts(pageId,'docs-page-router-cont');

      const introduction = require('./conts/introductionCont/cont');
      introduction.init(contRouter);

    make_nav_two(test_data_nav_two);

}

let test_data_nav_two = {
  title:{
    tag:'introduction',
    cont:'introductionCont'
  },
  sub:[
    {tag:'Installation',cont:'installCont'},
    {tag:'Vegana CLI',cont:'clineCont'},
    {tag:'New Project',cont:'newProjectCont'},
    {tag:'Serve Project',cont:'serveCont'},
    {tag:'Build Project',cont:'buildCont'}
  ]
};

function route(cont){

  if(!engine.get.contModule(pageName,cont)){

    engine.loader.load.cont(pageName,cont)
    .then(()=>{
      console.log('loaded');
      engine.router.navigate.to.cont(engine.get.contModule(pageName,cont));
    })
    .catch((error)=>{
      console.log(error);
    });

  } else {
    engine.router.navigate.to.cont(engine.get.contModule(pageName,cont));
  }

}

function make_nav_two(data){

  let cont = engine.make.div({
    id:engine.uniqid(),
    parent:navCont,
    class:'docs-page-nav-sub-2-cont'
  });

    engine.make.div({
      id:engine.uniqid(),
      parent:cont,
      class:'docs-page-nav-sub-2-title',
      text:data.title.tag,
      function:()=>{
        route(data.title.cont);
      }
    });

    let subCont = engine.make.div({
      id:engine.uniqid(),
      parent:cont,
      class:'docs-page-nav-sub-2-sub-cont'
    });

      for(var i=0;i<data.sub.length;i++){

        let sub = data.sub[i];

        engine.make.div({
          id:engine.uniqid(),
          parent:subCont,
          class:'docs-page-nav-sub-2-sub-tag',
          text:sub.tag,
          function:()=>{
            route(sub.cont);
          }
        });

      }

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

},{"../comps/footerComp/comp":1,"../comps/menuComp/comp":2,"./comps/blockComp/comp":3,"./comps/paraComp/comp":4,"./comps/titleComp/comp":5,"./conts/introductionCont/cont":6}]},{},[7]);
