!function(){return function e(t,n,r){function a(i,p){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!p&&s)return s(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};t[i][0].call(u.exports,function(e){return a(t[i][1][e]||e)},u,u.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}}()({1:[function(e,t,n){t.exports=[{type:"section",title:"Get Params Api",items:[{type:"para",string:"this api returns an object with the params key as the object ket the same relation of both the values of objects."},{type:"code",string:"const params = engine.params.get()"},{type:"code",string:"{id:'213124uyh} //returned"}]}]},{}],2:[function(e,t,n){let r,a;const o={init:t=>{if(engine.common.tell("panel initiated",!1),null==t||null==t)return engine.common.error("parent_cont_id_not_found");a=(r=t)+"-panel-get",engine.make.init.panel(a,r,"panel"),function(){const t=e(1);engine.global.comp.articleComp.init(a,t)}()},ref:"-panel-get",type:"panel",panelName:"getPanel",trackers:{title:"Get - Params Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana get param apis."},{name:"keywords",content:"params,vegana,get,api"}]}};engine.router.set.panelModule("docsPage","paramsCont","getPanel",o),t.exports=o},{1:1}]},{},[2]);