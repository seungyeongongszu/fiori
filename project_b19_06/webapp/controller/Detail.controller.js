sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1906.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched,this);
            },
            _patternMatched:function(oEvent){
                //파라미터로 받은 값들 가져오기 
                var oParam = oEvent.getParameters().arguments;
                //oParam 안에는 manifest.json 에 등록된,
                //RouteDetail 의 Parameter 값들이 있음
                console.log(oParam.paramOrder);
                // this.getView().bindElement(`/Orders(${oParam.paramOrder})`);
                var sPath = oModel.createKey('/Orders',{
                    OrderID : oParam.paramOrder
                });

                oModel.read(sPath,{
                    urlParameters:{
                        '$expand': 'Order_Details'
                    },
                    success:function(oReturn){
                        console.log(oReturn);
                    },
                    error : function(oError){

                    }
                });

            },
            onNavmain : function(){
                
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo('RouteMain')

            }
        });
    });