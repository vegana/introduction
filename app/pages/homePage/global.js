

const loaderComp = require('../comps/loaderComp/comp');

module.exports = {init:init};

//this function loades the function to global functions
function init(){
  engine.add.function('loader',loader);
}

function loader(what){
  if(engine.data.get('loaderId') == null){
     engine.data.set('loaderId',loaderComp.init(engine.router.active.page));
  }
  return {
    show:()=>{
      engine.view.show(engine.data.get('loaderId'));
    },
    hide:()=>{
      engine.view.hide(engine.data.get('loaderId'));
    }
  }
}
