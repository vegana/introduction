!function(){return function e(n,t,o){function a(p,r){if(!t[p]){if(!n[p]){var s="function"==typeof require&&require;if(!r&&s)return s(p,!0);if(i)return i(p,!0);var c=new Error("Cannot find module '"+p+"'");throw c.code="MODULE_NOT_FOUND",c}var l=t[p]={exports:{}};n[p][0].call(l.exports,function(e){return a(n[p][1][e]||e)},l,l.exports,e,n,t,o)}return t[p].exports}for(var i="function"==typeof require&&require,p=0;p<o.length;p++)a(o[p]);return a}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Hook Comp",items:[{type:"para",string:"this api hooks a lazy comp for when it is loaded into the app, given the comp is lazy and is loaded via the loader.load api. this api takes the comp name and function within an object as an argument."},{type:"code",json:{comp:"comp-name",function:"function that you want to be triggered"}},{type:"code",string:"engine.loader.hook.comp(properties)"}]},{type:"section",title:"Hook Page",items:[{type:"para",string:"this api hooks a lazy page for when it is loaded into the app, given the page is lazy and is loaded via the loader.load api. this api takes the page name and function within an object as an argument."},{type:"code",json:{page:"page-name",function:"function that you want to be triggered"}},{type:"code",string:"engine.loader.hook.page(properties)"}]},{type:"section",title:"Hook Cont",items:[{type:"para",string:"this api hooks a lazy cont for when it is loaded into the app, given the cont is lazy and is loaded via the loader.load api. this api takes the page, cont names and function within an object as an argument."},{type:"code",json:{page:"page-name",cont:"cont-name",function:"function that you want to be triggered"}},{type:"code",string:"engine.loader.hook.cont(properties)"}]},{type:"section",title:"Hook Panel",items:[{type:"para",string:"this api hooks a lazy panel for when it is loaded into the app, given the panel is lazy and is loaded via the loader.load api. this api takes the page, cont, panel names and function within an object as an argument."},{type:"code",json:{page:"page-name",cont:"cont-name",panel:"panel-name",function:"function that you want to be triggered"}},{type:"code",string:"engine.loader.hook.panel(properties)"}]}]},{}],2:[function(e,n,t){let o,a;const i={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");a=(o=n)+"-panel-hooks",engine.make.init.panel(a,o,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(a,n)}()},ref:"-panel-hooks",type:"panel",panelName:"hooksPanel",trackers:{title:"Introduction - Make Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana make apis."},{name:"keywords",content:"make,vegana,introduction,api"}]}};engine.router.set.panelModule("docsPage","loaderCont","hooksPanel",i),n.exports=i},{1:1}]},{},[2]);