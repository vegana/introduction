!function(){return function e(n,t,i){function o(r,c){if(!t[r]){if(!n[r]){var l="function"==typeof require&&require;if(!c&&l)return l(r,!0);if(a)return a(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var p=t[r]={exports:{}};n[r][0].call(p.exports,function(e){return o(n[r][1][e]||e)},p,p.exports,e,n,t,i)}return t[r].exports}for(var a="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Vegana Router Apis",items:[{type:"para",string:"Validate apis are sepcifially designed and optimized to validate json as object and email as a string which might be the most important functions as per the security around a web app. caution :- we do not exit html special characters."}]}]},{}],2:[function(e,n,t){let i,o;const a={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");o=(i=n)+"-panel-introduction",engine.make.init.panel(o,i,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(o,n)}()},ref:"-panel-introduction",type:"panel",panelName:"introductionPanel",trackers:{title:"Introduction - Validate Apis - Vegana Js",meta:[{name:"description",content:"introduction to vegana validate apis."},{name:"keywords",content:"validate,vegana,introduction,apis"}]}};engine.router.set.panelModule("docsPage","validateCont","introductionPanel",a),n.exports=a},{1:1}]},{},[2]);