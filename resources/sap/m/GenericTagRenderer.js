/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library"],function(e,t){"use strict";var r=e.GenericTagDesign,a=e.GenericTagValueState,n=t.ValueState,s=sap.ui.getCore(),i={apiVersion:2};i.render=function(e,t){var r=this._getAriaLabelledBy(t),a=s.getLibraryResourceBundle("sap.m"),n=t.getTooltip_AsString();e.openStart("div",t);e.class("sapMGenericTag");e.attr("tabindex",0);e.class("sapMGenericTag"+t.getStatus());e.accessibilityState(t,{role:"button",roledescription:a.getText("GENERICTAG_ROLEDESCRIPTION"),labelledby:r.join(" ")});if(n){e.attr("title",n)}e.openEnd();e.openStart("div");e.class("sapMGenericTagWrap");e.openEnd();this.renderElements(e,t);e.close("div");e.close("div")};i.renderElements=function(e,t){var s=t.getDesign()===r.StatusIconHidden,i=t.getValueState()===a.Error,o=t.getValue();if(!s&&t.getStatus()!==n.None){e.renderControl(t._getStatusIcon())}this.renderText(e,t);if(i){e.renderControl(t._getErrorIcon())}else if(o){e.renderControl(o.addStyleClass("sapMGenericTagValue"))}this.renderHiddenARIAElement(e,t)};i.renderText=function(e,t){e.openStart("span",t.getId()+"-text");e.class("sapMGenericTagText");e.openEnd();e.text(t.getText());e.close("span")};i.renderHiddenARIAElement=function(e,t){if(t.getStatus()===n.None){return}e.openStart("span",t.getId()+"-status");e.class("sapUiInvisibleText");e.attr("aria-hidden","true");e.openEnd();e.text(this._getGenericTagStatusText(t));e.close("span")};i._getAriaLabelledBy=function(e){var t=e.getAriaLabelledBy().slice(),r=e.getId(),s=this._getTagValueId(e);if(e.getStatus()!==n.None){t.push(r+"-status")}t.push(r+"-text");t.push(e.getValueState()===a.Error?r+"-errorIcon":s);return t};i._getGenericTagStatusText=function(e){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m"),r;switch(e.getStatus()){case n.Error:r=t.getText("GENERICTAG_ARIA_VALUE_STATE_ERROR");break;case n.Warning:r=t.getText("GENERICTAG_ARIA_VALUE_STATE_WARNING");break;case n.Success:r=t.getText("GENERICTAG_ARIA_VALUE_STATE_SUCCESS");break;case n.Information:r=t.getText("GENERICTAG_ARIA_VALUE_STATE_INFORMATION");break;default:}return r};i._getTagValueId=function(e){var t=e.getValue();return t?t.getId():""};return i},true);