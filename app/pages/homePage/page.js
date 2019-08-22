const log = false;
const type = 'page';

const pageId = "page-home";
const pageName = 'homePage';

const init = () => {
  engine.make.init.page(pageId,"page");
  build();
}

async function build(){

  engine.global.comp.menuComp.init(pageId);

  const intro = require('./comps/introComp/comp');
  intro.init(pageId);

  engine.make.div({
    id:'featuresTitle',
    parent:pageId,
    class:'home-page-features-page-title',
    text:'Features'
  });

  const featuresCont = engine.make.div({
    id:'features',
    parent:pageId,
    class:'home-page-features-cont'
  });

    feature(featuresCont,{
      id:'cli',
      image:'assets/images/cli.png',
      title:'Node js Cli',
      comment:'Native Node js Cli makes development and code management easy.'
    });

    feature(featuresCont,{
      id:'documents',
      image:'assets/images/lazy.png',
      title:'Defined Components Structure',
      comment:'Vegana components Structure reduces overall bundle size increases loading times upto 100%, easy code management and usefull for giant teams.'
    });

    feature(featuresCont,{
      id:'read',
      image:'assets/images/read.png',
      title:'Code Redability',
      comment:'Defined components structure makes the code super easy to understand for new devs.'
    });

    feature(featuresCont,{
      id:'sass',
      image:'assets/images/sass.png',
      title:'Native Sass Support',
      comment:'Sass is implimented without any document structure thank me later for it.'
    });

    feature(featuresCont,{
      id:'html',
      image:'assets/images/html.png',
      title:'Native Dom Elements',
      comment:'Only JS HTML elements makes demelopment faster and minimizes code, making development faster.'
    });

    feature(featuresCont,{
      id:'tools',
      image:'assets/images/tools.png',
      title:'Native tools for Api, Auth and Local Database.',
      comment:'Native tools makes Auth , Api calls ,Local Data Management and lots other super easy, just try it.'
    });

  const tags = require('./comps/tagsComp/comp');
  tags.init(pageId);

  engine.global.comp.footerComp.init(pageId);

}

function feature(p,data){

  const holder = engine.make.div({
    id:data.id,
    parent:p,
    class:'home-page-feature-cont'
  });

  const cont = engine.make.div({
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

    const imageCont = engine.make.div({
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

const pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{}
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
