//import page which you want to load in the main bundle/ at the beggning of the app
const homePage = require('./pages/homePage/page');

//declare the firest page module here
const startPage = homePage;
const baseHref = null;

//------------------------------------------------------------------------------
//dont fuck with anything below

engine.router.set.baseHref(baseHref);

if(engine.router.active.page == null){
  loadPage();
}

function loadPage(){
  engine.router.active.page = startPage.ref;
  engine.router.built.page.push(startPage.ref);
  startPage.init();
}
