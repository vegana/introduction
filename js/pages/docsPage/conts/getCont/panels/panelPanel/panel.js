!function(){return function e(n,t,a){function o(i,l){if(!t[i]){if(!n[i]){var p="function"==typeof require&&require;if(!l&&p)return p(i,!0);if(r)return r(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[i]={exports:{}};n[i][0].call(c.exports,function(e){return o(n[i][1][e]||e)},c,c.exports,e,n,t,a)}return t[i].exports}for(var r="function"==typeof require&&require,i=0;i<a.length;i++)o(a[i]);return o}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Get Page Module Api",items:[{type:"para",string:"this api takes page,cont and panel name as strings for arguments and fetches the panel module if already is loaded in the app."},{type:"code",string:"const panelModule = engine.get.panelModule('homePage','loginCont','formPanel')"}]}]},{}],2:[function(e,n,t){let a,o;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");o=(a=n)+"-panel-panel",engine.make.init.panel(o,a,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(o,n)}()},ref:"-panel-panel",type:"panel",panelName:"panelPanel",trackers:{title:"Panel - Get - Vegana Js",meta:[{name:"description",content:"introduction to vegana get panel api."},{name:"keywords",content:"get,vegana,panel,api"}]}};engine.router.set.panelModule("docsPage","getCont","panelPanel",r),n.exports=r},{1:1}]},{},[2]);