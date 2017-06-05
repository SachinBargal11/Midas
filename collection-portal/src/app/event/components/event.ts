import { Component } from '@angular/core';
// import { AmChartsService } from "amcharts3-angular2";


@Component({
    selector: 'event',
    templateUrl: './event.html',
})

export class EventComponent {
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
}