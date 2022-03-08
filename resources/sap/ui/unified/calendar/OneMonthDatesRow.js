/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/DatesRow","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/library","./OneMonthDatesRowRenderer"],function(t,e,a,i,o){"use strict";var s=t.extend("sap.ui.unified.calendar.OneMonthDatesRow",{metadata:{library:"sap.ui.unified"}});s.apiVersion=2;s.prototype.init=function(){t.prototype.init.apply(this,arguments);this.iMode=2};s.prototype.setMode=function(t){var e=this.getSelectedDates(),a,i=this.iMode!==t;this.iMode=t;if(i&&e.length){if(this.iMode<2){a=this.getStartDate()}e[0].setProperty("startDate",a)}this.iMode<2?this._bAlwaysShowSpecialDates=false:this._bAlwaysShowSpecialDates=true;return this};s.prototype.getMode=function(){return this.iMode};s.prototype.selectDate=function(t){if(this.iMode<2&&this.getSelectedDates().length){this.getSelectedDates()[0].setStartDate(t)}return this};s.prototype.setDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){return this}t.prototype.setDate.apply(this,arguments);return this};s.prototype.getDays=function(){if(this.iMode===2){return 31}else{return e._daysInMonth(a.fromLocalJSDate(this.getStartDate()))}};s.prototype.displayDate=function(e){if(!this._bNoRangeCheck&&!this.checkDateFocusable(e)){return this}t.prototype.displayDate.apply(this,arguments);return this};s.prototype.onsaphome=function(t){var e=a.fromLocalJSDate(this.getStartDate());n(t);this.setDate(e.toLocalJSDate());this._focusDate(e);this.fireFocus({date:e.toLocalJSDate(),otherMonth:false})};s.prototype.onsapend=function(t){var i=this.getStartDate(),o;o=a.fromLocalJSDate(i);o.setDate(e._daysInMonth(o));n(t);this.setDate(o.toLocalJSDate());this._focusDate(o);this.fireFocus({date:o.toLocalJSDate(),otherMonth:false})};function n(t){t.stopPropagation();t.preventDefault();t.stopImmediatePropagation(true)}return s});