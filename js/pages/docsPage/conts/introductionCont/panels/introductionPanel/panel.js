!function(){return function e(t,n,o){function i(s,r){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!r&&u)return u(s,!0);if(a)return a(s,!0);var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){return i(t[s][1][e]||e)},d,d.exports,e,t,n,o)}return n[s].exports}for(var a="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}}()({1:[function(e,t,n){t.exports=[{type:"section",title:"Welcome to the community.",items:[{type:"para",string:"Vegana is a js framework to build single page apps with native support of a defined document structure for ease of developemnt in big teams, code sharing, native and fast lazyness for a smooth browsing experience and native js web api plugins for ease of use and faster development speeds.basic concept is to reduce final bundle size and break the bundle based on a document structure making the browsing experience smooth and fast."},{type:"list",items:["tiny and broken up document structure","native lazyness with super fast loading and web api plugins. ","native api framework support with rocket iron and wet.","only js and sass develoment enviorment to speed up development multitudes of time.","prebuilt native components and upcoming support for web compoenets.","defined code structure to make onboarding new devs easy for big teams.","native nodejs cli with cross platform support.","non defined sass data structure."]}]},{type:"section",title:"When to use!",items:[{type:"list",items:["if your project is big and you need the website to load in under a sec.","if you have a big team and want to develop something fast with easy of dev onboarding","if your project is with multiple use heavy pages.","if your project use an api.","if you dont want breaking changes in upcoming updates in app or in cli.","if you have prebuilt sass or css style sheet."]}]},{type:"section",title:"Before you start",items:[{type:"list",items:["please get yourself familiar with atleast js css and sass.","get a little bit familiar with concepts of js api's, npm libraries, size of final bundle and component laziness.","get familier with nodejs and npm.","installing npm module as a global app.","efficiency of js data structures.","read the document structure docs."]}]}]},{}],2:[function(e,t,n){const o=e(1);let i,a;const s={init:e=>{if(engine.common.tell("panel initiated",!1),null==e||null==e)return engine.common.error("parent_cont_id_not_found");a=(i=e)+"-panel-introduction",engine.make.init.panel(a,i,"panel"),engine.global.comp.articleComp.init(a,o)},ref:"-panel-introduction",type:"panel",panelName:"introductionPanel",trackers:{title:"Introduction to Vegana",meta:[{name:"description",content:"Vegana is a js framework for single page web apps and use native Nodejs enviorment for development."},{name:"keywords",content:"Vegana,Introduction,framework,Nodejs"}]}};engine.router.set.panelModule("docsPage","introductionCont","introductionPanel",s),t.exports=s},{1:1}]},{},[2]);