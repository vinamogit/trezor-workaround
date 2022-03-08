/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/_OpaLogger","sap/ui/thirdparty/jquery"],function(t,e,i){"use strict";var n="http://localhost:8090";var s=e.getLogger("sap.ui.test._UsageReport");var o=t.extend("sap.ui.test._UsageReport",{constructor:function(t){this.enabled=t&&t.enableUsageReport;this.baseUrl=(t&&t.usageReportUrl||n)+"/api/opa/suites/";if(this.enabled){s.info("Enabled OPA usage report")}var e=sap.ui.test._UsageReport.prototype;Object.keys(e).forEach(function(t){var i=["constructor","getMetadata"].indexOf(t)>-1;if(e.hasOwnProperty(t)&&typeof e[t]==="function"&&!i){var n=e[t];e[t]=function(){if(this.enabled){return n.apply(this,arguments)}}}})},begin:function(t){this._beginSuitePromise=r(this.baseUrl+"begin",t).done(function(t){this._id=t.id;s.debug("Begin report with ID "+t.id)}.bind(this)).fail(function(t){s.debug("Failed to begin report. Error: "+JSON.stringify(t))})},moduleStart:function(t){this._moduleUpdate(t)},testStart:function(){this._isOpaEmpty=false;this._QUnitTimeoutDetails=null},testDone:function(t){if(this._isOpaEmpty){this._reportOpaTest(t);this._isOpaEmpty=false}else{this._QUnitTimeoutDetails=t}},opaEmpty:function(t){this._isOpaEmpty=true;if(t&&t.qunitTimeout){var e=this._QUnitTimeoutDetails.assertions.slice(-1)[0];e.message+="\n"+t.errorMessage;this._reportOpaTest(this._QUnitTimeoutDetails)}},moduleDone:function(t){this._moduleUpdate(t)},done:function(t){this._postSuiteJson("/done",t).done(function(t){s.debug("Completed report with ID "+this._id)}.bind(this)).fail(function(t){s.debug("Failed to complete report with ID "+this._id+". Error: "+JSON.stringify(t))}.bind(this)).always(function(){this._beginSuitePromise=null}.bind(this))},_moduleUpdate:function(t){this._postSuiteJson("/modules",t).done(function(e){s.debug("Sent report for module "+t.name)}).fail(function(e){s.debug("Failed to send report for module '"+t.name+"'. Error: "+JSON.stringify(e))})},_reportOpaTest:function(t){this._postSuiteJson("/tests",t).done(function(e){s.debug("Sent report for test "+t.name)}).fail(function(e){s.debug("Failed send report for test '"+t.name+"'. Error: "+JSON.stringify(e))})},_postSuiteJson:function(t,e){var n=this._beginSuitePromise||(new i.Deferred).resolve().promise();return n.done(function(){return r.call(this,this.baseUrl+this._id+t,e)}.bind(this))}});function r(t,e){return i.ajax({url:t,type:"XHR_WAITER_IGNORE:POST",data:e,dataType:"json"})}return o});