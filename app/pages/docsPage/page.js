//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-docs";
const pageName = 'docsPage';

const blockComp = require('./comps/blockComp/comp');
const articleComp = require('./comps/articleComp/comp');

let navCont,routerCont,contRouter;

//init page
const init = (is_new) => {
  engine.make.init.page(pageId,"page");  //init page
  build(is_new);                               //start build
}

const trackers = {
  title:'Vegana Docs',
  meta:[
    {
      name:'keywords',
      content:'vegana,docs,tutorial,introduction'
    },
    {
      name:'description',
      content:'Vegana framework docs help new and old users to learn how to use vegana apis to build a ui based app for web and other native platforms.'
    }
  ]
};

//build page
function build(is_new){

  engine.add.comp('block',blockComp);
  engine.add.comp('articleComp',articleComp);

  engine.global.comp.menuComp.init(pageId);
  make(is_new);
  //footerComp.init(pageId);
  return true;

}

function make(is_new){

    navCont = engine.make.div({
      id:'nav',
      parent:pageId,
      class:'docs-page-nav-cont'
    });

      contRouter = engine.router.init.conts(pageId,'page-docs-router-cont');

      const introduction = require('./conts/introductionCont/cont');
      if(!is_new){
        introduction.init(contRouter);
      }

      const nav_cont = engine.make.div({
        parent:pageId,
        class:'page-docs-nav'
      });

    engine.global.function.loader().show();

    setTimeout(function () {
      let natives = engine.params.native.get();
      engine.global.function.loader().hide();
      if(natives.cont){
        make_side_nav(nav_cont,natives.cont);
      } else {
        make_side_nav(nav_cont,'introductionCont');
      }
    }, 500);

}

function make_side_nav(p,active){

  const cont = engine.make.div({
    parent:p,
    //class:'page-docs-nav'
  });

    for(let b in tree){
      let a = false;
      if(tree[b].cont == active){
        a = true;
      }
      make_box(cont,tree[b],a,p);
    }

}

function make_box(p,box,active,sup){

  const this_box = engine.make.div({
    parent:p,
    class:'page-docs-nav-box'
  });

    let tag_text = box.tag;
    if(!active){
      tag_text += ' &#8681;';
    }

    engine.make.div({
      parent:this_box,
      class:'page-docs-nav-box-tag',
      text:tag_text,
      function:async ()=>{
        engine.global.to_panel = false;
        await engine.global.function.toLazyCont('docsPage',box.cont);
        engine.view.remove(p);
        make_side_nav(sup,box.cont);
      }
    });

    if(!active){
      return;
    }

    const panels = engine.make.div({
      parent:this_box,
      class:'page-docs-nav-box-panels',
    });

    for(let p of box.panels){

      engine.global.function.makeAButton({
        parent:panels,
        class:'page-docs-nav-box-panel',
        text:p.tag,
        type:'local',
        page:'docsPage',
        cont:box.cont,
        panel:p.mod
      });

    }

}

const tree = {
  introduction:{
    tag:'introduction',
    cont:'introductionCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'installtion',mod:'installationPanel'},
      {tag:'document structure',mod:'document-treePanel'}
    ]
  },
  cli:{
    tag:'cli',
    cont:'cliCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'init',mod:'initPanel'},
      {tag:'serve',mod:'servePanel'},
      {tag:'generate',mod:'generatePanel'},
      {tag:'build',mod:'buildPanel'},
      {tag:'founder',mod:'founderPanel'},
      {tag:'help',mod:'helpPanel'},
    ]
  },
  make:{
    tag:'make',
    cont:'makeCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'div',mod:'divPanel'},
      {tag:'list',mod:'listPanel'},
      {tag:'image',mod:'imagePanel'},
      {tag:'input',mod:'inputPanel'}
    ]
  },
  router:{
    tag:'router',
    cont:'routerCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'pages',mod:'pagesPanel'},
      {tag:'conts',mod:'contsPanel'},
      {tag:'panels',mod:'panelsPanel'},
      {tag:'comps',mod:'compsPanel'}
    ]
  },
  loader:{
    tag:'loader',
    cont:'loaderCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'load',mod:'loadPanel'},
      {tag:'css',mod:'cssPanel'},
      {tag:'hooks',mod:'hooksPanel'}
    ]
  },
  request:{
    tag:'request',
    cont:'requestCont',
    panels:[
      {tag:'send',mod:'sendPanel'},
    ]
  },
  binder:{
    tag:'binder',
    cont:'binderCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'hover',mod:'hoverPanel'},
      {tag:'click',mod:'clickPanel'},
      {tag:'files',mod:'filesPanel'},
      {tag:'text',mod:'textPanel'},
      {tag:'number',mod:'numberPanel'},
      {tag:'value',mod:'valuePanel'},
      {tag:'active',mod:'activePanel'},
      {tag:'boolean',mod:'booleanPanel'},
    ]
  },
  add:{
    tag:'add',
    cont:'addCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'object',mod:'objectPanel'},
      {tag:'function',mod:'functionPanel'},
      {tag:'comp',mod:'compPanel'}
    ]
  },
  common:{
    tag:'common',
    cont:'commonCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'tell',mod:'tellPanel'},
      {tag:'error',mod:'errorPanel'}
    ]
  },
  data:{
    tag:'data',
    cont:'dataCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'get',mod:'getPanel'},
      {tag:'set',mod:'setPanel'},
      {tag:'reset',mod:'resetPanel'}
    ]
  },
  get:{
    tag:'get',
    cont:'getCont',
    panels:[
      {tag:'page',mod:'pagePanel'},
      {tag:'cont',mod:'contPanel'},
      {tag:'panel',mod:'panelPanel'},
      {tag:'body',mod:'bodyPanel'}
    ]
  },
  meta:{
    tag:'meta',
    cont:'metaCont',
    panels:[
      {tag:'add',mod:'addPanel'},
      {tag:'update',mod:'updatePanel'},
      {tag:'delete',mod:'deletePanel'}
    ]
  },
  params:{
    tag:'params',
    cont:'paramsCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'get',mod:'getPanel'},
      {tag:'add',mod:'addPanel'},
      {tag:'delete',mod:'deletePanel'},
      {tag:'native',mod:'nativePanel'}
    ]
  },
  set:{
    tag:'set',
    cont:'setCont',
    panels:[
      {tag:'title',mod:'titlePanel'},
      {tag:'input',mod:'inputPanel'},
      {tag:'div',mod:'divPanel'}
    ]
  },
  validate:{
    tag:'validate',
    cont:'validateCont',
    panels:[
      {tag:'introduction',mod:'introductionPanel'},
      {tag:'json',mod:'jsonPanel'},
      {tag:'email',mod:'emailPanel'}
    ]
  },
  view:{
    tag:'view',
    cont:'viewCont',
    panels:[
      {tag:'hide',mod:'hidePanel'},
      {tag:'show',mod:'showPanel'}
    ]
  }
};

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:trackers
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
