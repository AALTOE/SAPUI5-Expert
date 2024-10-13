//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */


    function (Controller, History, UIComponent) {
        'use strict';
        return Controller.extend("logaligroup.SAPUI5.controller.Details",{

            _onObjectMatch : function (oEvent){
                this.getView().bindElement({
                    path : "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model : "northwind"
                })
            },

            onInit : function (){
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },

            onNavBack : function (){
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if(sPreviousHash !== undefined){
                    window.history.go(-1);
                }else{
                    const oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp", {}, true);
                }
            }
        })

});