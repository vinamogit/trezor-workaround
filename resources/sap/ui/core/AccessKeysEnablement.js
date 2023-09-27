/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/config","sap/ui/base/Object","sap/ui/core/Element","sap/ui/Device"],function(e,t,i,n){"use strict";var s=t.extend("sap.ui.core.AccessKeysEnablement",{});s.controlRegistry=new Set;s.CSS_CLASS="sapUiAccKeysHighlighDom";s.bListenersAttached=false;var r=function(){var e=function(e){var t=e.getEnabled&&!e.getEnabled();if(t){return}if(e){e.setProperty("highlightAccKeysRef",true);e.onAccKeysHighlightStart&&e.onAccKeysHighlightStart()}};s.controlRegistry.forEach(function(t){e(t)})};var a=function(){var e=function(e){if(e){e.setProperty("highlightAccKeysRef",false);e.onAccKeysHighlightStart&&e.onAccKeysHighlightEnd()}};s.controlRegistry.forEach(function(t){e(t)})};s.attachKeydownListeners=function(){document.addEventListener("keydown",function(e){if(this.hasHighlightedElements()){e.preventDefault()}this.handleHighlightStart(e);document.addEventListener("keydown",function(e){if(this.hasHighlightedElements()){e.preventDefault()}}.bind(this),{once:true})}.bind(this));document.addEventListener("keyup",function(e){this.handleHighlightEnd(e)}.bind(this));window.addEventListener("blur",function(){this.handleHighlightEnd(true)}.bind(this))};s.handleHighlightStart=function(e){var t=e.altKey;var i=e.key;if(t){r();if(this.hasHighlightedElements()){var n=this.getElementToBeFocused(i);if(!n.length){return}var s=document.activeElement;var a=e.shiftKey;var c=n.indexOf(s);if(a){var o=n[c-1];if(o){o.focus()}else if(c===0){n[n.length-1].focus()}}else{var l=n[c+1];if(l){l.focus()}else if(c===n.length-1){n[0].focus()}}}}};s.hasHighlightedElements=function(){return document.getElementsByClassName(s.CSS_CLASS).length};s.handleHighlightEnd=function(e,t){if(!e.altKey||t){a()}};s.getElementToBeFocused=function(e){return[].filter.call(document.querySelectorAll("[data-ui5-accesskey='"+e.toLowerCase()+"']"),function(e){var t=i.registry.get(e.getAttribute("id"));var n=t.getEnabled?t.getEnabled():true;var s=t.getVisible();return n&&s}).map(function(e){e=i.registry.get(e.getAttribute("id"));return e.getAccessKeysFocusTarget?e.getAccessKeysFocusTarget():e.getFocusDomRef()})};s.registerControl=function(t){var i=e.get({name:"sapUiXxAccKeys",type:e.Type.Boolean,external:true});if(n.os.macintosh){return}this.controlRegistry.add(t);if(i&&!this.bListenersAttached){this.attachKeydownListeners();s.bListenersAttached=true}var r=t.exit;t.exit=function(){s.controlRegistry.delete(t);r&&r.call(t)}};s.deregisterControl=function(e){s.registerControl.delete()};return s});
//# sourceMappingURL=AccessKeysEnablement.js.map