//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-serve';
const pageName = 'docsPage';
const contName = 'cliCont';
const panelName = 'servePanel';

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
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this command starts a server and compiles the app files and serves a built app to the browser'
    },
    {
      name:'keywords',
      content:'serve,vegana,cli'
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
