!function(){return function e(n,t,o){function a(i,u){if(!t[i]){if(!n[i]){var l="function"==typeof require&&require;if(!u&&l)return l(i,!0);if(r)return r(i,!0);var p=new Error("Cannot find module '"+i+"'");throw p.code="MODULE_NOT_FOUND",p}var s=t[i]={exports:{}};n[i][0].call(s.exports,function(e){return a(n[i][1][e]||e)},s,s.exports,e,n,t,o)}return t[i].exports}for(var r="function"==typeof require&&require,i=0;i<o.length;i++)a(o[i]);return a}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Vegana Panel Router",items:[{type:"para",string:"Panels module can be routed within the panel router which is to be defined on each cont. the router api routes the panel on the router of the active cont or the cont you last routed to. the api takes contId and class as arguments class is optional and there is no default provided."},{type:"code",string:"engine.router.init.panels(contId,'panel-router-class #optional')"},{type:"para",string:"now panels can be routed within this router by using the following api."},{type:"code",string:"engine.router.navigate.to.panel(mod,{test:true})"},{type:"code",string:"engine.router.navigate.new.panel(mod,{test:true})"},{type:"para",string:"here the given mod is the module which can be fetched by the get api,you will read about it ahead. any data can be passed and be taken in the init function of the panel module as an argument after the predefined agruments of the function."}]}]},{}],2:[function(e,n,t){let o,a;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");a=(o=n)+"-panel-panels",engine.make.init.panel(a,o,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(a,n)}()},ref:"-panel-panels",type:"panel",panelName:"panelsPanel",trackers:{title:"Panel Router - Router Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana panel router api."},{name:"keywords",content:"router,vegana,introduction,api,panel"}]}};engine.router.set.panelModule("docsPage","routerCont","panelsPanel",r),n.exports=r},{1:1}]},{},[2]);