sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../helpers/Horizon",
	"../helpers/Predicates",
	"sap/ui/model/json/JSONModel"
], function (Controller, Horizon, Predicates, JSONModel) {
	"use strict";

	return Controller.extend("stellar.trezor-workaround.controller.Page", {

		onInit: function () {

			console.log("Page")
		},

		loadAccount: async function (event) {

			var publicKey = this.getView().byId("publicKey").getValue();

			if (publicKey && publicKey.startsWith('G') && publicKey.length == 56) {

				this.getView().byId("input").setBusy(true);

				try {


					var icons = {};
					var model = { claimables: [] };
					var cb = await Horizon.server("PUBLIC").claimableBalances().claimant(publicKey).call();
					while (cb.records.length > 0) {
						for (var record of cb.records) {

							/*
							 * Predicate
							 */
							var predicate = undefined;
							try {

								for (var c of record.claimants) {
									if (c.destination == publicKey) {
										predicate = Predicates.getPredicateInformation(Predicates.predicateFromHorizonResponse(c.predicate), new Date());
									}
								}
							} catch (e) {
								//
							}

							// if (predicate && predicate.status == "claimable") {

								/*
								 * Icons
								 */
								var icon = "./images/xlm.png";
								if (record.asset != "native") {
									icon = icons[record.asset]
									if (!icon) {
										var a = record.asset.split(':');
										icon = await Horizon.getAssetImage(a[0], a[1]);
										icons[record.asset] = icon;
									}
								}

								model.claimables.push({
									id: record.id,
									amount: record.amount,
									asset: record.asset,
									claimants: record.claimants,
									predicate: predicate,
									// notion: notion.amount,
									icon: icon
								});
							// }
						}
						cb = await cb.next();
					}

					this.getView().setModel(new JSONModel(model));


				} finally {
					this.getView().byId("input").setBusy(false);
				}
			}

		},

		generate: async function () {
			var items = this.getView().byId("listClaimables").getItems();
			var selectedItems = items.filter(item => item.getSelected());
			if (selectedItems.length == 0)
				return;

			var publicKey = this.getView().byId("publicKey").getValue();

			var claimIds = selectedItems.map(item => {
				var ctx = item.getBindingContext();
				var claimId = {
					asset: ctx.getProperty("asset"),
					id: ctx.getProperty("id")
				};
				console.log(claimId)
				return claimId;
			});

			var that = this;
			this.claim(publicKey, claimIds).then(o => {
				var xdrClaim = that.getView().byId("xdrClaim");
				xdrClaim.setValue(o.xdr);

				that.addPreAuth(publicKey, o.hash).then(xdr => {
					var inputPanel = that.getView().byId("input");
					var outputPanel = that.getView().byId("output");
					var xdrPreAuth = that.getView().byId("xdrPreAuth");
					xdrPreAuth.setValue(xdr);

					inputPanel.setVisible(false);
					outputPanel.setVisible(true);
				});
			});
		},

		claim: async function (publicKey, claimIds) {
			var memo = StellarSdk.Memo.text('Claim');
			var maxFee = await Horizon.server("PUBLIC").fetchBaseFee();
			var account = await Horizon.server("PUBLIC").loadAccount(publicKey);

			var seqnum = new BigNumber(account.sequence).plus(1);
			var transactionAccount = new StellarSdk.Account(publicKey, seqnum.toString());

			var passPhrase = StellarSdk.Networks.PUBLIC;
			var txBuilder = new StellarSdk.TransactionBuilder(transactionAccount, {
				memo: memo,
				fee: maxFee,
				networkPassphrase: passPhrase
			});

			claimIds.forEach(claimId => {
				var code = "native";
				var issuer = "";
				var a = claimId.asset.split(':');
				if (a.length == 2) {
					code = a[0];
					issuer = a[1];
				}
				var missingAsset = true;
				if (account.balances) {
					for (var b of account.balances) {
						if (b.asset_code == code && b.asset_issuer == issuer) {
							missingAsset = false;
							break;
						}
					}
				}

				/*
				 * Add trust line if necessary
				 */
				if (missingAsset) {
					txBuilder.addOperation(StellarSdk.Operation.changeTrust({
						asset: new StellarSdk.Asset(code, issuer),
					}));
				}

				/*
				 * Claim balances
				 */
				txBuilder.addOperation(StellarSdk.Operation.claimClaimableBalance({
					balanceId: claimId.id,
				}));
			});

			var transaction = txBuilder.setTimeout(StellarSdk.TimeoutInfinite).build();
			return {
				hash: transaction.hash(),
				xdr: transaction.toXDR()
			};
		},

		addPreAuth: async function (publicKey, hash) {
			var memo = StellarSdk.Memo.text('PreAuth');
			var maxFee = await Horizon.server("PUBLIC").fetchBaseFee();
			var account = await Horizon.server("PUBLIC").loadAccount(publicKey);
			var passPhrase = StellarSdk.Networks.PUBLIC;
			var txBuilder = new StellarSdk.TransactionBuilder(account, {
				memo: memo,
				fee: maxFee,
				networkPassphrase: passPhrase
			});

			txBuilder = txBuilder.addOperation(StellarSdk.Operation.setOptions({
				signer: {
					preAuthTx: hash,
					weight: 1
				},
			}));

			var transaction = txBuilder.setTimeout(StellarSdk.TimeoutInfinite).build();

			return transaction.toXDR();
		},

		formatPredicate: function (predicate) {
			if (predicate) {

				if (predicate.validFrom && predicate.validTo) {
					return 'from ' + new Date(predicate.validFrom * 1000).toISOString() + ' to ' + new Date(predicate.validTo * 1000).toISOString();
				}
				if (predicate.validFrom) {
					return 'after ' + new Date(predicate.validFrom * 1000).toISOString();
				}
				if (predicate.validTo) {
					return 'before ' + new Date(predicate.validTo * 1000).toISOString();
				}
			}

			return "";
		}
	});
});
