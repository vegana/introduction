//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-introduction';
const pageName = 'docsPage';
const contName = 'introductionCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

//build the cont dom here
function build(){

  engine.global.comp.title.init(contId,
    'Welcome to the community.'
  );

  engine.global.comp.para.init(contId,
    'Vegana is a js framework for single page web apps and use native Nodejs enviorment for development, ' +
    'to get a better sense of the enviorments features you must take the following course in full. ' +
    'Before getting started the developer must posses basic knowledge of Javascript,Sass,Css and Html.'
  );

}

//do not change current exports you are free to add your own though.
const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{}
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;
