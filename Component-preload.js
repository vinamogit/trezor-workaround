//@ui5-bundle stellar/trezor-workaround/Component-preload.js
sap.ui.require.preload({
	"stellar/trezor-workaround/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","./helpers/Predicates"],function(t,e){"use strict";return t.extend("stellar.trezor-workaround.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this.getRouter().initialize();console.log("Component")}})});
},
	"stellar/trezor-workaround/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","../helpers/Horizon"],function(o,r){"use strict";return o.extend("stellar.trezor-workaround.controller.App",{onInit:function(){console.log("App")}})});
},
	"stellar/trezor-workaround/controller/Page.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","../helpers/Horizon","../helpers/Predicates","sap/ui/model/json/JSONModel"],function(e,t,a,r){"use strict";return e.extend("stellar.trezor-workaround.controller.Page",{onInit:function(){console.log("Page")},loadAccount:async function(e){var i=this.getView().byId("publicKey").getValue();if(i&&i.startsWith("G")&&i.length==56){this.getView().byId("input").setBusy(true);try{var s={};var l={claimables:[]};var n=await t.server("PUBLIC").claimableBalances().claimant(i).call();while(n.records.length>0){for(var o of n.records){var d=undefined;try{for(var c of o.claimants){if(c.destination==i){d=a.getPredicateInformation(a.predicateFromHorizonResponse(c.predicate),new Date)}}}catch(e){console.log("Error resolving predicate "+e)}var u="./images/xlm.png";if(o.asset!="native"){u=s[o.asset];if(!u){var v=o.asset.split(":");u=await t.getAssetImage(v[0],v[1]);s[o.asset]=u}}l.claimables.push({id:o.id,amount:o.amount,asset:o.asset,claimants:o.claimants,predicate:d,icon:u,visible:!d||d.status=="claimable"})}n=await n.next()}this.getView().setModel(new r(l));if(l.claimables.length>0){this.getView().byId("showAll").setEnabled(true)}}finally{this.getView().byId("input").setBusy(false)}}},showAll:function(e){var t=this.getView().getModel();if(t){var a=t.getData();if(e.getSource().getPressed()){for(var r of a.claimables){r.visible=true}}else{for(var r of a.claimables){r.visible=!r.predicate||r.predicate.status=="claimable"}}t.setData(a)}},generate:async function(){var e=this.getView().byId("listClaimables").getItems();var t=e.filter(e=>e.getSelected());if(t.length==0)return;var a=this.getView().byId("publicKey").getValue();var r=t.map(e=>{var t=e.getBindingContext();var a={asset:t.getProperty("asset"),id:t.getProperty("id")};console.log(a);return a});var i=this;this.claim(a,r).then(e=>{var t=i.getView().byId("xdrClaim");t.setValue(e.xdr);i.addPreAuth(a,e.hash).then(e=>{var t=i.getView().byId("input");var a=i.getView().byId("output");var r=i.getView().byId("xdrPreAuth");r.setValue(e);t.setVisible(false);a.setVisible(true)})})},claim:async function(e,a){var r=StellarSdk.Memo.text("Claim");var i=5e3;var s=await t.server("PUBLIC").loadAccount(e);var l=new BigNumber(s.sequence).plus(1);var n=new StellarSdk.Account(e,l.toString());var o=StellarSdk.Networks.PUBLIC;var d=new StellarSdk.TransactionBuilder(n,{memo:r,fee:i,networkPassphrase:o});a.forEach(e=>{var t="native";var a="";var r=e.asset.split(":");if(r.length==2){t=r[0];a=r[1]}var i=true;if(s.balances){for(var l of s.balances){if(l.asset_code==t&&l.asset_issuer==a){i=false;break}}}if(i){d.addOperation(StellarSdk.Operation.changeTrust({asset:new StellarSdk.Asset(t,a)}))}d.addOperation(StellarSdk.Operation.claimClaimableBalance({balanceId:e.id}))});var c=d.setTimeout(3600).build();return{hash:c.hash(),xdr:c.toXDR()}},addPreAuth:async function(e,a){var r=StellarSdk.Memo.text("PreAuth");var i=5e3;var s=await t.server("PUBLIC").loadAccount(e);var l=StellarSdk.Networks.PUBLIC;var n=new StellarSdk.TransactionBuilder(s,{memo:r,fee:i,networkPassphrase:l});n=n.addOperation(StellarSdk.Operation.setOptions({signer:{preAuthTx:a,weight:1}}));var o=n.setTimeout(3600).build();return o.toXDR()},formatPredicate:function(e){if(e){if(e.validFrom&&e.validTo){return"from "+new Date(e.validFrom*1e3).toISOString()+" to "+new Date(e.validTo*1e3).toISOString()}if(e.validFrom){return"after "+new Date(e.validFrom*1e3).toISOString()}if(e.validTo){return"before "+new Date(e.validTo*1e3).toISOString()}}return""},formatPredicateState:function(e){if(e){if(e.status=="claimable"){return"Success"}}return"None"}})});
},
	"stellar/trezor-workaround/helpers/Horizon.js":function(){
sap.ui.define([],function(){"use strict";const t=new StellarSdk.Server("https://horizon.stellar.org/");const e=new StellarSdk.Server("https://horizon-testnet.stellar.org/");const r={_getBaseUrl:function(t){if(t=="PUBLIC"){return"https://horizon.stellar.org/"}return"https://horizon-testnet.stellar.org/"},_Server:function(r){if(r=="PUBLIC"){return t}return e},server:function(t){return this._Server(t)},getAssetImage:async function(t,e){async function n(e){var r=await fetch(e,{mode:"cors"});var n=await r.text();var o=TOML.parse(n);if(o&&o.CURRENCIES){for(var a of o.CURRENCIES){if(a.code==t&&a.issuer){return a.image}}}return undefined}var o=await r.server("PUBLIC").accounts().accountId(e).call();var a=o.home_domain;if(a){try{return await n("https://"+a+"/.well-known/stellar.toml")}catch(t){console.log("Failed to load asset image from HTTPS");try{return await n("http://"+a+"/.well-known/stellar.toml")}catch(t){console.log("Failed to load asset image from HTTP")}}}return undefined}};return r});
},
	"stellar/trezor-workaround/helpers/Predicates.js":function(){
sap.ui.define([],function(){"use strict";const e=StellarSdk.Claimant;const t=StellarSdk.Horizon;const i=StellarSdk.xdr;const r={predicateFromHorizonResponse:t=>{let i=e.predicateUnconditional();if(t.abs_before)i=e.predicateBeforeAbsoluteTime(new BigNumber(Date.parse(t.abs_before)).idiv(1e3).toString());if(t.rel_before)i=e.predicateBeforeRelativeTime(t.rel_before);if(t.and)i=e.predicateAnd(r.predicateFromHorizonResponse(t.and[0]),r.predicateFromHorizonResponse(t.and[1]));if(t.or)i=e.predicateOr(r.predicateFromHorizonResponse(t.or[0]),r.predicateFromHorizonResponse(t.or[1]));if(t.not)i=e.predicateNot(r.predicateFromHorizonResponse(t.not));return i},isPredicateClaimableAt:(e,t=new Date)=>{const a=new BigNumber(t.getTime()).idiv(1e3).toNumber();switch(e.switch()){case i.ClaimPredicateType.claimPredicateUnconditional():return true;case i.ClaimPredicateType.claimPredicateAnd():return r.isPredicateClaimableAt(e.andPredicates()[0],t)&&r.isPredicateClaimableAt(e.andPredicates()[1],t);case i.ClaimPredicateType.claimPredicateOr():return r.isPredicateClaimableAt(e.orPredicates()[0],t)||r.isPredicateClaimableAt(e.orPredicates()[1],t);case i.ClaimPredicateType.claimPredicateNot():return!r.isPredicateClaimableAt(e.notPredicate(),t);case i.ClaimPredicateType.claimPredicateBeforeAbsoluteTime():return new BigNumber(e.absBefore().toString()).isGreaterThan(a);case i.ClaimPredicateType.claimPredicateBeforeRelativeTime():const c=new BigNumber(e.relBefore()).plus(new BigNumber(Date.now()).idiv(1e3));return c.isGreaterThan(a)}return true},flattenPredicate:(t,a=new Date)=>{const c=new BigNumber(a.getTime()).idiv(1e3).toNumber();switch(t.switch()){case i.ClaimPredicateType.claimPredicateUnconditional():break;case i.ClaimPredicateType.claimPredicateNot():return i.ClaimPredicate.claimPredicateNot(r.flattenPredicate(t.notPredicate()));case i.ClaimPredicateType.claimPredicateBeforeAbsoluteTime():return t;case i.ClaimPredicateType.claimPredicateBeforeRelativeTime():return r.flattenPredicate(e.predicateBeforeAbsoluteTime(new BigNumber(t.relBefore()).plus(c).toString()),a);case i.ClaimPredicateType.claimPredicateOr():return r.flattenPredicateOr(t,a);case i.ClaimPredicateType.claimPredicateAnd():return r.flattenPredicateAnd(t,a)}return i.ClaimPredicate.claimPredicateUnconditional()},flattenPredicateAnd:(t,i)=>{const a=t.andPredicates().map(e=>r.flattenPredicate(e,i));const c=a.filter(e=>r.isPredicateClaimableAt(e,i));if(c.length===0){let t=r.getLatestBeforeAbsolutePredicate(a.filter(isAbsBeforePredicate));if(!t)t=r.getEarliestNotBeforeAbsolutePredicate(a.filter(isNotPredicate));if(!t)e.predicateNot(e.predicateUnconditional());return t}else if(c.length===1){return a.find(e=>!r.isPredicateClaimableAt(e))}else{const t=a.filter(isAbsBeforePredicate);const i=a.filter(isNotPredicate);if(c.find(isUnconditionalPredicate)||i.length===2||t.length===2){let a=r.getEarliestBeforeAbsolutePredicate(t);if(!a)a=r.getLatestNotBeforeAbsolutePredicate(i);if(!a)a=e.predicateUnconditional();return a}}return t},flattenPredicateOr:(t,i)=>{const a=t.orPredicates().map(e=>r.flattenPredicate(e,i));if(a.find(isUnconditionalPredicate)){return e.predicateUnconditional()}const c=a.filter(e=>r.isPredicateClaimableAt(e,i));if(c.length===0){let t=r.getLatestNotBeforeAbsolutePredicate(a.filter(isNotPredicate));if(!t)t=r.getLatestBeforeAbsolutePredicate(a.filter(isAbsBeforePredicate));if(!t)t=e.predicateOr(...a);return t}else if(c.length===1){return c[0]}else{let e=r.getLatestBeforeAbsolutePredicate(c);if(!e)e=r.getEarliestNotBeforeAbsolutePredicate(c);if(e)return e}return e.predicateUnconditional()},isUnconditionalPredicate:e=>{if(e.switch)return e.switch()===i.ClaimPredicateType.claimPredicateUnconditional()},isAbsBeforePredicate:e=>{if(e.switch)return e.switch()===i.ClaimPredicateType.claimPredicateBeforeAbsoluteTime()},isNotPredicate:e=>{if(e.switch)return e.switch()===i.ClaimPredicateType.claimPredicateNot()},predicatesAreTheSameType:e=>e.map(e=>e.switch()).filter((e,t,i)=>i.indexOf(e)===t).length===1,getLatestBeforeAbsolutePredicate:t=>{if(r.predicatesAreTheSameType(t)){if(r.isAbsBeforePredicate(t[0])){return e.predicateBeforeAbsoluteTime(t.map(e=>e.value()).filter(e=>e instanceof i.Int64).reduce((e,t)=>Math.max(e,t),0).toString())}}},getLatestNotBeforeAbsolutePredicate:t=>{if(r.predicatesAreTheSameType(t)){if(r.isNotPredicate(t[0])){return e.predicateNot(e.predicateBeforeAbsoluteTime(t.map(e=>e.notPredicate().value()).filter(e=>e instanceof i.Int64).reduce((e,t)=>Math.max(e,t),0).toString()))}}},getEarliestBeforeAbsolutePredicate:t=>{if(r.predicatesAreTheSameType(t)){if(r.isAbsBeforePredicate(t[0])){return e.predicateBeforeAbsoluteTime(t.map(e=>e.value()).filter(e=>e instanceof i.Int64).reduce((e,t)=>Math.min(e,t),Number.POSITIVE_INFINITY).toString())}}},getEarliestNotBeforeAbsolutePredicate:t=>{if(r.predicatesAreTheSameType(t)){if(r.isNotPredicate(t[0])){return e.predicateNot(e.predicateBeforeAbsoluteTime(t.map(e=>e.notPredicate().value()).filter(e=>e instanceof i.Int64).reduce((e,t)=>Math.min(e,t),Number.POSITIVE_INFINITY).toString()))}}},getPredicateInformation:(e,t)=>{const a=r.flattenPredicate(e,t);const c={predicate:a,validFrom:undefined,validTo:undefined};const o=e=>r.isAbsBeforePredicate(e)?new BigNumber(e.absBefore()).toNumber():undefined;const d=e=>r.isNotPredicate(e)&&r.isAbsBeforePredicate(e.notPredicate())?new BigNumber(e.notPredicate().value()).toNumber():undefined;const n=e=>({validFrom:d(e),validTo:o(e)});const l=r.isPredicateClaimableAt(a,t);const{validFrom:s,validTo:f}=n(a);if(l){c.status="claimable";if(a.switch()===i.ClaimPredicateType.claimPredicateAnd()){let e=a.andPredicates().map(n).reduce((e,t)=>{let i=t.validFrom;if(!i)i=e.validFrom;let r=t.validTo;if(!r)r=e.validTo;return{validFrom:i,validTo:r}},{});c.validFrom=e.validFrom;c.validTo=e.validTo}else{c.validFrom=s;c.validTo=f}}else{if(f){c.validTo=f;c.status="expired"}else if(s){c.validFrom=s;c.status="upcoming"}}return c}};return r});
},
	"stellar/trezor-workaround/helpers/fast-toml.js":'var TOML=function(){"use strict";let e="",t=0;function i(e,t=0){let i;for(;(i=e[t++])&&(" "==i||"\\t"==i||"\\r"==i););return t-1}function n(e){switch(e[0]){case void 0:return"";case\'"\':return function(e){let t,i=0,n="";for(;t=e.indexOf("\\\\",i)+1;){switch(n+=e.slice(i,t-1),e[t]){case"\\\\":n+="\\\\";break;case\'"\':n+=\'"\';break;case"\\r":"\\n"==e[t+1]&&t++;case"\\n":break;case"b":n+="\\b";break;case"t":n+="\\t";break;case"n":n+="\\n";break;case"f":n+="\\f";break;case"r":n+="\\r";break;case"u":n+=String.fromCharCode(parseInt(e.substr(t+1,4),16)),t+=4;break;case"U":n+=String.fromCharCode(parseInt(e.substr(t+1,8),16)),t+=8;break;default:throw r(e[t])}i=t+1}return n+e.slice(i)}(e.slice(1,-1));case"\'":return e.slice(1,-1);case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"+":case"-":case".":let t=e;if(-1!=t.indexOf("_")&&(t=t.replace(/_/g,"")),!isNaN(t))return+t;if("-"==e[4]&&"-"==e[7]){let t=new Date(e);if("Invalid Date"!=t.toString())return t}else if(":"==e[2]&&":"==e[5]&&e.length>=7){let t=new Date("0000-01-01T"+e+"Z");if("Invalid Date"!=t.toString())return t}return e}switch(e){case"true":return!0;case"false":return!1;case"nan":case"NaN":return!1;case"null":return null;case"inf":case"+inf":case"Infinity":case"+Infinity":return 1/0;case"-inf":case"-Infinity":return-1/0}return e}function r(i){let n=function(){let i=e[t],n=t;"\\n"==i&&n--;let r=1,s=e.lastIndexOf("\\n",n),a=e.indexOf("\\n",n);-1==a&&(a=1/0);","!=i&&"\\n"!=i||(n=s+1);if(-1==s)return{line:r,column:n+1,position:n,lineContent:e.slice(0,a).trim()};const c=n-s+1,o=e.slice(s+1,a).trim();r++;for(;-1!=(s=e.lastIndexOf("\\n",s-1));)r++;return{line:r,column:c,position:n,lineContent:o}}(),r=String(n.line);return i+="\\n"+r+" |  "+n.lineContent+"\\n",i+=" ".repeat(r.length+n.column+2)+"^",SyntaxError(i)}function s(e,i=0,n=!1){let a,c=e[i],o=c,f=c,l=!0,u=!1;switch(c){case\'"\':case"\'":if(a=i+1,n&&e[i+1]==c&&e[i+2]==c?(f=c+c+c,a+=2):u=!0,"\'"==c)a=e.indexOf(f,a)+1;else for(;a=e.indexOf(f,a)+1;){let t=!0,i=a-1;for(;"\\\\"==e[--i];)t=!t;if(t)break}if(!a)throw r("Missing "+f+" closer");if(c!=f)a+=2;else if(u){let n=e.indexOf("\\n",i+1)+1;if(n&&n<a)throw t=n-2,r("Forbidden end-of-line character in single-line string")}return a;case"(":f=")";break;case"{":f="}";break;case"[":f="]";break;case"<":f=">";break;default:l=!1}let h=0;for(;c=e[++i];)if(c==f){if(0==h)return i+1;h--}else if(\'"\'==c||"\'"==c){i=s(e,i,n)-1}else l&&c==o&&h++;throw r("Missing "+f)}function a(e){"string"!=typeof e&&(e=String(e));let t,i,n=-1,a="",c=[];for(;i=e[++n];)switch(i){case".":if(!a)throw r(\'Unexpected "."\');c.push(a),a="";continue;case\'"\':case"\'":if(t=s(e,n),t==n+2)throw r("Empty string key");a+=e.slice(n+1,t-1),n=t-1;continue;default:a+=i}return a&&c.push(a),c}function c(e,t=[]){const i=t.pop();for(let i of t){if("object"!=typeof e){throw r(\'["\'+t.slice(0,t.indexOf(i)+1).join(\'"].["\')+\'"]\'+" must be an object")}void 0===e[i]&&(e[i]={}),(e=e[i])instanceof Array&&(e=e[e.length-1])}return[e,i]}class o{constructor(){this.root={},this.data=this.root,this.inlineScopeList=[]}get isRoot(){return this.data==this.root}set(e,t){let[i,n]=c(this.data,a(e));if("string"==typeof i)throw"Wtf the scope is a string. Please report the bug";if(n in i)throw r(`Re-writing the key \'${e}\'`);return i[n]=t,t}push(e){if(!(this.data instanceof Array)){if(!this.isRoot)throw r("Missing key");this.data=Object.assign([],this.data),this.root=this.data}return this.data.push(e),this}use(e){return this.data=function(e,t=[]){for(let i of t){if(void 0===e)e=lastData[lastElt]={};else if("object"!=typeof e){throw r(\'["\'+t.slice(0,t.indexOf(i)+1).join(\'"].["\')+\'"]\'+" must be an object")}void 0===e[i]&&(e[i]={}),(e=e[i])instanceof Array&&(e=e[e.length-1])}return e}(this.root,a(e)),this}useArray(e){let[t,i]=c(this.root,a(e));return this.data={},void 0===t[i]&&(t[i]=[]),t[i].push(this.data),this}enter(e,t){return this.inlineScopeList.push(this.data),this.set(e,t),this.data=t,this}enterArray(e){return this.inlineScopeList.push(this.data),this.push(e),this.data=e,this}exit(){return this.data=this.inlineScopeList.pop(),this}}function f(a){"string"!=typeof a&&(a=String(a));const c=new o,f=[];e=a,t=0;let l,u,h="",d="",p=e[0],w=!0;const g=()=>{if(h=h.trimEnd(),w)h&&c.push(n(h));else{if(!h)throw r("Expected key before =");if(!d)throw r("Expected value after =");c.set(h,n(d.trimEnd()))}h="",d="",w=!0};do{switch(p){case" ":w?h&&(h+=p):d&&(d+=p);case"\\t":case"\\r":continue;case"#":t=e.indexOf("\\n",t+1)-1,-2==t&&(t=1/0);continue;case\'"\':case"\'":if(!w&&d){d+=p;continue}let n=e[t+1]==p&&e[t+2]==p;if(l=s(e,t,!0),w){if(h)throw r("Unexpected "+p);h+=n?e.slice(t+2,l-2):e.slice(t,l),t=l}else d=e.slice(t,l),t=l,n&&(d=d.slice(2,-2),"\\n"==d[1]?d=d[0]+d.slice(2):"\\r"==d[1]&&"\\n"==d[2]&&(d=d[0]+d.slice(3)));if(t=i(e,t),p=e[t],p&&","!=p&&"\\n"!=p&&"#"!=p&&"}"!=p&&"]"!=p&&"="!=p)throw r("Unexpected character after end of string");t--;continue;case"\\n":case",":case void 0:g();continue;case"[":case"{":if(u="["==p?"]":"}",w&&!f.length){if(h)throw r("Unexpected "+p);if(l=s(e,t),"["==p&&"["==e[t+1]){if("]"!=e[l-2])throw r("Missing ]]");c.useArray(e.slice(t+2,l-2))}else c.use(e.slice(t+1,l-1));t=l}else if(w){if(h)throw r("Unexpected "+p);c.enterArray("["==p?[]:{}),f.push(u)}else{if(d)throw r("Unexpected "+p);c.enter(h.trimEnd(),"["==p?[]:{}),f.push(u),h="",w=!0}continue;case"]":case"}":if(h&&g(),f.pop()!=p)throw r("Unexpected "+p);if(c.exit(),t=i(e,t+1),p=e[t],p&&","!=p&&"\\n"!=p&&"#"!=p&&"}"!=p&&"]"!=p)throw r("Unexpected character after end of scope");t--;continue;case"=":if(!w)throw r("Unexpected "+p);if(!h)throw r("Missing key before "+p);w=!1;continue;default:w?h+=p:d+=p}}while((p=e[++t])||h);if(f.length)throw r("Missing "+f.pop());return c.root}let l=null,u=null;function h(){let e="";for(let t of arguments)e+="string"==typeof t?t:t[0];return f(e)}return h.parse=f,h.parseFile=async function(e){if(l||(l=require("fs")),!u){const{promisify:e}=require("util");u=e(l.readFile)}return f(await u(e))},h.parseFileSync=function(e){return l||(l=require("fs")),f(l.readFileSync(e))},h}();\n',
	"stellar/trezor-workaround/manifest.json":'{"sap.app":{"id":"stellar.trezor-workaround","type":"application"},"sap.ui5":{"rootView":"stellar.trezor-workaround.view.App","routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"stellar.trezor-workaround.view","controlId":"app","controlAggregation":"pages"},"routes":[{"pattern":"","name":"page","target":"page"}],"targets":{"page":{"viewName":"Page"}}},"dependencies":{"minUI5Version":"1.98.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"resources":{"css":[{"uri":"css/custom.css"}]},"contentDensities":{"compact":true,"cozy":false}}}',
	"stellar/trezor-workaround/view/App.view.xml":'<mvc:View controllerName="stellar.trezor-workaround.controller.App" xmlns="sap.m" xmlns:f="sap.f" xmlns:mvc="sap.ui.core.mvc" xmlns:c="sap.ui.core" displayBlock="true"><App id="app" /></mvc:View>',
	"stellar/trezor-workaround/view/Page.view.xml":'<mvc:View controllerName="stellar.trezor-workaround.controller.Page" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:c="sap.ui.core" displayBlock="false"><Page title="Workaround to claim claimable balances with a Trezor wallet (beta)"><Panel id="input"><VBox><HBox><Input maxLength="56" id="publicKey" width="35em" submit="loadAccount" placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"/><Button text="Load" icon="sap-icon://key" press="loadAccount" /></HBox><List id="listClaimables" includeItemInSelection="true" selectionChange="selectionChangeClaimable" mode="MultiSelect" class="sapUiSizeCompact" items="{ path: \'/claimables\' }" headerText="Claimable balances "><items><StandardListItem visible="{visible}" iconDensityAware="false" title="{amount}" description="{ path: \'asset\' } " info="{predicate/status} { path: \'predicate\', formatter: \'.formatPredicate\'}" infoState="{ path: \'predicate\', formatter: \'.formatPredicateState\'}" icon="{ path: \'icon\'}"></StandardListItem></items><headerToolbar><OverflowToolbar><Title text="Claimable balances" level="H2" /><ToggleButton id="showAll" text="Show all" press="showAll" pressed="false" enabled="false" /></OverflowToolbar></headerToolbar></List><Button text="Generate XDR" icon="sap-icon://feeder-arrow" press="generate" id="generate" /><Text text="Note: Claiming upcoming or expired claimable balances will result in errors" /></VBox></Panel><Panel id="output" visible="false"><Panel headerText="Pre-Auth XDR"><VBox><Label text="" /><TextArea id="xdrPreAuth" value="" rows="8" width="36em" /><Text text="You need to sign this transaction then submit it to the network" /><Link href="https://laboratory.stellar.org/#txsigner?network=public" target="_blank" text="Sign in Stellar Lab" /></VBox></Panel><Panel headerText="Claim Claimable Balance XDR"><VBox><Label text="" /><TextArea id="xdrClaim" value="" rows="8" width="36em" /><Text text="If the Pre-Auth transaction has been submited successfully, you can now sumbit this transaction to claim the balance." /><Link href="https://laboratory.stellar.org/#txsubmitter?network=public" target="_blank" text="Submit in Stellar Lab" /></VBox></Panel></Panel></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
