!function(){return function e(t,n,i){function r(o,l){if(!n[o]){if(!t[o]){var p="function"==typeof require&&require;if(!l&&p)return p(o,!0);if(a)return a(o,!0);var s=new Error("Cannot find module '"+o+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){return r(t[o][1][e]||e)},u,u.exports,e,t,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}}()({1:[function(e,t,n){t.exports=[{type:"section",title:"Set Page Title Api",items:[{type:"para",string:"this api simply changes the page title and takes a string as an argument."},{type:"code",string:"engine.set.pageTitle('super page')"}]}]},{}],2:[function(e,t,n){let i,r;const a={init:t=>{if(engine.common.tell("panel initiated",!1),null==t||null==t)return engine.common.error("parent_cont_id_not_found");r=(i=t)+"-panel-title",engine.make.init.panel(r,i,"panel"),function(){const t=e(1);engine.global.comp.articleComp.init(r,t)}()},ref:"-panel-title",type:"panel",panelName:"titlePanel",trackers:{title:"Page Title - Set Api - Vegana Js",meta:[{name:"description",content:"introduction to vegana page title set api."},{name:"keywords",content:"set,vegana,page,title,api"}]}};engine.router.set.panelModule("docsPage","setCont","titlePanel",a),t.exports=a},{1:1}]},{},[2]);