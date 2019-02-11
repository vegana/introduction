//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-title';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var title;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  title = data;
  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  engine.make.div({
    id:"title-" + engine.uniqid(),
    parent:compId,
    class:'article-title',
    text:title
  });

}

module.exports = {init:init,ref:compRef,type:type}
