/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/m/Popover","sap/m/ValueStateHeader"],function(t,e,o){"use strict";var r=t.PlacementType;return function(){this.createPopover=function(o){var i=this,n=new e(o.getId()+"-popup",{showArrow:false,placement:r.VerticalPreferredBottom,showHeader:true,initialFocus:o,horizontalScrolling:true,beforeClose:function(){if(i.getValueStateActiveState()){i._getValueStateHeader().removeStyleClass("sapMPseudoFocus");i.setValueStateActiveState(false)}},afterOpen:function(){this.getDomRef("cont").style.maxWidth=parseInt(this.getDomRef("cont").style.maxWidth)-32+"px"}});return t(n,o)};this.resizePopup=function(t){var e=this.getPopover();if(this.getItemsContainer()&&e){if(this._sPopoverContentWidth){e.setContentWidth(this._sPopoverContentWidth)}setTimeout(function(){if(e&&e.isOpen()&&e.$().outerWidth()<t.$().outerWidth()){e.setContentWidth(t.$().outerWidth()+"px")}},0)}};this.getShowMoreButton=function(){return this.getPopover()&&this.getPopover().getFooter()&&this.getPopover().getFooter().getContent()[1]};this.setShowMoreButton=function(t){this.getPopover().setFooter(t);return this};this.removeShowMoreButton=function(){this.getPopover().destroyAggregation("footer");return this};function t(t,e){t.open=function(){this.openBy(e,false,true)};t.oPopup.setAnimations(function(t,e,o){o()},function(t,e,o){o()});return t}this._getValueStateHeader=function(){var t=this.getPopover();var e=t&&t.getCustomHeader();if(t&&!e){e=this._createValueStateHeader()}return e};this._createValueStateHeader=function(){var t=new o;var e=this.getPopover();e.setCustomHeader(t);t.setPopup(e);return t}}});
//# sourceMappingURL=SuggestionsPopoverPopoverMixin.js.map