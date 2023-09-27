/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepExtend","sap/base/util/extend","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/test/_LogCollector","sap/ui/test/_OpaLogger","sap/ui/test/_ParameterValidator","sap/ui/test/_UsageReport","sap/ui/test/_OpaUriParameterParser","sap/ui/test/_ValidationParameters"],function(e,t,r,n,i,a,o,s,u,c){"use strict";var f=a.getLogger("sap.ui.test.Opa"),l=i.getInstance(),g=[],p={},d=-1,m,v,h,_,w=new o({errorPrefix:"sap.ui.test.Opa#waitFor"});l.start();function y(e,t){if(window["sap-ui-debug"]){t.timeout=t.debugTimeout}var r=new Date;n();function n(){f.timestamp("opa.check");l.getAndClearLog();var i=e();_=t._stack;if(i.error){v.reject(t);return}if(i.result){O();return}var a=(new Date-r)/1e3;if(t.timeout===0||t.timeout>a){d=setTimeout(n,t.pollingInterval);return}P("Opa timeout after "+t.timeout+" seconds",t);if(t.error){try{t.error(t,i.arguments)}finally{v.reject(t)}}else{v.reject(t)}}}function O(){if(!g.length){if(v){v.resolve()}return true}var e=g.shift();d=setTimeout(function(){y(e.callback,e.options)},(I.config.asyncPolling?e.options.pollingInterval:0)+I.config.executionDelay)}function k(e,t){var r=e.get();if(r){var n=g.splice(g.length-r,r);n.forEach(function(e){e.options._nestedIn=t});g=n.concat(g)}}function C(e){return"Exception thrown by the testcode:'"+F(e)+"'"}function F(e){var t=e.toString();if(e.stack){t+="\n"+e.stack}return t}function P(e,t,r){var n=l.getAndClearLog();if(n){e+="\nThis is what Opa logged:\n"+n}if(!r&&t._stack){e+=x(t)}if(t.errorMessage){t.errorMessage+="\n"+e}else{t.errorMessage=e}f.error(t.errorMessage,"Opa")}function b(e){e=(e||0)+2;if(r.browser.mozilla){e=e-1}var t=new Error,n=t.stack;if(!n){try{throw t()}catch(e){n=e.stack}}if(!n){return""}n=n.split("\n");n.splice(0,e);return n.join("\n")}function x(e){var t="\nCallstack:\n";if(e._stack){t+=e._stack;delete e._stack}else{t+="Unknown"}if(e._nestedIn){t+=x(e._nestedIn);delete e._nestedIn}return t}var I=function(e){this.and=this;t(this,e)};I.config={};I.extendConfig=function(t){var r=["actions","assertions","arrangements"];r.filter(function(e){return!!t[e]}).forEach(function(e){var r=t[e];var n=Object.getPrototypeOf(t[e]);var i=I.config[e];var a=Object.getPrototypeOf(I.config[e]);for(var o in i){if(!(o in r)){r[o]=i[o]}}for(var s in a){if(!(s in r)){n[s]=a[s]}}});I.config=e(I.config,t,I._uriParams);a.setLevel(I.config.logLevel)};var T=0;if(r.browser.safari){T=50}I.resetConfig=function(){I.config=t({arrangements:new I,actions:new I,assertions:new I,timeout:15,pollingInterval:400,debugTimeout:0,_stackDropCount:0,executionDelay:T,asyncPolling:false},I._uriParams)};I.getContext=function(){return p};I.emptyQueue=function e(){if(h){throw new Error("Opa is emptying its queue. Calling Opa.emptyQueue() is not supported at this time.")}h=true;m=null;v=n.Deferred();O();return v.promise().fail(function(e){g=[];if(m){var t=m.qunitTimeout?"QUnit timeout after "+m.qunitTimeout+" seconds":"Queue was stopped manually";e._stack=m.qunitTimeout&&_||b(1);P(t,e)}}).always(function(){g=[];d=-1;v=null;_=null;h=false})};I.stopQueue=function e(){I._stopQueue()};I._stopQueue=function(e){g=[];if(!v){f.warning("stopQueue was called before emptyQueue, queued tests have never been executed","Opa")}else{if(d!==-1){clearTimeout(d)}m=e||{};v.reject(m)}};I._uriParams=u._getOpaParams();I.resetConfig();I._usageReport=new s(I.config);a.setLevel(I.config.logLevel);I.prototype={getContext:I.getContext,waitFor:function(e){var r=n.Deferred(),i=I._createFilteredConfig(I._aConfigValuesForWaitFor);e=t({},i,e);this._validateWaitFor(e);e._stack=b(1+e._stackDropCount);delete e._stackDropCount;var a=t({},this);r.promise(a);g.push({callback:function(){var t=true;if(e.check){try{t=e.check.apply(this,arguments)}catch(t){var n="Failure in Opa check function\n"+C(t);P(n,e,t.stack);r.reject(e);return{error:true,arguments:arguments}}}if(m){return{result:true,arguments:arguments}}if(!t){return{result:false,arguments:arguments}}if(e.success){var i=I._getWaitForCounter();try{e.success.apply(this,arguments)}catch(t){var n="Failure in Opa success function\n"+C(t);P(n,e,t.stack);r.reject(e);return{error:true,arguments:arguments}}finally{k(i,e)}}r.resolve();return{result:true,arguments:arguments}}.bind(this),options:e});return a},extendConfig:I.extendConfig,emptyQueue:I.emptyQueue,iWaitForPromise:function(e){return this._schedulePromiseOnFlow(e)},_schedulePromiseOnFlow:function(e,t){t=t||{};var r={};t.check=function(){if(!r.started){r.started=true;e.then(function(){r.done=true},function(e){r.errorMessage="Error while waiting for promise scheduled on flow"+(e?", details: "+F(e):"")})}if(r.errorMessage){throw new Error(r.errorMessage)}else{return!!r.done}};return this.waitFor(t)},_validateWaitFor:function(e){w.validate({validationInfo:c.OPA_WAITFOR,inputToValidate:e})}};I._createFilteredOptions=function(e,t){var r={};e.forEach(function(e){var n=t[e];if(n===undefined){return}r[e]=n});return r};I._createFilteredConfig=function(e){return I._createFilteredOptions(e,I.config)};I._getWaitForCounter=function(){var e=g.length;return{get:function(){var t=g.length-e;return Math.max(t,0)}}};I._aConfigValuesForWaitFor=Object.keys(c.OPA_WAITFOR_CONFIG);return I},true);
//# sourceMappingURL=Opa.js.map