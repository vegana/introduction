!function(){return function e(n,t,o){function i(a,s){if(!t[a]){if(!n[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var p=t[a]={exports:{}};n[a][0].call(p.exports,function(e){return i(n[a][1][e]||e)},p,p.exports,e,n,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Loader Css Api",items:[{type:"para",string:"this api loads css files onto the app and takes filename as an argument caution this api does not load css files via url but only with file name of which the file is present in the css folder."},{type:"code",string:"engine.loader.css('vegana_native_style')<br>.then(()=>{<br>&nbsp;&nbsp;console.log('comp module loaded');<br>})<br>.catch((e)=>{<br>&nbsp;&nbsp;console.log(e);<br>})"}]}]},{}],2:[function(e,n,t){let o,i;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");i=(o=n)+"-panel-css",engine.make.init.panel(i,o,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(i,n)}()},ref:"-panel-css",type:"panel",panelName:"cssPanel",trackers:{title:"Introduction - Make Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana make apis."},{name:"keywords",content:"make,vegana,introduction,api"}]}};engine.router.set.panelModule("docsPage","loaderCont","cssPanel",r),n.exports=r},{1:1}]},{},[2]);