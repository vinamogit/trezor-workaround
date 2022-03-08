/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./Input","./NumericInputRenderer","./library","sap/ui/core/format/NumberFormat","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/dom/jquery/cursorPos"],function(t,e,r,i,o,n,s){"use strict";var u=i.InputType;var a=e.extend("sap.m.NumericInput",{metadata:{library:"sap.m"}});a.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.call(this);this.setWidth("100%");this._deregisterEvents()};a.prototype.setValue=function(t){e.prototype.setValue.apply(this,arguments);if(this.getDomRef()){this.getDomRef("inner").setAttribute("aria-valuenow",t)}return this};a.prototype.setType=function(t){return e.prototype.setType.call(this,u.Number)};a.prototype.onkeydown=function(t){var r,i,o;e.prototype.onkeydown.apply(this,arguments);if(!n.system.desktop||t.ctrlKey||t.metaKey||t.originalEvent.key&&t.originalEvent.key.length!==1){return}i=this._$input.cursorPos();if(t.which===s.NUMPAD_COMMA){t.preventDefault();r=this.getValue().substring(0,i)+this._getNumberFormat().oFormatOptions.decimalSeparator+this.getValue().substring(i);o=this._getNumberFormat().parse(r);if(o||o===0){this.setDOMValue(r)}return}r=this.getValue().substring(0,i)+t.originalEvent.key+this.getValue().substring(i);o=this._getNumberFormat().parse(r);if(!m(t.which)||!o&&o!==0){t.preventDefault()}};var p=[[s.A,s.Z],[s.OPEN_BRACKET,s.OPEN_BRACKET],[s.PIPE,s.SEMICOLON],[s.GREAT_ACCENT,s.BACKSLASH]];function m(t){return Object.values(s).includes(t)&&!p.some(function(e){return t>=e[0]&&t<=e[1]})}a.prototype._getNumberFormat=function(){if(!this._oNumberFormat){this._oNumberFormat=o.getFloatInstance()}return this._oNumberFormat};return a});