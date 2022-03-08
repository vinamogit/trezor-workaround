/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/base/assert","sap/base/util/extend"],function(e,r,n,t){"use strict";var s={};var a={js:["controller","designtime","fragment","support","view"],json:["fragment","view"],html:["fragment","view"],xml:["fragment","view"]};var i=new RegExp("\\.("+Object.keys(a).join("|")+")$");s.getKnownSubtypes=function(){return a};s.getAllRequiredModules=function(){var e=[],r=sap.ui.loader._.getAllModules(true),n;for(var t in r){n=r[t];if(n.ui5&&n.state!==-1){e.push(n.ui5)}}return e};var o=Object.create(null);s.registerResourcePath=function(e,n){if(!n){n={url:null}}if(!o[e]){var t;if(typeof n==="string"||n instanceof String){t=n}else{t=n.url;if(n.final){o[e]=n.final}}var s=sap.ui.require.toUrl(e);var a;if(t!==s||n.final){a={paths:{}};a.paths[e]=t;sap.ui.loader.config(a);r.info("LoaderExtensions.registerResourcePath ('"+e+"', '"+t+"')"+(n["final"]?" (final)":""))}}else{r.warning("LoaderExtensions.registerResourcePath with prefix "+e+" already set as final. This call is ignored.")}};s.resolveUI5Url=function(e){if(e.startsWith("ui5:")){var r=e.replace("ui5:","");if(!r.startsWith("//")){throw new Error("URLs using the 'ui5' protocol must be absolute. Relative and server absolute URLs are reserved for future use.")}r=r.replace("//","");return sap.ui.loader._.resolveURL(sap.ui.require.toUrl(r))}else{return e}};s.loadResource=function(a,o){var u,l,f,c,d,p,g;if(s.notifyResourceLoading){p=s.notifyResourceLoading()}if(typeof a==="string"){o=o||{}}else{o=a||{};a=o.name}o=t({failOnError:true,async:false},o);u=o.dataType;if(u==null&&a){u=(u=i.exec(a||o.url))&&u[1]}n(/^(xml|html|json|text)$/.test(u),"type must be one of xml, html, json or text");d=o.async?new e.Deferred:null;function y(e,n){if(e==null&&o.failOnError){c=n||new Error("no data returned for "+a);if(o.async){d.reject(c);r.error(c)}if(p){p()}return null}if(o.async){d.resolve(e)}if(p){p()}return e}function h(r){var n=e.ajaxSettings.converters["text "+u];if(typeof n==="function"){r=n(r)}return y(r)}l=sap.ui.loader._.getModuleContent(a,o.url);if(l!=undefined){if(o.async){setTimeout(function(){h(l)},0)}else{l=h(l)}}else{g=sap.ui.loader._.getSyncCallBehavior();if(!o.async&&g){if(g>=1){r.error("[nosync] loading resource '"+(a||o.url)+"' with sync XHR")}else{throw new Error("[nosync] loading resource '"+(a||o.url)+"' with sync XHR")}}e.ajax({url:f=o.url||sap.ui.loader._.getResourcePath(a),async:o.async,dataType:u,headers:o.headers,success:function(e,r,n){l=y(e)},error:function(e,r,n){c=new Error("resource "+a+" could not be loaded from "+f+". Check for 'file not found' or parse errors. Reason: "+n);c.status=r;c.error=n;c.statusCode=e.status;l=y(null,c)}})}if(o.async){return Promise.resolve(d)}if(c!=null&&o.failOnError){throw c}return l};s.notifyResourceLoading=null;return s});