/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/fl/util/ManagedObjectModel"],function(e,t){"use strict";var n={};var r="sourceControl";n.applyChange=function(e,t,n){if(n.modifier.targets!=="jsControlTree"){return Promise.reject(new Error("Split change can't be applied on XML tree"))}var o=e.getDefinition();var i=n.modifier;var a=n.view;var u=n.appComponent;var c=e.getDependentControl(r,n);var s;var d;var g;var l;var p;var f;var v;var m;var h;return Promise.resolve().then(function(){return i.getAggregation(c,"menu")}).then(function(e){s=e;return i.getAggregation(s,"items")}).then(function(e){d=e;h=i.getParent(c);return i.getParentAggregationName(c,h)}).then(function(e){g=e;return i.findIndexInParentAggregation(c)}).then(function(e){l=e;p=o.content.newElementIds;f={parentAggregation:g,insertIndex:l,insertedButtons:[]};return d.reduce(function(e,t,n){var r;var o;var c;return e.then(function(){o=n;r=p[o];return i.createControl("sap.m.Button",u,a,r)}).then(function(e){c=e;f.insertedButtons.push(r);v="$sap.m.flexibility.SplitButtonsModel";return i.createControl("sap.ui.fl.util.ManagedObjectModel",u,a,Object.assign({},r,{id:r.id+"-managedObjectModel"}),{object:t,name:v})}).then(function(e){m=e;return i.insertAggregation(c,"dependents",m,0,a)}).then(function(){i.bindProperty(c,"text",v+">/text");i.bindProperty(c,"icon",v+">/icon");i.bindProperty(c,"enabled",v+">/enabled");i.bindProperty(c,"visible",v+">/visible");return i.createControl("sap.ui.core.CustomData",u,a,Object.assign({},r,{id:r.id+"-customData"}),{key:{path:v+">key"},value:{path:v+">value"}})}).then(function(e){return i.bindAggregation(c,"customData",{path:v+">/customData",template:e,templateShareable:false})}).then(function(){return i.attachEvent(c,"press","sap.m.changeHandler.SplitMenuButton.pressHandler",{selector:i.getSelector(t,u),appComponentId:u.getId(),menu:s})}).then(function(){return i.insertAggregation(h,g,c,l+o,a)})},Promise.resolve())}).then(function(){return Promise.resolve().then(i.removeAggregation.bind(i,h,g,c)).then(i.insertAggregation.bind(i,h,"dependents",c,0,a)).then(function(){e.setRevertData(f)})})};n.revertChange=function(e,t,n){var o=n.modifier;var i=e.getRevertData();var a=e.getDependentControl(r,n);var u=n.appComponent;var c=n.view;var s=o.getParent(a);var d=i.parentAggregation;var g=i.insertIndex;var l=[];return Promise.resolve().then(function(){i.insertedButtons.forEach(function(e){l.push(o.bySelector(e,u,c))});return l.reduce(function(e,t){return e.then(function(){return o.removeAggregation(s,d,t)}).then(function(){return o.destroy(t)})},Promise.resolve())}).then(o.insertAggregation.bind(o,s,d,a,g,c)).then(function(){e.resetRevertData()})};n.completeChangeContent=function(e,t,n){var o=n.modifier;var i=n.appComponent;var a=e.getDefinition();if(!t.newElementIds){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.newElementIds attribute required")}if(!t.sourceControlId){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.sourceControlId attribute required")}e.addDependentControl(t.sourceControlId,r,n);a.content.sourceSelector=o.getSelector(t.sourceControlId,i);a.content.newElementIds=t.newElementIds.map(function(e){return o.getSelector(e,i)})};n.pressHandler=function(n,r){var o=e.bySelector(r.selector,t.get(r.appComponentId));o.firePress();r.menu.fireItemSelected({item:o})};return n},true);