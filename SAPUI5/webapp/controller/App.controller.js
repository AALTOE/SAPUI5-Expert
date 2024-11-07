//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */


    function (Controller) {
        'use strict';
        return Controller.extend("logaligroup.SAPUI5.controller.App",{

            onInit : function (){
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            },

            onOpendialogHeader:function(){
                this.getOwnerComponent().openHellodialog();
            }
        })

});