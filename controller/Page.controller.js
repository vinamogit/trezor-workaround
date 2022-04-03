sap.ui.define(["sap/ui/core/mvc/Controller","../helpers/Horizon","../helpers/Predicates","sap/ui/model/json/JSONModel"],function(e,t,a,r){"use strict";return e.extend("stellar.trezor-workaround.controller.Page",{onInit:function(){console.log("Page")},loadAccount:async function(e){var i=this.getView().byId("publicKey").getValue();if(i&&i.startsWith("G")&&i.length==56){this.getView().byId("input").setBusy(true);try{var s={};var l={claimables:[]};var n=await t.server("PUBLIC").claimableBalances().claimant(i).call();while(n.records.length>0){for(var o of n.records){var d=undefined;try{for(var c of o.claimants){if(c.destination==i){d=a.getPredicateInformation(a.predicateFromHorizonResponse(c.predicate),new Date)}}}catch(e){console.log("Error resolving predicate "+e)}var u="./images/xlm.png";if(o.asset!="native"){u=s[o.asset];if(!u){var v=o.asset.split(":");u=await t.getAssetImage(v[0],v[1]);s[o.asset]=u}}l.claimables.push({id:o.id,amount:o.amount,asset:o.asset,claimants:o.claimants,predicate:d,icon:u,visible:!d||d.status=="claimable"})}n=await n.next()}this.getView().setModel(new r(l));if(l.claimables.length>0){this.getView().byId("showAll").setEnabled(true)}}finally{this.getView().byId("input").setBusy(false)}}},showAll:function(e){var t=this.getView().getModel();if(t){var a=t.getData();if(e.getSource().getPressed()){for(var r of a.claimables){r.visible=true}}else{for(var r of a.claimables){r.visible=!r.predicate||r.predicate.status=="claimable"}}t.setData(a)}},generate:async function(){var e=this.getView().byId("listClaimables").getItems();var t=e.filter(e=>e.getSelected());if(t.length==0)return;var a=this.getView().byId("publicKey").getValue();var r=t.map(e=>{var t=e.getBindingContext();var a={asset:t.getProperty("asset"),id:t.getProperty("id")};console.log(a);return a});var i=this;this.claim(a,r).then(e=>{var t=i.getView().byId("xdrClaim");t.setValue(e.xdr);i.addPreAuth(a,e.hash).then(e=>{var t=i.getView().byId("input");var a=i.getView().byId("output");var r=i.getView().byId("xdrPreAuth");r.setValue(e);t.setVisible(false);a.setVisible(true)})})},claim:async function(e,a){var r=StellarSdk.Memo.text("Claim");var i=await t.server("PUBLIC").fetchBaseFee();var s=await t.server("PUBLIC").loadAccount(e);var l=new BigNumber(s.sequence).plus(1);var n=new StellarSdk.Account(e,l.toString());var o=StellarSdk.Networks.PUBLIC;var d=new StellarSdk.TransactionBuilder(n,{memo:r,fee:i,networkPassphrase:o});a.forEach(e=>{var t="native";var a="";var r=e.asset.split(":");if(r.length==2){t=r[0];a=r[1]}var i=true;if(s.balances){for(var l of s.balances){if(l.asset_code==t&&l.asset_issuer==a){i=false;break}}}if(i){d.addOperation(StellarSdk.Operation.changeTrust({asset:new StellarSdk.Asset(t,a)}))}d.addOperation(StellarSdk.Operation.claimClaimableBalance({balanceId:e.id}))});var c=d.setTimeout(StellarSdk.TimeoutInfinite).build();return{hash:c.hash(),xdr:c.toXDR()}},addPreAuth:async function(e,a){var r=StellarSdk.Memo.text("PreAuth");var i=await t.server("PUBLIC").fetchBaseFee();var s=await t.server("PUBLIC").loadAccount(e);var l=StellarSdk.Networks.PUBLIC;var n=new StellarSdk.TransactionBuilder(s,{memo:r,fee:i,networkPassphrase:l});n=n.addOperation(StellarSdk.Operation.setOptions({signer:{preAuthTx:a,weight:1}}));var o=n.setTimeout(3600).build();return o.toXDR()},formatPredicate:function(e){if(e){if(e.validFrom&&e.validTo){return"from "+new Date(e.validFrom*1e3).toISOString()+" to "+new Date(e.validTo*1e3).toISOString()}if(e.validFrom){return"after "+new Date(e.validFrom*1e3).toISOString()}if(e.validTo){return"before "+new Date(e.validTo*1e3).toISOString()}}return""},formatPredicateState:function(e){if(e){if(e.status=="claimable"){return"Success"}}return"None"}})});