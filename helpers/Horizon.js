sap.ui.define([
   
], function () {
    "use strict";

    const PUBLIC = new StellarSdk.Server("https://horizon.stellar.org/");
    const TESTNET = new StellarSdk.Server("https://horizon-testnet.stellar.org/");
    const Horizon = {

        _getBaseUrl: function (network) {
            if (network == "PUBLIC") {
                return "https://horizon.stellar.org/";
            }

            return "https://horizon-testnet.stellar.org/";
        },

        _Server: function (network) {
            if (network == "PUBLIC") {
                return PUBLIC;
            }

            return TESTNET;
        },

        server: function (network) {
            return this._Server(network);
        },

        getAssetImage: async function (code, issuer) {

            async function fetchAssetImage(url) {
                var response = await fetch(url, { mode: 'cors' });
                var data = await response.text();
                var t = TOML.parse(data);
                if (t && t.CURRENCIES) {
                    for (var c of t.CURRENCIES) {
                        if (c.code == code && c.issuer) {
                            return c.image;
                        }
                    }
                }
                return undefined;
            }
        
            var data = await Horizon.server("PUBLIC").accounts().accountId(issuer).call();
            var hd = data.home_domain;
            if (hd) {
                try {
                    return await fetchAssetImage("https://" + hd + "/.well-known/stellar.toml");
                } catch (e) {
                    console.log("Failed to load asset image from HTTPS");
                    try {
                        return await fetchAssetImage("http://" + hd + "/.well-known/stellar.toml");
                    } catch (e) {
                        console.log("Failed to load asset image from HTTP");
                    }
                }
            }
        
            return undefined;
        }
    };

    return Horizon;
});

