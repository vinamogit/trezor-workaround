/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/Device","sap/m/NavContainer","sap/m/Popover","sap/m/Button","./SplitContainerRenderer","sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(e,t,a,i,o,s,r,n,p,l,h,jQuery,g){"use strict";var u=e.ButtonType;var f=e.PlacementType;var d=e.SplitAppMode;var _=t.extend("sap.m.SplitContainer",{metadata:{library:"sap.m",interfaces:["sap.ui.core.IPlaceholderSupport"],properties:{defaultTransitionNameDetail:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMaster:{type:"string",group:"Appearance",defaultValue:"slide"},mode:{type:"sap.m.SplitAppMode",group:"Appearance",defaultValue:d.ShowHideMode},masterButtonText:{type:"string",group:"Appearance",defaultValue:null},masterButtonTooltip:{type:"string",group:"Appearance",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1}},aggregations:{masterPages:{type:"sap.ui.core.Control",multiple:true,singularName:"masterPage"},detailPages:{type:"sap.ui.core.Control",multiple:true,singularName:"detailPage"},_navMaster:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navDetail:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navPopover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},associations:{initialDetail:{type:"sap.ui.core.Control",multiple:false},initialMaster:{type:"sap.ui.core.Control",multiple:false}},events:{masterNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMasterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},masterButton:{},beforeMasterOpen:{},afterMasterOpen:{},beforeMasterClose:{},afterMasterClose:{},detailNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterDetailNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}},designtime:"sap/m/designtime/SplitContainer.designtime"},renderer:p});_.prototype.init=function(){var e=this;if(g.getAccessibility()&&!_._sAriaPopupLabelId){_._sAriaPopupLabelId=new i({text:""}).toStatic().getId()}this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._aMasterPages=[];this._aDetailPages=[];if(!o.system.phone){this._oMasterNav=new s(this.getId()+"-Master",{width:"",navigate:function(t){e._handleNavigationEvent(t,false,true)},afterNavigate:function(t){e._handleNavigationEvent(t,true,true);e._updateMasterButtonTooltip()}});this._oDetailNav=new s(this.getId()+"-Detail",{width:"",navigate:function(t){e._handleNavigationEvent(t,false,false)},afterNavigate:function(t){e._handleNavigationEvent(t,true,false)}});this.setAggregation("_navMaster",this._oMasterNav,true);this.setAggregation("_navDetail",this._oDetailNav,true);this._createShowMasterButton();this._oPopOver=new r(this.getId()+"-Popover",{placement:f.Bottom,showHeader:false,contentWidth:"320px",contentHeight:"600px",beforeOpen:function(){e.fireBeforeMasterOpen()},beforeClose:function(){e.fireBeforeMasterClose()},afterOpen:function(){e.fireAfterMasterOpen();e._bMasterisOpen=true},afterClose:function(){e._afterHideMasterAnimation()}}).addStyleClass("sapMSplitContainerPopover");if(_._sAriaPopupLabelId){this._oPopOver.addAriaLabelledBy(_._sAriaPopupLabelId)}this.setAggregation("_navPopover",this._oPopOver,true)}else{this._oMasterNav=this._oDetailNav=new s({width:"",navigate:function(t){e._handleNavigationEvent(t,false,true)},afterNavigate:function(t){e._handleNavigationEvent(t,true,true)}});this.setAggregation("_navMaster",this._oMasterNav,true)}this._oldIsLandscape=o.orientation.landscape;this._bMasterisOpen=false;var e=this;var t=function(t,a,i){return function(o,s,r){t.apply(e[a],arguments);if(s==="pages"&&e[i]&&e[i].indexOf(o)!==-1){e._removePageFromArray(e[i],o)}}};var a=this._oMasterNav._removeChild;this._oMasterNav._removeChild=t(a,"_oMasterNav","_aMasterPages");if(this._oDetailNav){var n=this._oDetailNav._removeChild;this._oDetailNav._removeChild=t(n,"_oDetailNav","_aDetailPages")}if(o.support.touch){this._fnWindowScroll=this._onWindowScroll.bind(this);window.addEventListener("scroll",this._fnWindowScroll,true)}};_.prototype.onBeforeRendering=function(){if(this._fnResize){o.resize.detachHandler(this._fnResize)}if(this._bMasterisOpen&&(this._portraitHide()||this._hideMode())){this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._bMasterisOpen=false}this._oMasterNav.setInitialPage(sap.ui.getCore().byId(this.getInitialMaster()));this._oMasterNav.setDefaultTransitionName(this.getDefaultTransitionNameMaster());this._updateMasterButtonTooltip();if(!o.system.phone){this._oDetailNav.setInitialPage(sap.ui.getCore().byId(this.getInitialDetail()));this._updateMasterButtonText()}this._oDetailNav.setDefaultTransitionName(this.getDefaultTransitionNameDetail())};_.prototype.exit=function(){if(this._fnResize){o.resize.detachHandler(this._fnResize)}delete this._aMasterPages;delete this._aDetailPages;if(this._oShowMasterBtn){this._oShowMasterBtn.destroy();this._oShowMasterBtn=null}if(o.support.touch){window.removeEventListener("scroll",this._fnWindowScroll)}};_.prototype.onAfterRendering=function(){if(!o.system.phone&&this._oPopOver&&this._oPopOver.isOpen()){this._oPopOver.close()}if(!this._fnResize){this._fnResize=jQuery.proxy(this._handleResize,this)}o.resize.attachHandler(this._fnResize);setTimeout(function(){this._oMasterNav.removeStyleClass("sapMSplitContainerNoTransition")}.bind(this),0)};_.prototype.applySettings=function(e,a){t.prototype.applySettings.call(this,e,a);this._updateMasterInitialPage()};_.prototype.ontouchstart=function(e){if(!o.system.phone){this._bIgnoreSwipe=e.originalEvent&&e.originalEvent._sapui_handledByControl}};_.prototype.ontouchend=function(e){if(!this._bIgnoreSwipe){this._bIgnoreSwipe=this._oScrolledElement&&l(this._oScrolledElement,e.target)}this._oScrolledElement=null};_.prototype._onWindowScroll=function(e){this._oScrolledElement=e.srcElement};_.prototype.onswiperight=function(e){if(o.support.touch===false){return}if((o.system.tablet||o.os.windows&&o.os.version>=8)&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe&&!this._bDetailNavButton){this.showMaster()}};_.prototype.ontap=function(e){if(o.system.phone){return}var t=true,a=jQuery(e.target).closest(".sapMSplitContainerDetail, .sapMSplitContainerMaster"),i=e.srcControl,s=i.getParent(),r=s&&s.isA("sap.m.Button")?s.getMetadata():i.getMetadata();if(a.length>0&&a.hasClass("sapMSplitContainerDetail")){t=false}if((!this._oldIsLandscape&&this.getMode()=="ShowHideMode"||this.getMode()=="HideMode")&&!t&&!l(this._oShowMasterBtn.getDomRef(),e.target)&&!r.getEvent("press")){this.hideMaster()}};_.prototype.onswipeleft=function(e){if((o.system.tablet||o.os.windows&&o.os.version>=8)&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe){this.hideMaster()}};_.prototype._onMasterButtonTap=function(e){if(o.system.phone){return}if(!this._oldIsLandscape){if(this.getMode()=="PopoverMode"){if(!this._oPopOver.isOpen()){this._oPopOver.openBy(this._oShowMasterBtn,true)}else{this._oPopOver.close()}}else{this.showMaster()}}else{if(this.getMode()==="HideMode"){this.showMaster()}}};_.prototype.to=function(e,t,a,i){if(this._oMasterNav.getPage(e)){this._oMasterNav.to(e,t,a,i)}else{this._oDetailNav.to(e,t,a,i)}};_.prototype.backToPage=function(e,t,a){if(this._oMasterNav.getPage(e)){this._oMasterNav.backToPage(e,t,a)}else{this._oDetailNav.backToPage(e,t,a)}};_.prototype._safeBackToPage=function(e,t,a,i){if(this._oMasterNav.getPage(e)){this._oMasterNav._safeBackToPage(e,t,a,i)}else{this._oDetailNav._safeBackToPage(e,t,a,i)}};_.prototype.insertPreviousPage=function(e,t,a){if(this._oMasterNav.getPage(e)){this._oMasterNav.insertPreviousPage(e,t,a)}else{this._oDetailNav.insertPreviousPage(e,t,a)}return this};_.prototype.toMaster=function(e,t,a,i){this._oMasterNav.to(e,t,a,i)};_.prototype.backMaster=function(e,t){this._oMasterNav.back(e,t)};_.prototype.backMasterToPage=function(e,t,a){this._oMasterNav.backToPage(e,t,a)};_.prototype.toDetail=function(e,t,a,i){this._oDetailNav.to(e,t,a,i)};_.prototype.backDetail=function(e,t){this._oDetailNav.back(e,t)};_.prototype.backDetailToPage=function(e,t,a){this._oDetailNav.backToPage(e,t,a)};_.prototype.backToTopMaster=function(e,t){this._oMasterNav.backToTop(e,t)};_.prototype.backToTopDetail=function(e,t){this._oDetailNav.backToTop(e,t)};_.prototype.addMasterPage=function(e){if(this._hasPageInArray(this._aMasterPages,e)){return}if(this._oMasterNav===this._oDetailNav&&this._oDetailNav.getPages()&&this._oDetailNav.getPages().indexOf(e)!==-1){this._removePageFromArray(this._aDetailPages,e)}this._oMasterNav.insertPage(e,this._aMasterPages.length);this._aMasterPages.push(e);return this};_.prototype.addDetailPage=function(e){var t=this,a=this._getRealPage(e);if(this._hasPageInArray(this._aDetailPages,e)){return}e.addDelegate({onBeforeShow:function(){if(a){if(!o.system.phone){if(t._needShowMasterButton()){t._setMasterButton(a)}}}}});if(a){a.addDelegate({onBeforeRendering:function(){if(!o.system.phone&&t._oDetailNav.getCurrentPage()===a){if(!a.getShowNavButton()&&t._needShowMasterButton()){t._setMasterButton(a,true)}else{t._removeMasterButton(a)}}}});if(!o.system.phone){if(!a._setCustomHeaderInSC){a._setCustomHeaderInSC=a.setCustomHeader}a.setCustomHeader=function(e){this._setCustomHeaderInSC.apply(this,arguments);if(e&&t._needShowMasterButton()){t._setMasterButton(a)}return this};if(!a._setShowNavButtonInSC){a._setShowNavButtonInSC=a.setShowNavButton}a.setShowNavButton=function(e){this._setShowNavButtonInSC.apply(this,arguments);if(!e&&t._needShowMasterButton()){t._setMasterButton(a)}else{t._removeMasterButton(a,true)}return this}}}if(this._oMasterNav===this._oDetailNav&&this._oMasterNav.getPages()&&this._oMasterNav.getPages().indexOf(e)!==-1){this._removePageFromArray(this._aMasterPages,e)}this._oDetailNav.addPage(e);this._aDetailPages.push(e);return this};_.prototype.getMasterPages=function(){return this._aMasterPages.slice()};_.prototype.getDetailPages=function(){return this._aDetailPages.slice()};_.prototype.indexOfMasterPage=function(e){return this._indexOfMasterPage(e)};_.prototype.indexOfDetailPage=function(e){return this._indexOfDetailPage(e)};_.prototype.insertMasterPage=function(e,t,a){return this._insertPage(this._aMasterPages,"masterPages",e,t,a)};_.prototype.removeMasterPage=function(e,t){return this._removePage(this._aMasterPages,"masterPages",e,t)};_.prototype.removeAllMasterPages=function(e){this._aMasterPages=[];return this.removeAllAggregation("masterPages",e)};_.prototype.insertDetailPage=function(e,t,a){return this._insertPage(this._aDetailPages,"detailPages",e,t,a)};_.prototype._restoreMethodsInPage=function(e){if(o.system.phone){return}var t=this._getRealPage(e);if(t){if(t._setCustomHeaderInSC){t.setCustomHeader=t._setCustomHeaderInSC;delete t._setCustomHeaderInSC}if(t._setShowNavButtonInSC){t.setShowNavButton=t._setShowNavButtonInSC;delete t._setShowNavButtonInSC}}};_.prototype.removeDetailPage=function(e,t){this._restoreMethodsInPage(e);return this._removePage(this._aDetailPages,"detailPages",e,t)};_.prototype.removeAllDetailPages=function(e){var t=this.getDetailPages();for(var a=0;a<t.length;a++){this._restoreMethodsInPage(t[a])}this._aDetailPages=[];return this.removeAllAggregation("detailPages",e)};_.prototype.addPage=function(e,t){if(t){return this.addMasterPage(e)}else{return this.addDetailPage(e)}};_.prototype.showMaster=function(){var e=this._getRealPage(this._oDetailNav.getCurrentPage());function t(){this._oPopOver.detachAfterOpen(t,this);this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen()}if(this._portraitPopover()){if(!this._oPopOver.isOpen()){this._oPopOver.attachAfterOpen(t,this);this.fireBeforeMasterOpen();this._oPopOver.openBy(this._oShowMasterBtn,true);this._bMasterOpening=true}}else if((this._portraitHide()||this._hideMode())&&(!this._bMasterisOpen||this._bMasterClosing)){this._oMasterNav.$().on("webkitTransitionEnd transitionend",this._afterShowMasterAnimation.bind(this));this.fireBeforeMasterOpen();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",true);this._oMasterNav.getDomRef()&&this._oMasterNav.getDomRef().offsetHeight;this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",false);this._bMasterOpening=true;this._removeMasterButton(e);if(o.browser.webkit){var a=this._oMasterNav;window.setTimeout(function(){a.$().css("box-shadow","none");window.setTimeout(function(){a.$().css("box-shadow","")},50)},0)}}return this};_.prototype.hideMaster=function(){if(this._portraitPopover()){if(this._oPopOver.isOpen()){this._oPopOver.close();this._bMasterClosing=true}}else if((this._portraitHide()||this._hideMode())&&(this._bMasterisOpen||this._oMasterNav.$().hasClass("sapMSplitContainerMasterVisible"))){this._oMasterNav.$().on("webkitTransitionEnd transitionend",this._afterHideMasterAnimation.bind(this));this.fireBeforeMasterClose();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.getDomRef()&&this._oMasterNav.getDomRef().offsetHeight;this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterClosing=true}return this};_.prototype._afterShowMasterAnimation=function(){this._oMasterNav.$().off("webkitTransitionEnd transitionend");if(this._portraitHide()||this._hideMode()){this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen()}};_.prototype._afterHideMasterAnimation=function(){this._oMasterNav.$().off("webkitTransitionEnd transitionend");var e=this._getRealPage(this._oDetailNav.getCurrentPage());this._setMasterButton(e);this._bMasterClosing=false;this._bMasterisOpen=false;if(l(this._oMasterNav.getDomRef(),document.activeElement)){document.activeElement.blur()}this.fireAfterMasterClose()};_.prototype.getCurrentMasterPage=function(){return this._oMasterNav.getCurrentPage()};_.prototype.getCurrentDetailPage=function(){return this._oDetailNav.getCurrentPage()};_.prototype.getCurrentPage=function(e){if(e){return this.getCurrentMasterPage()}else{return this.getCurrentDetailPage()}};_.prototype.getPreviousPage=function(e){if(e){return this._oMasterNav.getPreviousPage()}else{return this._oDetailNav.getPreviousPage()}};_.prototype.getMasterPage=function(e){return this._oMasterNav.getPage(e)};_.prototype.getDetailPage=function(e){return this._oDetailNav.getPage(e)};_.prototype.getPage=function(e,t){if(t){return this.getMasterPage(e)}else{return this.getDetailPage(e)}};_.prototype.isMasterShown=function(){if(o.system.phone){var e=this._oMasterNav.getCurrentPage();return this._indexOfMasterPage(e)!==-1}else{var t=this.getMode();switch(t){case d.StretchCompressMode:return true;case d.HideMode:return this._bMasterisOpen;case d.PopoverMode:case d.ShowHideMode:return o.orientation.landscape||this._bMasterisOpen;default:return false}}};_.prototype.setBackgroundOpacity=function(e){if(e>1||e<0){h.warning("Invalid value "+e+" for SplitContainer.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}return this.setProperty("backgroundOpacity",e)};_.prototype.setMode=function(e){var t=this.getMode();if(t===e){return this}this.setProperty("mode",e,true);if(o.system.phone||!this.getDomRef()){return this}if(t==="HideMode"&&this._oldIsLandscape){this._removeMasterButton(this._oDetailNav.getCurrentPage())}var a=this.getDomRef();if(e!=="PopoverMode"&&this._oPopOver.getContent().length>0){this._updateMasterPosition("landscape")}else if(e=="PopoverMode"){if(!this._oldIsLandscape){if(this._oPopOver.getContent().length===0){this._updateMasterPosition("popover")}this._setMasterButton(this._oDetailNav.getCurrentPage())}a.classList.remove("sapMSplitContainerShowHide");a.classList.remove("sapMSplitContainerStretchCompress");a.classList.remove("sapMSplitContainerHideMode");a.classList.add("sapMSplitContainerPopover")}if(e=="StretchCompressMode"){a.classList.remove("sapMSplitContainerShowHide");a.classList.remove("sapMSplitContainerPopover");a.classList.remove("sapMSplitContainerHideMode");a.classList.add("sapMSplitContainerStretchCompress");this._removeMasterButton(this._oDetailNav.getCurrentPage())}if(e=="ShowHideMode"){a.classList.remove("sapMSplitContainerPopover");a.classList.remove("sapMSplitContainerStretchCompress");a.classList.remove("sapMSplitContainerHideMode");a.classList.add("sapMSplitContainerShowHide");if(!o.orientation.landscape){this._setMasterButton(this._oDetailNav.getCurrentPage())}}if(e==="HideMode"){a.classList.remove("sapMSplitContainerPopover");a.classList.remove("sapMSplitContainerStretchCompress");a.classList.remove("sapMSplitContainerShowHide");a.classList.add("sapMSplitContainerHideMode");this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterisOpen=false;this._setMasterButton(this._oDetailNav.getCurrentPage())}return this};_.prototype._updateMasterInitialPage=function(){if(this.getMode()==="HideMode"&&o.system.phone&&this._aDetailPages){this._oMasterNav.setInitialPage(this.getInitialDetail()?this.getInitialDetail():this.getInitialMaster()||this._aDetailPages[0])}};_.prototype._indexOfMasterPage=function(e){return this._aMasterPages.indexOf(e)};_.prototype._indexOfDetailPage=function(e){return this._aDetailPages.indexOf(e)};_.prototype._insertPage=function(e,t,a,i,o){this.insertAggregation(t,a,i,o);var s;if(i<0){s=0}else if(i>e.length){s=e.length}else{s=i}var r=e?Array.prototype.indexOf.call(e,a):-1;e.splice(s,0,a);if(r!=-1){this._removePageFromArray(e,a)}return this};_.prototype._removePage=function(e,t,a,i){var o=this.removeAggregation(t,a,i);if(o){this._removePageFromArray(e,o)}return o};_.prototype._removePageFromArray=function(e,t){var a=e?Array.prototype.indexOf.call(e,t):-1;if(a!=-1){e.splice(a,1);if(e===this._aDetailPages){this._restoreMethodsInPage(t)}}};_.prototype._handleNavigationEvent=function(e,t,a){var i=(t?"After":"")+(a?"Master":"Detail")+"Navigate",o;i=i.charAt(0).toLowerCase()+i.slice(1);o=this.fireEvent(i,e.mParameters,true);if(!o){e.preventDefault()}};_.prototype._handleResize=function(){var e=o.orientation.landscape,t=this._oDetailNav.getCurrentPage(),a=this.getMode();if(this._oldIsLandscape!==e){this._oldIsLandscape=e;if(!o.system.phone){this.$().toggleClass("sapMSplitContainerPortrait",!e);if(a==="HideMode"){return}if(a==="ShowHideMode"){if(e){this.fireBeforeMasterOpen()}else{this.fireBeforeMasterClose()}}if(a==="ShowHideMode"||a==="PopoverMode"){this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",e);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",!e)}if(a==="ShowHideMode"){if(e){this._bMasterisOpen=true;this.fireAfterMasterOpen()}else{this._bMasterisOpen=false;this.fireAfterMasterClose()}}if(a=="PopoverMode"){if(this._oPopOver.isOpen()){this._oPopOver.attachAfterClose(this._handlePopClose,this);this._oPopOver.close()}else{this._handlePopClose()}}t=this._getRealPage(t);if(!this._oldIsLandscape&&a!="StretchCompressMode"){this._setMasterButton(t)}else{this._removeMasterButton(t)}}if(this._onOrientationChange){this._onOrientationChange()}}};_.prototype._handlePopClose=function(e){this._oPopOver.detachAfterClose(this._handlePopClose,this);if(this._oldIsLandscape){this._updateMasterPosition("landscape")}else{this._updateMasterPosition("popover")}};_.prototype._getRealPage=function(e){var a=e,i;while(a){if(a instanceof t&&a.isA(["sap.m.Page","sap.m.MessagePage","sap.m.semantic.SemanticPage"])){return a}if(a instanceof t&&a.isA("sap.ui.core.mvc.View")){i=a.getContent();if(i.length===1){a=i[0];continue}}else if(a instanceof s){a=a.getCurrentPage();continue}a=null}return a};_.prototype._updateMasterPosition=function(e){var t=this;if(e=="popover"){this.removeAggregation("_navMaster",this._oMasterNav,true);this._oMasterNav.$().remove();this._oPopOver.addContent(this._oMasterNav);this._bMasterisOpen=false}if(e=="landscape"){var a=function(){t._oPopOver.removeAggregation("content",t._oMasterNav,false);t.setAggregation("_navMaster",t._oMasterNav,true);var e=t.$();if(e[0]){var a=sap.ui.getCore().createRenderManager();a.renderControl(t._oMasterNav.addStyleClass("sapMSplitContainerMaster"));a.flush(e[0],false,t.$("BG")[0]?1:0);a.destroy()}};if(this._oPopOver.isOpen()){var i=function(){this._oPopOver.detachAfterClose(i,this);this._bMasterisOpen=false;a()};this._oPopOver.attachAfterClose(i,this);this._oPopOver.close()}else{a()}}};_.prototype._portraitHide=function(){if(!this._oldIsLandscape&&!o.system.phone&&this.getMode()==="ShowHideMode"){return true}else{return false}};_.prototype._portraitPopover=function(){if(!this._oldIsLandscape&&!o.system.phone&&this.getMode()==="PopoverMode"){return true}else{return false}};_.prototype._hideMode=function(){return this.getMode()==="HideMode"&&!o.system.phone};_.prototype._needShowMasterButton=function(){return(this._portraitHide()||this._hideMode()||this._portraitPopover())&&(!this._bMasterisOpen||this._bMasterClosing)};_.prototype._updateMasterButtonTooltip=function(){if(!this._oShowMasterBtn){return}var e=this.getMasterButtonTooltip();if(e){this._oShowMasterBtn.setTooltip(e);return}var t=this._oMasterNav.getCurrentPage();if(t&&t.getTitle){var a=t.getTitle();if(a){a=a.replace(/[_0-9]+$/,"");e=this._rb.getText("SPLITCONTAINER_NAVBUTTON_TOOLTIP",a)}}if(!e){e=this._rb.getText("SPLITCONTAINER_NAVBUTTON_DEFAULT_TOOLTIP")}this._oShowMasterBtn.setTooltip(e)};_.prototype._updateMasterButtonText=function(){this._oShowMasterBtn.setText(this.getMasterButtonText()||this._rb.getText("SPLITCONTAINER_NAVBUTTON_TEXT"))};_.prototype._createShowMasterButton=function(){if(this._oShowMasterBtn&&!this._oShowMasterBtn.bIsDestroyed){return}this._oShowMasterBtn=new n(this.getId()+"-MasterBtn",{icon:a.getIconURI("menu2"),tooltip:this.getMasterButtonTooltip(),type:u.Default,press:jQuery.proxy(this._onMasterButtonTap,this)}).addStyleClass("sapMSplitContainerMasterBtn")};_.prototype._setMasterButton=function(e,t,a){if(!e){return}if(typeof t==="boolean"){a=t;t=undefined}e=this._getRealPage(e);if(!e){return}var i=_._getHeaderButtonAggregation(e),o=i.sAggregationName,s=i.aAggregationContent;for(var r=0;r<s.length;r++){if(s[r]instanceof n&&s[r].getVisible()&&(s[r].getType()==u.Back||s[r].getType()==u.Up&&s[r]!==this._oShowMasterBtn)){this._bDetailNavButton=true;return}}this._bDetailNavButton=false;var p=e._getAnyHeader();var l=false;for(var r=0;r<s.length;r++){if(s[r]===this._oShowMasterBtn){l=true}}if(!l){this._createShowMasterButton();this._updateMasterButtonTooltip();this._updateMasterButtonText();this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");if(p){p.insertAggregation(o,this._oShowMasterBtn,0,a)}}else{this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnHide",false);this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnShow",true)}if(t){t(e)}this.fireMasterButton({show:true})};_._getHeaderButtonAggregation=function(e){var t=e._getAnyHeader(),a,i;if(!t){return}if(t.getContentLeft){a=t.getContentLeft();i="contentLeft"}if(t.getContent){a=t.getContent();i="content"}return{aAggregationContent:a,sAggregationName:i}};_.prototype._removeMasterButton=function(e,t,a){if(!e){return}var i=this,o=this._oShowMasterBtn.$().is(":hidden"),s;if(typeof t==="boolean"){a=t;t=undefined}if(!o&&!a){e=this._getRealPage(e);if(!e){return}s=e._getAnyHeader();if(s){var r=_._getHeaderButtonAggregation(e).aAggregationContent;for(var n=0;n<r.length;n++){if(r[n]===this._oShowMasterBtn){this._oShowMasterBtn.destroy();this._oShowMasterBtn.$().parent().on("webkitAnimationEnd animationend",function(){jQuery(this).off("webkitAnimationEnd animationend");i._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(t){t(e)}});break}}}this.fireMasterButton({show:false})}else{this._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(t){t(e)}if(!o){this.fireMasterButton({show:false})}}};_.prototype._callSuperMethod=function(e,a){var i=Array.prototype.slice.call(arguments);if(a==="masterPages"){if(e==="indexOfAggregation"){return this._indexOfMasterPage.apply(this,i.slice(2))}else{return this._callNavContainerMethod(e,this._oMasterNav,i)}}else if(a==="detailPages"){if(e==="indexOfAggregation"){return this._indexOfDetailPage.apply(this,i.slice(2))}else{return this._callNavContainerMethod(e,this._oDetailNav,i)}}else{return t.prototype[e].apply(this,i.slice(1))}};_.prototype._callNavContainerMethod=function(e,t,a){a[1]="pages";a=a.slice(1);var i=_._mFunctionMapping[e];if(i){a.shift();e=i}return t[e].apply(t,a)};_.prototype._hasPageInArray=function(e,t){return e.some(function(e){return t&&t===e})};_.prototype.showPlaceholder=function(e){if(!g.getPlaceholder()){return}switch(e&&e.aggregation){case"masterPages":return this.getAggregation("_navMaster").showPlaceholder(e);default:return this.getAggregation("_navDetail").showPlaceholder(e)}};_.prototype.hidePlaceholder=function(e){switch(e.aggregation){case"masterPages":this.getAggregation("_navMaster").hidePlaceholder(e);break;default:this.getAggregation("_navDetail").hidePlaceholder(e)}};_.prototype.needPlaceholder=function(e,t){var a;switch(e){case"masterPages":a=this.getAggregation("_navMaster");break;default:a=this.getAggregation("_navDetail")}return!t||a.getCurrentPage()!==t};_.prototype.validateAggregation=function(e,t,a){return this._callSuperMethod("validateAggregation",e,t,a)};_.prototype.setAggregation=function(e,t,a){this._callSuperMethod("setAggregation",e,t,a);return this};_.prototype.getAggregation=function(e,t){return this._callSuperMethod("getAggregation",e,t)};_.prototype.indexOfAggregation=function(e,t){return this._callSuperMethod("indexOfAggregation",e,t)};_.prototype.insertAggregation=function(e,t,a,i){this._callSuperMethod("insertAggregation",e,t,a,i);return this};_.prototype.addAggregation=function(e,t,a){this._callSuperMethod("addAggregation",e,t,a);return this};_.prototype.removeAggregation=function(e,t,a){return this._callSuperMethod("removeAggregation",e,t,a)};_.prototype.removeAllAggregation=function(e,t){return this._callSuperMethod("removeAllAggregation",e,t)};_.prototype.destroyAggregation=function(e,t){this._callSuperMethod("destroyAggregation",e,t);return this};_._mFunctionMapping={getAggregation:"getPage",addAggregation:"addPage",insertAggregation:"insertPage",removeAggregation:"removePage",removeAllAggregation:"removeAllPages"};return _});
//# sourceMappingURL=SplitContainer.js.map