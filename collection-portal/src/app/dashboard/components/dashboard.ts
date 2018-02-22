import { Component } from '@angular/core';
// import { AmChartsService } from "amcharts3-angular2";


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    private timer: any;
    private chart: any;
    private chart1: any;
    private chartDetail: any;
    users: any;
    doctors: any;
    providers: any;
    medicalfacilities: any;
    constructor(
        // private AmCharts: AmChartsService
    ) {

    }
    // ngOnInit() {
    //     this.chart = this.AmCharts.makeChart("chartdiv", {
    //         "type": "serial",
    //         // "theme": "light",
    //         "marginLeft": 10, //
    //         "dataProvider": this.getMainChartData(),    //chartData;
    //         // value
    //         "valueAxes": [{
    //             "axisAlpha": 0,
    //             "inside": true, //
    //             "dashLength": 3,    //
    //         }],
    //         "graphs": [
    //             // GRAPH -- Funded Amount
    //             {
    //                 "id": "g1",
    //                 "bullet": "round",
    //                 "bulletSize": 8,
    //                 "lineColor": "#d1655d",
    //                 "negativeLineColor": "#637bb6",
    //                 "lineThickness": 2,
    //                 "type": "line",
    //                 "valueField": "Funded",

    //                 "title": "Funded",
    //                 "bulletBorderColor": "#FFFFFF",
    //                 "bulletBorderAlpha": 1,
    //                 "bulletBorderThickness": 2,
    //                 "balloonText": "Funded:[[Funded]]$ Amt",
    //             },
    //             // GRAPH -- Recovered Amount
    //             {
    //                 "id": "g2",
    //                 "title": "Recovered",
    //                 "type": "smoothedLine",
    //                 "lineColor": "Green",
    //                 "negativeLineColor": "#637bb6",
    //                 "bullet": "round",
    //                 "bulletSize": 8,
    //                 "bulletBorderColor": "#FFFFFF",
    //                 "bulletBorderAlpha": 1,
    //                 "bulletBorderThickness": 2,
    //                 "lineThickness": 2,
    //                 "valueField": "Recovered",
    //                 "balloonText": "Recovered: [[Recovered]]$ Amt",
    //             },
    //             // GRAPH -- Written Off Amount
    //             {
    //                 "id": "g3",
    //                 "title": "Writeoff",
    //                 "type": "smoothedLine",
    //                 "lineColor": "Yellow",
    //                 "negativeLineColor": "#637bb6",
    //                 "bullet": "round",
    //                 "bulletSize": 8,
    //                 "bulletBorderColor": "#FFFFFF",
    //                 "bulletBorderAlpha": 1,
    //                 "bulletBorderThickness": 2,
    //                 "lineThickness": 2,
    //                 "valueField": "WriteOff",
    //                 "balloonText": "Write-off: [[WriteOff]]$ Amt",
    //             }],
    //         "chartScrollbar": {
    //             "graph": "g1",
    //             "gridAlpha": 0,
    //             "color": "#888888",
    //             "scrollbarHeight": 55,
    //             "backgroundAlpha": 0,
    //             "selectedBackgroundAlpha": 0.1,
    //             "selectedBackgroundColor": "#888888",
    //             "graphFillAlpha": 0,
    //             "autoGridCount": true,
    //             "selectedGraphFillAlpha": 0,
    //             "graphLineAlpha": 0.2,
    //             "graphLineColor": "#c2c2c2",
    //             "selectedGraphLineColor": "#888888",
    //             "selectedGraphLineAlpha": 1
    //         },
    //         "chartCursor": {
    //             "cursorAlpha": 0,
    //             "cursorPosition": "mouse",
    //             "categoryBalloonDateFormat": "YYYY"
    //         },
    //         "legend": {
    //             "borderAlpha": 0.2,
    //             "horizontalGap": 10,
    //             "position": "top"
    //         },
    //         "creditsPosition": "bottom-right",
    //         "dataDateFormat": "YYYY",
    //         "categoryField": "year",
    //         // category
    //         "categoryAxis": {
    //             "minPeriod": "YYYY",
    //             "parseDates": true,
    //             "dashLength": 3,   
    //             "minorGridAlpha": 0.1,
    //             "minorGridEnabled": true
    //         }
    //     });

    //     this.chart1 = this.AmCharts.makeChart("chartdivMain2", {
    //         "type": "serial",
    //         "theme": "light",
    //         "dataProvider": this.getMainChartData(),    //chartData;
    //         "categoryField": "year",
    //         "plotAreaBorderAlpha": 0.2,
    //         "categoryAxis": {
    //             "gridAlpha": 0.1,
    //             "axisAlpha": 0,
    //             "gridPosition": "start"
    //         },
    //         "valueAxes": [{
    //             "stackType": "regular",
    //             "gridAlpha": 0.1,
    //             "axisAlpha": 0
    //         }],
    //         "graphs": [
    //             // GRAPH -- Funded Amount
    //             {
    //                 "id": "g1",
    //                 "title": "Funded",
    //                 "labelText": "[[value]]",
    //                 "valueField": "Funded",
    //                 "type": "column",
    //                 "lineAlpha": 0,
    //                 "fillAlphas": 1,
    //                 "lineColor": "Orange",
    //                 "balloonText": "Funded:[[Funded]]$ Amt"
    //             }],
    //         "legend": {
    //             "borderAlpha": 0.2,
    //             "horizontalGap": 10
    //         },
    //         "depth3D": 3,
    //         "angle": 4
    //     });


    //     // Updates the chart every 3 seconds
    //     // this.timer = setInterval(() => {
    //         // This must be called when making any changes to the chart
    //         this.AmCharts.updateChart(this.chart, () => {
    //             this.chart.dataProvider = this.getMainChartData();
    //             this.chart.addListener("clickGraphItem", (event) => {
    //                 this.handleClick(event);
    //             });
    //         });
    //         this.AmCharts.updateChart(this.chart1, () => {
    //             this.chart1.dataProvider = this.getMainChartData();
    //             this.chart1.addListener("clickGraphItem", (event) => {
    //                 this.handleClick(event);
    //             });
    //         });
    //     // }, 3000);
    // }
    // handleClick(event) {
    //     var year = new Date(event.item.category).getFullYear();
    //     //alert("Year: " + year + "\nCategory: " + event.graph.valueField + "\nValue: " + event.item.values.value);
    //     this.showDetailedChart(event.graph.valueField, year, event.item.values.value);
    // }
    // showDetailedChart(category, year, value) {
    //     this.chartDetail = this.AmCharts.makeChart("chartdivDetail", {
    //         "type": "pie",
    //         "theme": "light",
    //         "titles": [{ "text": category + ": " + value + "$ Amount" }, { "text": "Year: " + year, "bold": false }],
    //         "dataProvider": this.getDetailedChartData(category, year),    //chartData;
    //         "titleField": "Item",
    //         "valueField": "Amount",
    //         "outlineColor": "#FFFFFF",
    //         "outlineAlpha": 0.8,
    //         "outlineThickness": 2,
    //         "legend": {
    //             "borderAlpha": 0.3,
    //             "horizontalGap": 10,
    //             "position": "right"
    //         }
    //     });
    // }

    // ngOnDestroy() {
    //     clearInterval(this.timer);
    //     this.AmCharts.destroyChart(this.chart);
    // }
    // getChartData() {
    //     var chartData1 = [
    //         {
    //             "year": "2011",
    //             "SumOfBalance": 8288636.33
    //         },
    //         {
    //             "year": "2012",
    //             "SumOfBalance": 7905612.00
    //         }
    //     ];
    //     return chartData1;
    // }

    // getMainChartData() {
    //     var chartData = [
    //         {
    //             "year": "2011",
    //             "Funded": 654132.6,
    //             // "Recovered": 90,
    //             // "WriteOff": 10
    //         },
    //         {
    //             "year": "2012",
    //             "Funded": 1103360.85,
    //             // "Recovered": 80,
    //             // "WriteOff": 70
    //         },
    //         {
    //             "year": "2013",
    //             "Funded": 161167.60,
    //             // "Recovered": 0,
    //             // "WriteOff": 90
    //         },
    //         {
    //             "year": "2014",
    //             "Funded": 1066342.64,
    //             // "Recovered": 200,
    //             // "WriteOff": 50
    //         },
    //         {
    //             "year": "2015",
    //             "Funded": 577643.56,
    //             // "Recovered": 100,
    //             // "WriteOff": 5
    //         },
    //         {
    //             "year": "2016",
    //             "Funded": 1360761.20,
    //             // "Recovered": 90,
    //             // "WriteOff": 10
    //         },
    //         {
    //             "year": "2017",
    //             "Funded": 1229716.53,
    //             // "Recovered": 170,
    //             // "WriteOff": 50
    //         }
    //     ];
    //     return chartData;
    // }

    // getDetailedChartData(category, year) {
    //     var chartDetailData;

    //     chartDetailData = [
    //         {
    //             "year": "2011",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 50
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 5
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2011",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2011",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 2
    //         },
    //         {
    //             "year": "2011",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 3
    //         },
    //         {
    //             "year": "2011",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 1
    //         },
    //         {
    //             "year": "2011",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 2
    //         },
    //         {
    //             "year": "2011",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 2
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 50
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2012",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2012",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2012",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2012",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2012",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2012",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 5
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 25
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2013",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2013",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2013",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2013",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2013",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 40
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 100
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 80
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 50
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 5
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 150
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2014",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 25
    //         },
    //         {
    //             "year": "2014",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2014",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 5
    //         },
    //         {
    //             "year": "2014",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 5
    //         },
    //         {
    //             "year": "2014",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2014",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 105
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 25
    //         },
    //         {
    //             "year": "2015",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 15
    //         },
    //         {
    //             "year": "2015",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 3
    //         },
    //         {
    //             "year": "2015",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 2
    //         },
    //         {
    //             "year": "2015",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2015",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2015",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 50
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2016",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2016",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 3
    //         },
    //         {
    //             "year": "2016",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 2
    //         },
    //         {
    //             "year": "2016",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2016",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2016",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Funded",
    //             "Item": "MRI",
    //             "Amount": 120
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Funded",
    //             "Item": "CT Scan",
    //             "Amount": 100
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Funded",
    //             "Item": "PT",
    //             "Amount": 100
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Funded",
    //             "Item": "ECG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Funded",
    //             "Item": "EMG",
    //             "Amount": 0
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Recovered",
    //             "Item": "MRI",
    //             "Amount": 70
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Recovered",
    //             "Item": "CT Scan",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Recovered",
    //             "Item": "PT",
    //             "Amount": 30
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Recovered",
    //             "Item": "ECG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2017",
    //             "category": "Recovered",
    //             "Item": "EMG",
    //             "Amount": 20
    //         },
    //         {
    //             "year": "2017",
    //             "category": "WriteOff",
    //             "Item": "MRI",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2017",
    //             "category": "WriteOff",
    //             "Item": "CT Scan",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2017",
    //             "category": "WriteOff",
    //             "Item": "PT",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2017",
    //             "category": "WriteOff",
    //             "Item": "ECG",
    //             "Amount": 10
    //         },
    //         {
    //             "year": "2017",
    //             "category": "WriteOff",
    //             "Item": "EMG",
    //             "Amount": 10
    //         }];


    //     return chartDetailData.filter(function (el) {
    //         return el.year == year &&
    //             el.category == category;
    //     });

    // }
}
