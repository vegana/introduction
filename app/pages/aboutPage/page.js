//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-about";
const pageName = 'aboutPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  engine.global.comp.menuComp.init(pageId);

  body();

  engine.global.comp.footerComp.init(pageId);

  return true;

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
