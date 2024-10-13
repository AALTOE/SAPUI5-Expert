/* eslint-disable no-undef */
// @ts-nocheck
/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "logaligroup/SAPUI5/integration/NavigationJourney"
    ], function () {
        QUnit.start();
    });
})