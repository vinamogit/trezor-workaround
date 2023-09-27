/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/Month","sap/ui/unified/library","./DatesRowRenderer","sap/ui/thirdparty/jquery","sap/ui/core/format/DateFormat","sap/ui/core/Locale","sap/ui/core/date/UI5Date"],function(e,t,a,r,i,jQuery,s,n,o){"use strict";var h=a.extend("sap.ui.unified.calendar.DatesRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null}}},renderer:i});h.prototype.init=function(){a.prototype.init.apply(this,arguments);this._iColumns=1;this._aWeekNumbers=[];this._bAlwaysShowSpecialDates=true};h.prototype._setAriaRole=function(e){this._ariaRole=e;return this};h.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};h.prototype.setStartDate=function(a){e._checkJSDateObject(a);var r=a.getFullYear();e._checkYearInValidRange(r);this.setProperty("startDate",a);this._oStartDate=t.fromLocalJSDate(a,this.getPrimaryCalendarType());if(this.getDomRef()){var i=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(a);this._bNoRangeCheck=false;if(i&&this.checkDateFocusable(i)){this.displayDate(i)}}return this};h.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=t.fromLocalJSDate(o.getInstance(),this.getPrimaryCalendarType())}return this._oStartDate};h.prototype.setDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){throw new Error("Date must be in visible date range; "+this)}a.prototype.setDate.apply(this,arguments);return this};h.prototype.displayDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){throw new Error("Date must be in visible date range; "+this)}a.prototype.displayDate.apply(this,arguments);return this};h.prototype._setTopPosition=function(e){this._iTopPosition=e};h.prototype.setPrimaryCalendarType=function(e){a.prototype.setPrimaryCalendarType.apply(this,arguments);if(this._oStartDate){this._oStartDate=new t(this._oStartDate,e)}return this};h.setSecondaryCalendarType=function(e){this._bSecondaryCalendarTypeSet=true;a.prototype.setSecondaryCalendarType.apply(this,arguments);return this};h.prototype._handleBorderReached=function(e){var a=e.getParameter("event");var r=this._getRelativeInfo?this.getDays()*this._getRelativeInfo().iIntervalSize:this.getDays();var i=this._getRelativeInfo?this._getRelativeInfo().iIntervalSize:1;var s=this._getDate();var n=new t(s,this.getPrimaryCalendarType());if(a.type){switch(a.type){case"sapnext":case"sapnextmodifiers":n.setDate(n.getDate()+i);break;case"sapprevious":case"sappreviousmodifiers":n.setDate(n.getDate()-i);break;case"sappagedown":n.setDate(n.getDate()+r);break;case"sappageup":n.setDate(n.getDate()-r);break;default:break}this.fireFocus({date:n.toLocalJSDate(),otherMonth:true,_outsideBorder:true})}};h.prototype.checkDateFocusable=function(a){e._checkJSDateObject(a);if(this._bNoRangeCheck){return false}var r=this._getStartDate();var i=new t(r,this.getPrimaryCalendarType());var s=this.getDays();if(this._getRelativeInfo&&this._getRelativeInfo().bIsRelative){s=this.getDays()*this._getRelativeInfo().iIntervalSize}i.setDate(i.getDate()+s);var n=t.fromLocalJSDate(a,this.getPrimaryCalendarType());return n.isSameOrAfter(r)&&n.isBefore(i)};h.prototype._renderHeader=function(){var e=this._getStartDate();var t=e.getDay();var a=this._getLocaleData();var r=this.$("Names").children();var i=[];if(this._bLongWeekDays||!this._bNamesLengthChecked){i=a.getDaysStandAlone("abbreviated")}else{i=a.getDaysStandAlone("narrow")}var s=a.getDaysStandAlone("wide");var n=0;for(n=0;n<r.length;n++){var o=jQuery(r[n]);o.text(i[(n+t)%7]);o.attr("aria-label",s[(n+t)%7])}if(this._getShowHeader()){var h=this.$("Head");if(h.length>0){var p=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(p,this,a,e);p.flush(h[0]);p.destroy()}}};h.prototype._getFirstWeekDay=function(){return this._getStartDate().getDay()};h.prototype.getWeekNumbers=function(){var e=this.getDays(),a=this._getLocale(),r=this.getPrimaryCalendarType(),i=this._getStartDate(),o=new t(i,r),h=new t(i,r).setDate(o.getDate()+e),p=[];while(o.isBefore(h)){p.push(new t(o,r));o.setDate(o.getDate()+1)}this._aWeekNumbers=p.reduce(function(e,t){var r=s.getInstance({pattern:"w",calendarType:this.getPrimaryCalendarType(),calendarWeekNumbering:this.getCalendarWeekNumbering()},new n(a));var i=Number(r.format(t.toUTCJSDate(),true));if(!e.length||e[e.length-1].number!==i){e.push({len:0,number:i})}e[e.length-1].len++;return e}.bind(this),[]);return this._aWeekNumbers};h.prototype._getCachedWeekNumbers=function(){return this._aWeekNumbers};return h});
//# sourceMappingURL=DatesRow.js.map