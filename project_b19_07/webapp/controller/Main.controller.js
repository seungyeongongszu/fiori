sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projectb1907.controller.Main", {
            onInit: function () {
                this._setChartInView();
                this._setChartInController();
            },
            _setChartInView: function(){
                var oData = { list : [{name : "a", rate : "1", cost : "2"},
                                      {name : "b", rate : "3", cost : "4"},
                                      {name : "c", rate : "5", cost : "6"},
                                      {name : "d", rate : "7", cost : "8"},
                                      {name : "e", rate : "9", cost : "10"},
                                      {name : "f", rate : "11", cost : "12"},
                                     ]} // json data 생성
                var oModel = new JSONModel(oData); // json data를 포함한 json model 생성
                this.getView().setModel(oModel,'view');
            },
            _setChartInController:function(){
                var oData = {
                    sales: [
                        { product:'Jacket', amount:'65'},
                        { product:'Shirts', amount:'70'},
                        { product:'Pants', amount:'83'},
                        { product:'Coats', amount:'92'},
                        { product:'Purse', amount:'77'}
                    ]
                };
                this.getView().setModel(new JSONModel(oData),'cont');

                //chart
                var oColChart = this.getView().byId("idChart");

                //dataset
                var oColDataset = new sap.viz.ui5.data.FlattenedDataset({
                    data : { path : "cont>/sales"},
                    dimensions : [{name:"Product", value:"{cont>product}"}],
                    measures:[{name:"Amount", value:"{cont>amount}"}]
                });
                oColChart.setDataset(oColDataset);

                //feeds
                var oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid:"valueAxis",
                    type:"Measure",
                    values:["Amount"]
                });
                var oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid:"categoryAxis",
                    type:"Dimension",
                    values:["Product"]
                });
                
                oColChart.addFeed(oFeedItemValue);
                oColChart.addFeed(oFeedItemCategory);

                // optional
                oColChart.setVizProperties({
                    'title':{'visible':true, 'text' : 'Line Chart' },
                    'legendGroup' : {layout : {position:'left'}},
                    'plotArea':{drawingEffect : 'glossy', colorPalette:['#FFB2D9','#FAF4C0']
                     }
                });
            }
        });
    });