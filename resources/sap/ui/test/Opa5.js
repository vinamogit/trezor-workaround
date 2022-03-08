/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/test/Opa","sap/ui/test/OpaPlugin","sap/ui/test/PageObjectFactory","sap/ui/base/Object","sap/ui/test/launchers/iFrameLauncher","sap/ui/test/launchers/componentLauncher","sap/ui/core/routing/HashChanger","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/AggregationFilled","sap/ui/test/matchers/PropertyStrictEquals","sap/ui/test/pipelines/ActionPipeline","sap/ui/test/_ParameterValidator","sap/ui/test/_OpaLogger","sap/ui/thirdparty/URI","sap/ui/base/EventProvider","sap/ui/qunit/QUnitUtils","sap/ui/test/autowaiter/_autoWaiter","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery","sap/ui/test/_OpaUriParameterParser","sap/ui/test/_ValidationParameters"],function(e,t,r,n,i,a,o,s,u,c,p,f,h,l,d,g,v,w,m,y,x){"use strict";var F=h.getLogger("sap.ui.test.Opa5"),_=new p,E="OpaFrame",O=new f({errorPrefix:"sap.ui.test.Opa5#waitFor"}),P=Object.keys(x.OPA5_WAITFOR_CONFIG),b=Object.keys(x.OPA_WAITFOR),A=[],C=new d;var W=n.extend("sap.ui.test.Opa5",m.extend({},e.prototype,{constructor:function(){e.apply(this,arguments)}}));W._appUriParams=y._getAppParams();W._allUriParams=(new l).search(true);W._oPlugin=new t;function I(){var t={};var r=["source","timeout","autoWait","width","height"];if(arguments.length===1&&m.isPlainObject(arguments[0])){t=arguments[0]}else{var n=arguments;r.forEach(function(e,r){t[e]=n[r]})}if(t.source&&typeof t.source!=="string"){t.source=t.source.toString()}var a=new l(t.source?t.source:"");a.search(m.extend(a.search(true),e.config.appParams));var o=M();o.success=function(){U({source:a.toString(),width:t.width||e.config.frameWidth,height:t.height||e.config.frameHeight})};this.waitFor(o);var s=M();s.check=i.hasLaunched;s.timeout=t.timeout||80;s.errorMessage="unable to load the IFrame with the url: "+t.source;this.waitFor(s);var u=M();u.success=function(){this._loadExtensions(i.getWindow())}.bind(this);this.waitFor(u);var c=M();c.autoWait=t.autoWait||false;c.timeout=t.timeout||80;return this.waitFor(c)}W.prototype.iStartMyUIComponent=function t(r){var n=this;var i=false;r=r||{};var s=M();s.success=function(){var t=new l;t.search(m.extend(t.search(true),e.config.appParams));window.history.replaceState({},"",t.toString())};this.waitFor(s);var u=M();u.success=function(){var e=sap.ui.require.toUrl("sap/ui/test/OpaCss")+".css";w(e);o.getInstance().setHash(r.hash||"");a.start(r.componentConfig).then(function(){i=true})};this.waitFor(u);var c=M();c.errorMessage="Unable to load the component with the name: "+r.name;c.check=function(){return i};if(r.timeout){c.timeout=r.timeout}n.waitFor(c);var p=M();p.success=function(){this._loadExtensions(window)}.bind(this);this.waitFor(p);var f=M();f.autoWait=r.autoWait||false;f.timeout=r.timeout||80;return this.waitFor(f)};W.prototype.iTeardownMyUIComponent=function e(){var t=M();t.success=function(){a.teardown()};var r=M();r.success=function(){var e=new l;e.search(W._allUriParams);window.history.replaceState({},"",e.toString())};return m.when(this.waitFor(t),this.waitFor(r))};W.prototype.iTeardownMyApp=function(){var e=this;var t=M();t.success=function(){e._unloadExtensions(W.getWindow())};var r=M();r.success=function(){if(i.hasLaunched()){this.iTeardownMyAppFrame()}else if(a.hasLaunched()){this.iTeardownMyUIComponent()}else{var e="A teardown was called but there was nothing to tear down use iStartMyComponent or iStartMyAppInAFrame";F.error(e,"Opa");throw new Error(e)}}.bind(this);return m.when(this.waitFor(t),this.waitFor(r))};W.iStartMyAppInAFrame=I;W.prototype.iStartMyAppInAFrame=I;function L(){var e=M();e.success=function(){i.teardown()};return this.waitFor(e)}W.iTeardownMyAppFrame=L;W.prototype.iTeardownMyAppFrame=L;W.prototype.hasAppStartedInAFrame=function(){return i.hasLaunched()};W.prototype.hasUIComponentStarted=function(){return a.hasLaunched()};W.prototype.hasAppStarted=function(){return i.hasLaunched()||a.hasLaunched()};W.prototype.waitFor=function(r){var n=S(r);var a=j(r,n);if(a){a.success=function(e){var t=Array.isArray(e)?e[0]:e;var i=T(r,n,t);return W.prototype.waitFor.call(this,i)};return W.prototype.waitFor.call(this,a)}var o=r.actions,s=e._createFilteredConfig(P),u;r=m.extend({},s,r);r.actions=o;O.validate({validationInfo:x.OPA5_WAITFOR,inputToValidate:r});var c=r.check,p=null,f=r.success,h,l;u=e._createFilteredOptions(b,r);u.check=function(){var e=!!r.actions||r.autoWait;var n=W._getAutoWaiter();n.extendConfig(r.autoWait);if(e&&n.hasToWait()){return false}var a=W.getPlugin();var o=m.extend({},r,{interactable:e||r.interactable});h=a._getFilteredControls(o,p);if(i.hasLaunched()&&Array.isArray(h)){var s=[];h.forEach(function(e){s.push(e)});h=s}if(h===t.FILTER_FOUND_NO_CONTROLS){F.debug("Matchers found no controls so check function will be skipped");return false}if(c){return this._executeCheck(c,h)}return true};u.success=function(){var t=e._getWaitForCounter();if(o&&(h||!l)){_.process({actions:o,control:h})}if(!f){return}var n=[];if(h){n.push(h)}if(t.get()===0){F.timestamp("opa.waitFor.success");F.debug("Execute success handler");f.apply(this,n);return}var i=M();if(m.isPlainObject(r.autoWait)){i.autoWait=m.extend({},r.autoWait)}else{i.autoWait=r.autoWait}i.success=function(){f.apply(this,n)};this.waitFor(i)};return e.prototype.waitFor.call(this,u)};W.getPlugin=function(){return i.getPlugin()||W._oPlugin};W.getJQuery=function(){return i.getJQuery()||m};W.getWindow=function(){return i.getWindow()||window};W.getUtils=function(){return i.getUtils()||g};W.getHashChanger=function(){return i.getHashChanger()||o.getInstance()};W._getAutoWaiter=function(){return i._getAutoWaiter()||v};W.extendConfig=function(t){e.extendConfig(t);e.extendConfig({appParams:W._appUriParams});W._getAutoWaiter().extendConfig(t.autoWait)};W.resetConfig=function(){e.resetConfig();e.extendConfig({viewNamespace:"",arrangements:new W,actions:new W,assertions:new W,visible:true,enabled:undefined,editable:undefined,autoWait:false,_stackDropCount:1});e.extendConfig({appParams:W._appUriParams})};W.getTestLibConfig=function(t){return e.config.testLibs&&e.config.testLibs[t]?e.config.testLibs[t]:{}};W.emptyQueue=e.emptyQueue;W.stopQueue=e.stopQueue;W.getContext=e.getContext;W.matchers={};W.matchers.Matcher=s;W.matchers.AggregationFilled=u;W.matchers.PropertyStrictEquals=c;W.createPageObjects=function(e){return r.create(e,W)};W.prototype._executeCheck=function(e,t){var r=[];t&&r.push(t);F.debug("Executing OPA check function on controls "+t);F.debug("Check function is:\n"+e);var n=e.apply(this,r);F.debug("Result of check function is: "+n||"not defined or null");return n};W.prototype.iWaitForPromise=function(t){var r=M();return e.prototype._schedulePromiseOnFlow.call(this,t,r)};W.resetConfig();function U(t){var r=sap.ui.require.toUrl("sap/ui/test/OpaCss")+".css";w(r);var n=m.extend({},t,{frameId:E,opaLogLevel:e.config.logLevel,disableHistoryOverride:e.config.disableHistoryOverride});return i.launch(n)}function M(){return{viewName:null,controlType:null,id:null,searchOpenDialogs:false,autoWait:false}}m(function(){if(m("#"+E).length){U()}m("body").addClass("sapUiBody");m("html").height("100%")});W._getEventProvider=function(){return C};W.prototype._loadExtensions=function(t){var r=e.config.extensions?e.config.extensions:[];var n=m.when.apply(m,m.map(r,function(e){var r=m.Deferred();t.sap.ui.require([e],function(n){var i=new n;i.name=i.getMetadata?i.getMetadata().getName():e;this._executeExtensionOnAfterInit(i,t).done(function(){W._getEventProvider().fireEvent("onExtensionAfterInit",{extension:i,appWindow:t});this._addExtension(i);r.resolve()}.bind(this)).fail(function(e){F.error(new Error("Error during extension init: "+e),"Opa");r.resolve()})}.bind(this));return r.promise()}.bind(this)));return this.iWaitForPromise(n)};W.prototype._unloadExtensions=function(e){var t=this;var r=m.when.apply(m,m.map(this._getExtensions(),function(r){var n=m.Deferred();W._getEventProvider().fireEvent("onExtensionBeforeExit",{extension:r});t._executeExtensionOnBeforeExit(r,e).done(function(){n.resolve()}).fail(function(e){F.error(new Error("Error during extension init: "+e),"Opa");n.resolve()});return n.promise()}));this.iWaitForPromise(r)};W.prototype._addExtension=function(e){A.push(e)};W.prototype._getExtensions=function(){return A};W.prototype._executeExtensionOnAfterInit=function(e,t){var r=m.Deferred();var n=e.onAfterInit;if(n){n.bind(t)().done(function(){r.resolve()}).fail(function(t){r.reject(new Error("Error while waiting for extension: "+e.name+" to init, details: "+t))})}else{r.resolve()}return r.promise()};W.prototype._executeExtensionOnBeforeExit=function(e,t){var r=m.Deferred();var n=e.onBeforeExit;if(n){n.bind(t)().done(function(){r.resolve()}).fail(function(t){r.reject(new Error("Error while waiting for extension: "+e.name+" to exit, details: "+t))})}else{r.resolve()}return r.promise()};function S(e){var t;["ancestor","descendant","sibling"].forEach(function(r){if(e[r]&&jQuery.isPlainObject(e[r])){t=[r]}else if(e.matchers&&e.matchers[r]&&jQuery.isPlainObject(e.matchers[r])){t=["matchers",r]}});return t}function j(e,t){if(t){var r=e;t.forEach(function(e){if(r[e]!==undefined){r=r[e]}});return r}}function T(e,t,r){if(t){var n=jQuery.extend({},e);var i=n;var a=0;while(a<t.length-1){i=n[t[a++]]}i[t[a]]=r;return n}}return W});