/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Device","../base/Object","./AnimationMode","./ControlBehavior","./Locale","./format/TimezoneUtil","sap/ui/core/_ConfigurationProvider","sap/ui/core/date/CalendarWeekNumbering","sap/ui/core/Theming","sap/base/util/Version","sap/base/Log","sap/base/assert","sap/base/config","sap/base/Event","sap/base/strings/camelize","sap/base/util/deepClone","sap/base/i18n/Localization","sap/base/i18n/Formatting"],function(e,t,a,n,r,i,o,u,l,s,g,f,c,p,d,y,m,x){"use strict";var C;var b="1.118.0";var V;function v(){var e="sapUiCompatversion";function t(t){var r=!t?a||n.toString():c.get({name:d(e+"-"+t.toLowerCase()),type:c.Type.String})||a||T[t]||n.toString();r=s(r.toLowerCase()==="edge"?b:r);return s(r.getMajor(),r.getMinor())}var a=c.get({name:e,type:c.Type.String});var n=s("1.14");V={};V._default=t();for(var r in T){V[r]=t(r)}return V}function h(){function t(){if(e.os.android){var t=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(t){return t[1]}}return navigator.language}return _(navigator.languages&&navigator.languages[0]||t()||navigator.userLanguage||navigator.browserLanguage)||new r("en")}function S(e,t){if(t==null){return}z[e]=L(e,t)}function L(e,t){if(t==null){return}switch(C[e].type){case"boolean":if(typeof t==="string"){if(C[e].defaultValue){return t.toLowerCase()!="false"}else{return t.toLowerCase()==="true"||t.toLowerCase()==="x"}}else{return!!t}case"string":return""+t;case"code":return typeof t==="function"?t:String(t);case"function":if(typeof t!=="function"){throw new Error("unsupported value")}return t;case"function[]":t.forEach(function(e){if(typeof e!=="function"){throw new Error("Not a function: "+e)}});return t.slice();case"string[]":if(Array.isArray(t)){return t}else if(typeof t==="string"){return t.split(/[ ,;]/).map(function(e){return e.trim()})}else{throw new Error("unsupported value")}case"object":if(typeof t!=="object"){throw new Error("unsupported value")}return t;case"Locale":var a=_(t);if(a||C[e].defaultValue==null){return a}else{throw new Error("unsupported value")}default:var n=C[e].type;if(typeof n==="object"){c._.checkEnum(n,t,e);return t}else{throw new Error("illegal state")}}}function w(e){var t=document.querySelector("META[name='"+e+"']"),a=t&&t.getAttribute("content");if(a){return a}}var C={theme:{type:"string",defaultValue:"base"},language:{type:"Locale",defaultValue:h()},timezone:{type:"string",defaultValue:i.getLocalTimezone()},formatLocale:{type:"Locale",defaultValue:null},calendarType:{type:"string",defaultValue:null},calendarWeekNumbering:{type:u,defaultValue:u.Default},trailingCurrencyCode:{type:"boolean",defaultValue:true},accessibility:{type:"boolean",defaultValue:true},autoAriaBodyRole:{type:"boolean",defaultValue:false,noUrl:true},animation:{type:"boolean",defaultValue:true},animationMode:{type:a,defaultValue:undefined},rtl:{type:"boolean",defaultValue:null},debug:{type:"boolean",defaultValue:false},inspect:{type:"boolean",defaultValue:false},originInfo:{type:"boolean",defaultValue:false},noConflict:{type:"boolean",defaultValue:false,noUrl:true},noDuplicateIds:{type:"boolean",defaultValue:true},trace:{type:"boolean",defaultValue:false,noUrl:true},modules:{type:"string[]",defaultValue:[],noUrl:true},areas:{type:"string[]",defaultValue:null,noUrl:true},onInit:{type:"code",defaultValue:undefined,noUrl:true},uidPrefix:{type:"string",defaultValue:"__",noUrl:true},ignoreUrlParams:{type:"boolean",defaultValue:false,noUrl:true},preload:{type:"string",defaultValue:"auto"},rootComponent:{type:"string",defaultValue:"",noUrl:true},preloadLibCss:{type:"string[]",defaultValue:[]},application:{type:"string",defaultValue:""},appCacheBuster:{type:"string[]",defaultValue:[]},bindingSyntax:{type:"string",defaultValue:"default",noUrl:true},versionedLibCss:{type:"boolean",defaultValue:false},manifestFirst:{type:"boolean",defaultValue:false},flexibilityServices:{type:"string",defaultValue:"/sap/bc/lrep"},whitelistService:{type:"string",defaultValue:null,noUrl:true},allowlistService:{type:"string",defaultValue:null,noUrl:true},frameOptions:{type:"string",defaultValue:"default",noUrl:true},frameOptionsConfig:{type:"object",defaultValue:undefined,noUrl:true},support:{type:"string[]",defaultValue:null},testRecorder:{type:"string[]",defaultValue:null},activeTerminologies:{type:"string[]",defaultValue:undefined},fileShareSupport:{type:"string",defaultValue:undefined,noUrl:true},securityTokenHandlers:{type:"function[]",defaultValue:[],noUrl:true},productive:{type:"boolean",defaultValue:false,noUrl:true},themeRoots:{type:"object",defaultValue:{},noUrl:true},"xx-placeholder":{type:"boolean",defaultValue:true},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-depCache":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"string",defaultValue:""},"xx-hyphenation":{type:"string",defaultValue:""},"xx-flexBundleRequestForced":{type:"boolean",defaultValue:false},"xx-skipAutomaticFlLibLoading":{type:"boolean",defaultValue:false},"xx-cssVariables":{type:"string",defaultValue:"false"},"xx-debugModuleLoading":{type:"boolean",defaultValue:false},statistics:{type:"boolean",defaultValue:false},"xx-acc-keys":{type:"boolean",defaultValue:false},"xx-measure-cards":{type:"boolean",defaultValue:false}};var T={"xx-test":"1.15",flexBoxPolyfill:"1.14",sapMeTabContainer:"1.14",sapMeProgessIndicator:"1.14",sapMGrowingList:"1.14",sapMListAsTable:"1.14",sapMDialogWithPadding:"1.14",sapCoreBindingSyntax:"1.24"};var U;var A;function D(){A=A||{__count:0};A.__count++;return A}function P(){if(A&&--A.__count===0){var e=A;delete A.__count;A=undefined;U&&U.fireLocalizationChanged(e)}}var M=t.extend("sap.ui.core.Configuration",{constructor:function(){g.error("Configuration is designed as a singleton and should not be created manually! "+"Please require 'sap/ui/core/Configuration' instead and use the module export directly without using 'new'.");return M}});var z={};var O=false;function F(){O=true;var e=window["sap-ui-config"]||{};e.oninit=e.oninit||e["evt-oninit"];for(var t in C){z[t]=Array.isArray(C[t].defaultValue)?[]:C[t].defaultValue;if(e.hasOwnProperty(t.toLowerCase())){S(t,e[t.toLowerCase()])}else if(!/^xx-/.test(t)&&e.hasOwnProperty("xx-"+t.toLowerCase())){S(t,e["xx-"+t.toLowerCase()])}}if(e.libs){z.modules=e.libs.split(",").map(function(e){return e.trim()+".library"}).concat(z.modules)}var a;if(!z.ignoreUrlParams){var n="sap-ui-";a=new URLSearchParams(window.location.search);if(a.has("sap-statistics")){var r=a.get("sap-statistics");S("statistics",r)}for(var t in C){if(C[t].noUrl){continue}var r=a.get(n+t);if(r==null&&!/^xx-/.test(t)){r=a.get(n+"xx-"+t)}if(r===""){z[t]=C[t].defaultValue}else{S(t,r)}}}var i=z["xx-fiori2Adaptation"];if(i.length===0||i.length===1&&i[0]==="false"){i=false}else if(i.length===1&&i[0]==="true"){i=true}z["xx-fiori2Adaptation"]=i;z["allowlistService"]=z["allowlistService"]||z["whitelistService"];if(!z["allowlistService"]){var o=w("sap.allowlistService")||w("sap.whitelistService");if(o){z["allowlistService"]=o;if(z["frameOptions"]==="default"){z["frameOptions"]="trusted"}}}if(z["frameOptions"]==="default"||z["frameOptions"]!=="allow"&&z["frameOptions"]!=="deny"&&z["frameOptions"]!=="trusted"){z["frameOptions"]="allow"}var u=z["frameOptionsConfig"];if(u){u.allowlist=u.allowlist||u.whitelist}if(z.flexibilityServices&&z.flexibilityServices!==C.flexibilityServices.defaultValue&&!z["xx-skipAutomaticFlLibLoading"]&&z.modules.indexOf("sap.ui.fl.library")==-1){z.modules.push("sap.ui.fl.library")}for(var t in C){if(z[t]!==C[t].defaultValue){g.info("  "+t+" = "+z[t])}}var l=M.getSyncCallBehavior();sap.ui.loader.config({reportSyncCalls:l});if(l&&e.__loaded){var s="[nosync]: configuration loaded via sync XHR";if(l===1){g.warning(s)}else{g.error(s)}}}var B;Object.assign(M,{getVersion:function(){if(z._version){return z._version}z._version=new s(b);return z._version},getCompatibilityVersion:function(e){var t=v();if(typeof e==="string"&&t[e]){return t[e]}return t._default},getTheme:l.getTheme,getPlaceholder:function(){return c.get({name:"sapUiXxPlaceholder",type:c.Type.Boolean,external:true,defaultValue:true})},setTheme:function(e){l.setTheme(e);return this},getLanguage:m.getLanguage,setLanguage:m.setLanguage,getLanguageTag:function(){return m.getLanguageTag().toString()},getSAPLogonLanguage:m.getSAPLogonLanguage,getTimezone:m.getTimezone,setTimezone:m.setTimezone,getCalendarType:x.getCalendarType,getCalendarWeekNumbering:x.getCalendarWeekNumbering,getRTL:m.getRTL,setRTL:m.setRTL,getLocale:function(){var e=m.getLanguageTag();return r._getCoreLocale(e)},isUI5CacheOn:function(){return M.getValue("xx-cache-use")},setUI5CacheOn:function(e){z["xx-cache-use"]=e;return this},isUI5CacheSerializationSupportOn:function(){return M.getValue("xx-cache-serialization")},setUI5CacheSerializationSupport:function(e){z["xx-cache-serialization"]=e;return this},getUI5CacheExcludedKeys:function(){return M.getValue("xx-cache-excludedKeys")},setCalendarType:function(e){x.setCalendarType.apply(x,arguments);return this},setCalendarWeekNumbering:function(e){x.setCalendarWeekNumbering.apply(x,arguments);return this},getFormatLocale:function(){return x.getLanguageTag().toString()},setFormatLocale:function(e){x.setLanguageTag.apply(x,arguments);return this},getLanguagesDeliveredWithCore:m.getLanguagesDeliveredWithCore,getSupportedLanguages:m.getSupportedLanguages,getAccessibility:n.isAccessibilityEnabled,getAutoAriaBodyRole:function(){return M.getValue("autoAriaBodyRole")},getAnimation:function(){var e=M.getAnimationMode();return e!==M.AnimationMode.minimal&&e!==M.AnimationMode.none},getAnimationMode:n.getAnimationMode,setAnimationMode:n.setAnimationMode,getFiori2Adaptation:function(){return M.getValue("xx-fiori2Adaptation")},getDebug:function(){return window["sap-ui-debug"]===true||c.get({name:"sapUiDebug",type:c.Type.Boolean,external:true})},getInspect:function(){return M.getValue("inspect")},getOriginInfo:function(){return M.getValue("originInfo")},getNoDuplicateIds:function(){return c.get({name:"sapUiNoDuplicateIds",type:c.Type.Boolean,defaultValue:true,external:true})},getTrace:function(){return M.getValue("trace")},getUIDPrefix:function(){return M.getValue("uidPrefix")},getDesignMode:function(){return c.get({name:"sapUiXxDesignMode",type:c.Type.Boolean,external:true,freeze:true})},getSuppressDeactivationOfControllerCode:function(){return c.get({name:"sapUiXxSuppressDeactivationOfControllerCode",type:c.Type.Boolean,external:true,freeze:true})},getControllerCodeDeactivated:function(){return M.getDesignMode()&&!M.getSuppressDeactivationOfControllerCode()},getApplication:function(){return M.getValue("application")},getRootComponent:function(){return M.getValue("rootComponent")},getAppCacheBuster:function(){return c.get({name:"sapUiAppCacheBuster",type:c.Type.StringArray,external:true,freeze:true})},getAppCacheBusterMode:function(){return c.get({name:"sapUiXxAppCacheBusterMode",type:c.Type.String,defaultValue:"sync",external:true,freeze:true})},getAppCacheBusterHooks:function(){return c.get({name:"sapUiXxAppCacheBusterHooks",type:c.Type.Object,defaultValue:undefined,freeze:true})},getDisableCustomizing:function(){return c.get({name:"sapUiXxDisableCustomizing",type:c.Type.Boolean})},getPreload:function(){if(M.getDebug()===true){return""}var e=c.get({name:"sapUiPreload",type:c.Type.String,defaultValue:"auto",external:true});if(e==="auto"){if(window["sap-ui-optimized"]){e=sap.ui.loader.config().async?"async":"sync"}else{e=""}}return e},getSyncCallBehavior:function(){var e=0;var t={name:"sapUiXxNoSync",type:c.Type.String,external:true,freeze:true};var a=c.get(t);if(a==="warn"){e=1}else{t.type=c.Type.Boolean;if(c.get(t)){e=2}}return e},getDepCache:function(){return c.get({name:"sapUiXxDepCache",type:c.Type.Boolean,external:true})},getManifestFirst:function(){return c.get({name:"sapUiManifestFirst",type:c.Type.Boolean,external:true})},getFlexibilityServices:function(){var e=M.getValue("flexibilityServices")||[];if(typeof e==="string"){if(e[0]==="/"){e=[{url:e,layers:["ALL"],connector:"LrepConnector"}]}else{e=JSON.parse(e)}}z.flexibilityServices=e;return z.flexibilityServices},setFlexibilityServices:function(e){z.flexibilityServices=e.slice()},getComponentPreload:function(){return c.get({name:"sapUiXxComponentPreload",type:c.Type.String,external:true})||M.getPreload()},getFormatSettings:function(){return B},getFrameOptions:function(){return M.getValue("frameOptions")},getWhitelistService:function(){return M.getAllowlistService()},getAllowlistService:function(){return M.getValue("allowlistService")},getFileShareSupport:function(){return M.getValue("fileShareSupport")||undefined},getSupportMode:function(){return M.getValue("support")},getTestRecorderMode:function(){return M.getValue("testRecorder")},getStatistics:function(){return M.getStatisticsEnabled()},getStatisticsEnabled:function(){var e=M.getValue("statistics");try{e=e||window.localStorage.getItem("sap-ui-statistics")=="X"}catch(e){}return e},getNoNativeScroll:function(){return false},getHandleValidation:function(){return M.getValue("xx-handleValidation")},getActiveTerminologies:function(){return c.get({name:"sapUiActiveTerminologies",type:c.Type.StringArray,defaultValue:undefined,external:true})},getSecurityTokenHandlers:function(){return M.getValue("securityTokenHandlers").slice()},getMeasureCards:function(){return M.getValue("xx-measure-cards")},setSecurityTokenHandlers:function(e){e.forEach(function(e){N(typeof e==="function","Not a function: "+e)});z.securityTokenHandlers=e.slice()},getBindingSyntax:function(){var e=c.get({name:"sapUiBindingSyntax",type:c.Type.String,defaultValue:"default",freeze:true});if(e==="default"){e=M.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0?"simple":"complex"}return e},applySettings:function(e){function t(e,a){var n,r;for(n in a){r="set"+n.slice(0,1).toUpperCase()+n.slice(1);if(n==="formatSettings"&&B){t(B,a[n])}else if(typeof e[r]==="function"){e[r](a[n])}else{g.warning("Configuration.applySettings: unknown setting '"+n+"' ignored")}}}f(typeof e==="object","mSettings must be an object");D();t(M,e);P();return this},setCore:function(e){U=e;F()},getValue:function(e){var t;if(typeof e!=="string"||!Object.hasOwn(C,e)){throw new TypeError("Parameter 'sName' must be the name of a valid configuration option (one of "+Object.keys(C).map(function(e){return"'"+e+"'"}).sort().join(", ")+")")}if(O||z.hasOwnProperty(e)){t=z[e]}else{if(!z.ignoreUrlParams&&!C[e].noUrl){var a=new URLSearchParams(window.location.search);t=a.get("sap-ui-"+e)||a.get("sap-"+e)}t=t?t:window["sap-ui-config"][e]||window["sap-ui-config"][e.toLowerCase()];try{t=t===undefined?C[e].defaultValue:L(e,t)}catch(a){t=C[e].defaultValue}}if(typeof C[e].type==="string"&&(C[e].type.endsWith("[]")||C[e].type==="object")){t=y(t)}return t}});M.AnimationMode=a;function _(e){try{if(e&&typeof e==="string"){return new r(e)}}catch(e){}}function N(e,t){if(!e){throw new Error(t)}}var k=t.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(){this.mSettings={}},getFormatLocale:function(){var e=x.getLanguageTag();return r._getCoreLocale(e)},_set:x._set,getCustomUnits:x.getCustomUnits,setCustomUnits:x.setCustomUnits,addCustomUnits:x.addCustomUnits,setUnitMappings:x.setUnitMappings,addUnitMappings:x.addUnitMappings,getUnitMappings:x.getUnitMappings,getDatePattern:x.getDatePattern,setDatePattern:x.setDatePattern,getTimePattern:x.getTimePattern,setTimePattern:x.setTimePattern,getNumberSymbol:x.getNumberSymbol,setNumberSymbol:x.setNumberSymbol,getCustomCurrencies:x.getCustomCurrencies,setCustomCurrencies:x.setCustomCurrencies,addCustomCurrencies:x.addCustomCurrencies,setFirstDayOfWeek:function(e){N(typeof e=="number"&&e>=0&&e<=6,"iValue must be an integer value between 0 and 6");x._set("weekData-firstDay",e);return this},_setDayPeriods:x._setDayPeriods,getLegacyDateFormat:x.getLegacyDateFormat,setLegacyDateFormat:x.setLegacyDateFormat,getLegacyTimeFormat:x.getLegacyTimeFormat,setLegacyTimeFormat:x.setLegacyTimeFormat,getLegacyNumberFormat:x.getLegacyNumberFormat,setLegacyNumberFormat:x.setLegacyNumberFormat,setLegacyDateCalendarCustomizing:x.setLegacyDateCalendarCustomizing,getLegacyDateCalendarCustomizing:x.getLegacyDateCalendarCustomizing,setTrailingCurrencyCode:x.setTrailingCurrencyCode,getTrailingCurrencyCode:x.getTrailingCurrencyCode,getCustomLocaleData:x.getCustomLocaleData});B=new k(this);m.attachChange(function(e){if(!A&&U){U.fireLocalizationChanged(p.getParameters(e))}else if(A){Object.assign(A,p.getParameters(e))}});x.attachChange(function(e){if(!A&&U){U.fireLocalizationChanged(p.getParameters(e))}else if(A){Object.assign(A,p.getParameters(e))}});return M});
//# sourceMappingURL=Configuration.js.map