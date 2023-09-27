/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS"],function(e,a){"use strict";var t=e.AvatarSize;var s=e.AvatarType;var r={apiVersion:2};r.render=function(e,r){var l=r.getEnabled(),i=r.getInitials(),n=r._getActualDisplayType(),o=r._getImageFallbackType(),p=r.getDisplaySize(),d=r.getDisplayShape(),c=r.getImageFitType(),g=r.getCustomDisplaySize(),y=r.getCustomFontSize(),f=r._getAvatarSrc(),u="sapFAvatar",b=r.getTooltip_AsString(),S=r._getAriaLabelledBy(),I=r.getAriaDescribedBy(),v=r.getAriaHasPopup(),A=r.hasListeners("press")?r._getBadge():null,C=r._getDefaultTooltip(),h=i.length;e.openStart("span",r);e.class(u);e.class("sapFAvatarColor"+r._getActualBackgroundColor());e.class(u+p);e.class(u+n);e.class(u+d);if(l){if(r.hasListeners("press")){e.class("sapMPointer");e.class(u+"Focusable");e.attr("role","button");e.attr("tabindex",0)}else if(r.getDecorative()){e.attr("role","presentation");e.attr("aria-hidden","true")}else{e.attr("role","img")}}else{e.attr("disabled","disabled");e.class("sapMAvatarDisabled")}if(r.getShowBorder()){e.class("sapFAvatarBorder")}if(p===t.Custom){e.style("width",g);e.style("height",g);e.style("font-size",y)}if(b){e.attr("title",b);e.attr("aria-label",b)}else if(i){e.attr("aria-label",C+" "+i)}else{e.attr("aria-label",C)}if(S&&S.length>0){e.attr("aria-labelledby",S.join(" "))}if(I&&I.length>0){e.attr("aria-describedby",I.join(" "))}if(v&&v!=="None"){e.attr("aria-haspopup",v.toLowerCase())}e.openEnd();if(n===s.Icon||o===s.Icon){e.renderControl(r._getIcon().addStyleClass(u+"TypeIcon"))}else if(n===s.Initials||o===s.Initials){if(h===3){e.renderControl(r._getIcon().addStyleClass(u+"TypeIcon").addStyleClass(u+"HiddenIcon"))}e.openStart("span");e.class(u+"InitialsHolder");e.openEnd();e.text(i);e.close("span")}if(n===s.Image){e.openStart("span");e.class(u+"ImageHolder");e.class(u+n+c);e.style("background-image","url('"+a(f)+"')");e.openEnd();e.close("span")}if(A){e.openStart("div");e.class(u+"BadgeIconActiveArea");if(g){e.style("font-size",g)}e.openEnd();e.openStart("span");e.class(u+"BadgeIcon");e.openEnd();e.renderControl(A);e.close("span");e.close("div")}e.close("span")};return r},true);
//# sourceMappingURL=AvatarRenderer.js.map