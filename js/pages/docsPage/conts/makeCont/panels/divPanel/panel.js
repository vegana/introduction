!function(){return function e(n,t,i){function a(o,s){if(!t[o]){if(!n[o]){var d="function"==typeof require&&require;if(!s&&d)return d(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var p=t[o]={exports:{}};n[o][0].call(p.exports,function(e){return a(n[o][1][e]||e)},p,p.exports,e,n,t,i)}return t[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)a(i[o]);return a}}()({1:[function(e,n,t){n.exports=[{type:"section",title:"Vegana Make Div",items:[{type:"para",string:"this api makes a div container inside a parent div and takes the following arguments. the function given is triggered when is clicked. the id generated will be a sum of all the given ids of all the parent div's."},{type:"code",json:{id:"whatever-box",parent:"parent-cont-id",class:"whatever-class",text:"this is a test div",style:"display:none;"}},{type:"code",string:"const divId = engine.make.div(properties)"},{type:"code",string:"engine.view.show(divId)"}]}]},{}],2:[function(e,n,t){let i,a;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");a=(i=n)+"-panel-div",engine.make.init.panel(a,i,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(a,n)}()},ref:"-panel-div",type:"panel",panelName:"divPanel",trackers:{title:"Div - Make Apis - Vegana Js",meta:[{name:"description",content:"introduction and details of div making api in vegana js."},{name:"keywords",content:"make,vegana,div,api"}]}};engine.router.set.panelModule("docsPage","makeCont","divPanel",r),n.exports=r},{1:1}]},{},[2]);