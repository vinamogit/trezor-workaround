sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"../helpers/Horizon"
], function (Controller, Horizon) {
	"use strict";

	return Controller.extend("stellar.trezor-workaround.controller.App", {

		onInit: function () {

			console.log("App")
		}

	});
});
