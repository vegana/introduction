!function(){return function n(e,t,o){function i(a,c){if(!t[a]){if(!e[a]){var u="function"==typeof require&&require;if(!c&&u)return u(a,!0);if(r)return r(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var l=t[a]={exports:{}};e[a][0].call(l.exports,function(n){return i(e[a][1][n]||n)},l,l.exports,n,e,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}}()({1:[function(n,e,t){e.exports=[{type:"section",title:"Vegana Common Apis",items:[{type:"para",string:"common apis provide logging functions which are customized for debugging. the api is distrubited into 2 sub apis error and tell api."}]}]},{}],2:[function(n,e,t){let o,i;const r={init:e=>{if(engine.common.tell("panel initiated",!1),null==e||null==e)return engine.common.error("parent_cont_id_not_found");i=(o=e)+"-panel-introduction",engine.make.init.panel(i,o,"panel"),function(){const e=n(1);engine.global.comp.articleComp.init(i,e)}()},ref:"-panel-introduction",type:"panel",panelName:"introductionPanel",trackers:{title:"Introduction - Common - Vegana Js",meta:[{name:"description",content:"introduction to vegana common apis."},{name:"keywords",content:"common,vegana,introduction,api"}]}};engine.router.set.panelModule("docsPage","commonCont","introductionPanel",r),e.exports=r},{1:1}]},{},[2]);