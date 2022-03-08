/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./SliderRenderer","sap/ui/core/InvisibleText"],function(e,t,a){"use strict";var i=e.extend(t);i.apiVersion=2;i.renderHandles=function(e,t,a){this.renderHandle(e,t,{id:t.getId()+"-handle1",position:"start",forwardedLabels:a});this.renderHandle(e,t,{id:t.getId()+"-handle2",position:"end",forwardedLabels:a});e.renderControl(t._mHandleTooltip.start.label);e.renderControl(t._mHandleTooltip.end.label);e.renderControl(t.getAggregation("_handlesLabels")[2])};i.renderHandle=function(e,i,n){var r,d=i.getRange(),l=i.getEnabled(),o=sap.ui.getCore().getConfiguration().getRTL();e.openStart("span",n&&n.id);if(n&&n.position!==undefined){r=d[n.position==="start"?0:1];e.attr("data-range-val",n.position);e.attr("aria-labelledby",(n.forwardedLabels+" "+i._mHandleTooltip[n.position].label.getId()).trim());if(i.getInputsAsTooltips()){e.attr("aria-describedby",a.getStaticId("sap.m","SLIDER_INPUT_TOOLTIP"));l&&e.attr("aria-keyshortcuts","F2")}}if(i.getShowHandleTooltip()&&!i.getShowAdvancedTooltip()){this.writeHandleTooltip(e,i)}e.class(t.CSS_CLASS+"Handle");if(n&&n.id!==undefined&&n.id===i.getId()+"-handle1"){e.style(o?"right":"left",d[0])}if(n&&n.id!==undefined&&n.id===i.getId()+"-handle2"){e.style(o?"right":"left",d[1])}this.writeAccessibilityState(e,i,r);if(l){e.attr("tabindex","0")}e.openEnd().close("span")};i.writeAccessibilityState=function(e,t,a){var i=t._isElementsFormatterNotNumerical(a),n=t._formatValueByCustomElement(a),r;if(t._getUsedScale()&&!i){r=n}else{r=t.toFixed(a)}e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:r});if(i){e.accessibilityState(t,{valuetext:n})}};i.renderStartLabel=function(e,a){e.openStart("div").class(t.CSS_CLASS+"RangeLabel").openEnd().text(a.getMin()).close("div")};i.renderEndLabel=function(e,a){e.openStart("div").class(t.CSS_CLASS+"RangeLabel").style("width",a._getMaxTooltipWidth()+"px").openEnd().text(a.getMax()).close("div")};i.renderLabels=function(e,a){if(!a.getEnableTickmarks()){e.openStart("div").class(t.CSS_CLASS+"Labels").openEnd();this.renderStartLabel(e,a);this.renderEndLabel(e,a);e.close("div")}};i.renderProgressIndicator=function(e,t,a){var i=t.getRange();i[0]=t.toFixed(i[0],t._iDecimalPrecision);i[1]=t.toFixed(i[1],t._iDecimalPrecision);var n=Math.abs(i[1]-i[0]);e.openStart("div",t.getId()+"-progress");if(t.getEnabled()){e.attr("tabindex","0")}this.addProgressIndicatorClass(e,t);e.style("width",t._sProgressValue);e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:n,valuetext:t._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",i.map(t._formatValueByCustomElement,t)),labelledby:(a+" "+t.getAggregation("_handlesLabels")[2].getId()).trim()}).openEnd().close("div")};i.addClass=function(e,a){t.addClass(e,a);e.class("sapMRangeSlider")};return i},true);