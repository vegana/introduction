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
