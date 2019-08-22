//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-page';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'pagePanel';

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

const trackers = {
  title:'Page - Get - Vegana Js',
  meta:[
    {
      name:'description',
      content:'introduction to vegana get page api.'
    },
    {
      name:'keywords',
      content:'get,vegana,page,api'
    }
  ]
};

function build(){
  const article = require('./article.json');
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
