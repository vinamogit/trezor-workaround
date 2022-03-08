/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/Month","sap/ui/unified/library","./DatesRowRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,r,i,s){"use strict";var o=a.extend("sap.ui.unified.calendar.DatesRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true}}}});o.prototype.init=function(){a.prototype.init.apply(this,arguments);this._iColumns=1;this._aWeekNumbers=[];this._bAlwaysShowSpecialDates=true};o.prototype._setAriaRole=function(e){this._ariaRole=e;return this};o.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};o.prototype.setStartDate=function(a){e._checkJSDateObject(a);var r=a.getFullYear();e._checkYearInValidRange(r);this.setProperty("startDate",a);this._oStartDate=t.fromLocalJSDate(a,this.getPrimaryCalendarType());if(this.getDomRef()){var i=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(a);this._bNoRangeCheck=false;if(i&&this.checkDateFocusable(i)){this.displayDate(i)}}return this};o.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=t.fromLocalJSDate(new Date,this.getPrimaryCalendarType())}return this._oStartDate};o.prototype.setDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){throw new Error("Date must be in visible date range; "+this)}a.prototype.setDate.apply(this,arguments);return this};o.prototype.displayDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){throw new Error("Date must be in visible date range; "+this)}a.prototype.displayDate.apply(this,arguments);return this};o.prototype._setTopPosition=function(e){this._iTopPosition=e};o.prototype.setPrimaryCalendarType=function(e){a.prototype.setPrimaryCalendarType.apply(this,arguments);if(this._oStartDate){this._oStartDate=new t(this._oStartDate,e)}return this};o.prototype._handleBorderReached=function(e){var a=e.getParameter("event");var r=this._getRelativeInfo?this.getDays()*this._getRelativeInfo().iIntervalSize:this.getDays();var i=this._getRelativeInfo?this._getRelativeInfo().iIntervalSize:1;var s=this._getDate();var o=new t(s,this.getPrimaryCalendarType());if(a.type){switch(a.type){case"sapnext":case"sapnextmodifiers":o.setDate(o.getDate()+i);break;case"sapprevious":case"sappreviousmodifiers":o.setDate(o.getDate()-i);break;case"sappagedown":o.setDate(o.getDate()+r);break;case"sappageup":o.setDate(o.getDate()-r);break;default:break}this.fireFocus({date:o.toLocalJSDate(),otherMonth:true,_outsideBorder:true})}};o.prototype.checkDateFocusable=function(a){e._checkJSDateObject(a);if(this._bNoRangeCheck){return false}var r=this._getStartDate();var i=new t(r,this.getPrimaryCalendarType());var s=this.getDays();if(this._getRelativeInfo&&this._getRelativeInfo().bIsRelative){s=this.getDays()*this._getRelativeInfo().iIntervalSize}i.setDate(i.getDate()+s);var o=t.fromLocalJSDate(a,this.getPrimaryCalendarType());return o.isSameOrAfter(r)&&o.isBefore(i)};o.prototype._renderHeader=function(){var e=this._getStartDate();var t=e.getDay();var a=this._getLocaleData();var r=this.$("Names").children();var i=[];if(this._bLongWeekDays||!this._bNamesLengthChecked){i=a.getDaysStandAlone("abbreviated")}else{i=a.getDaysStandAlone("narrow")}var o=a.getDaysStandAlone("wide");var n=0;for(n=0;n<r.length;n++){var h=s(r[n]);h.text(i[(n+t)%7]);h.attr("aria-label",o[(n+t)%7])}if(this._getShowHeader()){var p=this.$("Head");if(p.length>0){var l=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(l,this,a,e);l.flush(p[0]);l.destroy()}}};o.prototype._getFirstWeekDay=function(){return this._getStartDate().getDay()};o.prototype.getWeekNumbers=function(){var a=this.getDays(),r=this._getLocale(),i=this._getLocaleData(),s=this.getPrimaryCalendarType(),o=this._getStartDate(),n=new t(o,s),h=new t(o,s).setDate(n.getDate()+a),p=[];while(n.isBefore(h)){p.push(new t(n,s));n.setDate(n.getDate()+1)}this._aWeekNumbers=p.reduce(function(t,a){var s=e.calculateWeekNumber(a.toUTCJSDate(),a.getYear(),r,i);if(!t.length||t[t.length-1].number!==s){t.push({len:0,number:s})}t[t.length-1].len++;return t},[]);return this._aWeekNumbers};o.prototype._getCachedWeekNumbers=function(){return this._aWeekNumbers};return o});