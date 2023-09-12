sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";
        return Controller.extend("test.projectb1903.controller.Main", {
            
            onInit: function () {
                var oDatas = { name : "Jeong Seung Yoen", 
                               title : 'Hi', 
  
                               list1 : [],
                               
                            obj : {key : 'valuevalue'}} //json data 생성
                var oModel = new JSONModel(oDatas); //jason data를 포함한 json model 생성

                this.getView().setModel(oModel, "main"); //json nodel을 View에서 사용할 수 있도록 세팅
            },
            onCalc: function () {
                let op = this.byId("selectId").getSelectedItem()
                let sText = this.byId("textId")
                let result = 0;

                let num1 = Number(this.byId("inputId").getValue())
                let num2 = Number(this.byId("inputId2").getValue())

                if (op.getKey() == "plus") {
                    result = num1 + num2;
                } else if (op.getKey() == "minus") {
                   result = num1 - num2;
                } else if (op.getKey() == "multiple") {
                    result = num1 * num2;
                } else if (op.getKey() == "division") {
                    
                    if (num2==0) {
                        alert("0넣지마삼");
                    }
                    result = num1 / num2;
                }
                //sText.setText(result);
                // oncontextmenu.setText(nResult);
                // this.onAdd(nResult);
                this.onAdd(result);
            },
            onChange: function(oEvent) {
                let opt = this.byId("selectId").getSelectedKey()
                let bt = this.byId("calcButton")

                var nNum = Number(oEvent.getParameters().value); // 0 or NaN
                if (opt == "division" && nNum == 0) {
                    oEvent.getSource().setValueState("Error")
                    bt.setEnabled(false)
                } else {
                    oEvent.getSource().setValueState("Success")
                    bt.setEnabled(true)
                }
                
            },
            onAdd: function(result) {
                let opt = this.byId("selectId").getSelectedItem().getText()
                let num1 = Number(this.byId("inputId").getValue())
                let num2 = Number(this.byId("inputId2").getValue())
                // main 모델의 list 배열 데이터르 가져오는 방법
                var oModel = this.getView().getModel("main"), //main 모델 가져오기
                // aList = oModel.getData().list, // list 배열 데이터 가져오기
                aList2 = oModel.getProperty("/list1");// list 배열 데이터 가져오기2

                /*
                aList2에 새로운 데이터를 추가해야한다.
                데이터 구조의 예시는 다음과 같다
                => {num1: 20, operator: 'new data', num2: 52 result: 결과}

                사용자가 입력한 계산식을 aList2에 추가하여 모델에 반영
                */
                aList2.push({num1: num1, operator: opt, num2: num2, result : result}); // 데이터 추가
                oModel.setProperty("/list1", aList2) // aList의 list배열에 aList2 데이터 세팅
            }
        });
    });