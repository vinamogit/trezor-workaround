sap.ui.define([],function(){"use strict";const t=new StellarSdk.Server("https://horizon.stellar.org/");const e=new StellarSdk.Server("https://horizon-testnet.stellar.org/");const r={_getBaseUrl:function(t){if(t=="PUBLIC"){return"https://horizon.stellar.org/"}return"https://horizon-testnet.stellar.org/"},_Server:function(r){if(r=="PUBLIC"){return t}return e},server:function(t){return this._Server(t)},getAssetImage:async function(t,e){async function n(e){var r=await fetch(e,{mode:"cors"});var n=await r.text();var o=TOML.parse(n);if(o&&o.CURRENCIES){for(var a of o.CURRENCIES){if(a.code==t&&a.issuer){return a.image}}}return undefined}var o=await r.server("PUBLIC").accounts().accountId(e).call();var a=o.home_domain;if(a){try{return await n("https://"+a+"/.well-known/stellar.toml")}catch(t){console.log("Failed to load asset image from HTTPS");try{return await n("http://"+a+"/.well-known/stellar.toml")}catch(t){console.log("Failed to load asset image from HTTP")}}}return undefined}};return r});