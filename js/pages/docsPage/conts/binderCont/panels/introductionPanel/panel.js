!function(){return function e(n,t,o){function i(a,l){if(!t[a]){if(!n[a]){var p="function"==typeof require&&require;if(!l&&p)return p(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var d=t[a]={exports:{}};n[a][0].call(d.exports,function(e){return i(n[a][1][e]||e)},d,d.exports,e,n,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Vegana binder Apis",items:[{type:"para",string:"vegana binder apis provide fast and easy way to attach a dom element to a dom event although only  a few events are directly supported with these apis but they make development very fast. the focus behind making them were to lower the developer time on typing code and making dveelopment a hell lot faster, with super easy error handling."}]}]},{}],2:[function(e,n,t){let o,i;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");i=(o=n)+"-panel-introduction",engine.make.init.panel(i,o,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(i,n)}()},ref:"-panel-introduction",type:"panel",panelName:"introductionPanel",trackers:{title:"Introduction -Binder Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana binder apis."},{name:"keywords",content:"binder,vegana,introduction,api"}]}};engine.router.set.panelModule("docsPage","binderCont","introductionPanel",r),n.exports=r},{1:1}]},{},[2]);