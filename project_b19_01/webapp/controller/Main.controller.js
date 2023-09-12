sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project01.projectb1901.controller.Main", {
            onInit: function () {

            },
            onClick : function() {
                //alert('버튼 클릭하였습니다.');
                // var oText = this.byId('idText'); //Text 객체 가져옴 
                // var sText = oText.getText(); //Text객체에서 text property값을 가져옴 

                // alert(sText);

                var uText = this.byId('inText'); //Text 객체 가져옴 
                var tText = uText.getValue(); //Text객체에서 text property값을 가져옴 

                alert(tText);

            }
        });
    });
