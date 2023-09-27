/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/VersionInfo","sap/base/Log","sap/base/assert","sap/base/util/ObjectPath"],function(e,n,a,o){"use strict";if(window.OpenAjax&&window.OpenAjax.hub){OpenAjax.hub.registerLibrary("sap","http://www.sap.com/","0.1",{})}var t;if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={}}if(typeof window.sap.ui!=="object"){window.sap.ui={}}sap.ui=Object.assign(sap.ui,{version:"1.98.0",buildinfo:{lastchange:"",buildtime:"20230927-0929"}});var s=window["sap-ui-config"]||{};var r=0;if(s["xx-nosync"]==="warn"||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){r=1}if(s["xx-nosync"]===true||s["xx-nosync"]==="true"||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){r=2}sap.ui.getVersionInfo=function(a){if(a&&a.async){n.info("Do not use deprecated function 'sap.ui.getVersionInfo'. Use"+" 'sap/ui/VersionInfo' module's asynchronous .load function instead")}else{n.warning("Do not use deprecated function 'sap.ui.getVersionInfo' synchronously! Use"+" 'sap/ui/VersionInfo' module's asynchronous .load function instead","Deprecation",null,function(){return{type:"sap.ui.getVersionInfo",name:"Global"}})}return e._load(a)};sap.ui.namespace=function(e){a(false,"sap.ui.namespace is long time deprecated and shouldn't be used");return o.create(e)};sap.ui.lazyRequire=function(e,s,i){a(typeof e==="string"&&e,"lazyRequire: sClassName must be a non-empty string");a(!s||typeof s==="string","lazyRequire: sMethods must be empty or a string");if(r===2){n.error("[nosync] lazy stub creation ignored for '"+e+"'");return}var u=e.replace(/\//gi,"."),c=u.lastIndexOf("."),p=u.substr(0,c),f=u.substr(c+1),l=o.create(p),y=l[f],d=(s||"new").split(" "),b=d.indexOf("new");i=i||u;if(!y){if(b>=0){y=function(){if(r){if(r===1){n.error("[nosync] lazy stub for constructor '"+u+"' called")}}else{n.debug("lazy stub for constructor '"+u+"' called.")}sap.ui.requireSync(i.replace(/\./g,"/"));var o=l[f];a(typeof o==="function","lazyRequire: oRealClass must be a function after loading");if(o._sapUiLazyLoader){throw new Error("lazyRequire: stub '"+u+"'has not been replaced by module '"+i+"'")}var s=Object.create(o.prototype);if(!(this instanceof y)){t=t||sap.ui.require("sap/ui/base/Object");if(t&&s instanceof t){n.error("Constructor "+e+' has been called without "new" operator!',null,null,function(){try{throw new Error}catch(e){return e}})}}var c=o.apply(s,arguments);if(c&&(typeof c==="function"||typeof c==="object")){s=c}return s};y._sapUiLazyLoader=true;d.splice(b,1)}else{y={}}l[f]=y}d.forEach(function(e){if(!y[e]){y[e]=function(){if(r){if(r===1){n.error("[no-sync] lazy stub for method '"+u+"."+e+"' called")}}else{n.debug("lazy stub for method '"+u+"."+e+"' called.")}sap.ui.requireSync(i.replace(/\./g,"/"));var o=l[f];a(typeof o==="function"||typeof o==="object","lazyRequire: oRealClass must be a function or object after loading");a(typeof o[e]==="function","lazyRequire: method must be a function");if(o[e]._sapUiLazyLoader){throw new Error("lazyRequire: stub '"+u+"."+e+"' has not been replaced by loaded module '"+i+"'")}return o[e].apply(o,arguments)};y[e]._sapUiLazyLoader=true}})};sap.ui.lazyRequire._isStub=function(e){a(typeof e==="string"&&e,"lazyRequire._isStub: sClassName must be a non-empty string");var n=e.lastIndexOf("."),t=e.slice(0,n),s=e.slice(n+1),r=o.get(t||"");return!!(r&&typeof r[s]==="function"&&r[s]._sapUiLazyLoader)};sap.ui.resource=function(e,n){a(typeof e==="string","sLibraryName must be a string");a(typeof n==="string","sResourcePath must be a string");return sap.ui.require.toUrl((String(e).replace(/\./g,"/")+"/"+n).replace(/^\/*/,""))};sap.ui.localResources=function(e){a(e,"sNamespace must not be empty");var n={};n[e.replace(/\./g,"/")]="./"+e.replace(/\./g,"/");sap.ui.loader.config({paths:n})};return sap.ui});