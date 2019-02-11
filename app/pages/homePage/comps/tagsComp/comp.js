//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-tags';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;
var tagsCont;

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

  tagsCont = engine.make.div({
    id:'tagsCont',
    parent:compId,
    class:'home-page-tags-cont'
  });

  tagify({
    id:'twitter',
    image:'assets/images/twitter.png',
    url:'https://twitter.com/myCrazyGoat',
    title:'Twitter'
  });

  tagify({
    id:'git',
    image:'assets/images/github.png',
    url:'https://github.com/gzbakku/vegana#readme',
    title:'github'
  });

  tagify({
    id:'npm',
    image:'assets/images/npm.png',
    url:'https://www.npmjs.com/package/vegana',
    title:'npm'
  });

}

function tagify(data){

  let cont = engine.make.div({
    id:data.id,
    parent:tagsCont,
    class:'home-page-tag-cont',
    function:()=>{
      window.location = data.url;
    }
  });

    engine.make.image({
      id:'tagsCont',
      parent:cont,
      class:'home-page-tag-image',
      type:'local',
      location:data.image
    });

    engine.make.div({
      id:'title',
      parent:cont,
      class:'home-page-tag-title',
      text:data.title
    });

}

module.exports = {init:init,ref:compRef,type:type}
