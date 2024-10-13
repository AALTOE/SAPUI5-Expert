//@ts-nocheck
sap.ui.define([
    'sap/ui/test/opaQunit',
    './pages/HelloPanel'
], 

/**
 * 
 * @param {typeof sap.ui.test.opaQunit} opaQunit 
 */

function(opaQunit) {
    'use strict';

    opaQunit.module("Navigation");

    opaQunit("Should Open Helo Dialog", function(Given, When, Then){
        //Arrangements
        Given.iStartMyUIComponent({
            componetConfig : {
                name : "logaligroup.SAPUI5"
            }
        });

        //Actions
        When.onTheAppPage.iSayHelloDialogButton();

        //Assertions
        Then.onTheAppPage.iSeeTheHelloDialog();

        //Cleanup
        Then.iTeardownMyApp();
        
    });
    
});