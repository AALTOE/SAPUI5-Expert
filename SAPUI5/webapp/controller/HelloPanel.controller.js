//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.core.MessageToast} MessageToast
     */


    function (Controller, MessageToast) {
        'use strict';
        return Controller.extend("logaligroup.SAPUI5.controller.HelloPanel", {

            onInit: function () {

            },


            onShowHello: function () {
                //Read text from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("hellowMessage", [sRecipient]);
                MessageToast.show(sMsg);
            },

            onOpendialog: function () {
                this.getOwnerComponent().openHellodialog();
            },

            
        });

    });