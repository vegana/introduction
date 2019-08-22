//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-generate';
const pageName = 'docsPage';
const contName = 'cliCont';
const panelName = 'generatePanel';

//ids
let parentId,panelId;

//init dom build here
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
  title:'Build Project - Cli - Vegana Js',
  meta:[
    {
      name:'description',
      content:'Vegana builder produces an optimized version of you app with the lazy components integrated in the build folder the build folder is now ready to be deployed.'
    },
    {
      name:'keywords',
      content:'generate,vegana,page,lazy,cont,panel,comp,component'
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
