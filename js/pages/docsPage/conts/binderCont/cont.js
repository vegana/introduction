!function(){return function n(e,t,o){function r(u,l){if(!t[u]){if(!e[u]){var c="function"==typeof require&&require;if(!l&&c)return c(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var f=t[u]={exports:{}};e[u][0].call(f.exports,function(n){return r(e[u][1][n]||n)},f,f.exports,n,e,t,o)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}}()({1:[function(n,e,t){let o,r;const i={init:n=>{if(null==n||null==n)return engine.common.error("parent_page_id_not_found");engine.common.tell("cont initiated",!1),r=(o=n)+"-cont-binder",engine.make.init.cont(r,o,"cont"),engine.router.init.panels(r),engine.global.to_panel||engine.global.function.toLazyPanel("docsPage","binderCont","introductionPanel")},ref:"-cont-binder",type:"cont",contName:"binderCont",panelModules:{},panelList:{},trackers:null};e.exports=i,window.pageModules.docsPage.contModules.binderCont=i},{}]},{},[1]);