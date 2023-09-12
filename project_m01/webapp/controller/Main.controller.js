sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.projectm01.controller.Main", {
            formatter : {
                transformDiscontinued : function(getData){
                    if(getData == true){
                        return "Yes"
                    }else {
                        return "No"
                    }
                }
            },
            onInit: function () {
                var list = { number : []}
                var oModel = new JSONModel(list);
                this.getView().setModel(oModel)
            },

            onRandomPress : function (){
                var randomNum = Math.floor(Math.random() * 100) + 1
                this.byId("idInput").setValue(randomNum)

                var oModel = this.getView().getModel()
                var aList = oModel.getProperty("/number")

                aList.push({
                    number:randomNum
                })
                oModel.setProperty("/number",aList)
                this.byId("idInput").setValueState('None')
            },
            onDialog : function(){
                var aDialog = this.byId("idDialog")

                if(aDialog){
                    aDialog.open()
                } else{ 
                    this.loadFragment({
                        name : 'sap.btp.projectm01.view.fragment.Products'
                    }).then(function(oDialog){
                        oDialog.setModel(this.getOwnerComponent().getModel())
                        oDialog.open()
                    }.bind(this))
                   
                }
                
            },
            onClose : function(){
                this.byId("idDialog").close()
            },
            onValueChange : function (oEvent){
                var idInput = this.byId("idInput"),
                    getNum = idInput.getValue()

                if(getNum >= 1 && getNum <= 100) {
                    oEvent.getSource().setValueState("None")
                    var oModel = this.getView().getModel()
                    var aList = oModel.getProperty("/number")

                    aList.push({
                        number: getNum
                    })
                    oModel.setProperty("/number",aList)
                }else{
                    oEvent.getSource().setValueState("Error")
                    oEvent.getSource().setValueStateText("오예ㅒ")
                }
            }
        });
    });
