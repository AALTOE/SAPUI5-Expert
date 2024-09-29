//@ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.json.JSONModel} JSONModel
     */


    function (JSONModel) {
        'use strict';

        return {
            createRecipient: function () {
                var oData = {
                    recipient: {
                        name: "Wolrd"
                    }
                };

                return new JSONModel(oData);
            }
        }

    });