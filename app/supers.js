module.exports = {init:init};

function init(){

  for(let f in functions){
    engine.add.function(f,functions[f]);
  }

  return true;

}

const functions = {

  makeAButton: async (data)=>{

    let make_a = {
      parent:data.parent,
      class:data.class,
      text:data.text,
      style:'padding-top:1vh;'
    };

    if(data.page){
      make_a.type = 'local';
      make_a.page = data.page;
      make_a.cont = data.cont;
      make_a.panel = data.panel;
    }

    if(data.href){
      make_a.type = 'url';
      make_a.href = data.href;
    }

    let href = engine.make.a(make_a);
    if(data.href){
      return true;
    }

    engine.view.hide(href);

    let button = engine.make.button({
      parent:data.parent,
      class:data.class,
      value:data.text,
      function:()=>{
        if(data.page && data.cont && data.panel){
          engine.global.function.toLazyPanel(data.page,data.cont,data.panel,data.data);
        } else if(data.page && data.cont && !data.panel){
          engine.global.function.toLazyCont(data.page,data.cont,data.data);
        } else if(data.page && !data.cont && !data.panel){
          engine.global.function.toLazyPage(data.page,data.data);
        }
      }
    });

    let mod;
    if(data.page && data.cont && data.panel){
      mod = await engine.global.function.loadLazyPanel(data.page,data.cont,data.panel,data.data);
    } else if(data.page && data.cont && !data.panel){
      mod = await engine.global.function.loadLazyCont(data.page,data.cont,data.data);
    } else if(data.page && !data.cont && !data.panel){
      mod = await engine.global.function.loadLazyPage(data.page,data.data);
    }

    if(mod){
      engine.view.remove(button);
      engine.view.show(href);
    }

  },

  loadLazyPage : async (page)=>{
    let mod = engine.get.pageModule(page);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.page(page)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'pageModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyPage-supers-index');
        }
      });
      if(run){ return engine.get.pageModule(page); } else return false;
    }
  },

  loadLazyCont : async (page,cont,data)=>{
    let pageMod = await engine.global.function.loadLazyPage(page);
    if(!pageMod){
      return engine.common.error('failed-loadLazyPage-loadLazyCont-supers-index');
    }
    let mod = engine.get.contModule(page,cont);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.cont(page,cont)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'contModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyCont-supers-index');
        }
      });
      if(run){ return engine.get.contModule(page,cont); } else return false;
    }
  },

  loadLazyPanel : async (page,cont,panel,data)=>{
    let pageMod = await engine.global.function.loadLazyPage(page);
    if(!pageMod){
      return engine.common.error('failed-loadLazyPage-loadLazyPanel-supers-index');
    }
    let contMod = await engine.global.function.loadLazyCont(page,cont);
    if(!contMod){
      return engine.common.error('failed-loadLazyCont-loadLazyPanel-supers-index');
    }
    let mod = engine.get.panelModule(page,cont,panel);
    if(mod){
      return mod;
    } else {
      let run = await engine.loader.load.panel(page,cont,panel)
      .then(()=>{
        return true;
      })
      .catch((e)=>{
        if(e == 'panelModule-already-loaded'){
          return true;
        } else {
          return engine.common.error('failed-fetch_module-promise_error-loadLazyPanel-supers-index');
        }
      });
      if(run){return engine.get.panelModule(page,cont,panel)} else return false;
    }
  },

  toLazyPage :async (page,data)=>{
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyPage(page);
    engine.global.function.loader().hide();
    if(mod){
      if(!engine.router.active.page){
        mod.init()
        //engine.make.init.page(pageId,"page");
      } else {
        engine.router.navigate.to.page(mod,data);
      }
      return true;
    } else {
      return engine.common.error('failed-loadLazyPage-toLazyPage-supers-index');
    }
  },

  toLazyCont :async (page,cont,data)=>{

    let toPage = await engine.global.function.toLazyPage(page);
    if(!toPage){
      return engine.common.error('failed-toLazyPage-toLazyCont-supers-index');
    }
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyCont(page,cont);
    engine.global.function.loader().hide();
    if(mod){
      engine.router.navigate.to.cont(mod,data);
      return true;
    } else {
      return engine.common.error('failed-fetch_module-toLazyCont-supers-index');
    }
  },

  toLazyPanel:async (page,cont,panel,data)=>{

    let toCont = await engine.global.function.toLazyCont(page,cont,null);
    if(!toCont){
      return engine.common.error('failed-toLazyCont-toLazyPanel-supers-index');
    }
    engine.global.function.loader().show();
    let mod = await engine.global.function.loadLazyPanel(page,cont,panel);
    engine.global.function.loader().hide();
    if(mod){
      engine.router.navigate.to.panel(mod,data);
      return true;
    } else {
      return engine.common.error('failed-loadLazyPanel-toLazyPanel-supers-index');
    }
  },

  lazyCompLoader : async function(comp){

    if(engine.global.comp[comp]){
      return engine.global.comp[comp];
    }

    engine.global.function.loader().show();

    let hold = await engine.loader.load.comp(comp.replace('Comp',''))
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      if(error){
        console.log(error);
      }
      return engine.global.function.message().warn('failed to load lazy comp, please reload the page.');
    });

    engine.global.function.loader().hide();

    if(hold){
      return engine.global.comp[comp];
    } else {
      return false;
    }

  }

};
