//@ts-nocheck
sap.ui.define([
    'sap/ui/core/util/MockServer',
    'sap/ui/model/json/JSONModel',
    "sap/base/util/UriParameters",
    "sap/base/Log"
],

    /**
     * 
     * @param {typeof sap.ui.core.util.MockServer} MockServer 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.base.util.UriParameters} UriParameters 
     * @param {typeof sap.base.Log} Log 
     */

    function (MockServer, JSONModel, UriParameters, Log) {
        'use strict';

        var oMockserver,
            _sAppPath = "logaligroup/SAPUI5/",
            _sJsonFilePath = _sAppPath + "localService/mockdata";

        var oMockserverInterface = {
            
            /**
             * Initializes the mock servver asyncchroously
             * @protected
             * @param {object} oOptionsParameters
             * @returns {Promise} a promise tha is resolved when the mock has been started
             */
            
            init: function(oOptionsParameters){
                var oOptions = oOptionsParameters || {};

                return new Promise (function(fnResolve, fnReject){
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);
                        
                        oManifestModel.attachRequestCompleted(function () {
                            var oUriParameters = new UriParameters(window.location.href);
                            
                            //Parse manifest for local metadata URI
                            var _sJsonFileUrl = sap.ui.require.toUrl(_sJsonFilePath);
                            var oManiDatasource = oManifestModel.getProperty("/sap.app/dataSources/northwind-entities");
                            var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oManiDatasource.settings.uri);
                            
                            //Ensure there is a traling slash
                            var sMockServerUrl = oManiDatasource.uri && new URIError(oManiDatasource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toSting();

                            //Create a mock server instance or stop the existing one to reinitialize

                            if(!oMockserver){
                                oMockserver = new MockServer ({
                                    rootUri : sMockServerUrl
                                })
                            }else{
                                oMockserver.stop();
                            }

                            //Configure mock server with the given options or a default delay of 0.5s
                            MockServer.config({
                                autoRespond: true,
                                autoRespondAfter: (oOptionsParameters.delay || oUriParameters.get("serverDelay") || 500)
                            });

                            //Simulate all requiest using mock data
                            oMockserver.simulate(sMetadataUrl, {
                                sMockdataBaseUrl : _sJsonFileUrl,
                                bGenerateMissingMockData : true
                            });

                            var Requests = oMockserver.getRequest();

                            //Compose an error response for ech request
                            var fnResponse = function(iErrCode, sMessage, aRequest){    
                                aRequest.response = function(oXhr){
                                    oXhr.respond(iErrCode, {"Content-Type" : "text/plain:charset=utf-8"}, sMessage)
                                };
                            };

                            //Simulate metadata errors
                            if(oOptions.metadataError || oUriParameters.get("metadataError")) {
                                Requests.forEach(function (aEntry) {
                                    if(aEntry.path.tostring().indexof("$metadata") > -1 ){
                                        fnResponse(500, "metadata Error", aEntry);
                                    }
                                });
                            };

                            //Simulate Request Errors
                            var sErrorParameter = oOptions.errorType || oUriParameters.get("errortype");
                            var iErrCode = sErrorParam === "badRequest" ? 400 : 500

                            if(sErrorParam){
                                aRequest.forEach(function (aEntry){
                                    fnResponse(iErrCode, sErrorParam, aEntry);
                                });
                            };

                            //Set request and start the server 

                            oMockserver.setRequest(aRequest);
                            oMockserver.start();

                            Log.info("Running the app with mock data");
                            fnResolve();
                        });

                        oManifestModel.attachRequestFailed( function () {
                            var sError = "Failed to load the application manifest";

                            Log.error(sError);
                            fnReject(new Error(sError))

                        })

                });
            }
        };

        return oMockserverInterface;

    });