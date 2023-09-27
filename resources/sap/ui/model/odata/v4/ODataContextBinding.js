/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/ContextBinding"],function(e,t,n,i,o,r,a,s,h){"use strict";var u="sap.ui.model.odata.v4.ODataContextBinding",d={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true},c=h.extend("sap.ui.model.odata.v4.ODataContextBinding",{constructor:l});function l(n,i,r,a){var s=i.indexOf("(...)"),u=this;h.call(this,n,i);t.call(this);if(i.endsWith("/")){throw new Error("Invalid path: "+i)}this.bHasFetchedExpandSelectProperties=false;this.oOperation=undefined;this.oParameterContext=null;this.oReturnValueContext=null;if(s>=0){if(s!==this.sPath.length-5){throw new Error("The path must not continue after a deferred operation: "+this.sPath)}this.oOperation={bAction:undefined,mChangeListeners:{},mParameters:{},mRefreshParameters:{}};if(!this.bRelative){this.oParameterContext=e.create(this.oModel,this,this.sPath+"/$Parameter")}}a=o.clone(a)||{};this.checkBindingParameters(a,["$$canonicalPath","$$groupId","$$inheritExpandSelect","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.sGroupId=a.$$groupId;this.bInheritExpandSelect=a.$$inheritExpandSelect;this.sUpdateGroupId=a.$$updateGroupId;this.applyParameters(a);this.oElementContext=this.bRelative?null:e.createNewContext(this.oModel,this,i);if(!this.oOperation&&(!this.bRelative||r&&!r.fetchValue)){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(r);n.bindingCreated(this);Promise.resolve().then(function(){u.bInitial=false})}t(c.prototype);c.prototype._execute=function(e,t,n,i,r){var a=this.oModel.getMetaModel(),h,d,c=this.getResolvedPathWithReplacedTransientPredicates(),l=o.getMetaPath(c),p=this;function f(){p._fireChange({reason:s.Change});return p.refreshDependentBindings("",e.getGroupId(),true)}d=a.fetchObject(l+"/@$ui5.overload").then(function(o){var s,u,d;if(!o){h=a.getObject(l);if(!h||h.$kind!=="NavigationProperty"||!r){throw new Error("Unknown operation: "+c)}}else if(o.length!==1){throw new Error("Expected a single overload, but found "+o.length+" for "+c)}else{h=o[0]}if(p.bRelative&&p.oContext.getBinding){u=p.sPath.lastIndexOf("/");d=u>=0?p.sPath.slice(0,u):"";s=p.oContext.getValue.bind(p.oContext,d)}return p.createCacheAndRequest(e,c,h,t,s,n,i)}).then(function(e){return f().then(function(){return p.handleOperationResult(c,h,e,r)})},function(e){o.adjustTargetsInError(e,h,p.oParameterContext.getPath(),p.bRelative?p.oContext.getPath():undefined);return f().then(function(){throw e})}).catch(function(t){e.unlock(true);p.oModel.reportError("Failed to execute "+c,u,t);throw t});return Promise.resolve(d)};c.prototype.adjustPredicate=function(e,n){t.prototype.adjustPredicate.apply(this,arguments);if(this.mCacheQueryOptions){this.fetchCache(this.oContext,true)}if(this.oElementContext){this.oElementContext.adjustPredicate(e,n)}};c.prototype.applyParameters=function(e,t){this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if(this.isRootBindingSuspended()){if(!this.oOperation){this.sResumeChangeReason=s.Change}}else if(!this.oOperation){this.fetchCache(this.oContext);if(t){this.refreshInternal("",undefined,true).catch(this.oModel.getReporter())}}else if(this.oOperation.bAction===false){this.execute().catch(this.oModel.getReporter())}};c.prototype.attachEvent=function(e,t,n,i){if(!(e in d)){throw new Error("Unsupported event '"+e+"': v4.ODataContextBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};c.prototype.computeOperationQueryOptions=function(){return Object.assign({},this.oModel.mUriParameters,this.getQueryOptionsFromParameters())};c.prototype.checkKeepAlive=function(){throw new Error("Unsupported "+this)};c.prototype.createCacheAndRequest=function(e,t,i,a,s,h,u){var d=i.$kind==="Action",c,l=s,p=this.oModel,f=o.getMetaPath(t),g=t.slice(1),C=p.oRequestor,m=this;function x(e){if(m.isReturnValueLikeBindingParameter(i)){if(m.hasReturnValueContext()){return o.getReturnValueContextPath(g,o.getPrivateAnnotation(e,"predicate"))}if(o.getPrivateAnnotation(l,"predicate")===o.getPrivateAnnotation(e,"predicate")){return g.slice(0,g.lastIndexOf("/"))}}return g}function P(e){var t;o.adjustTargetsInError(e,i,m.oParameterContext.getPath(),m.bRelative?m.oContext.getPath():undefined);e.error.$ignoreTopLevel=true;t=u(o.extractMessages(e).map(function(e){return m.oModel.createUI5Message(e)}));if(!(t instanceof Promise)){throw new Error("Not a promise: "+t)}return t}if(u&&i.$kind!=="Action"){throw new Error("Not an action: "+t)}if(!d&&i.$kind!=="Function"&&i.$kind!=="NavigationProperty"){throw new Error("Not an operation: "+t)}if(d&&s){l=s()}if(h&&!(d&&i.$IsBound&&l)){throw new Error("Not a bound action: "+t)}if(this.bInheritExpandSelect&&!this.isReturnValueLikeBindingParameter(i)){throw new Error("Must not set parameter $$inheritExpandSelect on this binding")}if(i.$kind!=="NavigationProperty"){f+="/@$ui5.overload/0/$ReturnType";if(i.$ReturnType&&!i.$ReturnType.$Type.startsWith("Edm.")){f+="/$Type"}}else if(!o.isEmptyObject(a)){throw new Error("Unsupported parameters for navigation property")}if(m.oReturnValueContext){m.oReturnValueContext.destroy();m.oReturnValueContext=null}this.oOperation.bAction=d;this.oOperation.mRefreshParameters=a;a=Object.assign({},a);this.mCacheQueryOptions=this.computeOperationQueryOptions();t=C.getPathAndAddQueryOptions(t,i,a,this.mCacheQueryOptions,l);c=n.createSingle(C,t,this.mCacheQueryOptions,p.bAutoExpandSelect,p.bSharedRequests,undefined,d,f);this.oCache=c;this.oCachePromise=r.resolve(c);return d?c.post(e,a,l,h,u&&P,x):c.fetchValue(e,"",undefined,undefined,false,x)};c.prototype.delete=function(e,t,n,i,o,r){var a=this._findEmptyPathParentContext(this.oElementContext),h=a.getBinding(),u=h.getContext(),d=h.oReturnValueContext,c=this;function l(){r();a.oDeletePromise=null}if(!h.execute){n.oDeletePromise=h.delete(e,t,a,n.getValue(),o,l);return n.oDeletePromise}h.oElementContext=null;if(d){h.oReturnValueContext=null}this._fireChange({reason:s.Remove});n.oDeletePromise=a.doDelete(e,t,"",null,this,function(e,t){if(t>0){l()}}).then(function(){a.destroy();if(d){d.destroy()}},function(e){l();if(!h.isRelative()||u===h.getContext()){h.oElementContext=a;if(d){h.oReturnValueContext=d}c._fireChange({reason:s.Add})}throw e});return n.oDeletePromise};c.prototype.destroy=function(){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=undefined}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=undefined}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=undefined}this.oModel.bindingDestroyed(this);this.oOperation=undefined;this.mParameters=undefined;this.mQueryOptions=undefined;t.prototype.destroy.call(this);h.prototype.destroy.call(this)};c.prototype.doCreateCache=function(e,t,i,o){return n.createSingle(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect,this.oModel.bSharedRequests,o)};c.prototype.doDeregisterChangeListener=function(e,n){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){o.removeByPath(this.oOperation.mChangeListeners,e.slice(11),n);return}t.prototype.doDeregisterChangeListener.apply(this,arguments)};c.prototype.doFetchOrGetQueryOptions=function(e){return this.fetchResolvedQueryOptions(e)};c.prototype.doSetProperty=function(e,t,n){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){o.updateAll(this.oOperation.mChangeListeners,"",this.oOperation.mParameters,o.makeUpdateData(e.split("/").slice(1),t));this.oOperation.bAction=undefined;if(n){n.unlock()}return r.resolve()}};c.prototype.doSuspend=function(){if(this.bInitial&&!this.oOperation){this.sResumeChangeReason=s.Change}};c.prototype.execute=function(e,t,n,i){var r=this.getResolvedPath();this.checkSuspended();o.checkGroupId(e);if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(this.bRelative){if(!r){throw new Error("Unresolved binding: "+this.sPath)}if(this.oContext.isTransient&&this.oContext.isTransient()){throw new Error("Execute for transient context not allowed: "+r)}if(this.oContext.getPath().includes("(...)")){throw new Error("Nested deferred operation bindings not supported: "+r)}if(i){if(!this.oContext.getBinding){throw new Error("Cannot replace this parent context: "+this.oContext)}this.oContext.getBinding().checkKeepAlive(this.oContext,true)}}else if(i){throw new Error("Cannot replace when operation is not relative")}return this._execute(this.lockGroup(e,true),o.publicClone(this.oOperation.mParameters,true),t,n,i)};c.prototype.doFetchExpandSelectProperties=function(){var e,t=this;if(this.bHasFetchedExpandSelectProperties||!this.oModel.bAutoExpandSelect||!this.mParameters.$expand&&!this.mParameters.$select){return}e=this.getResolvedPath();o.convertExpandSelectToPaths(this.oModel.buildQueryOptions(this.mParameters,true)).forEach(function(n){t.oContext.fetchValue(o.buildPath(e,n)).catch(t.oModel.getReporter())});this.bHasFetchedExpandSelectProperties=true};c.prototype.fetchValue=function(e,t,n){var a=n&&this.oCache!==undefined?r.resolve(this.oCache):this.oCachePromise,s,h=this;if(this.isRootBindingSuspended()){s=new Error("Suspended binding provides no value");s.canceled="noDebugLog";throw s}return a.then(function(r){var a,s=false,d,c=h.getResolvedPath(),l=r||h.oOperation?h.getRelativePath(e):undefined,p,f;if(h.oOperation){if(l===undefined){return h.oContext.fetchValue(e,t,n)}p=l.split("/");if(p[0]==="$Parameter"){if(p.length===1){return undefined}o.addByPath(h.oOperation.mChangeListeners,l.slice(11),t);f=o.drillDown(h.oOperation.mParameters,p.slice(1));return f===undefined?null:f}}if(r&&l!==undefined){if(n){d=i.$cached}else{d=h.oReadGroupLock||h.lockGroup();h.oReadGroupLock=undefined}a=h.isRefreshWithoutBubbling();return h.resolveRefreshPromise(r.fetchValue(d,l,function(){s=true;h.fireDataRequested(a)},t)).then(function(e){h.assertSameCache(r);return e}).then(function(e){if(s){h.fireDataReceived({data:{}},a)}return e},function(e){d.unlock(true);if(s){h.oModel.reportError("Failed to read path "+c,u,e);h.fireDataReceived(e.canceled?{data:{}}:{error:e},a)}throw e})}if(!h.oOperation&&h.oContext){if(!n){h.doFetchExpandSelectProperties()}return h.oContext.fetchValue(e,t,n)}})};c.prototype.findContextForCanonicalPath=function(e){var t=this.oOperation?this.oReturnValueContext:this.oElementContext,n,i;if(t){n=t.getValue();if(n&&o.hasPrivateAnnotation(n,"predicate")){i=t.fetchCanonicalPath();i.caught();if(i.getResult()===e){return t}}}};c.prototype.getDependentBindings=function(){return this.oModel.getDependentBindings(this)};c.prototype.getParameterContext=function(){if(!this.oOperation){throw new Error("Not a deferred operation binding: "+this)}return this.oParameterContext};c.prototype.getQueryOptionsFromParameters=function(){var e,t=this.mQueryOptions;if(this.bInheritExpandSelect){e=this.oContext.getBinding().getInheritableQueryOptions();t=Object.assign({},t);if("$select"in e){t.$select=t.$select&&t.$select.slice();o.addToSelect(t,e.$select)}if("$expand"in e){t.$expand=e.$expand}}return t};c.prototype.getResolvedPathWithReplacedTransientPredicates=function(){var e="",t=this.getResolvedPath(),n,i=this;if(t&&t.includes("($uid=")){n=t.slice(1).split("/");t="";n.forEach(function(n){var r,a,s;e+="/"+n;s=n.indexOf("($uid=");if(s>=0){r=i.oContext.getValue(e);a=r&&o.getPrivateAnnotation(r,"predicate");if(!a){throw new Error("No key predicate known at "+e)}t+="/"+n.slice(0,s)+a}else{t+="/"+n}})}return t};c.prototype.handleOperationResult=function(t,n,i,a){var s,h,u,d,c;if(this.isReturnValueLikeBindingParameter(n)){h=this.oContext.getValue();s=h&&o.getPrivateAnnotation(h,"predicate");u=o.getPrivateAnnotation(i,"predicate");if(u){if(s===u){this.oContext.patch(i)}if(this.hasReturnValueContext()){if(a){this.oCache=null;this.oCachePromise=r.resolve(null);c=this.oContext.getBinding().doReplaceWith(this.oContext,i,u);c.setNewGeneration();return c}d=o.getReturnValueContextPath(t,u);this.oReturnValueContext=e.createNewContext(this.oModel,this,d);this.oCache.setResourcePath(d.slice(1));return this.oReturnValueContext}}}if(a){throw new Error("Cannot replace w/o return value context")}};c.prototype.hasReturnValueContext=function(){var e=o.getMetaPath(this.getResolvedPath()).split("/");return e.length===3&&this.oModel.getMetaModel().getObject("/"+e[1]).$kind==="EntitySet"};c.prototype.initialize=function(){this.bInitial=false;if(this.isResolved()&&!this.isRootBindingSuspended()){this._fireChange({reason:s.Change})}};c.prototype.isReturnValueLikeBindingParameter=function(e){var t,n;if(!(this.bRelative&&this.oContext&&this.oContext.getBinding)){return false}if(e.$kind==="NavigationProperty"){if(e.$isCollection||this.sPath.includes("/")){return false}n=o.getMetaPath(this.oContext.getPath());if(n.lastIndexOf("/")>0){return false}t=this.oModel.getMetaModel().getObject(n);return t.$kind==="EntitySet"&&t.$Type===e.$Type&&t.$NavigationPropertyBinding&&t.$NavigationPropertyBinding[this.sPath.slice(0,-5)]===n.slice(1)}return e.$IsBound&&e.$ReturnType&&!e.$ReturnType.$isCollection&&e.$EntitySetPath&&!e.$EntitySetPath.includes("/")};c.prototype.refreshDependentBindings=function(e,t,n,i){return r.all(this.getDependentBindings().map(function(o){return o.refreshInternal(e,t,n,i)}))};c.prototype.refreshInternal=function(t,n,i,o){var a=this;if(this.oOperation&&this.oOperation.bAction!==false){return r.resolve()}this.bHasFetchedExpandSelectProperties=false;if(this.isRootBindingSuspended()){this.refreshSuspended(n);return this.refreshDependentBindings(t,n,i,o)}this.createReadGroupLock(n,this.isRoot());return this.oCachePromise.then(function(h){var u,d=a.oRefreshPromise,c=a.oReadGroupLock;if(!a.oElementContext){a.oElementContext=e.create(a.oModel,a,a.getResolvedPath());if(!h){a._fireChange({reason:s.Refresh})}}if(a.oOperation){a.oReadGroupLock=undefined;return a._execute(c,a.oOperation.mRefreshParameters)}if(h&&!d){u=h.hasChangeListeners();a.removeCachesAndMessages(t);a.fetchCache(a.oContext,false,false,o?n:undefined);d=u?a.createRefreshPromise(o):undefined;if(o&&d){d=d.catch(function(e){return a.fetchResourcePath(a.oContext).then(function(e){if(!a.bRelative||h.getResourcePath()===e){a.oCache=h;a.oCachePromise=r.resolve(h);h.setActive(true);return a.checkUpdateInternal()}}).then(function(){throw e})})}if(!i){a.fetchValue("").catch(a.oModel.getReporter())}}return r.all([d,a.refreshDependentBindings(t,n,i,o)])})};c.prototype.refreshReturnValueContext=function(e,t,i){var a=this.oCache,s=this.mCacheQueryOptions,h=this.oModel,u,d=this;if(this.oReturnValueContext!==e){return null}this.mCacheQueryOptions=this.computeOperationQueryOptions();if(this.mLateQueryOptions){this.mCacheQueryOptions=o.clone(this.mCacheQueryOptions);o.aggregateExpandSelect(this.mCacheQueryOptions,this.mLateQueryOptions)}this.oCache=n.createSingle(h.oRequestor,e.getPath().slice(1),this.mCacheQueryOptions,true,h.bSharedRequests);this.oCachePromise=r.resolve(this.oCache);this.createReadGroupLock(t,true);u=e.refreshDependentBindings("",t,true,i);if(i){u=u.catch(function(t){d.oCache=a;d.oCachePromise=r.resolve(a);d.mCacheQueryOptions=s;a.setActive(true);return e.checkUpdateInternal().then(function(){throw t})})}return u};c.prototype.requestSideEffects=function(e,t,n){var i=this.oModel,o=[],a=this;function s(e){return e.catch(function(e){i.reportError("Failed to request side effects",u,e);if(!e.canceled){throw e}})}if(t.indexOf("")<0){try{if(!this.oOperation||this.oReturnValueContext){o.push(this.oCache.requestSideEffects(this.lockGroup(e),t,n&&n.getPath().slice(1)))}this.visitSideEffects(e,t,n,o);return r.all(o.map(s)).then(function(){return a.refreshDependentListBindingsWithoutCache()})}catch(e){if(!e.message.startsWith("Unsupported collection-valued navigation property ")){throw e}}}return n&&this.refreshReturnValueContext(n,e,true)||this.refreshInternal("",e,true,true)};c.prototype.requestObject=function(e){return this.oElementContext?this.oElementContext.requestObject(e):Promise.resolve()};c.prototype.resumeInternal=function(e,t){var n=this.sResumeChangeReason,i=this;function o(){i.getDependentBindings().forEach(function(t){t.resumeInternal(e,!!n)})}this.sResumeChangeReason=undefined;if(this.oOperation){o();return}if(t||n){this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.mCanUseCachePromiseByChildPath={};this.removeCachesAndMessages("");this.fetchCache(this.oContext)}o();if(n){this._fireChange({reason:n})}};c.prototype.setContext=function(t){if(this.oContext!==t){if(this.bRelative&&(this.oContext||t)){this.checkSuspended(true);if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=null}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=null}this.fetchCache(t);if(t){this.oElementContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath,t));if(this.oOperation){this.oParameterContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath+"/$Parameter",t))}}this.bHasFetchedExpandSelectProperties=false;a.prototype.setContext.call(this,t)}else{this.oContext=t}}};c.prototype.setParameter=function(e,t){var n;if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(!e){throw new Error("Missing parameter name")}if(t===undefined){throw new Error("Missing value for parameter: "+e)}n=this.oOperation.mParameters[e];this.oOperation.mParameters[e]=t;o.informAll(this.oOperation.mChangeListeners,e,n,t);this.oOperation.bAction=undefined;return this};return c});
//# sourceMappingURL=ODataContextBinding.js.map