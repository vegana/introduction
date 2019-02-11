//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-footer';             //dont worry about this
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

}

//build the dom for comp here
function build(){

  let cont = engine.make.div({
    id:'footer',
    parent:compId,
    class:'footer-cont'
  });

    //tag
    engine.make.div({
      id:'tag',
      parent:cont,
      class:'footer-tag',
      text:'Made with Love by Akku'
    });

}

module.exports = {init:init,ref:compRef,type:type}
