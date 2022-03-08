/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer","sap/ui/core/library"],function(e,t,i){"use strict";var a=e.extend(t);a.apiVersion=2;a.CSS_CLASS="sapMTimePicker";a.addOuterClasses=function(e,i){e.class(a.CSS_CLASS);if(i.getHideInput()){e.class("sapMTimePickerHiddenInput")}t.addOuterClasses.apply(this,arguments)};a.writeInnerValue=function(e,t){e.attr("value",t._formatValue(t.getDateValue()))};a.getAriaRole=function(){return"combobox"};a.getLabelledByAnnouncement=function(e){return e._getPlaceholder()||""};a.getAccessibilityState=function(e){var a=t.getAccessibilityState.apply(this,arguments);a["roledescription"]=e._oResourceBundle.getText("ACC_CTR_TYPE_TIMEINPUT");a["autocomplete"]="none";a["haspopup"]=i.aria.HasPopup.Dialog.toLowerCase();a["expanded"]="false";a["disabled"]=null;a["owns"]=e.getId()+"-clocks";if(e._isMobileDevice()){a["describedby"]=e._oResourceBundle.getText("ACC_CTR_TYPE_TIMEINPUT_MOBILE_DESCRIBEDBY")}return a};a.writeInnerAttributes=function(e,t){if(t._isMobileDevice()){e.attr("readonly","readonly")}if(t.getShowValueStateMessage()){e.attr("autocomplete","off")}};return a},true);