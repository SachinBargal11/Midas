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
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
    todaysVisits: PatientVisit[] = [];
    casesTypes: any;
    casesByInsurance: {
        insuranceMasterId: number,
        label: string,
        data: number
    }[] = [];

    caseChartDetail: any;
    casesByInsuranceChart: any;
    selectedCaseFilterOption = '6';
    selectedCaseByInsuranceFilterOption = '6';
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private AmCharts: AmChartsService,
        public sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _patientVisitStore: PatientVisitsStore
    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            let currDate = moment();
            this.filterCaseTypeStatistics(this.selectedCaseFilterOption);
            this.filterCasesByInsuranceStatistics(this.selectedCaseByInsuranceFilterOption);
            this.loadAppointments(currDate, this.sessionStore.session.currentCompany.id);
        });
    }
    ngOnInit() {
        let currDate = moment();
        this.filterCaseTypeStatistics(this.selectedCaseFilterOption);
        this.filterCasesByInsuranceStatistics(this.selectedCaseByInsuranceFilterOption);
        this.loadAppointments(currDate, this.sessionStore.session.currentCompany.id);
    }


    //Load Appointments
    loadAppointments(currDate, companyId) {
        this._patientVisitStore.getAttorneyVisitForDateByCompanyId(currDate, companyId)
            .subscribe((todaysVisits: PatientVisit[]) => {
                let allVisits: PatientVisit[] = todaysVisits;
                // let now = moment().utc();
                // let futureVisits: PatientVisit[] = _.filter(allVisits, (currVisit: PatientVisit) => {
                //     return currVisit.eventStart >= now
                // })
                this.todaysVisits = _.first(allVisits, 5);
            },
            (error) => {
            },
            () => {
            });
    }

    //load statistic data on case by case type
    getStatisticalDataOnCaseByCaseType(fromDate: any, toDate: any) {
        this._patientVisitStore.getStatisticalDataOnCaseByCaseType(fromDate, toDate)
            .subscribe((casesTypes: any) => {
                this.casesTypes = casesTypes;
                this.showStatisticDataForCaseTypeChart(fromDate, toDate);
            },
            (error) => {
            },
            () => {
            });
    }
    //load statistic data on case by Insurance provider
    getStatisticalDataOnCaseByInsuranceProvider(fromDate: any, toDate: any) {
        this._patientVisitStore.getStatisticalDataOnCaseByInsuranceProvider(fromDate, toDate)
            .subscribe((casesByInsurance: any) => {
                let mappedCasesByInsurance: {
                    insuranceMasterId: number,
                    label: string,
                    data: number
                }[] = [];
                _.forEach(casesByInsurance, (currElement: any) => {
                    mappedCasesByInsurance.push({
                        insuranceMasterId: currElement.insuranceMasterId,
                        label: currElement.insuranceCompanyName,
                        data: currElement.count
                    });
                })
                this.casesByInsurance = _.first(mappedCasesByInsurance, 5);
                this.showStatisticDataForCasesByInsuranceChart(fromDate, toDate);
            },
            (error) => {
            },
            () => {
            });
    }

    filterCaseTypeStatistics(event) {
        // this.selectedOption = event.target.value;
        if (this.selectedCaseFilterOption == '1') {
            let startDate = moment();
            let endDate = moment();
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
        } else if (this.selectedCaseFilterOption == '2') {
            let startDate = moment().startOf('week');
            let endDate = moment().endOf('week');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
        } else if (this.selectedCaseFilterOption == '3') {
            let startDate = moment().startOf('month');
            let endDate = moment().endOf('month');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
        } else if (this.selectedCaseFilterOption == '4') {
            let startDate = moment().startOf('quarter');
            let endDate = moment().endOf('quarter');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
        } else if (this.selectedCaseFilterOption == '5') {
            let currQuarter = moment().quarter();
            let startOfYear = moment().startOf('year');
            if (currQuarter <= 2) {
                let secondQuarter = moment(startOfYear).quarter(2);
                let endDate = moment(secondQuarter).endOf('quarter');
                this.getStatisticalDataOnCaseByCaseType(startOfYear, endDate);
            } else if (currQuarter > 2) {
                let startDate = moment(startOfYear).quarter(3);
                let endDate = moment().endOf('year');
                this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
            }
        } else if (this.selectedCaseFilterOption == '6') {
            let startDate = moment().startOf('year');
            let endDate = moment().endOf('year');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate);
        }
    }
    
    filterCasesByInsuranceStatistics(event) {
        // this.selectedOption = event.target.value;
        if (this.selectedCaseByInsuranceFilterOption == '1') {
            let startDate = moment();
            let endDate = moment();
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
        } else if (this.selectedCaseByInsuranceFilterOption == '2') {
            let startDate = moment().startOf('week');
            let endDate = moment().endOf('week');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
        } else if (this.selectedCaseByInsuranceFilterOption == '3') {
            let startDate = moment().startOf('month');
            let endDate = moment().endOf('month');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
        } else if (this.selectedCaseByInsuranceFilterOption == '4') {
            let startDate = moment().startOf('quarter');
            let endDate = moment().endOf('quarter');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
        } else if (this.selectedCaseByInsuranceFilterOption == '5') {
            let currQuarter = moment().quarter();
            let startOfYear = moment().startOf('year');
            if (currQuarter <= 2) {
                let secondQuarter = moment(startOfYear).quarter(2);
                let endDate = moment(secondQuarter).endOf('quarter');
                this.getStatisticalDataOnCaseByInsuranceProvider(startOfYear, endDate);
            } else if (currQuarter > 2) {
                let startDate = moment(startOfYear).quarter(3);
                let endDate = moment().endOf('year');
                this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
            }
        } else if (this.selectedCaseByInsuranceFilterOption == '6') {
            let startDate = moment().startOf('year');
            let endDate = moment().endOf('year');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate);
        }
    }

    showStatisticDataForCaseTypeChart(fromDate: any, toDate: any) {
        this.caseChartDetail = this.AmCharts.makeChart("caseChartDiv", {
            "type": "pie",
            "theme": "light",
            // "titles": [{ "text": appointments + ": " + value + "$ Amount" }, { "text": "Year: " + year, "bold": false }],
            // "dataProvider": this.getStatisticalDataOnPatientVisit(fromDate, toDate),    //chartData;
            "dataProvider": [{
                "label": "No fault type",
                "data": this.casesTypes.nofaultType
            }, {
                "label": "WC type",
                "data": this.casesTypes.wcType
            }, {
                "label": "Private type",
                "data": this.casesTypes.privateType
            }, {
                "label": "Lien type",
                "data": this.casesTypes.lienType
            }, {
                "label": "Not specified",
                "data": this.casesTypes.notSpecified
            }],
            "titleField": "label",
            "valueField": "data",
            "outlineColor": "#FFFFFF",
            "outlineAlpha": 0.8,
            "outlineThickness": 2,
            "legend": {
                "borderAlpha": 0.3,
                "horizontalGap": 8,
                "position": "right",
                'fontSize': 10,
                'valueWidth': 10,
                'markerSize': 8,
                // "valueAlign": "left",
                // "labelWidth": 100
            }
        });
    } 
    
    showStatisticDataForCasesByInsuranceChart(fromDate: any, toDate: any) {
        this.casesByInsuranceChart = this.AmCharts.makeChart("casesByInsuranceChartDiv", {
            "type": "pie",
            "theme": "light",
            // "titles": [{ "text": appointments + ": " + value + "$ Amount" }, { "text": "Year: " + year, "bold": false }],
            // "dataProvider": this.getStatisticalDataOnPatientVisit(fromDate, toDate),    //chartData;
            "dataProvider": this.casesByInsurance,
            "titleField": "label",
            "valueField": "data",
            "outlineColor": "#FFFFFF",
            "outlineAlpha": 0.8,
            "outlineThickness": 2,
            "legend": {
                "borderAlpha": 0.3,
                "horizontalGap": 8,
                "position": "bottom",
                'fontSize': 10,
                'valueWidth': 10,
                'markerSize': 8,
                // "valueAlign": "left",
                // "labelWidth": 100
            }
        });
    }

}
