/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project_01/project_b19_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
