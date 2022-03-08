/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./InputBase","./DatePicker","sap/ui/model/type/Date","sap/ui/unified/DateRange","./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/format/DateFormat","sap/ui/core/LocaleData","./TimePickerClocks","./DateTimePickerRenderer","./SegmentedButton","./SegmentedButtonItem","./ResponsivePopover","./Button","sap/ui/events/KeyCodes","sap/ui/core/IconPool"],function(e,t,i,o,s,a,n,r,p,l,u,g,c,h,d,f,_,C){"use strict";var y=a.PlacementType,m=a.ButtonType,S="Phone";var D=i.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",properties:{minutesStep:{type:"int",group:"Misc",defaultValue:1},secondsStep:{type:"int",group:"Misc",defaultValue:1},showCurrentTimeButton:{type:"boolean",group:"Behavior",defaultValue:false}},designtime:"sap/m/designtime/DateTimePicker.designtime",dnd:{draggable:false,droppable:true}}});var P={Short:"short",Medium:"medium",Long:"long",Full:"full"};var v=n.extend("sap.m.internal.DateTimePickerPopup",{metadata:{library:"sap.m",aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},clocks:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.class("sapMDateTimePopupCont").class("sapMTimePickerDropDown");e.openEnd();var i=t.getAggregation("_switcher");if(i){e.openStart("div");e.class("sapMTimePickerSwitch");e.openEnd();e.renderControl(i);e.close("div")}var o=t.getCalendar();if(o){e.renderControl(o)}e.openStart("div");e.class("sapMTimePickerSep");e.openEnd();e.close("div");var s=t.getClocks();if(s){e.renderControl(s)}e.close("div")}},init:function(){},onBeforeRendering:function(){var t=this.getAggregation("_switcher");if(!t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");var o=i.getText("DATETIMEPICKER_DATE");var s=i.getText("DATETIMEPICKER_TIME");t=new c(this.getId()+"-Switch",{selectedKey:"Cal",items:[new h(this.getId()+"-Switch-Cal",{key:"Cal",text:o}),new h(this.getId()+"-Switch-Clk",{key:"Clk",text:s})]});t.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",t,true)}if(r.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){t.setVisible(true);t.setSelectedKey("Cal")}else{t.setVisible(false)}},onAfterRendering:function(){if(r.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){var t=this.getAggregation("_switcher");var i=t.getSelectedKey();this._switchVisibility(i)}},_handleSelect:function(e){var t=e.getParameter("key");this._switchVisibility(t);if(t==="Clk"){this.getClocks()._focusActiveButton()}},_switchVisibility:function(e){var t=this.getCalendar(),i=this.getClocks();if(!t||!i){return}if(e==="Cal"){t.$().css("display","");i.$().css("display","none");t.getFocusDomRef()&&t.getFocusDomRef().focus()}else{t.$().css("display","none");i.$().css("display","")}},switchToTime:function(){var e=this.getAggregation("_switcher");if(e&&e.getVisible()){e.setSelectedKey("Clk");this._switchVisibility("Clk")}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates()},onkeydown:function(e){var t=e.keyCode===_.TAB&&!e.shiftKey;var i=e.keyCode===_.TAB&&e.shiftKey;if(t){if(e.target.classList.contains("sapUiCalHeadToday")||e.target.classList.contains("sapUiCalHeadBLast")&&!this._oDateTimePicker._oCalendar.getShowCurrentDateButton()){this.getAggregation("clocks").getDomRef().children[0].children[0].focus()}}if(i&&e.target.classList.contains("sapUiCalItem")){var o=this.oParent.getAggregation("footer").getAggregation("content").length-1;this.oParent.getAggregation("footer").getAggregation("content")[o].focus()}}});D.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bOnlyCalendar=false};D.prototype.getIconSrc=function(){return C.getIconURI("date-time")};D.prototype.exit=function(){i.prototype.exit.apply(this,arguments);if(this._oClocks){this._oClocks.destroy();delete this._oClocks}this._oPopupContent=undefined;r.media.detachHandler(this._handleWindowResize,this)};D.prototype.setDisplayFormat=function(e){i.prototype.setDisplayFormat.apply(this,arguments);if(this._oClocks){this._oClocks.setValueFormat(M.call(this));this._oClocks.setDisplayFormat(M.call(this))}return this};D.prototype.setMinutesStep=function(e){this.setProperty("minutesStep",e,true);if(this._oClocks){this._oClocks.setMinutesStep(e)}return this};D.prototype._getDefaultValueStyle=function(){return P.Medium};D.prototype.setMinDate=function(e){i.prototype.setMinDate.call(this,e);if(e){this._oMinDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};D.prototype.setMaxDate=function(e){i.prototype.setMaxDate.call(this,e);if(e){this._oMaxDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};D.prototype.setSecondsStep=function(e){this.setProperty("secondsStep",e,true);if(this._oClocks){this._oClocks.setSecondsStep(e)}return this};D.prototype.setShowCurrentTimeButton=function(e){var t=this._oClocks;t&&t.setShowCurrentTimeButton(e);return this.setProperty("showCurrentTimeButton",e)};D.prototype._getFormatInstance=function(t,i){var o=e.extend({},t);var s=-1;if(o.style){s=o.style.indexOf("/")}if(i){var a=e.extend({},o);if(s>0){a.style=a.style.substr(0,s)}this._oDisplayFormatDate=p.getInstance(a)}return p.getDateTimeInstance(o)};D.prototype._checkStyle=function(e){if(i.prototype._checkStyle.apply(this,arguments)){return true}else if(e.indexOf("/")>0){var t=[P.Short,P.Medium,P.Long,P.Long];var o=false;for(var s=0;s<t.length;s++){var a=t[s];for(var n=0;n<t.length;n++){var r=t[n];if(e==a+"/"+r){o=true;break}}if(o){break}}return o}return false};D.prototype._parseValue=function(e,t){var o=i.prototype._parseValue.apply(this,arguments);if(t&&!o){o=this._oDisplayFormatDate.parse(e);if(o){var s=this.getDateValue();if(!s){s=new Date}o.setHours(s.getHours());o.setMinutes(s.getMinutes());o.setSeconds(s.getSeconds());o.setMilliseconds(s.getMilliseconds())}}return o};D.prototype._getLocaleBasedPattern=function(e){var t=l.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),i=e.indexOf("/");if(i>0){return t.getCombinedDateTimePattern(e.substr(0,i),e.substr(i+1))}else{return t.getCombinedDateTimePattern(e,e)}};D.prototype._createPopup=function(){var e,t,i,o,s,a;if(!this._oPopup){i=sap.ui.getCore().getLibraryResourceBundle("sap.m");o=i.getText("TIMEPICKER_SET");s=i.getText("TIMEPICKER_CANCEL");this._oPopupContent=new v(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oOKButton=new f(this.getId()+"-OK",{text:o,type:m.Emphasized,press:T.bind(this)});var n=this._getValueStateHeader();this._oPopup=new d(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:y.VerticalPreferedBottom,beginButton:this._oOKButton,content:[n,this._oPopupContent],afterOpen:w.bind(this),afterClose:A.bind(this)});n.setPopup(this._oPopup._oControl);if(r.system.phone){e=this.$("inner").attr("aria-labelledby");t=e?document.getElementById(e).getAttribute("aria-label"):"";this._oPopup.setTitle(t);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new f(this.getId()+"-Cancel",{text:s,press:k.bind(this)}))}this._oPopup.addStyleClass("sapMDateTimePopup");a=this._oPopup.getAggregation("_popup");if(a.setShowArrow){a.setShowArrow(false)}this.setAggregation("_popup",this._oPopup,true)}};D.prototype._openPopup=function(e){if(!this._oPopup){return}if(!e){e=this.getDomRef()}this.addStyleClass(t.ICON_PRESSED_CSS_CLASS);var i=this._oPopup.getAggregation("_popup");i.oPopup.setAutoCloseAreas([e]);this._oPopup.openBy(e||this)};D.prototype._createPopupContent=function(){var e=!this._oCalendar;i.prototype._createPopupContent.apply(this,arguments);if(e){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(b,this)}if(!this._oClocks){this._oClocks=new u(this.getId()+"-Clocks",{minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),valueFormat:M.call(this),displayFormat:M.call(this),localeId:this.getLocaleId(),showCurrentTimeButton:this.getShowCurrentTimeButton()});this._oPopupContent.setClocks(this._oClocks)}};D.prototype._attachAfterRenderingDelegate=function(){};D.prototype._selectFocusedDateValue=function(e){var t=this._oCalendar;t.removeAllSelectedDates();t.addSelectedDate(e);return this};D.prototype._fillDateRange=function(){var e=this.getDateValue(),t=true;if(e){e=new Date(e.getTime());this._oOKButton.setEnabled(true)}else{t=false;e=this.getInitialFocusedDateValue();if(!e){e=new Date;this._oCalendar.removeAllSelectedDates()}var i=this._oMaxDate.getTime();if(e.getTime()<this._oMinDate.getTime()||e.getTime()>i){e=this._oMinDate}this._oOKButton.setEnabled(false)}this._oCalendar.focusDate(e);if(t){if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=e.getTime()){this._oDateRange.setStartDate(e)}}this._oClocks._setTimeValues(e)};D.prototype._getSelectedDate=function(){var e=i.prototype._getSelectedDate.apply(this,arguments);if(e){var t=this._oClocks.getTimeValues();var o=this._oClocks._getDisplayFormatPattern();if(o.search("h")>=0||o.search("H")>=0){e.setHours(t.getHours())}if(o.search("m")>=0){e.setMinutes(t.getMinutes())}if(o.search("s")>=0){e.setSeconds(t.getSeconds())}if(e.getTime()<this._oMinDate.getTime()){e=new Date(this._oMinDate.getTime())}else if(e.getTime()>this._oMaxDate.getTime()){e=new Date(this._oMaxDate.getTime())}}return e};D.prototype.getLocaleId=function(){return sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()};D.prototype.getAccessibilityInfo=function(){var e=i.prototype.getAccessibilityInfo.apply(this,arguments);e.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return e};function T(e){this._handleCalendarSelect()}function k(e){this.onsaphide(e);if(!this.getDateValue()){this._oCalendar.removeAllSelectedDates()}}D.prototype._handleWindowResize=function(e){var t=this.getAggregation("_popup").getContent()[1].getAggregation("_switcher"),i=this.getAggregation("_popup").getContent()[1].getCalendar(),o=this.getAggregation("_popup").getContent()[1].getClocks();if(e.name===S){t.setVisible(true);this.getAggregation("_popup").getContent()[1]._switchVisibility(t.getSelectedKey())}else{t.setVisible(false);o.$().css("display","");i.$().css("display","")}};function w(e){this.$("inner").attr("aria-expanded",true);this._oCalendar.focus();r.media.attachHandler(this._handleWindowResize,this)}function A(){this.removeStyleClass(t.ICON_PRESSED_CSS_CLASS);this.$("inner").attr("aria-expanded",false);this._oCalendar._closePickers();r.media.detachHandler(this._handleWindowResize,this)}function M(){var e=this.getDisplayFormat();var t;var i=this.getBinding("value");if(i&&i.oType&&i.oType instanceof o){e=i.oType.getOutputPattern()}else if(i&&i.oType&&i.oType.oFormat){e=i.oType.oFormat.oFormatOptions.pattern}else{e=this.getDisplayFormat()}if(!e){e=P.Medium}var s=e.indexOf("/");if(s>0&&this._checkStyle(e)){e=e.substr(s+1)}if(e==P.Short||e==P.Medium||e==P.Long||e==P.Full){var a=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var n=l.getInstance(a);t=n.getTimePattern(e)}else{t=e}return t}function b(e){var t={onAfterRendering:function(){this._oPopupContent.getCalendar().getAggregation("month")[0].removeEventDelegate(t,this);this._oOKButton.setEnabled(true);this._oPopupContent.switchToTime();this._oPopupContent.getClocks()._focusActiveButton()}};this._oPopupContent.getCalendar().getAggregation("month")[0].addEventDelegate(t,this)}return D});