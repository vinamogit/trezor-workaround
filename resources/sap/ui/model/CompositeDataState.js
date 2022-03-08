/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DataState","sap/base/util/deepEqual","sap/base/util/each"],function(t,e,r){"use strict";var a=t.extend("sap.ui.model.CompositeDataState",{metadata:{},constructor:function(e){t.apply(this,arguments);this.mProperties.originalValue=[];this.mProperties.originalInternalValue=[];this.mProperties.value=[];this.mProperties.invalidValue=undefined;this.mProperties.internalValue=[];this.mChangedProperties=Object.assign({},this.mProperties);this.aDataStates=e}});a.prototype._hasInnerInvalidValues=function(){return this.aDataStates.reduce(function(t,e){if(e.getInvalidValue()!==undefined){return true}else{return t}},false)};a.prototype.getInternalProperty=function(t){var e;if(t==="invalidValue"&&this._hasInnerInvalidValues()){e=this.aDataStates.map(function(t){return t.getProperty("invalidValue")||t.getProperty("value")})}else{e=this.aDataStates.map(function(e){return e.getProperty(t)})}return e};a.prototype.getProperty=function(e){var r=t.prototype.getProperty.apply(this,arguments);var a=this.getInternalProperty(e);var s;switch(e){case"modelMessages":case"controlMessages":s=r;for(var i=0;i<a.length;++i){s=s.concat(a[i])}break;default:s=a||r}return s};a.prototype.getModelMessages=function(){return this.getProperty("modelMessages")};a.prototype.getControlMessages=function(){return this.getProperty("controlMessages")};a.prototype.getAllMessages=function(){var t=new Set;this.aDataStates.forEach(function(e){e.getAllMessages().forEach(t.add.bind(t))});return Array.from(t)};a.prototype.getMessages=function(){return this.aDataStates.reduce(function(t,e){return t.concat(e.getMessages())},t.prototype.getMessages.apply(this,arguments))};a.prototype.containsValues=function(t){if(Array.isArray(t)){for(var e=0;e<t.length;e++){if(t[e]!==undefined){return true}}return false}else{return!!t}};a.prototype.isDirty=function(){return this.aDataStates.reduce(function(t,e){if(e.isDirty()){return true}else{return t}},t.prototype.isDirty.apply(this,arguments))};a.prototype.isControlDirty=function(){return this.aDataStates.reduce(function(t,e){if(e.isControlDirty()){return true}else{return t}},t.prototype.isControlDirty.apply(this,arguments))};a.prototype.isLaundering=function(){return this.aDataStates.reduce(function(t,e){if(e.isLaundering()){return true}else{return t}},t.prototype.isLaundering.apply(this,arguments))};a.prototype.getInvalidValue=function(){var t=this.mChangedProperties["invalidValue"];var e=this.getInternalProperty("invalidValue");if(e&&this.containsValues(e)){t=e;this.setInvalidValue(e)}return t};a.prototype.changed=function(t){if(t===false){this.mProperties=Object.assign({},this.mChangedProperties);this.aDataStates.forEach(function(t){t.changed(false)})}return this.aDataStates.reduce(function(t,e){if(t){return true}else{return e.changed()}},!e(this.mProperties,this.mChangedProperties))};a.prototype.getChanges=function(){var t={};var a,s,i;var n=[];for(a=0;a<this.aDataStates.length;++a){i=this.aDataStates[a].getChanges();for(s in i){t[s]=[]}n.push(i)}var o=this._hasInnerInvalidValues();var u={};for(s in t){for(a=0;a<n.length;++a){i=n[a][s];if(!u[s]){u[s]=[]}if(i){u[s].push(i.value)}else{var p=this.aDataStates[a].getProperty(s);if(s==="invalidValue"&&o&&!p){p=this.aDataStates[a].getProperty("value")}u[s].push(p)}}}r(this.mChangedProperties,function(t,r){if(this.mChangedProperties[t]&&!e(this.mChangedProperties[t],this.mProperties[t])){u[t]={};u[t].value=this.mChangedProperties[t];u[t].oldValue=this.mProperties[t]}}.bind(this));var l=this.getMessages();var h=this._getOldMessages();if(l.length>0||h.length>0){u["messages"]={};u["messages"].oldValue=h;u["messages"].value=l}return u};return a});