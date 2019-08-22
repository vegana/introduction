//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-community";
const pageName = 'communityPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  engine.global.comp.menuComp.init(pageId);

  engine.global.comp.footerComp.init(pageId);

  return true;

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
