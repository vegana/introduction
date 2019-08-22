const homePage = require('./pages/homePage/page');
const startPage = homePage;
const baseHref = null;

const supers = require('./supers');
supers.init();

const menuComp = require('./pages/homePage/comps/menuComp/comp');
const footerComp = require('./pages/homePage/comps/footerComp/comp');
const loaderComp = require('./pages/homePage/comps/loaderComp/comp');
const messageComp = require('./pages/homePage/comps/messageComp/comp');

loaderComp.init('page-router');

engine.add.comp('menuComp',menuComp);
engine.add.comp('footerComp',footerComp);
engine.add.comp('messageComp',messageComp);

engine.router.set.baseHref(baseHref);

run();
async function run(){

  let natives = engine.params.native.get();

  let found = false;
  if(natives.page || natives.cont || natives.panel){
    if(natives.page == 'homePage'){
      if(natives.cont){
        found = true;
      }
    } else {
      found = true;
    }
    if(natives.panel){
      engine.global.to_panel = true;
    }
  }

  if(!found){
    startPage.init();
    return true;
  }

  if(natives.page && !natives.cont && !natives.panel){
    if(natives.page == 'homePage'){
      if(engine.session.check()){
        await engine.global.function.toLazyPage(natives.page,natives.params);
      }
    } else {
      await engine.global.function.toLazyPage(natives.page,natives.params);
    }
  }
  if(natives.page && natives.cont && !natives.panel){
    await engine.global.function.toLazyCont(natives.page,natives.cont,natives.params);
  }
  if(natives.page && natives.cont && natives.panel){
    await engine.global.function.toLazyPanel(natives.page,natives.cont,natives.panel,natives.params);
  }
  engine.params.add(natives.params);

}
