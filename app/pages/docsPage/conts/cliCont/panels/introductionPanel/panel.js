//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-introduction';
const pageName = 'docsPage';
const contName = 'cliCont';
const panelName = 'introductionPanel';

let parentId,panelId;

const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

const trackers = {
  title:'Introduction - Vegana Cli - Vegana Js',
  meta:[
    {
      name:'description',
      content:'Introduction to vegana js cli,commands enviorment etc.'
    },
    {
      name:'keywords',
      content:'introduction,cli,help,vegana,init,serve,build,generate'
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
