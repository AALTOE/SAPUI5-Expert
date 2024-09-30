//@ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],
    /**
     * @param {typeof sap.core.UIComponent} UIComponent
     * @param {typeof sap.ui.resource.ResourceModel} ResourceModel
     */


    function (UIComponent, Models, ResourceModel, HelloDialog) {
        'use strict';

        return UIComponent.extend("logaligroup.SAPUI5.Component", {

            metadata: {
                manifest: "json"
                // "rootView": "logaligroup.SAPUI5.view.App",
                // "type": "XML",
                // "async": true,
                // "id" : "app"
            },

            init: function () {
                //Call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                //Set data model in the View
                this.setModel(Models.createRecipient());

                //Set i18n model in the view
                var i18nModel = new ResourceModel({ bundleName: "logaligroup.SAPUI5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");

                this._hellodialog = new HelloDialog(this.getRootControl());
            },

            exit: function () {
                this._hellodialog.destroy();
                delete this._hellodialog;
            },

            openHellodialog: function () {
                this._hellodialog.open();
            }
        });

    });