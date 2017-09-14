import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { Notification } from '../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';

import { SessionStore } from '../../commons/stores/session-store';
import { PatientVisitsStore } from '../../patient-manager/patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-manager/patient-visit/models/patient-visit';

import { LocationsStore } from '../../medical-provider/locations/stores/locations-store';
import { LocationDetails } from '../../medical-provider/locations/models/location-details';

import { AmChartsService } from "@amcharts/amcharts3-angular";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    todaysVisits: PatientVisit[] = [];
    openAppointmentsOfDoctor: PatientVisit[] = [];
    doctors: any;
    providers: any;
    medicalfacilities: any;
    locations: LocationDetails[];
    statisticData: any;

    chartDetail: any;
    doctorId = this._sessionStore.session.user.id;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private AmCharts: AmChartsService,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _patientVisitStore: PatientVisitsStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            let currDate = moment();
            let startDate = moment().subtract(1, 'years');
            this.loadLocationByCompany();
            this.getStatisticalDataOnPatientVisit(startDate, currDate);
            if (this._sessionStore.isOnlyDoctorRole()) {
                this.loadOpenAppointmentSlotsForDoctor(currDate, this.doctorId)
            } else {
            }
        });
    }
    ngOnInit() {
        let currDate = moment();
        // let startDate = moment().subtract(1, 'months');
        let startDate = moment().subtract(1, 'years');
        this.loadLocationByCompany();
        this.getStatisticalDataOnPatientVisit(startDate, currDate);
        if (this._sessionStore.isOnlyDoctorRole()) {
            this.loadOpenAppointmentSlotsForDoctor(currDate, this.doctorId)
        } else {
        }
    }
    loadLocationByCompany() {
        this._locationsStore.getLocations()
            .subscribe((locationDetails: LocationDetails[]) => {
                this.locations = locationDetails;
                let currDate = moment();
                if (this._sessionStore.isOnlyDoctorRole()) {
                    this.getDoctorPatientVisitForDateByLocationId(currDate, this.doctorId, this.locations[0].location.id);
                } else {
                    this.loadVisitsByDateAndLocation(currDate, this.locations[0].location.id);
                }
            },
            (error) => {
            },
            () => {
            });
    }
    //Load Appointments
    loadVisitsByDateAndLocation(currDate, locationId) {
        this._patientVisitStore.getPatientVisitForDateByLocationId(currDate, locationId)
            .subscribe((todaysVisits: PatientVisit[]) => {
                this.todaysVisits = todaysVisits;
            },
            (error) => {
            },
            () => {
            });
    }
    //Load Appointments for doctor
    getDoctorPatientVisitForDateByLocationId(currDate, doctorId, locationId) {
        this._patientVisitStore.getDoctorPatientVisitForDateByLocationId(currDate, doctorId, locationId)
            .subscribe((todaysVisits: PatientVisit[]) => {
                this.todaysVisits = todaysVisits;
            },
            (error) => {
            },
            () => {
            });
    }

    //Load open Appointment slots for doctor
    loadOpenAppointmentSlotsForDoctor(currDate, doctorId) {
        this._patientVisitStore.getOpenAppointmentSlotsForDoctorByCompanyId(currDate, doctorId)
            .subscribe((openAppointmentsOfDoctor: PatientVisit[]) => {
                this.openAppointmentsOfDoctor = openAppointmentsOfDoctor;
            },
            (error) => {
            },
            () => {
            });
    }
    //load statistic data
    getStatisticalDataOnPatientVisit(fromDate: any, toDate: any) {
        this._patientVisitStore.getStatisticalDataOnPatientVisit(fromDate, toDate)
            .subscribe((statisticData: any) => {
                this.statisticData = statisticData;
                this.showStatisticDataChart(fromDate, toDate);
            },
            (error) => {
            },
            () => {
            });
    }

    showStatisticDataChart(fromDate: any, toDate: any) {
        this.chartDetail = this.AmCharts.makeChart("chartdivDetail", {
            "type": "pie",
            "theme": "light",
            // "titles": [{ "text": appointments + ": " + value + "$ Amount" }, { "text": "Year: " + year, "bold": false }],
            // "dataProvider": this.getStatisticalDataOnPatientVisit(fromDate, toDate),    //chartData;
            "dataProvider": [{
                "label": "Appointments",
                "data": this.statisticData.appointments
            }, {
                "label": "No shows",
                "data": this.statisticData.noShows
            }, {
                "label": "Inbound Referrals",
                "data": this.statisticData.referralsInbound
            }, {
                "label": "Outound Referrals",
                "data": this.statisticData.referralsOutbound
            }, {
                "label": "New cases",
                "data": this.statisticData.newCases
            }],
            "titleField": "label",
            "valueField": "data",
            "outlineColor": "#FFFFFF",
            "outlineAlpha": 0.8,
            "outlineThickness": 2,
            "legend": {
                "borderAlpha": 0.3,
                "horizontalGap": 10,
                "position": "right"
            }
        });
    }

}
