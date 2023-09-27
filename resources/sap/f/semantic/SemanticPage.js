/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Shortcut","sap/f/library","sap/f/DynamicPage","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","sap/m/OverflowToolbar","sap/m/ActionSheet","./SemanticTitle","./SemanticFooter","./SemanticShareMenu","./SemanticConfiguration","./SemanticPageRenderer"],function(t,e,i,n,o,a,r,s,l,c,g,p,u){"use strict";var h=i.DynamicPageTitleArea;var _=t.extend("sap.f.semantic.SemanticPage",{metadata:{library:"sap.f",properties:{headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinnable:{type:"boolean",group:"Behavior",defaultValue:true},preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},titlePrimaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:h.Begin,deprecated:true},titleAreaShrinkRatio:{type:"sap.f.DynamicPageTitleShrinkRatio",group:"Appearance",defaultValue:"1:1.6:1.6"},fitContent:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{titleHeading:{type:"sap.ui.core.Control",multiple:false,forwarding:{getter:"_getTitle",aggregation:"heading"}},titleExpandedHeading:{type:"sap.ui.core.Control",multiple:false,forwarding:{getter:"_getTitle",aggregation:"expandedHeading"}},titleSnappedHeading:{type:"sap.ui.core.Control",multiple:false,forwarding:{getter:"_getTitle",aggregation:"snappedHeading"}},titleBreadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false,forwarding:{getter:"_getTitle",aggregation:"breadcrumbs"}},titleSnappedOnMobile:{type:"sap.m.Title",multiple:false,forwarding:{getter:"_getTitle",aggregation:"snappedTitleOnMobile"}},titleSnappedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"snappedContent"}},titleExpandedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"expandedContent"}},titleContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"content"}},titleMainAction:{type:"sap.f.semantic.TitleMainAction",multiple:false},editAction:{type:"sap.f.semantic.EditAction",multiple:false},deleteAction:{type:"sap.f.semantic.DeleteAction",multiple:false},copyAction:{type:"sap.f.semantic.CopyAction",multiple:false},addAction:{type:"sap.f.semantic.AddAction",multiple:false},flagAction:{type:"sap.f.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.f.semantic.FavoriteAction",multiple:false},fullScreenAction:{type:"sap.f.semantic.FullScreenAction",multiple:false},exitFullScreenAction:{type:"sap.f.semantic.ExitFullScreenAction",multiple:false},closeAction:{type:"sap.f.semantic.CloseAction",multiple:false},titleCustomTextActions:{type:"sap.m.Button",multiple:true},titleCustomIconActions:{type:"sap.m.OverflowToolbarButton",multiple:true},headerContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getHeader",aggregation:"content"}},content:{type:"sap.ui.core.Control",multiple:false},footerMainAction:{type:"sap.f.semantic.FooterMainAction",multiple:false},messagesIndicator:{type:"sap.f.semantic.MessagesIndicator",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false},positiveAction:{type:"sap.f.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.f.semantic.NegativeAction",multiple:false},footerCustomActions:{type:"sap.m.Button",multiple:true},discussInJamAction:{type:"sap.f.semantic.DiscussInJamAction",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},shareInJamAction:{type:"sap.f.semantic.ShareInJamAction",multiple:false},sendMessageAction:{type:"sap.f.semantic.SendMessageAction",multiple:false},sendEmailAction:{type:"sap.f.semantic.SendEmailAction",multiple:false},printAction:{type:"sap.f.semantic.PrintAction",multiple:false},customShareActions:{type:"sap.m.Button",multiple:true},landmarkInfo:{type:"sap.f.DynamicPageAccessibleLandmarkInfo",multiple:false,forwarding:{getter:"_getPage",aggregation:"landmarkInfo"}},_dynamicPage:{type:"sap.f.DynamicPage",multiple:false,visibility:"hidden"}},dnd:{draggable:false,droppable:true},designtime:"sap/f/designtime/SemanticPage.designtime"},renderer:u});_._EVENTS={SHARE_MENU_CONTENT_CHANGED:"_shareMenuContentChanged"};_._SAVE_AS_TILE_ACTION="saveAsTileAction";_.CONTENT_PADDING_CLASSES_TO_FORWARD={sapUiNoContentPadding:true,sapUiContentPadding:true,sapUiResponsiveContentPadding:true};_.ARIA_ROLE_DESCRIPTION="SEMANTIC_PAGE_ROLE_DESCRIPTION";_.prototype.init=function(){this._bSPBeingDestroyed=false;this._initDynamicPage();this._attachShareMenuButtonChange();this._fnActionSubstituteParentFunction=function(){return this}.bind(this)};_.prototype.exit=function(){this._bSPBeingDestroyed=true;this._cleanMemory()};_.prototype.setHeaderExpanded=function(t){this._getPage().setHeaderExpanded(t);return this};_.prototype.getHeaderExpanded=function(){return this._getPage().getHeaderExpanded()};_.prototype.setHeaderPinnable=function(t){var e=this._getPage(),i=e.getHeader();i.setPinnable(t);return this.setProperty("headerPinnable",i.getPinnable(),true)};_.prototype.setPreserveHeaderStateOnScroll=function(t){var e=this._getPage();e.setPreserveHeaderStateOnScroll(t);return this.setProperty("preserveHeaderStateOnScroll",e.getPreserveHeaderStateOnScroll(),true)};_.prototype.setToggleHeaderOnTitleClick=function(t){this._getPage().setToggleHeaderOnTitleClick(t);return this.setProperty("toggleHeaderOnTitleClick",t,true)};_.prototype.setShowFooter=function(t){this._getPage().setShowFooter(t);return this.setProperty("showFooter",t,true)};_.prototype.setTitlePrimaryArea=function(t){var e=this._getTitle();e.setPrimaryArea(t);return this.setProperty("titlePrimaryArea",e.getPrimaryArea(),true)};_.prototype.setTitleAreaShrinkRatio=function(t){var e=this._getTitle();e.setAreaShrinkRatio(t);return this.setProperty("titleAreaShrinkRatio",e.getAreaShrinkRatio(),true)};_.prototype.setFitContent=function(t){this._getPage().setFitContent(t);return this.setProperty("fitContent",t,true)};_.prototype.addStyleClass=function(e,i){var n=this.getAggregation("_dynamicPage");if(_.CONTENT_PADDING_CLASSES_TO_FORWARD[e]){n.addStyleClass(e,true)}return t.prototype.addStyleClass.call(this,e,i)};_.prototype.removeStyleClass=function(e,i){var n=this.getAggregation("_dynamicPage");if(_.CONTENT_PADDING_CLASSES_TO_FORWARD[e]){n.removeStyleClass(e,true)}return t.prototype.removeStyleClass.call(this,e,i)};_.prototype.clone=function(){var e=t.prototype.clone.apply(this,arguments),i=this.getAggregation("_dynamicPage").getContent();e.setContent(i.clone());return e};_.prototype.setAggregation=function(e,i,n){var o=this.mAggregations[e],a,r;if(o===i){return this}i=this.validateAggregation(e,i,false);if(e===_._SAVE_AS_TILE_ACTION){a=_._SAVE_AS_TILE_ACTION}else{a=this.getMetadata().getManagedAggregation(e).type}if(p.isKnownSemanticType(a)){r=p.getPlacement(a);if(o){this._onRemoveAggregation(o,a);this._getSemanticContainer(r).removeContent(o,r)}if(i){i._getType=function(){return a};this._getSemanticContainer(r).addContent(i,r);this._onAddAggregation(i,a)}return t.prototype.setAggregation.call(this,e,i,true)}return t.prototype.setAggregation.call(this,e,i,n)};_.prototype.destroyAggregation=function(e,i){var n=this.getMetadata().getAggregations()[e],o,a,r;if(e===_._SAVE_AS_TILE_ACTION){r=_._SAVE_AS_TILE_ACTION}else{r=n&&n.type}if(r&&p.isKnownSemanticType(r)){o=t.prototype.getAggregation.call(this,e);if(o){a=p.getPlacement(r);this._onRemoveAggregation(o,r);!this._bSPBeingDestroyed&&this._getSemanticContainer(a).removeContent(o,a)}}return t.prototype.destroyAggregation.call(this,e,i)};_.prototype.onBeforeRendering=function(){var t=this._getShareMenu(),e=t._getVisibleActions(),i=e.length;t._getShareMenuButton().setVisible(i>1);if(i===1){this._showSingleVisibleAction()}if(this._iVisibleShareMenuAction===1&i>1){this._hideSingleVisibleAction();this._iVisibleShareMenuAction=i}};_.prototype._addShareMenuSingleAction=function(t){if(t){var e=p.isKnownSemanticType(t.getMetadata().getName());t._bIsSingleAction=true;this._getSemanticTitle().addContent(t,e?p._Placement.titleIcon:p._Placement.titleText);this._iVisibleShareMenuAction=1;this._oSingleVisibleAction=t}};["getContent","setContent","destroyContent"].forEach(function(t){var e=/^(set|destroy)/.test(t);_.prototype[t]=function(i){var n=this._getPage();var o=n[t].apply(n,arguments);return e?this:o}},this);["addTitleCustomTextAction","insertTitleCustomTextAction","indexOfTitleCustomTextAction","removeTitleCustomTextAction","removeAllTitleCustomTextActions","destroyTitleCustomTextActions","getTitleCustomTextActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);_.prototype[t]=function(){var i=this._getSemanticTitle(),n=t.replace(/TitleCustomTextAction?/,"CustomTextAction"),o;o=i[n].apply(i,arguments);return e?this:o}},this);["addTitleCustomIconAction","insertTitleCustomIconAction","indexOfTitleCustomIconAction","removeTitleCustomIconAction","removeAllTitleCustomIconActions","destroyTitleCustomIconActions","getTitleCustomIconActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);_.prototype[t]=function(){var i=this._getSemanticTitle(),n=t.replace(/TitleCustomIconAction?/,"CustomIconAction"),o;o=i[n].apply(i,arguments);return e?this:o}},this);["addFooterCustomAction","insertFooterCustomAction","indexOfFooterCustomAction","removeFooterCustomAction","removeAllFooterCustomActions","destroyFooterCustomActions","getFooterCustomActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);_.prototype[t]=function(){var i=this._getSemanticFooter(),n=t.replace(/FooterCustomAction?/,"CustomAction"),o;o=i[n].apply(i,arguments);return e?this:o}},this);["addCustomShareAction","insertCustomShareAction","indexOfCustomShareAction","removeCustomShareAction","removeAllCustomShareActions","destroyCustomShareActions","getCustomShareActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);_.prototype[t]=function(){var i=this._getShareMenu(),n=t.replace(/CustomShareAction?/,"CustomAction"),o;o=i[n].apply(i,arguments);return e?this:o}},this);_.prototype._onAddAggregation=function(t,e){if(e===_._SAVE_AS_TILE_ACTION){this._replaceParent(t)}};_.prototype._onRemoveAggregation=function(t,e){if(e===_._SAVE_AS_TILE_ACTION){this._restoreParent(t)}if(t._getType){delete t._getType}};_.prototype._replaceParent=function(t){if(t._fnOriginalGetParent){return}t._fnOriginalGetParent=t.getParent;t.getParent=this._fnActionSubstituteParentFunction};_.prototype._restoreParent=function(t){if(t&&t._fnOriginalGetParent){t.getParent=t._fnOriginalGetParent}};_.prototype._attachShareMenuButtonChange=function(){this.attachEvent(_._EVENTS.SHARE_MENU_CONTENT_CHANGED,this._onShareMenuContentChanged,this)};_.prototype._onShareMenuContentChanged=function(t){var e=t.getParameter("bEmpty"),i=this._getSemanticTitle(),n=this._getShareMenu(),o=n._getShareMenuButton();if(!o.getParent()){i.addContent(o,"shareIcon");return}o.setVisible(!e)};_.prototype._getPage=function(){if(!this.getAggregation("_dynamicPage")){this._initDynamicPage()}return this.getAggregation("_dynamicPage")};_.prototype._initDynamicPage=function(){var t=new n(this.getId()+"-page",{title:this._getTitle(),header:this._getHeader(),footer:this._getFooter()}),e=sap.ui.getCore().getLibraryResourceBundle("sap.f").getText(_.ARIA_ROLE_DESCRIPTION);t._setAriaRoleDescription(e);this.setAggregation("_dynamicPage",t,true)};_.prototype._getTitle=function(){if(!this._oDynamicPageTitle){this._oDynamicPageTitle=this._getSemanticTitle()._getContainer();e.register(this._oDynamicPageTitle,"Ctrl+Shift+S",this._openShareMenu.bind(this))}return this._oDynamicPageTitle};_.prototype._getHeader=function(){if(!this._oDynamicPageHeader){this._oDynamicPageHeader=new a(this.getId()+"-pageHeader")}return this._oDynamicPageHeader};_.prototype._getFooter=function(){if(!this._oDynamicPageFooter){this._oDynamicPageFooter=this._getSemanticFooter()._getContainer()}return this._oDynamicPageFooter};_.prototype._getSemanticTitle=function(){if(!this._oSemanticTitle){this._oSemanticTitle=new l(new o(this.getId()+"-pageTitle"),this)}return this._oSemanticTitle};_.prototype._getShareMenu=function(){if(!this._oShareMenu){this._oShareMenu=new g(this._getActionSheet(),this);this.addDependent(this._oShareMenu._oContainer);this._oShareMenu.attachEvent("_visibleActionsChanged",this._onShareMenuActionsChanged.bind(this))}return this._oShareMenu};_.prototype._onShareMenuActionsChanged=function(t){var e=t.getParameter("visibleActionsCount");if(this._iVisibleShareMenuAction!==e){if(e===1){this._showSingleVisibleAction()}if(e!==1){this._hideSingleVisibleAction()}}this._iVisibleShareMenuAction=e};_.prototype._showSingleVisibleAction=function(){var t=this._getShareMenu(),e=t._getVisibleActions(),i=t._aShareMenuActions.concat(t._aCustomShareActions),n;if(e.length===1){n=i.filter(function(t){return t._getControl&&t._getControl()===e[0]||t===e[0]})[0];var o=n._getControl&&n._getControl();if(o){var a="sapMActionSheet";o.aCustomStyleClasses.filter(function(t){return t.indexOf(a)>-1}).forEach(function(t){o.removeStyleClass(t)})}this._addShareMenuSingleAction(n)}};_.prototype._hideSingleVisibleAction=function(){var t=p._Placement.shareMenu,e=this._getSemanticContainer(t),i;if(this._oSingleVisibleAction){i=p.isKnownSemanticType(this._oSingleVisibleAction.getMetadata().getName());this._oSingleVisibleAction._bIsSingleAction=false;this._getSemanticTitle().removeContent(this._oSingleVisibleAction,i?p._Placement.titleIcon:p._Placement.titleText);i?e.addContent(this._oSingleVisibleAction):e.insertCustomAction(this._oSingleVisibleAction,0);this._onAddAggregation(this._oSingleVisibleAction,t);this._oSingleVisibleAction=null}};_.prototype._openShareMenu=function(){var t=this._getShareMenu()._getShareMenuButton(),e=this._getTitle().getAggregation("_actionsToolbar")._getOverflowButton();if(t.getVisible()){this._getActionSheet().openBy(!t._bInOverflow?t:e)}};_.prototype._getActionSheet=function(){if(!this._oActionSheet){this._oActionSheet=new s(this.getId()+"-shareMenu")}return this._oActionSheet};_.prototype._getSemanticFooter=function(){if(!this._oSemanticFooter){this._oSemanticFooter=new c(this._getOverflowToolbar(),this)}return this._oSemanticFooter};_.prototype._getOverflowToolbar=function(){if(!this._oOverflowToolbar){this._oOverflowToolbar=new r(this.getId()+"-pageFooter")}return this._oOverflowToolbar};_.prototype._getSemanticContainer=function(t){var e=p._Placement;if(t===e.titleText||t===e.titleIcon){return this._getSemanticTitle()}else if(t===e.footerLeft||t===e.footerRight){return this._getSemanticFooter()}else if(t===e.shareMenu){return this._getShareMenu()}return null};_.prototype._cleanMemory=function(){if(this._oShareMenu){this._oShareMenu.destroy();this._oShareMenu=null}if(this._oActionSheet){this._oActionSheet.destroy();this._oActionSheet=null}if(this._oSemanticTitle){this._oSemanticTitle.destroy();this._oSemanticTitle=null}if(this._oDynamicPageTitle){this._oDynamicPageTitle.destroy();this._oDynamicPageTitle=null}if(this._oDynamicPageHeader){this._oDynamicPageHeader.destroy();this._oDynamicPageHeader=null}if(this._oSemanticFooter){this._oSemanticFooter.destroy();this._oSemanticFooter=null}if(this._oDynamicPageFooter){this._oDynamicPageFooter.destroy();this._oDynamicPageFooter=null}if(this._oOverflowToolbar){this._oOverflowToolbar.destroy();this._oOverflowToolbar=null}};return _});
//# sourceMappingURL=SemanticPage.js.map