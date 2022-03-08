/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Device","../Global","../base/Object","./CalendarType","./Locale","sap/ui/thirdparty/URI","sap/base/util/UriParameters","sap/base/util/deepEqual","sap/base/util/Version","sap/base/Log","sap/base/assert","sap/base/util/extend","sap/base/util/isEmptyObject"],function(e,t,i,a,n,r,o,s,u,l,f,c,g){"use strict";var d=i.extend("sap.ui.core.Configuration",{constructor:function(i){this._oCore=i;function a(){function t(){if(e.os.android){var t=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(t){return t[1]}}return navigator.language}return p(navigator.languages&&navigator.languages[0]||t()||navigator.userLanguage||navigator.browserLanguage)||new n("en")}var s={theme:{type:"string",defaultValue:"base"},language:{type:"Locale",defaultValue:a()},formatLocale:{type:"Locale",defaultValue:null},calendarType:{type:"string",defaultValue:null},trailingCurrencyCode:{type:"boolean",defaultValue:true},accessibility:{type:"boolean",defaultValue:true},autoAriaBodyRole:{type:"boolean",defaultValue:false,noUrl:true},animation:{type:"boolean",defaultValue:true},animationMode:{type:d.AnimationMode,defaultValue:undefined},rtl:{type:"boolean",defaultValue:null},debug:{type:"boolean",defaultValue:false},inspect:{type:"boolean",defaultValue:false},originInfo:{type:"boolean",defaultValue:false},noConflict:{type:"boolean",defaultValue:false,noUrl:true},noDuplicateIds:{type:"boolean",defaultValue:true},trace:{type:"boolean",defaultValue:false,noUrl:true},modules:{type:"string[]",defaultValue:[],noUrl:true},areas:{type:"string[]",defaultValue:null,noUrl:true},onInit:{type:"code",defaultValue:undefined,noUrl:true},uidPrefix:{type:"string",defaultValue:"__",noUrl:true},ignoreUrlParams:{type:"boolean",defaultValue:false,noUrl:true},preload:{type:"string",defaultValue:"auto"},rootComponent:{type:"string",defaultValue:"",noUrl:true},preloadLibCss:{type:"string[]",defaultValue:[]},application:{type:"string",defaultValue:""},appCacheBuster:{type:"string[]",defaultValue:[]},bindingSyntax:{type:"string",defaultValue:"default",noUrl:true},versionedLibCss:{type:"boolean",defaultValue:false},manifestFirst:{type:"boolean",defaultValue:false},flexibilityServices:{type:"string",defaultValue:"/sap/bc/lrep"},whitelistService:{type:"string",defaultValue:null,noUrl:true},allowlistService:{type:"string",defaultValue:null,noUrl:true},frameOptions:{type:"string",defaultValue:"default",noUrl:true},frameOptionsConfig:{type:"object",defaultValue:undefined,noUrl:true},support:{type:"string[]",defaultValue:null},testRecorder:{type:"string[]",defaultValue:null},activeTerminologies:{type:"string[]",defaultValue:undefined},securityTokenHandlers:{type:"function[]",defaultValue:[],noUrl:true},"xx-placeholder":{type:"boolean",defaultValue:true},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-test-mobile":{type:"boolean",defaultValue:false},"xx-depCache":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"string",defaultValue:""},"xx-hyphenation":{type:"string",defaultValue:""},"xx-flexBundleRequestForced":{type:"boolean",defaultValue:false},"xx-cssVariables":{type:"string",defaultValue:"false"},statistics:{type:"boolean",defaultValue:false}};var f={"xx-test":"1.15",flexBoxPolyfill:"1.14",sapMeTabContainer:"1.14",sapMeProgessIndicator:"1.14",sapMGrowingList:"1.14",sapMListAsTable:"1.14",sapMDialogWithPadding:"1.14",sapCoreBindingSyntax:"1.24"};this.oFormatSettings=new d.FormatSettings(this);var c=this;function g(e,t){if(typeof t==="undefined"||t===null){return}switch(s[e].type){case"boolean":if(typeof t==="string"){if(s[e].defaultValue){c[e]=t.toLowerCase()!="false"}else{c[e]=t.toLowerCase()==="true"||t.toLowerCase()==="x"}}else{c[e]=!!t}break;case"string":c[e]=""+t;break;case"code":c[e]=typeof t==="function"?t:String(t);break;case"function":if(typeof t!=="function"){throw new Error("unsupported value")}c[e]=t;break;case"function[]":t.forEach(function(e){if(typeof e!=="function"){throw new Error("Not a function: "+e)}});c[e]=t.slice();break;case"string[]":if(Array.isArray(t)){c[e]=t}else if(typeof t==="string"){c[e]=t.split(/[ ,;]/).map(function(e){return e.trim()})}else{throw new Error("unsupported value")}break;case"object":if(typeof t!=="object"){throw new Error("unsupported value")}c[e]=t;break;case"Locale":var i=p(t);if(i||s[e].defaultValue==null){c[e]=i}else{throw new Error("unsupported value")}break;default:var a=s[e].type;if(typeof a==="object"){C(a,t,e);c[e]=t}else{throw new Error("illegal state")}}}function h(e){var t=document.querySelector("META[name='"+e+"']"),i=t&&t.getAttribute("content");if(i){return i}}function m(e){var t=h("sap-allowedThemeOrigins");return!!t&&t.split(",").some(function(t){return t==="*"||e===t.trim()})}function y(e){var t,i;try{t=new r(e).search("");var a=t.origin();if(a&&m(a)){i=t.toString()}else{i=t.absoluteTo(window.location.href).origin(window.location.origin).normalize().toString()}return i+(i.endsWith("/")?"":"/")+"UI5/"}catch(e){}}for(var b in s){c[b]=s[b].defaultValue}var x=window["sap-ui-config"]||{};x.oninit=x.oninit||x["evt-oninit"];for(var b in s){if(x.hasOwnProperty(b.toLowerCase())){g(b,x[b.toLowerCase()])}else if(!/^xx-/.test(b)&&x.hasOwnProperty("xx-"+b.toLowerCase())){g(b,x["xx-"+b.toLowerCase()])}}if(x.libs){c.modules=x.libs.split(",").map(function(e){return e.trim()+".library"}).concat(c.modules)}var v="compatversion";var S=x[v];var L=u("1.14");this._compatversion={};function w(e){var i=!e?S||L.toString():x[v+"-"+e.toLowerCase()]||S||f[e]||L.toString();i=u(i.toLowerCase()==="edge"?t.version:i);return u(i.getMajor(),i.getMinor())}this._compatversion._default=w();for(var b in f){this._compatversion[b]=w(b)}if(!c.ignoreUrlParams){var V="sap-ui-";var T=o.fromQuery(window.location.search);if(T.has("sap-language")){var M=c.sapLogonLanguage=T.get("sap-language");var _=n.fromSAPLogonLanguage(M);if(_){c.language=_}else if(M&&!T.get("sap-locale")&&!T.get("sap-ui-language")){l.warning("sap-language '"+M+"' is not a valid BCP47 language tag and will only be used as SAP logon language")}}if(T.has("sap-locale")){g("language",T.get("sap-locale"))}if(T.has("sap-rtl")){var M=T.get("sap-rtl");if(M==="X"||M==="x"){g("rtl",true)}else{g("rtl",false)}}if(T.has("sap-theme")){var M=T.get("sap-theme");if(M===""){c["theme"]=s["theme"].defaultValue}else{g("theme",M)}}if(T.has("sap-statistics")){var M=T.get("sap-statistics");g("statistics",M)}for(var b in s){if(s[b].noUrl){continue}var M=T.get(V+b);if(M==null&&!/^xx-/.test(b)){M=T.get(V+"xx-"+b)}if(M===""){c[b]=s[b].defaultValue}else{g(b,M)}}if(T.has("sap-ui-legacy-date-format")){this.oFormatSettings.setLegacyDateFormat(T.get("sap-ui-legacy-date-format"))}if(T.has("sap-ui-legacy-time-format")){this.oFormatSettings.setLegacyTimeFormat(T.get("sap-ui-legacy-time-format"))}if(T.has("sap-ui-legacy-number-format")){this.oFormatSettings.setLegacyNumberFormat(T.get("sap-ui-legacy-number-format"))}}c.sapparams=c.sapparams||{};c.sapparams["sap-language"]=this.getSAPLogonLanguage();["sap-client","sap-server","sap-system"].forEach(function(e){if(!c.ignoreUrlParams&&T.get(e)){c.sapparams[e]=T.get(e)}else{c.sapparams[e]=h(e)}});this.derivedRTL=n._impliesRTL(c.language);var F=c.theme;var A;var P=F.indexOf("@");if(P>=0){A=y(F.slice(P+1));if(A){c.theme=F.slice(0,P);c.themeRoot=A}else{c.theme=x.theme&&x.theme!==F?x.theme:"base";P=-1}}c.theme=this._normalizeTheme(c.theme,A);var U=c["languagesDeliveredWithCore"]=n._coreI18nLocales;var D=c["xx-supportedLanguages"];if(D.length===0||D.length===1&&D[0]==="*"){D=[]}else if(D.length===1&&D[0]==="default"){D=U||[]}c["xx-supportedLanguages"]=D;var O=c["xx-fiori2Adaptation"];if(O.length===0||O.length===1&&O[0]==="false"){O=false}else if(O.length===1&&O[0]==="true"){O=true}c["xx-fiori2Adaptation"]=O;if(c["bindingSyntax"]==="default"){c["bindingSyntax"]=c.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0?"simple":"complex"}c["allowlistService"]=c["allowlistService"]||c["whitelistService"];if(!c["allowlistService"]){var I=h("sap.allowlistService")||h("sap.whitelistService");if(I){c["allowlistService"]=I;if(c["frameOptions"]==="default"){c["frameOptions"]="trusted"}}}if(c["frameOptions"]==="default"||c["frameOptions"]!=="allow"&&c["frameOptions"]!=="deny"&&c["frameOptions"]!=="trusted"){c["frameOptions"]="allow"}var R=c["frameOptionsConfig"];if(R){R.allowlist=R.allowlist||R.whitelist}if(c.flexibilityServices&&c.flexibilityServices!==s.flexibilityServices.defaultValue&&c.modules.indexOf("sap.ui.fl.library")==-1){c.modules.push("sap.ui.fl.library")}var B=c["preloadLibCss"];if(B.length>0){B.appManaged=B[0].slice(0,1)==="!";if(B.appManaged){B[0]=B[0].slice(1)}if(B[0]==="*"){B.shift();c.modules.forEach(function(e){var t=e.match(/^(.*)\.library$/);if(t){B.unshift(t[1])}})}}if(c["xx-waitForTheme"]==="true"){c["xx-waitForTheme"]="rendering"}if(c["xx-waitForTheme"]!=="rendering"&&c["xx-waitForTheme"]!=="init"){c["xx-waitForTheme"]=undefined}for(var b in s){if(c[b]!==s[b].defaultValue){l.info("  "+b+" = "+c[b])}}if(this.getAnimationMode()===undefined){if(this.animation){this.setAnimationMode(d.AnimationMode.full)}else{this.setAnimationMode(d.AnimationMode.minimal)}}else{this.setAnimationMode(this.getAnimationMode())}},getVersion:function(){if(this._version){return this._version}this._version=new u(t.version);return this._version},getCompatibilityVersion:function(e){if(typeof e==="string"&&this._compatversion[e]){return this._compatversion[e]}return this._compatversion._default},getTheme:function(){return this.theme},getPlaceholder:function(){return this["xx-placeholder"]},_setTheme:function(e){this.theme=e;return this},_normalizeTheme:function(e,t){if(e&&t==null&&e.match(/^sap_corbu$/i)){return"sap_fiori_3"}return e},getLanguage:function(){return this.language.sLocaleId},getLanguageTag:function(){return this.language.toLanguageTag()},getSAPLogonLanguage:function(){return this.sapLogonLanguage&&this.sapLogonLanguage.toUpperCase()||this.language.getSAPLogonLanguage()},setLanguage:function(e,t){var i=p(e),a=this.getRTL(),r;x(i,"Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");x(t==null||typeof t==="string"&&/[A-Z0-9]{2,2}/i.test(t),"Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only",true);if(i.toString()!=this.getLanguageTag()||t!==this.sapLogonLanguage){this.language=i;this.sapLogonLanguage=t||undefined;this.sapparams["sap-language"]=this.getSAPLogonLanguage();r=this._collect();r.language=this.getLanguageTag();this.derivedRTL=n._impliesRTL(i);if(a!=this.getRTL()){r.rtl=this.getRTL()}this._endCollect()}return this},getLocale:function(){return this.language},getSAPParam:function(e){return this.sapparams&&this.sapparams[e]},isUI5CacheOn:function(){return this["xx-cache-use"]},setUI5CacheOn:function(e){this["xx-cache-use"]=e;return this},isUI5CacheSerializationSupportOn:function(){return this["xx-cache-serialization"]},setUI5CacheSerializationSupport:function(e){this["xx-cache-serialization"]=e;return this},getUI5CacheExcludedKeys:function(){return this["xx-cache-excludedKeys"]},getCalendarType:function(){var e;if(this.calendarType){for(e in a){if(e.toLowerCase()===this.calendarType.toLowerCase()){this.calendarType=e;return this.calendarType}}l.warning("Parameter 'calendarType' is set to "+this.calendarType+" which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale")}var t=this.oFormatSettings.getLegacyDateFormat();switch(t){case"1":case"2":case"3":case"4":case"5":case"6":return a.Gregorian;case"7":case"8":case"9":return a.Japanese;case"A":case"B":return a.Islamic;case"C":return a.Persian}return this.getLocale().getPreferredCalendarType()},setCalendarType:function(e){var t;if(this.calendarType!==e){t=this._collect();this.calendarType=t.calendarType=e;this._endCollect()}return this},getFormatLocale:function(){return(this.formatLocale||this.language).toString()},setFormatLocale:function(e){var t=p(e),i;x(e==null||typeof e==="string"&&t,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");if(h(t)!==h(this.formatLocale)){this.formatLocale=t;i=this._collect();i.formatLocale=h(t);this._endCollect()}return this},getLanguagesDeliveredWithCore:function(){return this["languagesDeliveredWithCore"]},getSupportedLanguages:function(){return this["xx-supportedLanguages"]},getAccessibility:function(){return this.accessibility},getAutoAriaBodyRole:function(){return this.autoAriaBodyRole},getAnimation:function(){return this.animation},getAnimationMode:function(){return this.animationMode},setAnimationMode:function(e){C(d.AnimationMode,e,"animationMode");this.animation=e!==d.AnimationMode.minimal&&e!==d.AnimationMode.none;this.animationMode=e;if(this._oCore&&this._oCore._setupAnimation){this._oCore._setupAnimation()}},getRTL:function(){return this.rtl===null?this.derivedRTL:this.rtl},getFiori2Adaptation:function(){return this["xx-fiori2Adaptation"]},setRTL:function(e){x(e===null||typeof e==="boolean","bRTL must be null or a boolean");var t=this.getRTL(),i;this.rtl=e;if(t!=this.getRTL()){i=this._collect();i.rtl=this.getRTL();this._endCollect()}return this},getDebug:function(){return this.debug},getInspect:function(){return this.inspect},getOriginInfo:function(){return this.originInfo},getNoDuplicateIds:function(){return this.noDuplicateIds},getTrace:function(){return this.trace},getUIDPrefix:function(){return this.uidPrefix},getDesignMode:function(){return this["xx-designMode"]},getSuppressDeactivationOfControllerCode:function(){return this["xx-suppressDeactivationOfControllerCode"]},getControllerCodeDeactivated:function(){return this.getDesignMode()&&!this.getSuppressDeactivationOfControllerCode()},getApplication:function(){return this.application},getRootComponent:function(){return this.rootComponent},getAppCacheBuster:function(){return this.appCacheBuster},getAppCacheBusterMode:function(){return this["xx-appCacheBusterMode"]},getAppCacheBusterHooks:function(){return this["xx-appCacheBusterHooks"]},getDisableCustomizing:function(){return this["xx-disableCustomizing"]},getViewCache:function(){return this["xx-viewCache"]},getPreload:function(){return this.preload},getDepCache:function(){return this["xx-depCache"]},getManifestFirst:function(){return this.manifestFirst},getFlexibilityServices:function(){if(!this.flexibilityServices){this.flexibilityServices=[]}if(typeof this.flexibilityServices==="string"){if(this.flexibilityServices[0]==="/"){this.flexibilityServices=[{url:this.flexibilityServices,layers:["ALL"],connector:"LrepConnector"}]}else{this.flexibilityServices=JSON.parse(this.flexibilityServices)}}return this.flexibilityServices},setFlexibilityServices:function(e){this.flexibilityServices=e},getComponentPreload:function(){return this["xx-componentPreload"]||this.preload},getFormatSettings:function(){return this.oFormatSettings},getFrameOptions:function(){return this.frameOptions},getWhitelistService:function(){return this.getAllowlistService()},getAllowlistService:function(){return this.allowlistService},getSupportMode:function(){return this.support},getTestRecorderMode:function(){return this["testRecorder"]},_collect:function(){var e=this.mChanges||(this.mChanges={__count:0});e.__count++;return e},_endCollect:function(){var e=this.mChanges;if(e&&--e.__count===0){delete e.__count;this._oCore&&this._oCore.fireLocalizationChanged(e);delete this.mChanges}},getStatistics:function(){var e=this.statistics;try{e=e||window.localStorage.getItem("sap-ui-statistics")=="X"}catch(e){}return e},getNoNativeScroll:function(){return false},getHandleValidation:function(){return this["xx-handleValidation"]},getHyphenation:function(){return this["xx-hyphenation"]},getActiveTerminologies:function(){return this["activeTerminologies"]},getSecurityTokenHandlers:function(){return this.securityTokenHandlers.slice()},setSecurityTokenHandlers:function(e){e.forEach(function(e){x(typeof e==="function","Not a function: "+e)});this.securityTokenHandlers=e.slice()},applySettings:function(e){function t(e,i){var a,n;for(a in i){n="set"+a.slice(0,1).toUpperCase()+a.slice(1);if(a==="formatSettings"&&e.oFormatSettings){t(e.oFormatSettings,i[a])}else if(typeof e[n]==="function"){e[n](i[a])}else{l.warning("Configuration.applySettings: unknown setting '"+a+"' ignored")}}}f(typeof e==="object","mSettings must be an object");this._collect();t(this,e);this._endCollect();return this}});d.AnimationMode={full:"full",basic:"basic",minimal:"minimal",none:"none"};function p(e){try{if(e&&typeof e==="string"){return new n(e)}}catch(e){}}function h(e){return e?e.toString():null}var m={"":{pattern:null},1:{pattern:"dd.MM.yyyy"},2:{pattern:"MM/dd/yyyy"},3:{pattern:"MM-dd-yyyy"},4:{pattern:"yyyy.MM.dd"},5:{pattern:"yyyy/MM/dd"},6:{pattern:"yyyy-MM-dd"},7:{pattern:"Gyy.MM.dd"},8:{pattern:"Gyy/MM/dd"},9:{pattern:"Gyy-MM-dd"},A:{pattern:"yyyy/MM/dd"},B:{pattern:"yyyy/MM/dd"},C:{pattern:"yyyy/MM/dd"}};var y={"":{short:null,medium:null,dayPeriods:null},0:{short:"HH:mm",medium:"HH:mm:ss",dayPeriods:null},1:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},2:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},3:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},4:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var b={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},X:{groupingSeparator:",",decimalSeparator:"."},Y:{groupingSeparator:" ",decimalSeparator:","}};function x(e,t){if(!e){throw new Error(t)}}function C(e,t,i){var a=[];for(var n in e){if(e.hasOwnProperty(n)){if(e[n]===t){return}a.push(e[n])}}throw new Error("Unsupported Enumeration value for "+i+", valid values are: "+a.join(", "))}i.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(e){this.oConfiguration=e;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined},getFormatLocale:function(){function e(e){var t=e.oConfiguration.language;if(!g(e.mSettings)){var i=t.toString();if(i.indexOf("-x-")<0){i=i+"-x-sapufmt"}else if(i.indexOf("-sapufmt")<=i.indexOf("-x-")){i=i+"-sapufmt"}t=new n(i)}return t}return this.oConfiguration.formatLocale||e(this)},_set:function(e,t){var i=this.mSettings[e];if(t!=null){this.mSettings[e]=t}else{delete this.mSettings[e]}if((i!=null||t!=null)&&!s(i,t)){var a=this.oConfiguration._collect();a[e]=t;this.oConfiguration._endCollect()}},getCustomUnits:function(){return this.mSettings["units"]?this.mSettings["units"]["short"]:undefined},setCustomUnits:function(e){var t=null;if(e){t={short:e}}this._set("units",t);return this},addCustomUnits:function(e){var t=this.getCustomUnits();if(t){e=c({},t,e)}this.setCustomUnits(e);return this},setUnitMappings:function(e){this._set("unitMappings",e);return this},addUnitMappings:function(e){var t=this.getUnitMappings();if(t){e=c({},t,e)}this.setUnitMappings(e);return this},getUnitMappings:function(){return this.mSettings["unitMappings"]},getDatePattern:function(e){f(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this.mSettings["dateFormats-"+e]},setDatePattern:function(e,t){x(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("dateFormats-"+e,t);return this},getTimePattern:function(e){f(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this.mSettings["timeFormats-"+e]},setTimePattern:function(e,t){x(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("timeFormats-"+e,t);return this},getNumberSymbol:function(e){f(e=="decimal"||e=="group"||e=="plusSign"||e=="minusSign","sType must be decimal, group, plusSign or minusSign");return this.mSettings["symbols-latn-"+e]},setNumberSymbol:function(e,t){x(e=="decimal"||e=="group"||e=="plusSign"||e=="minusSign","sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+e,t);return this},getCustomCurrencies:function(){return this.mSettings["currency"]},setCustomCurrencies:function(e){x(typeof e==="object"||e==null,"mCurrencyDigits must be an object");Object.keys(e||{}).forEach(function(t){x(typeof t==="string");x(typeof e[t]==="object")});this._set("currency",e);return this},addCustomCurrencies:function(e){var t=this.getCustomCurrencies();if(t){e=c({},t,e)}this.setCustomCurrencies(e);return this},setFirstDayOfWeek:function(e){x(typeof e=="number"&&e>=0&&e<=6,"iValue must be an integer value between 0 and 6");this._set("weekData-firstDay",e);return this},_setDayPeriods:function(e,t){f(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");this._set("dayPeriods-format-"+e,t);return this},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined},setLegacyDateFormat:function(e){e=e?String(e).toUpperCase():"";x(!e||m.hasOwnProperty(e),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");var t=this.oConfiguration._collect();this.sLegacyDateFormat=t.legacyDateFormat=e;this.setDatePattern("short",m[e].pattern);this.setDatePattern("medium",m[e].pattern);this.oConfiguration._endCollect();return this},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined},setLegacyTimeFormat:function(e){x(!e||y.hasOwnProperty(e),"sFormatId must be one of ['0','1','2','3','4'] or empty");var t=this.oConfiguration._collect();this.sLegacyTimeFormat=t.legacyTimeFormat=e=e||"";this.setTimePattern("short",y[e]["short"]);this.setTimePattern("medium",y[e]["medium"]);this._setDayPeriods("abbreviated",y[e].dayPeriods);this.oConfiguration._endCollect();return this},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined},setLegacyNumberFormat:function(e){e=e?e.toUpperCase():"";x(!e||b.hasOwnProperty(e),"sFormatId must be one of [' ','X','Y'] or empty");var t=this.oConfiguration._collect();this.sLegacyNumberFormat=t.legacyNumberFormat=e;this.setNumberSymbol("group",b[e].groupingSeparator);this.setNumberSymbol("decimal",b[e].decimalSeparator);this.oConfiguration._endCollect();return this},setLegacyDateCalendarCustomizing:function(e){x(Array.isArray(e),"aMappings must be an Array");var t=this.oConfiguration._collect();this.aLegacyDateCalendarCustomizing=t.legacyDateCalendarCustomizing=e;this.oConfiguration._endCollect();return this},getLegacyDateCalendarCustomizing:function(){return this.aLegacyDateCalendarCustomizing},setTrailingCurrencyCode:function(e){x(typeof e==="boolean","bTrailingCurrencyCode must be a boolean");this.oConfiguration.trailingCurrencyCode=e;return this},getTrailingCurrencyCode:function(){return this.oConfiguration.trailingCurrencyCode},getCustomLocaleData:function(){return this.mSettings}});return d});