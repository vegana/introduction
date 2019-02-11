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
