sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../helpers/Horizon"
], function (Controller, Horizon) {
	"use strict";

	return Controller.extend("stellar.trezor-workaround.controller.Page", {

		onInit: function () {

			console.log("Page")
		},

		loadAccount: function (event) {


			console.log(this)
			var accountId = this.getView().byId("publicKey").getValue();
			console.log(accountId)
		}

	});
});
