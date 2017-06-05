import { Component } from '@angular/core';
// import { AmChartsService } from "amcharts3-angular2";


@Component({
    selector: 'add-event',
    templateUrl: './add-event.html',
})

export class AddEventComponent {
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