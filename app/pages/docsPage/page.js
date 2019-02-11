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
