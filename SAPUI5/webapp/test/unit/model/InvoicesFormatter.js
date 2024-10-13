//@ts-nocheck
sap.ui.define([
    'logaligroup/SAPUI5/model/InvoicesFormatter',
    "sap/ui/model/resource/ResourceModel"
], 

/**
 * 
 * @param {sap.ui.model.resourcers.ResourceModel} ResourceModel 
 */

function(InvoicesFormatter, ResourceModel) {
    'use strict';

    QUnit.module("Qnvoices Status", {

        beforeEach : function (){
            this._oResourceModel = new ResourceModel({
                bundleUrl : sap.ui.require.toUrl("logaligroup/SAPUI5") + "/i18n/i18n.properties"
            });
        },

        afterEach : function (){
            this._oResourceModel.destroy();
        }
    });

    QUnit.test("Shoul return the Invoices status", function (assert){
        let oModel = this.stub();

        oModel.withArgs("i18n").returns(this._oResourceModel);

        let oViewstub = {
            getModel : oModel
        };

        let oControllerStub = {
            getView : this.stub().returns(oViewstub)
        };

        let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);
        //Asset
        assert.strictEqual(fnIsolatedFormatter("A"), "New"          , "The invoice status for A is correct");
        assert.strictEqual(fnIsolatedFormatter("B"), "In Progress"  , "The invoice status for B is correct");
        assert.strictEqual(fnIsolatedFormatter("C"), "Done"         , "The invoice status for C is correct");
    });
    
});