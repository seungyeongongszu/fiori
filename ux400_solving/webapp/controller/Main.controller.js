sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.main", {
            formatter : {
                //fnDateString=>날짜 객체를 yyyy-MM-dd형태로 변경

                transformDiscontinued : function (oDate){
                    if(oDate==true) {
                        return 'Yes'
                        }else{return 'No'};
                }
            }
        ,

            onInit: function () {
                var oData = { list : []} // json data 생성
                var oModel = new JSONModel(oData); // json data를 포함한 json model 생성
                this.getView().setModel(oModel);
            },
              onAdd: function (result) {
                let num1 = Number(this.byId("id").getValue())
                var oModel = this.getView().getModel(),
                    aList = oModel.getProperty("/list");

                aList.push(
                    {
                        num1 : num1, 
                    });
                    
                oModel.setProperty("/list", aList)
                
            },
            onRandomPress: function () {
                var random = Math.floor(Math.random() * 100)+1;
                var log = this.byId('id').setValue(random);
                


                this.onAdd("log", random)
            },
            onRowActionDel: function(oEvent){
                var nSelectedIndex = oEvent.getParameter('row').getIndex();
                var aList = this.getView().getModel().getData().list;
                
                //.splice를 통해 단 건 삭제 후 적용
                 aList.splice(nSelectedIndex, 1); 
                     
                 this.getView().getModel().setProperty("/list",aList)  ;
            },
            onOpenDialog: function() {
                var oDialog = sap.ui.getCore().byId("idDialog");
                var oModel = this.getOwnerComponent().getModel()

                        if(oDialog) {
                            oDialog.open();
                        }else{
                        Fragment.load({
                            name : 'sap.btp.ux400solving.view.fragment.Order',
                            type : 'XML',
                            controller : this
                        }).then(function(oDialog) {
                            oDialog.setModel(oModel);
                            oDialog.open(); 

                         
                        });
                
    //////////////////////////////////////////////////////////
    
                // var oDialog = this.byId("idDialog")
    
                // if(oDialog) {
                //     oDialog.open();
                //     }else{
                // this.loadFragment({
                //     name: "ux400solving.view.fragment.Products",
                //     type  : "XML",
                // }).then(function() {
                //     var myControl = this.byId("myFragment");
                // }.bind(this));
            }},
            onClose : function(oEvent) 
            /*
            getSource() : 이벤트를 일으킨 객체
            getParameters() : 이벤트 관련 정보
            */
            {
                // var oDialog = this.byId("idDialog");
                var oButton = oEvent.getSource();
                var oDialog = oButton.getParent();

           
                oDialog.close();
            }, 
            onValueChange: function(oEvent){
            var log3= this.byId("id").getValue(); // 0 or NaN
                if (log3 > 0 && log3 < 101) {
                    var oModel = this.getView().getModel(),
                        aList = oModel.getProperty("/list");

                    aList.push(
                        {
                            num1 : log3
                        });
                        
                    oModel.setProperty("/list", aList)
                   
                } else {
                    this.byId('id').setValueStateText("제대로해")
                    oEvent.getSource().setValueState("Error")
                    return
                 } }
        });
    });

