sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Filter'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,FilterOperator,Filter) {
        "use strict";

        return Controller.extend("projectb1906.controller.main", {
            formatter: { // formatter 객체 안에다 format function 들을 넣고 관리
                //fnDateString: 날짜 객체를 yyyy/mm/dd 로 변경해줌. 
                fnDateString: function(oDate){
                    if (oDate){
                      let oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: "yyyy-MM-dd"
                      });
                      return oDateTimeInstance.format(oDate); // format이라 메소드를 사용해서 oDate 객체를 갖고오고 
                    }   
                    
                }
            },

            
            onInit: function () {
// t
            }, 
            
            onValueHelp: function () {
                
                let oDialog = this.byId('idDialog');
                if(oDialog) {
                    oDialog.open();
                }else{
                    this.loadFragment({
                        name: "projectb1906.view.Fragment.Order",
                        type: "XML"
                    }).then(function(oDialog) {
                      oDialog.open();
                    }.bind(this));
                }
            },
            onValueHelp2: function () {
                
                let oDialog = this.byId('idDialog2');
                if(oDialog) {
                    oDialog.open();
                }else{
                    this.loadFragment({
                        name: "projectb1906.view.Fragment.Order",
                        type: "XML"
                    }).then(function(oDialog) {
                      oDialog.open();
                    }.bind(this));
                }
            },
            onClose: function (oEvent) {
                let oButton = oEvent.getSource();
                let oDialog = oButton.getParent();
                oDialog.close();
            },
            onBeforeOpen: function (oEvent) {
              let oTable = this.byId('idOrderTable');
              let aFilters = [];
              let oFilter =   new Filter({
                path: "EmployeeID",
                // operator: 'EQ',
                // value1: 4
              });

              let oFilter2 = new Filter({ 
                path: 'CustomerID',
                operator:'Contains',
                value1: 'R',
                value2: '' 
              });

              // aFilters = [ new Filter({
              //   path: "EmployeeID",
              //   operator: 'GE',
              //   value1: 4
              // }),
              // new Filter({ 
              //   path: 'CustomerID',
              //   operator:'Contains',
              //   value1: 'R',
              //   value2: '' 
              // }) ];
              aFilters.push(oFilter);
            //   aFilters.push(oFilter2);
              //let oFilter = new Filter("EmployeeID", FilterOperator.EQ, 4);
              oTable.getBinding('rows').filter(aFilters);
            },
            onSearch:function(){
                let oValue = this.getView().byId('idInput').getValue(),
                    oTable = this.getView().byId('idProductsTable'),
                    aFilters = [],
                    oFilter = new Filter({
                        path : "OrderID",
                        operator : 'EQ',
                        value1 : oValue
                    });
                    aFilters.push(oFilter);
                    oTable.getBinding('items').filter(aFilters);
            },
            onNavDetail : function(){
                //Detail.view.xml 화면으로 이동
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{
                    paramOrder : 'OrderID',
                    param2 : 'Option'});
            },
            onSelectionChange : function(oEvent) {
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                
                var oModel = this.getView().getModel();
                var oSelID = oModel.getProperty(sPath).OrderID; //this.getView().getModel().getProperty(oEvent.getParameters().listItem.getBindingContextPath()).OrderID
                
                var oRouter = this.getOwnerComponent().getRouter();
                //oRouter.navTo(/ 라우트 객체 이름 */);
                    oRouter.navTo("RouteDetail", {
                    paramOrder : oSelID
                });
            
      
                
                //OdataModel.getProperty(경로) 해서 한 건의 데이터 전체 가져오기
                //=> 그 안에서 OrderID 값을 얻을 수 있다.

                // 해당 OrderID를 가지고 Detail 화면으로 이동
            }
        
        })
    });


    // 승연아 유튜브 그만보고 공부하자 javascript 5등안에 들어야지