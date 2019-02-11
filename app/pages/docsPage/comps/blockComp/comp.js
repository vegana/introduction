//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-block';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var holder;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  if(!data || typeof(data) !== 'object'){
    return engine.common.error('invalid-data_type-block_comp');
  }

  holder = data;
  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

let blockCont,leftCont,rightCont;

//build the dom for comp here
function build(){

  blockCont = engine.make.div({
    id:engine.uniqid(),
    parent:compId,
    class:'block-cont'
  });

    leftCont = engine.make.div({
      id:'left',
      parent:blockCont,
      class:'block-left-cont'
    });

      //title
      if(holder.title && typeof(holder.title) == 'string'){
        engine.make.div({
          id:'title',
          parent:leftCont,
          class:'block-left-title',
          text:holder.title
        });
      }

      //para
      if(holder.para && typeof(holder.para) == 'string'){
        engine.make.div({
          id:'para',
          parent:leftCont,
          class:'block-left-para',
          text:holder.para
        });
      }

      //table
      if(holder.table && typeof(holder.table) == 'object'){
        table(holder.table);
      }

    //example
    if(holder.example && typeof(holder.example) == 'object'){
      rightCont = engine.make.div({
        id:engine.uniqid(),
        parent:blockCont,
        class:'block-right-cont',
        text:'<pre>' + JSON.stringify(holder.example,null,2) + '</pre>'
      });
    }

}
//build ends here

function table(data){

  let cont = engine.make.div({
    id:'table',
    parent:leftCont,
    class:'block-table-cont'
  });

    for(var i=0;i<data.length;i++){

      let hold = data[i];

      let row = engine.make.div({
        id:'row-' + engine.uniqid(),
        parent:cont,
        class:'block-row-cont'
      });

      for(var j=0;j<hold.length;j++){

        engine.make.div({
          id:engine.uniqid(),
          parent:row,
          class:'block-row-coloum',
          text:hold[j]
        });

      }
      //coloum loop

    }
    //main loop

}
//table function ends here

module.exports = {init:init,ref:compRef,type:type}
