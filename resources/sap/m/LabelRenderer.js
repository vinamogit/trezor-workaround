/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Renderer","sap/m/library","sap/ui/core/library","sap/m/HyphenationSupport","sap/ui/core/LabelEnablement"],function(e,t,a,i,s,l){"use strict";var r=i.TextDirection;var n=i.VerticalAlign;var o=a.LabelDesign;var p={apiVersion:2};p.render=function(t,a){var i=p,g=a.getTextDirection(),c=a.getTextAlign(),d=a.getWidth(),b=a.getText(),f=a.getTooltip_AsString(),L=a.getLabelForRendering(),u=L?"label":"span",x=a.isDisplayOnly(),T=a.getVAlign();t.openStart(u,a);t.class("sapMLabel");t.class("sapUiSelectable");if(a.isWrapping()){t.class("sapMLabelWrapped")}if(a.getDesign()==o.Bold){t.style("font-weight","bold")}if(a.isRequired()){t.class("sapMLabelRequired")}if(a.getShowColon()){t.class("sapMLabelShowColon")}if(L){l.writeLabelForAttribute(t,a);t.accessibilityState({label:a.getText()})}else if(a.getParent()instanceof sap.m.Toolbar){t.class("sapMLabelTBHeader")}if(g!==r.Inherit){t.attr("dir",g.toLowerCase())}if(d){t.style("width",d)}else{t.class("sapMLabelMaxWidth")}if(c){c=i.getTextAlign(c,g);if(c){t.style("text-align",c)}}if(b==""){t.class("sapMLabelNoText")}if(x){t.class("sapMLabelDisplayOnly")}if(T!=n.Inherit){t.style("vertical-align",T.toLowerCase())}s.writeHyphenationClass(t,a);if(f){t.attr("title",f)}t.openEnd();t.openStart("span",a.getId()+"-text");t.class("sapMLabelTextWrapper");t.openEnd();t.openStart("bdi",a.getId()+"-bdi");if(g!==r.Inherit){t.attr("dir",g.toLowerCase())}t.openEnd();if(b){b=s.getTextForRender(a,"main");t.text(b)}t.close("bdi");t.close("span");t.openStart("span");t.class("sapMLabelColonAndRequired");t.attr("data-colon",e.getLibraryResourceBundle("sap.m").getText("LABEL_COLON"));t.openEnd();t.close("span");t.close(u)};p.getTextAlign=t.getTextAlign;return p},true);