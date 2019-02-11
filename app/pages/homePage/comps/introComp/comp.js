//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-intro';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

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

  // let iconCont = engine.make.div({
  //   id:'icon',
  //   parent:compId,
  //   class:'home-comp-intro-icon-cont'
  // });
  //
  //   engine.make.image({
  //     id:'icon',
  //     parent:iconCont,
  //     class:'home-comp-intro-icon',
  //     type:'local',
  //     location:'assets/images/logo.png'
  //   });

  let intro = engine.make.div({
    id:'intro',
    parent:compId,
    class:'home-comp-intro-cont'
  });

  let welcomeCont = engine.make.div({
    id:'welcome',
    parent:intro,
    class:'home-comp-welcome-cont'
  });

    engine.make.image({
      id:'welcome',
      parent:welcomeCont,
      class:'home-comp-welcome-image',
      type:'local',
      location:'assets/images/bear.png'
    });

    // engine.make.div({
    //   id:'text',
    //   parent:welcomeCont,
    //   class:'home-comp-welcome-text',
    //   text:'Welcome'
    // });

  let textCont = engine.make.div({
    id:'text',
    parent:intro,
    class:'home-comp-intro-text-cont'
  });

    engine.make.div({
      id:'title',
      parent:textCont,
      class:'home-comp-intro-title-cont',
      text:'Welcome'
    });

    let para = "<p>This is a brief of why did i made it. ";
    para = para + "Angular routing sucks, code management and redability is horse shit, ";
    para = para + "i wanted easy tools to call apis and access data across components which was missing ";
    para = para + "and bundle sizes were like a hammer useless.</p>";
    para = para + "<p>Thus vegana with super fast no bull shit cli, ";
    para = para + "vegana follows a defined document structure making code redability and management a breeze for any team size.</p>";
    para = para + "<p>I dont like html while using js it fucks me up so vegana provides ";
    para = para + "fast and easy dom apis to make any possible element with minimal code and complicacy.</p>";
    para = para + "<p>Sass have native support with live reloading and i am not imposing any file structure thank me later.</p>";
    para = para + "<p>Live reloading is present for any change in the app directory.</p>";
    para = para + "<p>Speed was the priority while i was making it, so all the tools are optional and super optimized.</p>";
    para = para + "<p>Finally you get super fast and small bundle,easy code redability and management, team size agnostic and the fastest framework to develop anything in i promise.</p>";

    engine.make.div({
      id:'para',
      parent:textCont,
      class:'home-comp-intro-para-cont',
      text:para
    });

}

module.exports = {init:init,ref:compRef,type:type}
