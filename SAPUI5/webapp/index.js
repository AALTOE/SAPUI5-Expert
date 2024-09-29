//@ts-nocheck
sap.ui.define([
    "sap/ui/core/ComponentContainer"
],
    /**
     * 
     * @param {typeof sap.ui.core.ComponentContainer} ComponentContainer
     */


    function (ComponentContainer) {
        
        new ComponentContainer({
            name: "logaligroup.SAPUI5",
            settings :{
                id:"SAPUI5"
            },
            async:true
        }).placeAt("content");

});