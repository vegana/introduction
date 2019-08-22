!function(){return function e(n,a,o){function t(l,i){if(!a[l]){if(!n[l]){var s="function"==typeof require&&require;if(!i&&s)return s(l,!0);if(r)return r(l,!0);var p=new Error("Cannot find module '"+l+"'");throw p.code="MODULE_NOT_FOUND",p}var d=a[l]={exports:{}};n[l][0].call(d.exports,function(e){return t(n[l][1][e]||e)},d,d.exports,e,n,a,o)}return a[l].exports}for(var r="function"==typeof require&&require,l=0;l<o.length;l++)t(o[l]);return t}}()({1:[function(e,n,a){n.exports=[{type:"section",title:"Load Image",items:[{type:"para",string:"images which are to be presented to user in the near future can be loaded quite early which makes you app quite fluid to explore for the user. this api takes url as an argument. when you will use the image in the app it will be loaded from the browser cache not fro the server making the loading time super fast."},{type:"code",string:"engine.loader.load.image('https://daachi.in/logo.png')"}]},{type:"section",title:"Load Comp Module",items:[{type:"para",string:"lazy comp modules which are located in /app/globals/ directory will be loaded via this api and takes the comp name as argument."},{type:"code",string:"engine.loader.load.comp('testComp')<br>.then(()=>{<br>&nbsp;&nbsp;console.log('comp module loaded');<br>})<br>.catch((e)=>{<br>&nbsp;&nbsp;console.log(e);<br>})"}]},{type:"section",title:"Load Page Module",items:[{type:"para",string:"lazy page modules will be loaded via this api and takes the page name as argument."},{type:"code",string:"engine.loader.load.page('contactPage')<br>.then(()=>{<br>&nbsp;&nbsp;console.log('page module loaded');<br>})<br>.catch((e)=>{<br>&nbsp;&nbsp;console.log(e);<br>})"}]},{type:"section",title:"Load Cont Module",items:[{type:"para",string:"lazy cont modules will be loaded via this api and takes the page name and cont name as arguments."},{type:"code",string:"engine.loader.load.page('homePage','introCont')<br>.then(()=>{<br>&nbsp;&nbsp;console.log('cont module loaded');<br>})<br>.catch((e)=>{<br>&nbsp;&nbsp;console.log(e);<br>})"}]},{type:"section",title:"Load Panel Module",items:[{type:"para",string:"lazy panel modules will be loaded via this api and takes the page, cont and panel name as arguments."},{type:"code",string:"engine.loader.load.page('homePage','introCont','speedPanel')<br>.then(()=>{<br>&nbsp;&nbsp;console.log('panel module loaded');<br>})<br>.catch((e)=>{<br>&nbsp;&nbsp;console.log(e);<br>})"}]}]},{}],2:[function(e,n,a){let o,t;const r={init:n=>{if(engine.common.tell("panel initiated",!1),null==n||null==n)return engine.common.error("parent_cont_id_not_found");t=(o=n)+"-panel-load",engine.make.init.panel(t,o,"panel"),function(){const n=e(1);engine.global.comp.articleComp.init(t,n)}()},ref:"-panel-load",type:"panel",panelName:"loadPanel",trackers:{title:"Load Js - Loader - Vegana Js",meta:[{name:"description",content:"introduction to vegana loader load sub api."},{name:"keywords",content:"loader,vegana,loader,load,api"}]}};engine.router.set.panelModule("docsPage","loaderCont","loadPanel",r),n.exports=r},{1:1}]},{},[2]);