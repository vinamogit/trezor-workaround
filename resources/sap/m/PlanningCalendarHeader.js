/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Control","./library","./Toolbar","./AssociativeOverflowToolbar","./Button","./Popover","./Title","./ToolbarSpacer","./SegmentedButton","sap/ui/unified/Calendar","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/unified/calendar/IndexPicker","sap/ui/core/format/DateFormat","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/core/library","./PlanningCalendarHeaderRenderer"],function(e,t,i,o,r,n,a,s,l,c,h,p,u,d,_,g,P,f,C,v){"use strict";var y=i.ToolbarDesign;var T=t.extend("sap.m.PlanningCalendarHeader",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},pickerText:{type:"string",group:"Data"}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navigationToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"},_monthPicker:{type:"sap.ui.unified.internal.CustomMonthPicker",multiple:false,visibility:"hidden"},_yearPicker:{type:"sap.ui.unified.internal.CustomYearPicker",multiple:false,visibility:"hidden"},_indexPicker:{type:"sap.ui.unified.calendar.IndexPicker",multiple:false,visibility:"hidden"}},events:{pressPrevious:{},pressToday:{},pressNext:{},dateSelect:{},cancel:{},viewChange:{}},associations:{currentPicker:{type:"sap.ui.core.Control",multiple:false}}}});var A=3;T.prototype.init=function(){var t=this.getId(),i=t+"-NavToolbar",a=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s,l,c,p;this.setAggregation("_actionsToolbar",new r(t+"-ActionsToolbar",{design:y.Transparent}).addStyleClass("sapMPCHeadActionsToolbar").addContent(this._getOrCreateTitleControl()).addContent(this._getOrCreateToolbarSpacer()).addContent(this._getOrCreateViewSwitch()));this._oPrevBtn=new n(i+"-PrevBtn",{icon:P.getIconURI("slim-arrow-left"),tooltip:a.getText("PCH_NAVIGATE_BACKWARDS"),press:function(){this.firePressPrevious()}.bind(this)});this._oTodayBtn=new n(i+"-TodayBtn",{text:a.getText("PLANNINGCALENDAR_TODAY"),ariaLabelledBy:f.getStaticId("sap.m","PCH_NAVIGATE_TO_TODAY"),press:function(){this.firePressToday()}.bind(this)});this._oNextBtn=new n(i+"-NextBtn",{icon:P.getIconURI("slim-arrow-right"),tooltip:a.getText("PCH_NAVIGATE_FORWARD"),press:function(){this.firePressNext()}.bind(this)});l=new h(t+"-Cal",{ariaLabelledBy:f.getStaticId("sap.m","PCH_RANGE_PICKER")});l.attachEvent("select",this._handlePickerDateSelect,this);l.attachEvent("cancel",this._handlePickerCancelEvent,this);l.setPopupMode(true);this.setAggregation("_calendarPicker",l);this._oCalendarAfterRenderDelegate={onAfterRendering:function(){if(this._oPopup&&this._oPopup.isOpen()){l.focus()}}.bind(this)};l.addDelegate(this._oCalendarAfterRenderDelegate);this._oCalendar=l;this.setAssociation("currentPicker",l);c=new u(t+"-MonthCal",{ariaLabelledBy:f.getStaticId("sap.m","PCH_RANGE_PICKER")});c.attachEvent("select",this._handlePickerDateSelect,this);c.attachEvent("cancel",this._handlePickerCancelEvent,this);c.setPopupMode(true);this.setAggregation("_monthPicker",c);this._oMonthPicker=c;p=new d(t+"-YearCal",{ariaLabelledBy:f.getStaticId("sap.m","PCH_RANGE_PICKER")});p.attachEvent("select",this._handlePickerDateSelect,this);p.attachEvent("cancel",this._handlePickerCancelEvent,this);p.setPopupMode(true);this.setAggregation("_yearPicker",p);this._oYearPicker=p;var g=new _(t+"-IndexPicker");g.attachEvent("select",this._handleIndexPickerSelect,this);this.setAggregation("_indexPicker",g);this._oIndexPicker=g;this._oPickerBtn=new n(i+"-PickerBtn",{text:this.getPickerText(),ariaHasPopup:C.aria.HasPopup.Dialog,ariaLabelledBy:f.getStaticId("sap.m","PCH_SELECT_RANGE"),press:function(){if(this.fireEvent("_pickerButtonPress",{},true)){var t=this.getStartDate()||new Date,i=this.getAssociation("currentPicker");s=e.registry.get(i);if(s.displayDate){s.displayDate(t)}this._openCalendarPickerPopup(s)}}.bind(this)});this.setAggregation("_navigationToolbar",new o(i,{design:y.Transparent,content:[this._oPrevBtn,this._oTodayBtn,this._oNextBtn,this._oPickerBtn]}).addStyleClass("sapMPCHeadNavToolbar"))};T.prototype.exit=function(){this._getActionsToolbar().removeAllContent();if(this._oTitle){this._oTitle.destroy();this._oTitle=null}if(this._oToolbarSpacer){this._oToolbarSpacer.destroy();this._oToolbarSpacer=null}if(this._oViewSwitch){this._oViewSwitch.destroy();this._oViewSwitch=null}if(this._oPopup){if(this._oCalendarAfterRenderDelegate){this._oCalendar.removeDelegate(this._oCalendarAfterRenderDelegate)}this._oPopup.destroy();this._oPopup=null}if(this._oPrevBtn){this._oPrevBtn.destroy();this._oPrevBtn=null}if(this._oNextBtn){this._oNextBtn.destroy();this._oNextBtn=null}};T.prototype.onBeforeRendering=function(){var e=!!this.getActions().length||!!this.getTitle()||this._getOrCreateViewSwitch().getItems().length>1;this._getActionsToolbar().setProperty("visible",e,true)};T.prototype.setTitle=function(e){this._getOrCreateTitleControl().setText(e).setVisible(!!e);return this.setProperty("title",e)};T.prototype.addAction=function(e){if(!e){return this}this._getActionsToolbar().addContent(e);return this.addAggregation("actions",e)};T.prototype.insertAction=function(e,t){if(!e){return this}this._getActionsToolbar().insertContent(e,t+A);return this.insertAggregation("actions",e,t)};T.prototype.removeAction=function(e){if(!e){return this}this._getActionsToolbar().removeContent(e);return this.removeAggregation("actions",e)};T.prototype.removeAllActions=function(){var e=this._getActionsToolbar(),t=e.getContent();for(var i=A;i<t.length;i++){e.removeContent(t[i])}return this.removeAllAggregation("actions")};T.prototype.destroyActions=function(){var e=this._getActionsToolbar(),t=e.getContent(),i;for(var o=A;o<t.length;o++){i=e.removeContent(t[o]);i.destroy()}return this};T.prototype.setPickerText=function(e){this.setProperty("pickerText",e);this._oPickerBtn.setText(e);return this};T.prototype._getOrCreateTitleControl=function(){if(!this._oTitle){this._oTitle=new s(this.getId()+"-Title",{visible:false})}return this._oTitle};T.prototype._getOrCreateToolbarSpacer=function(){if(!this._oToolbarSpacer){this._oToolbarSpacer=new l(this.getId()+"-Spacer")}return this._oToolbarSpacer};T.prototype._getOrCreateViewSwitch=function(){if(!this._oViewSwitch){this._oViewSwitch=new c(this.getId()+"-ViewSwitch",{ariaLabelledBy:f.getStaticId("sap.m","PCH_VIEW_SWITCH")});this._oViewSwitch.attachEvent("selectionChange",this._handleViewSwitchChange,this);this.addDependent(this._oViewSwitch)}return this._oViewSwitch};T.prototype._convertViewSwitchToSelect=function(){this._oViewSwitch._bForcedSelectMode=true;this._oViewSwitch._toSelectMode()};T.prototype._convertViewSwitchToSegmentedButton=function(){this._oViewSwitch._bForcedSelectMode=false;this._oViewSwitch._toNormalMode()};T.prototype._getTodayButton=function(){return this._oTodayBtn};T.prototype._handlePickerDateSelect=function(){var t=this.getAssociation("currentPicker"),i=e.registry.get(t),o=i.getSelectedDates()[0].getStartDate();this.setStartDate(o);this._closeCalendarPickerPopup();this.fireDateSelect()};T.prototype._handleIndexPickerSelect=function(e){var t=this._oIndexPicker.getSelectedIndex();var i=new Date(this._oCalendar.getMinDate());var o=this._getRelativeInfo();i.setDate(i.getDate()+t*o.iIntervalSize);this.setStartDate(i);this._closeCalendarPickerPopup();this.fireDateSelect()};T.prototype._handleViewSwitchChange=function(e){this.fireViewChange(e.getParameters())};T.prototype._openCalendarPickerPopup=function(e){var t,i;if(!this._oPopup){this._oPopup=this._createPopup()}t=this._oPopup.getContent();if(t.length){i=this._oPopup.getContent()[0];if(i.isA("sap.ui.unified.internal.CustomYearPicker")){this.setAggregation("_yearPicker",this._oPopup.removeAllContent()[0])}else if(i.isA("sap.ui.unified.internal.CustomMonthPicker")){this.setAggregation("_monthPicker",this._oPopup.removeAllContent()[0])}else if(i.isA("sap.ui.unified.calendar.IndexPicker")){this.setAggregation("_indexPicker",this._oPopup.removeAllContent()[0])}else if(e!==i){this.setAggregation("_calendarPicker",this._oPopup.removeAllContent()[0])}}this._oPopup.addContent(e);this._oPopup.attachAfterOpen(function(){var e=this._oPopup.$();var t=Math.floor((e.width()-this._oPickerBtn.$().width())/2);this._oPopup.setOffsetX(sap.ui.getCore().getConfiguration().getRTL()?t:-t);var i=this._oPickerBtn.$().height();this._oPopup.setOffsetY(this._oPopup._getCalculatedPlacement()==="Top"?i:-i);this._oPopup.getContent()[0].focus()},this);this._oPopup.openBy(this._oPickerBtn.getDomRef())};T.prototype._createPopup=function(){var e=new a({placement:"VerticalPreferredBottom",showHeader:false,showArrow:false,verticalScrolling:false});e.oPopup.setDurations(0,0);e.addDelegate({onsapescape:this.onsapescape},this);this._oPopup=e;return this._oPopup};T.prototype.onsapescape=function(){if(this._oPopup){this._closeCalendarPickerPopup();if(this._oPickerBtn.getDomRef()){this._oPickerBtn.getDomRef().focus()}}};T.prototype._closeCalendarPickerPopup=function(){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}};T.prototype._handlePickerCancelEvent=function(){var e=this._oPickerBtn.getDomRef();this.fireCancel();this._closeCalendarPickerPopup();e&&e.focus()};T.prototype._getActionsToolbar=function(){return this.getAggregation("_actionsToolbar")};T.prototype._getNavigationToolbar=function(){return this.getAggregation("_navigationToolbar")};return T});