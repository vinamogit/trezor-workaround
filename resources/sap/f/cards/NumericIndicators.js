/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./NumericIndicatorsRenderer","sap/ui/core/Control","sap/m/NumericContent"],function(e,t,r){"use strict";var a=t.extend("sap.f.cards.NumericIndicators",{metadata:{library:"sap.f",properties:{number:{type:"string",group:"Data"},numberSize:{type:"string",group:"Appearance",defaultValue:"L"},scale:{type:"string",group:"Data"},trend:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},state:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},sideIndicatorsAlignment:{type:"sap.f.cards.NumericHeaderSideIndicatorsAlignment",group:"Appearance",defaultValue:"Begin"}},aggregations:{sideIndicators:{type:"sap.f.cards.NumericSideIndicator",multiple:true},_mainIndicator:{type:"sap.m.NumericContent",multiple:false,visibility:"hidden"}}},renderer:e});a.prototype.setNumber=function(e){this.setProperty("number",e);this._getMainIndicator().setValue(e);return this};a.prototype.setScale=function(e){this.setProperty("scale",e,true);this._getMainIndicator().setScale(e);return this};a.prototype.setTrend=function(e){this.setProperty("trend",e,true);this._getMainIndicator().setIndicator(e);return this};a.prototype.setState=function(e){this.setProperty("state",e,true);this._getMainIndicator().setValueColor(e);return this};a.prototype._getMainIndicator=function(){var e=this.getAggregation("_mainIndicator");if(!e){e=new r({id:this.getId()+"-mainIndicator",withMargin:false,nullifyValue:false,animateTextChange:false,truncateValueTo:100});this.setAggregation("_mainIndicator",e)}return e};return a});