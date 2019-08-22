//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-article';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,article) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build(article);                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(article){

  if(!article){
    return engine.global.function.message().danger('no article found.');
  }

  const main = engine.make.div({
    parent:compId,
    class:'page-docs-comp-article-main'
  });

  for(let a of article){
    if(a.type == 'title'){
      make_title(main,a,true);
    } else if(a.type == 'para'){
      make_para(main,a,true);
    } else if(a.type == 'list'){
      make_list(main,a,true);
    } else if(a.type == 'image'){
      make_image(main,a,true);
    } else if(a.type == 'section'){
      process_section(main,a);
    }
  }

}

function get_random(min,max){
  return Math.floor((Math.random() * (max - min)) + min);
}

const colors = [
  'bg-color-green',
  'bg-color-pink',
  'bg-color-orange',
  'bg-color-green',
  'bg-color-pink',
  'bg-color-orange',
];

function process_section(p,obj){

  const main = engine.make.div({
    parent:p,
    class:'card page-docs-comp-article-section'
  });

  if(obj.title){

    let t_cls = 'page-docs-comp-article-section-title-cont ';
    t_cls += colors[get_random(0,5)];

    engine.make.heading({
      parent:engine.make.div({
        parent:main,
        class:t_cls
      }),
      level:1,
      class:'page-docs-comp-article-section-title',
      text:obj.title || 'sample title'
    });
  }

  for(let a of obj.items){
    if(a.type == 'title'){
      make_title(main,a,false);
    } else if(a.type == 'para'){
      make_para(main,a,false);
    } else if(a.type == 'list'){
      make_list(main,a,false);
    } else if(a.type == 'image'){
      make_image(main,a,false);
    } else if(a.type == 'code'){
      make_code(main,a,false);
    }
  }

}

function make_title(p,obj,force){

  let cls = 'page-docs-comp-article-title-cont';
  if(force){
    cls += ' card';
  }

  const cont = engine.make.div({
    parent:p,
    class:cls
  });

  engine.make.heading({
    level:obj.level || 1,
    parent:cont,
    class:'page-docs-comp-article-title',
    text:obj.string || obj.text || 'sample title'
  });

}

function make_para(p,obj,force){

  let cls = 'page-docs-comp-article-para';
  if(force){
    cls += ' card';
  }

  engine.make.p({
    parent:p,
    class:cls,
    text:obj.string || obj.text || 'sample paragrapgh.'
  });

}

function make_list(p,obj,force){

  if(!obj || !obj.items.length > 0){
    return true;
  }

  let collect = [];

  for(let i of obj.items){
    collect.push({text:i || 'sample item'});
  }

  let cls = 'page-docs-comp-article-list';
  if(force){
    cls += ' card';
  }

  engine.make.list({
    parent:p,
    class:cls,
    itemClass:'page-docs-comp-article-list-item',
    data:collect,
    type:'ol'
  });

}

function make_code(p,obj,force){

  let cls = 'page-docs-comp-article-code';
  let style;
  if(force){
    cls += ' card';
  } else {
    style = 'margin:2vw;';
  }

  const cont = engine.make.div({
    parent:p,
    class:cls
  });

  let code = '<pre>';
  if(obj.string || obj.text && !obj.json){
    code += obj.string || obj.text || '{sample_code:true}';
  }
  if(obj.json){
    code += 'const properties = ' + JSON.stringify(obj.json,null,4);
  }
  code += '</pre>'

  engine.make.div({
    parent:cont,
    class:cls,
    text:code,
    style:style
  });

}

function make_image(p,obj,force){

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
