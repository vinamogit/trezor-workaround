/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(e){"use strict";var t={apiVersion:2};t.CSS_CLASS="sapUiAFLayout";t.render=function(e,n){var r=n.getContent();e.openStart("div",n);e.class(t.CSS_CLASS);if(r.length===0){e.class(t.CSS_CLASS+"NoContent")}e.openEnd();this.renderItems(e,n,r);this.renderEndItem(e,n);this.renderSpacers(e,n);e.close("div")};t.renderItems=function(e,t,n){n=n||t.getContent();n.forEach(function(n){this.renderItem(e,t,n)},this)};t.renderItem=function(e,n,r){e.openStart("div");e.class(t.CSS_CLASS+"Item");e.style("flex-basis",n.getMinItemWidth());e.style("max-width",n.getMaxItemWidth());e.openEnd();e.renderControl(r);e.close("div")};t.renderEndItem=function(e,n,r){r=r||n.getEndContent();if(r.length){e.openStart("div",n.getId()+"-endItem");e.class(t.CSS_CLASS+"End");if(n.getContent().length){e.style("flex-basis",n.getMinItemWidth())}e.openEnd();r.forEach(function(t){this.renderEndContent(e,n,t)},this);e.close("div")}};t.renderEndContent=function(e,t,n){e.renderControl(n)};t.renderSpacers=function(e,n){var r=n.computeNumberOfSpacers(),i=n.getMinItemWidth(),s=n.getMaxItemWidth(),d=t.CSS_CLASS,o=n.getId(),a=o+"-spacer",S=o+"-spacerlast";for(var c=0;c<r;c++){var l=c===r-1,C=l?S:a+c;e.openStart("div",C);e.class(d+"Item");e.class(d+"Spacer");e.style("flex-basis",i);e.style("max-width",s);e.openEnd();e.close("div")}};return t},true);
//# sourceMappingURL=AlignedFlowLayoutRenderer.js.map