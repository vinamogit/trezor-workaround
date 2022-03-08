/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){e.openStart("div",t);e.class("sapMTCMenu");e.class("sapMWrapper");e.openEnd();if(t.getQuickActions().length>0||t.getAggregation("_quickActions")){this.renderQuickActions(e,t)}if(t.getItems().length>0||t.getAggregation("_items")){this.renderItems(e,t)}e.close("div")};e.renderQuickActions=function(e,t){e.openStart("div");e.attr("id",t.getId()+"-quickActions");if(t._oItemsContainer){if(t._oItemsContainer.getCurrentViewKey()==="$default"){e.class("sapMTQAList")}else{e.class("sapMTQAListHidden")}}else{e.class("sapMTQAList")}e.openEnd();(t.getAggregation("_quickActions")||[]).forEach(function(t){t.getEffectiveQuickActions().forEach(function(t){this.renderQuickAction(e,t)}.bind(this))}.bind(this));t.getQuickActions().forEach(function(t){t.getEffectiveQuickActions().forEach(function(t){this.renderQuickAction(e,t)}.bind(this))}.bind(this));e.close("div")};e.renderQuickAction=function(e,t){e.openStart("div",t);e.class("sapMQAction");e.openEnd();e.openStart("div");e.class("sapMQALabel");e.openEnd();e.text(t.getLabel());e.close("div");e.openStart("div");e.openEnd();e.renderControl(t.getContent());e.close("div");e.close("div")};e.renderItems=function(e,t){e.openStart("div");e.class("sapMContainerWrapper");e.openEnd();e.renderControl(t._oItemsContainer);e.close("div")};return e});