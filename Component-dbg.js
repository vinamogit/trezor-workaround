sap.ui.define([
	"sap/ui/core/UIComponent",
	"./helpers/Predicates"
], function (UIComponent, Predicate) {
	"use strict";
	return UIComponent.extend("stellar.trezor-workaround.Component", {
		metadata: {
			manifest: "json"
		},

		init: function () {

			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

            console.log("Component")

		},
    });
});