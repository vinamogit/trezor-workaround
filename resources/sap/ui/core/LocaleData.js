/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/extend","sap/ui/base/Object","./CalendarType","./Locale","sap/base/assert","sap/base/util/LoaderExtensions"],function(e,t,r,n,i,a){"use strict";var o=t.extend("sap.ui.core.LocaleData",{constructor:function(e){this.oLocale=e;t.apply(this);this.mData=h(e)},_get:function(){return this._getDeep(this.mData,arguments)},_getMerged:function(){return this._get.apply(this,arguments)},_getDeep:function(e,t){var r=e;for(var n=0;n<t.length;n++){r=r[t[n]];if(r===undefined){break}}return r},getOrientation:function(){return this._get("orientation")},getCurrentLanguageName:function(){var e=this.getLanguages();var t;var r=this.oLocale.getModernLanguage();var n=this.oLocale.getScript();if(r==="sr"&&n==="Latn"){r="sh";n=null}if(this.oLocale.getRegion()){t=e[r+"_"+this.oLocale.getRegion()]}if(!t&&n){t=e[r+"_"+n]}if(!t){t=e[r]}return t},getLanguages:function(){return this._get("languages")},getScripts:function(){return this._get("scripts")},getTerritories:function(){return this._get("territories")},getMonths:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"months","format",e)},getMonthsStandAlone:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"months","stand-alone",e)},getDays:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide"||e=="short","sWidth must be narrow, abbreviate, wide or short");return this._get(c(t),"days","format",e)},getDaysStandAlone:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide"||e=="short","sWidth must be narrow, abbreviated, wide or short");return this._get(c(t),"days","stand-alone",e)},getQuarters:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"quarters","format",e)},getQuartersStandAlone:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"quarters","stand-alone",e)},getDayPeriods:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"dayPeriods","format",e)},getDayPeriodsStandAlone:function(e,t){i(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");return this._get(c(t),"dayPeriods","stand-alone",e)},getDatePattern:function(e,t){i(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this._get(c(t),"dateFormats",e)},getTimePattern:function(e,t){i(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this._get(c(t),"timeFormats",e)},getDateTimePattern:function(e,t){i(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this._get(c(t),"dateTimeFormats",e)},getCombinedDateTimePattern:function(e,t,r){i(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");i(t=="short"||t=="medium"||t=="long"||t=="full","sStyle must be short, medium, long or full");var n=this.getDateTimePattern(e,r),a=this.getDatePattern(e,r),o=this.getTimePattern(t,r);return n.replace("{0}",o).replace("{1}",a)},getCustomDateTimePattern:function(e,t){var r=this._get(c(t),"dateTimeFormats","availableFormats");return this._getFormatPattern(e,r,t)},getIntervalPattern:function(e,t){var r=this._get(c(t),"dateTimeFormats","intervalFormats"),n,i,a,o,u;if(e){n=e.split("-");i=n[0];a=n[1];o=r[i];if(o){u=o[a];if(u){return u}}}return r.intervalFormatFallback},getCombinedIntervalPattern:function(e,t){var r=this._get(c(t),"dateTimeFormats","intervalFormats"),n=r.intervalFormatFallback;return n.replace(/\{(0|1)\}/g,e)},getCustomIntervalPattern:function(e,t,r){var n=this._get(c(r),"dateTimeFormats","intervalFormats");return this._getFormatPattern(e,n,r,t)},_getFormatPattern:function(e,t,r,n){var i,a,o;if(!n){i=t[e]}else if(typeof n==="string"){if(n=="j"||n=="J"){n=this.getPreferredHourSymbol()}o=t[e];i=o&&o[n]}if(i){if(typeof i==="object"){a=Object.keys(i).map(function(e){return i[e]})}else{return i}}if(!a){a=this._createFormatPattern(e,t,r,n)}if(a&&a.length===1){return a[0]}return a},_createFormatPattern:function(e,t,r,n){var i=this._parseSkeletonFormat(e),a,o=this._findBestMatch(i,e,t),l,g,f,h,m,d,p,y,v=/^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,b,w;if(n){if(typeof n==="string"){y=s[n]?s[n].group:"";if(y){b=u[y].index>i[i.length-1].index}p=n}else{b=true;if(i[0].symbol==="y"&&o&&o.pattern.G){f=s["G"];h=u[f.group];i.splice(0,0,{symbol:"G",group:f.group,match:f.match,index:h.index,field:h.field,length:1})}for(w=i.length-1;w>=0;w--){l=i[w];if(n[l.group]){b=false;break}}for(w=0;w<i.length;w++){l=i[w];if(n[l.group]){p=l.symbol;break}}if((p=="h"||p=="K")&&n.DayPeriod){p="a"}}if(b){return[this.getCustomDateTimePattern(e,r)]}if(o&&o.missingTokens.length===0){m=o.pattern[p];if(m&&o.distance>0){m=this._expandFields(m,o.patternTokens,i)}}if(!m){g=this._get(c(r),"dateTimeFormats","availableFormats");if(v.test(e)&&"ahHkKjJms".indexOf(p)>=0){m=this._getMixedFormatPattern(e,g,r,n)}else{d=this._getFormatPattern(e,g,r);m=this.getCombinedIntervalPattern(d,r)}}a=[m]}else if(!o){m=e;a=[m]}else{if(typeof o.pattern==="string"){a=[o.pattern]}else if(typeof o.pattern==="object"){a=[];for(var _ in o.pattern){m=o.pattern[_];a.push(m)}}if(o.distance>0){if(o.missingTokens.length>0){if(v.test(e)){a=[this._getMixedFormatPattern(e,t,r)]}else{a=this._expandFields(a,o.patternTokens,i);a=this._appendItems(a,o.missingTokens,r)}}else{a=this._expandFields(a,o.patternTokens,i)}}}if(e.indexOf("J")>=0){a.forEach(function(e,t){a[t]=e.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/g,"")})}return a},_parseSkeletonFormat:function(e){var t=[],r={index:-1},n,i,a;for(var o=0;o<e.length;o++){n=e.charAt(o);if(n=="j"||n=="J"){n=this.getPreferredHourSymbol()}if(n==r.symbol){r.length++;continue}i=s[n];a=u[i.group];if(i.group=="Other"||a.diffOnly){throw new Error("Symbol '"+n+"' is not allowed in skeleton format '"+e+"'")}if(a.index<=r.index){throw new Error("Symbol '"+n+"' at wrong position or duplicate in skeleton format '"+e+"'")}r={symbol:n,group:i.group,match:i.match,index:a.index,field:a.field,length:1};t.push(r)}return t},_findBestMatch:function(e,t,r){var n,i,a,o,u,l,g,f,c,h,m={distance:1e4,firstDiffPos:-1};for(var d in r){if(d==="intervalFormatFallback"||d.indexOf("B")>-1){continue}n=this._parseSkeletonFormat(d);l=0;i=[];g=true;if(e.length<n.length){continue}u=0;f=e.length;for(var p=0;p<e.length;p++){a=e[p];o=n[u];if(f===e.length){f=p}if(o){c=s[a.symbol];h=s[o.symbol];if(a.symbol===o.symbol){if(a.length===o.length){if(f===p){f=e.length}}else{if(a.length<c.numericCeiling?o.length<h.numericCeiling:o.length>=h.numericCeiling){l+=Math.abs(a.length-o.length)}else{l+=5}}u++;continue}else{if(a.match==o.match){l+=Math.abs(a.length-o.length)+10;u++;continue}}}i.push(a);l+=50-p}if(u<n.length){g=false}if(g&&(l<m.distance||l===m.distance&&f>m.firstDiffPos)){m.distance=l;m.firstDiffPos=f;m.missingTokens=i;m.pattern=r[d];m.patternTokens=n}}if(m.pattern){return m}},_expandFields:function(e,t,r){var n=typeof e==="string";var i;if(n){i=[e]}else{i=e}var a=i.map(function(e){var n={},i={},a="",o=false,u=0,l,g,f,c,h,m,d,p;r.forEach(function(e){n[e.group]=e});t.forEach(function(e){i[e.group]=e});while(u<e.length){p=e.charAt(u);if(o){a+=p;if(p=="'"){o=false}}else{d=s[p];if(d&&n[d.group]&&i[d.group]){h=n[d.group];m=i[d.group];l=h.length;f=m.length;g=1;while(e.charAt(u+1)==p){u++;g++}if(l===f||(l<d.numericCeiling?g>=d.numericCeiling:g<d.numericCeiling)){c=g}else{c=Math.max(g,l)}for(var y=0;y<c;y++){a+=p}}else{a+=p;if(p=="'"){o=true}}}u++}return a});return n?a[0]:a},_appendItems:function(e,t,r){var n=this._get(c(r),"dateTimeFormats","appendItems");e.forEach(function(r,i){var a,o,u;t.forEach(function(t){o=n[t.group];a="'"+this.getDisplayName(t.field)+"'";u="";for(var s=0;s<t.length;s++){u+=t.symbol}e[i]=o.replace(/\{0\}/,r).replace(/\{1\}/,u).replace(/\{2\}/,a)}.bind(this))}.bind(this));return e},_getMixedFormatPattern:function(e,t,r,n){var i=/^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,a=/MMMM|LLLL/,o=/MMM|LLL/,u=/E|e|c/,s,l,g,f,c,h,m,d;s=i.exec(e);l=s[1];g=s[2];c=this._getFormatPattern(l,t,r);if(n){h=this.getCustomIntervalPattern(g,n,r)}else{h=this._getFormatPattern(g,t,r)}if(a.test(l)){f=u.test(l)?"full":"long"}else if(o.test(l)){f="medium"}else{f="short"}m=this.getDateTimePattern(f,r);d=m.replace(/\{1\}/,c).replace(/\{0\}/,h);return d},getNumberSymbol:function(e){i(e=="decimal"||e=="group"||e=="plusSign"||e=="minusSign"||e=="percentSign","sType must be decimal, group, plusSign, minusSign or percentSign");return this._get("symbols-latn-"+e)},getLenientNumberSymbols:function(e){i(e=="plusSign"||e=="minusSign","sType must be plusSign or minusSign");return this._get("lenient-scope-number")[e]},getDecimalPattern:function(){return this._get("decimalFormat").standard},getCurrencyPattern:function(e){return this._get("currencyFormat")[e]||this._get("currencyFormat").standard},getCurrencySpacing:function(e){return this._get("currencyFormat","currencySpacing",e==="after"?"afterCurrency":"beforeCurrency")},getPercentPattern:function(){return this._get("percentFormat").standard},getMiscPattern:function(e){i(e=="approximately"||e=="atLeast"||e=="atMost"||e=="range","sName must be approximately, atLeast, atMost or range");return this._get("miscPattern")[e]},getMinimalDaysInFirstWeek:function(){return this._get("weekData-minDays")},getFirstDayOfWeek:function(){return this._get("weekData-firstDay")},getWeekendStart:function(){return this._get("weekData-weekendStart")},getWeekendEnd:function(){return this._get("weekData-weekendEnd")},getCustomCurrencyCodes:function(){var e=this._get("currency")||{},t={};Object.keys(e).forEach(function(e){t[e]=e});return t},getCurrencyDigits:function(e){var t=this._get("currency");if(t){if(t[e]&&t[e].hasOwnProperty("digits")){return t[e].digits}else if(t["DEFAULT"]&&t["DEFAULT"].hasOwnProperty("digits")){return t["DEFAULT"].digits}}var r=this._get("currencyDigits",e);if(r==null){r=this._get("currencyDigits","DEFAULT");if(r==null){r=2}}return r},getCurrencySymbol:function(e){var t=this.getCurrencySymbols();return t&&t[e]||e},getCurrencyCodeBySymbol:function(e){var t=this._get("currencySymbols"),r;for(r in t){if(t[r]===e){return r}}return e},getCurrencySymbols:function(){var e=this._get("currency"),t={},r;for(var n in e){r=e[n].isoCode;if(e[n].symbol){t[n]=e[n].symbol}else if(r){t[n]=this._get("currencySymbols")[r]}}return Object.assign({},this._get("currencySymbols"),t)},getUnitDisplayName:function(e){var t=this.getUnitFormat(e);return t&&t["displayName"]||""},getRelativePatterns:function(e,t){if(t===undefined){t="wide"}i(t==="wide"||t==="short"||t==="narrow","sStyle is only allowed to be set with 'wide', 'short' or 'narrow'");var r=[],n=this.getPluralCategories(),a,o,u,s;if(!e){e=["year","month","week","day","hour","minute","second"]}e.forEach(function(e){a=this._get("dateFields",e+"-"+t);for(var i in a){if(i.indexOf("relative-type-")===0){u=parseInt(i.substr(14));r.push({scale:e,value:u,pattern:a[i]})}else if(i.indexOf("relativeTime-type-")==0){o=a[i];s=i.substr(18)==="past"?-1:1;n.forEach(function(t){r.push({scale:e,sign:s,pattern:o["relativeTimePattern-count-"+t]})})}}}.bind(this));return r},getRelativePattern:function(e,t,r,n){var a,o,u,s;if(typeof r==="string"){n=r;r=undefined}if(r===undefined){r=t>0}if(n===undefined){n="wide"}i(n==="wide"||n==="short"||n==="narrow","sStyle is only allowed to be set with 'wide', 'short' or 'narrow'");u=e+"-"+n;if(t===0||t===-2||t===2){a=this._get("dateFields",u,"relative-type-"+t)}if(!a){o=this._get("dateFields",u,"relativeTime-type-"+(r?"future":"past"));s=this.getPluralCategory(Math.abs(t).toString());a=o["relativeTimePattern-count-"+s]}return a},getRelativeSecond:function(e,t){return this.getRelativePattern("second",e,t)},getRelativeMinute:function(e,t){if(e==0){return null}return this.getRelativePattern("minute",e,t)},getRelativeHour:function(e,t){if(e==0){return null}return this.getRelativePattern("hour",e,t)},getRelativeDay:function(e,t){return this.getRelativePattern("day",e,t)},getRelativeWeek:function(e,t){return this.getRelativePattern("week",e,t)},getRelativeMonth:function(e,t){return this.getRelativePattern("month",e,t)},getDisplayName:function(e,t){i(e=="second"||e=="minute"||e=="hour"||e=="zone"||e=="day"||e=="weekday"||e=="week"||e=="month"||e=="quarter"||e=="year"||e=="era","sType must be second, minute, hour, zone, day, weekday, week, month, quarter, year, era");if(t===undefined){t="wide"}i(t==="wide"||t==="short"||t==="narrow","sStyle is only allowed to be set with 'wide', 'short' or 'narrow'");var r=["era","weekday","zone"],n=r.indexOf(e)===-1?e+"-"+t:e;return this._get("dateFields",n,"displayName")},getRelativeYear:function(e,t){return this.getRelativePattern("year",e,t)},getDecimalFormat:function(e,t,r){var n;var i;switch(e){case"long":i=this._get("decimalFormat-long");break;default:i=this._get("decimalFormat-short");break}if(i){var a=t+"-"+r;n=i[a];if(!n){a=t+"-other";n=i[a]}}return n},getCurrencyFormat:function(e,t,r){var n;var i=this._get("currencyFormat-"+e);if(!i){if(e==="sap-short"){throw new Error('Failed to get CLDR data for property "currencyFormat-sap-short"')}i=this._get("currencyFormat-short")}if(i){var a=t+"-"+r;n=i[a];if(!n){a=t+"-other";n=i[a]}}return n},getListFormat:function(e,t){var r=this._get("listPattern-"+(e||"standard")+"-"+(t||"wide"));if(r){return r}return{}},getResolvedUnitFormat:function(e){e=this.getUnitFromMapping(e)||e;return this.getUnitFormat(e)},getUnitFormat:function(e){return this._get("units","short",e)},getUnitFormats:function(){return this._getMerged("units","short")},getUnitFromMapping:function(e){return this._get("unitMappings",e)},getEras:function(e,t){i(e=="wide"||e=="abbreviated"||e=="narrow","sWidth must be wide, abbreviate or narrow");var r=this._get(c(t),"era-"+e),n=[];for(var a in r){n[parseInt(a)]=r[a]}return n},getEraDates:function(e){var t=this._get("eras-"+e.toLowerCase()),r=[];for(var n in t){r[parseInt(n)]=t[n]}return r},getCalendarWeek:function(e,t){i(e=="wide"||e=="narrow","sStyle must be wide or narrow");var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core",this.oLocale.toString()),n="date.week.calendarweek."+e;return r.getText(n,t)},firstDayStartsFirstWeek:function(){return this._get("weekData-algorithm")==="FIRSTDAY_STARTS_FIRSTWEEK"},getPreferredCalendarType:function(){var e=this._get("calendarPreference"),t=e?e.split(" "):[],n,i,a;for(a=0;a<t.length;a++){n=t[a].split("-")[0];for(i in r){if(n===i.toLowerCase()){return i}}}return r.Gregorian},getPreferredHourSymbol:function(){return this._get("timeData","_preferred")},getPluralCategories:function(){var e=this._get("plurals"),t=Object.keys(e);t.push("other");return t},getPluralCategory:function(e){var t=this._get("plurals");if(typeof e==="number"){e=e.toString()}if(!this._pluralTest){this._pluralTest={}}for(var r in t){var n=this._pluralTest[r];if(!n){n=this._parsePluralRule(t[r]);this._pluralTest[r]=n}if(n(e)){return r}}return"other"},_parsePluralRule:function(e){var t="or",r="and",n="%",i="=",a="!=",o="n",u="i",s="f",l="t",g="v",f="w",c="..",h=",";var m=0,d;d=e.split(" ");function p(e){if(d[m]===e){m++;return true}return false}function y(){var e=d[m];m++;return e}function v(){var e,r;e=b();if(p(t)){r=v();return function(t){return e(t)||r(t)}}return e}function b(){var e,t;e=w();if(p(r)){t=b();return function(r){return e(r)&&t(r)}}return e}function w(){var e,t,r;e=_();if(p(i)){r=true}else if(p(a)){r=false}else{throw new Error("Expected '=' or '!='")}t=D();if(r){return function(r){return t(r).indexOf(e(r))>=0}}else{return function(r){return t(r).indexOf(e(r))===-1}}}function _(){var e;e=C();if(p(n)){var t=parseInt(y());return function(r){return e(r)%t}}return e}function C(){if(p(o)){return function(e){return e.n}}else if(p(u)){return function(e){return e.i}}else if(p(s)){return function(e){return e.f}}else if(p(l)){return function(e){return e.t}}else if(p(g)){return function(e){return e.v}}else if(p(f)){return function(e){return e.w}}else{throw new Error("Unknown operand: "+y())}}function D(){var e=[],t=y(),r=t.split(h),n,i,a;r.forEach(function(t){n=t.split(c);if(n.length===1){e.push(parseInt(t))}else{i=parseInt(n[0]);a=parseInt(n[1]);for(var r=i;r<=a;r++){e.push(r)}}});return function(t){return e}}var F=v();if(m!=d.length){throw new Error("Not completely parsed")}return function(e){var t=e.indexOf("."),r,n,i,a;if(t===-1){r=e;n="";i=""}else{r=e.substr(0,t);n=e.substr(t+1);i=n.replace(/0+$/,"")}a={n:parseFloat(e),i:parseInt(r),v:n.length,w:i.length,f:parseInt(n),t:parseInt(i)};return F(a)}}});var u={Era:{field:"era",index:0},Year:{field:"year",index:1},Quarter:{field:"quarter",index:2},Month:{field:"month",index:3},Week:{field:"week",index:4},"Day-Of-Week":{field:"weekday",index:5},Day:{field:"day",index:6},DayPeriod:{field:"hour",index:7,diffOnly:true},Hour:{field:"hour",index:8},Minute:{field:"minute",index:9},Second:{field:"second",index:10},Timezone:{field:"zone",index:11}};var s={G:{group:"Era",match:"Era",numericCeiling:1},y:{group:"Year",match:"Year",numericCeiling:100},Y:{group:"Year",match:"Year",numericCeiling:100},Q:{group:"Quarter",match:"Quarter",numericCeiling:3},q:{group:"Quarter",match:"Quarter",numericCeiling:3},M:{group:"Month",match:"Month",numericCeiling:3},L:{group:"Month",match:"Month",numericCeiling:3},w:{group:"Week",match:"Week",numericCeiling:100},W:{group:"Week",match:"Week",numericCeiling:100},d:{group:"Day",match:"Day",numericCeiling:100},D:{group:"Day",match:"Day",numericCeiling:100},E:{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:1},e:{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:3},c:{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:2},h:{group:"Hour",match:"Hour12",numericCeiling:100},H:{group:"Hour",match:"Hour24",numericCeiling:100},k:{group:"Hour",match:"Hour24",numericCeiling:100},K:{group:"Hour",match:"Hour12",numericCeiling:100},m:{group:"Minute",match:"Minute",numericCeiling:100},s:{group:"Second",match:"Second",numericCeiling:100},z:{group:"Timezone",match:"Timezone",numericCeiling:1},Z:{group:"Timezone",match:"Timezone",numericCeiling:1},O:{group:"Timezone",match:"Timezone",numericCeiling:1},v:{group:"Timezone",match:"Timezone",numericCeiling:1},V:{group:"Timezone",match:"Timezone",numericCeiling:1},X:{group:"Timezone",match:"Timezone",numericCeiling:1},x:{group:"Timezone",match:"Timezone",numericCeiling:1},S:{group:"Other",numericCeiling:100},u:{group:"Other",numericCeiling:100},U:{group:"Other",numericCeiling:1},r:{group:"Other",numericCeiling:100},F:{group:"Other",numericCeiling:100},g:{group:"Other",numericCeiling:100},a:{group:"DayPeriod",numericCeiling:1},b:{group:"Other",numericCeiling:1},B:{group:"Other",numericCeiling:1},A:{group:"Other",numericCeiling:100}};var l={iw:"he",ji:"yi"};var g=function(){var e=n._cldrLocales,t={},r;if(e){for(r=0;r<e.length;r++){t[e[r]]=true}}return t}();var f={};function c(e){if(!e){e=sap.ui.getCore().getConfiguration().getCalendarType()}return"ca-"+e.toLowerCase()}function h(e){var t=e.getLanguage()||"",r=e.getScript()||"",n=e.getRegion()||"",i;function o(e,t){var r,n,i;if(!t){return}for(r in t){if(t.hasOwnProperty(r)){n=e[r];i=t[r];if(n===undefined){e[r]=i}else if(n===null){delete e[r]}else if(typeof n==="object"&&typeof i==="object"){o(n,i)}}}}function u(e){if(!f[e]&&(!g||g[e]===true)){var t=f[e]=a.loadResource("sap/ui/core/cldr/"+e+".json",{dataType:"json",failOnError:false});if(t&&t.__fallbackLocale){o(t,u(t.__fallbackLocale));delete t.__fallbackLocale}}return f[e]}t=t&&l[t]||t;if(t==="no"){t="nb"}if(t==="zh"&&!n){if(r==="Hans"){n="CN"}else if(r==="Hant"){n="TW"}}if(t==="sh"||t==="sr"&&r==="Latn"){t="sr_Latn"}var s=t+"_"+n;if(t&&n){i=u(s)}if(!i&&t){i=u(t)}f[s]=i||u("en");return f[s]}var m=o.extend("sap.ui.core.CustomLocaleData",{constructor:function(e){o.apply(this,arguments);this.mCustomData=sap.ui.getCore().getConfiguration().getFormatSettings().getCustomLocaleData()},_get:function(){var e=Array.prototype.slice.call(arguments),t,r;if(e[0].indexOf("ca-")==0){t=e[0];if(t==c()){e=e.slice(1)}}r=e.join("-");var n=this.mCustomData[r];if(n==null){n=this._getDeep(this.mCustomData,arguments);if(n==null){n=this._getDeep(this.mData,arguments)}}return n},_getMerged:function(){var t=this._getDeep(this.mData,arguments);var r=this._getDeep(this.mCustomData,arguments);return e({},t,r)}});o.getInstance=function(e){return e.hasPrivateUseSubtag("sapufmt")?new m(e):new o(e)};return o});