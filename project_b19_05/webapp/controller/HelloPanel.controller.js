sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1905.controller.HelloPanel", {
            onInit: function () {

            },
            onShowHello: function () {
                sap.m.MessageBox.confirm('Hello Panel Click' , {
                    title: "Success",
                        onClose: function(action){
                            switch(action){
                                case 'YES':
                                    sap.m.MessageToast.show('YES Click');
                                break;
                                case 'NO':
                                    sap.m.MessageToast.show('NO Click');
                                break;
                            }
                        },
                        actions:[sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO ],
                        emphasizedAction: sap.m.MessageBox.Action.YES,

                }
                )
             }
        });
    });