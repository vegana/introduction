//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-loader';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

  return compId;

}

//build the dom for comp here
function build(){

  let cont = engine.make.div({
    id:'loader',
    parent:compId,
    class:'loader-cont'
  });

    engine.make.div({
      id:'back',
      parent:cont,
      class:'loader-back'
    });

    let box = engine.make.div({
      id:'box',
      parent:cont,
      class:'card loader-box'
    });

      let animate = engine.make.div({
        id:'box',
        parent:box,
        class:'loader-box-animate'
      });

        engine.make.div({
          id:'loading',
          parent:animate,
          class:'loader-loading'
        });

      let text = engine.make.div({
        id:'text',
        parent:box,
        class:'loader-box-text',
        text:'Loading ...'
      });

    engine.view.hide(compId);  


}

module.exports = {init:init,ref:compRef,type:type}
