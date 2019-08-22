//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-introduction';
const pageName = 'docsPage';
const contName = 'introductionCont';
const panelName = 'introductionPanel';
const article = require('./article.json');

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'Introduction to Vegana',
  meta:[
    {
      name:'description',
      content:'Vegana is a js framework for single page web apps and use native Nodejs enviorment for development.'
    },
    {
      name:'keywords',
      content:'Vegana,Introduction,framework,Nodejs'
    }
  ]
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

function build(){
  engine.global.comp.articleComp.init(panelId,article);
}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;
