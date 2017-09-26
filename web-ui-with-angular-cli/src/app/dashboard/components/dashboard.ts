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
    openAppointmentsOfDoctor: PatientVisit[] = [];
    doctors: any;
    providers: any;
    medicalfacilities: any;
    locations: LocationDetails[];
    statisticData: any;
    casesTypes: any;
    casesByInsurance: {
        insuranceMasterId: number,
        label: string,
        data: number
    }[] = [];

    chartDetail: any;
    caseChartDetail: any;
    casesByInsuranceChart: any;
    doctorId = this.sessionStore.session.user.id;
    selectedOption = '6';
    selectedCaseFilterOption = '6';
    selectedCaseByInsuranceFilterOption = '6';
    selectedCaseByType = '0';
    selectedCaseTypeInsurance = '0';
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
            this.filterStatistics(this.selectedOption);
            this.filterCaseTypeStatistics(this.selectedCaseFilterOption);
            this.filterCasesByInsuranceStatistics(this.selectedCaseByInsuranceFilterOption);
            // this.loadLocationByCompany();
            if (this.sessionStore.isOnlyDoctorRole()) {
                this.loadDoctorAppointmentsForDoctor(currDate, this.doctorId, this.sessionStore.session.currentCompany.id);
                this.loadOpenAppointmentSlotsForDoctor(currDate, this.doctorId);
            } else {
                this.loadAppointments(currDate, this.sessionStore.session.currentCompany.id);
                this.loadOpenAppointmentSlotsForCompanyId(currDate);
            }
        });
    }
    ngOnInit() {
        let currDate = moment();
        this.filterStatistics(this.selectedOption);
        this.filterCaseTypeStatistics(this.selectedCaseFilterOption);
        this.filterCasesByInsuranceStatistics(this.selectedCaseByInsuranceFilterOption);
        if (this.sessionStore.isOnlyDoctorRole()) {
            this.loadDoctorAppointmentsForDoctor(currDate, this.doctorId, this.sessionStore.session.currentCompany.id);
            this.loadOpenAppointmentSlotsForDoctor(currDate, this.doctorId);
        } else {
            this.loadAppointments(currDate, this.sessionStore.session.currentCompany.id);
            this.loadOpenAppointmentSlotsForCompanyId(currDate);
        }
    }
    loadLocationByCompany() {
        this._locationsStore.getLocations()
            .subscribe((locationDetails: LocationDetails[]) => {
                this.locations = locationDetails;
                let currDate = moment();
                if (this.sessionStore.isOnlyDoctorRole()) {
                    this.loadDoctorAppointmentsForDoctor(currDate, this.doctorId, this.locations[0].location.id);
                } else {
                    this.loadAppointments(currDate, this.locations[0].location.id);
                }
            },
            (error) => {
            },
            () => {
            });
    }
    //Load Appointments
    loadAppointments(currDate, companyId) {
        this._patientVisitStore.getPatientVisitForDateByCompanyId(currDate, companyId)
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
    //Load Appointments for doctor
    loadDoctorAppointmentsForDoctor(currDate, doctorId, companyId) {
        this._patientVisitStore.getDoctorPatientVisitForDateByCompanyId(currDate, doctorId, companyId)
            .subscribe((todaysVisits: PatientVisit[]) => {
                this.todaysVisits = _.first(todaysVisits, 5);
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
                this.openAppointmentsOfDoctor = _.first(openAppointmentsOfDoctor, 5);
            },
            (error) => {
            },
            () => {
            });
    }
    
        //Load open Appointment slots for company
        loadOpenAppointmentSlotsForCompanyId(currDate) {
            this._patientVisitStore.getOpenAppointmentSlotsForCompanyId(currDate)
                .subscribe((openAppointmentsOfDoctor: PatientVisit[]) => {
                    this.openAppointmentsOfDoctor = _.first(openAppointmentsOfDoctor, 5);
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
    //load statistic data on case by case type
    getStatisticalDataOnCaseByCaseType(fromDate: any, toDate: any,caseType:number) {
        this._patientVisitStore.getStatisticalDataOnCaseByCaseType(fromDate, toDate,caseType)
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
    getStatisticalDataOnCaseByInsuranceProvider(fromDate: any, toDate: any,caseType:number) {
        this._patientVisitStore.getStatisticalDataOnCaseByInsuranceProvider(fromDate, toDate,caseType)
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

    filterStatistics(event) {
        // this.selectedOption = event.target.value;
        if (this.selectedOption == '1') {
            let startDate = moment();
            let endDate = moment();
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        } else if (this.selectedOption == '2') {
            let startDate = moment().startOf('week');
            let endDate = moment().endOf('week');
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        } else if (this.selectedOption == '3') {
            let startDate = moment().startOf('month');
            let endDate = moment().endOf('month');
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        } else if (this.selectedOption == '4') {
            let startDate = moment().startOf('quarter');
            let endDate = moment().endOf('quarter');
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        } else if (this.selectedOption == '5') {
            let currQuarter = moment().quarter();
            let startOfYear = moment().startOf('year');
            if (currQuarter <= 2) {
                let secondQuarter = moment(startOfYear).quarter(2);
                let endDate = moment(secondQuarter).endOf('quarter');
                this.getStatisticalDataOnPatientVisit(startOfYear, endDate);
            } else if (currQuarter > 2) {
                let startDate = moment(startOfYear).quarter(3);
                let endDate = moment().endOf('year');
                this.getStatisticalDataOnPatientVisit(startDate, endDate);
            }
        } else if (this.selectedOption == '6') {
            let startDate = moment().startOf('year');
            let endDate = moment().endOf('year');
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        } else if (this.selectedOption == '7') {
            let startDate = moment().subtract(30, 'days');
            let endDate = moment();
            this.getStatisticalDataOnPatientVisit(startDate, endDate);
        }
    }

    filterCaseTypeStatistics(event) {
        // this.selectedOption = event.target.value;
        if (this.selectedCaseFilterOption == '1') {
            let startDate = moment();
            let endDate = moment();
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        } else if (this.selectedCaseFilterOption == '2') {
            let startDate = moment().startOf('week');
            let endDate = moment().endOf('week');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        } else if (this.selectedCaseFilterOption == '3') {
            let startDate = moment().startOf('month');
            let endDate = moment().endOf('month');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        } else if (this.selectedCaseFilterOption == '4') {
            let startDate = moment().startOf('quarter');
            let endDate = moment().endOf('quarter');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        } else if (this.selectedCaseFilterOption == '5') {
            let currQuarter = moment().quarter();
            let startOfYear = moment().startOf('year');
            if (currQuarter <= 2) {
                let secondQuarter = moment(startOfYear).quarter(2);
                let endDate = moment(secondQuarter).endOf('quarter');
                this.getStatisticalDataOnCaseByCaseType(startOfYear, endDate,parseInt(this.selectedCaseByType));
            } else if (currQuarter > 2) {
                let startDate = moment(startOfYear).quarter(3);
                let endDate = moment().endOf('year');
                this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
            }
        } else if (this.selectedCaseFilterOption == '6') {
            let startDate = moment().startOf('year');
            let endDate = moment().endOf('year');
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        } else if (this.selectedOption == '7') {
            let startDate = moment().subtract(30, 'days');
            let endDate = moment();
            this.getStatisticalDataOnCaseByCaseType(startDate, endDate,parseInt(this.selectedCaseByType));
        }
    }

    filterCasesByInsuranceStatistics(event) {
        // this.selectedOption = event.target.value;
        if (this.selectedCaseByInsuranceFilterOption == '1') {
            let startDate = moment();
            let endDate = moment();
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        } else if (this.selectedCaseByInsuranceFilterOption == '2') {
            let startDate = moment().startOf('week');
            let endDate = moment().endOf('week');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        } else if (this.selectedCaseByInsuranceFilterOption == '3') {
            let startDate = moment().startOf('month');
            let endDate = moment().endOf('month');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        } else if (this.selectedCaseByInsuranceFilterOption == '4') {
            let startDate = moment().startOf('quarter');
            let endDate = moment().endOf('quarter');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        } else if (this.selectedCaseByInsuranceFilterOption == '5') {
            let currQuarter = moment().quarter();
            let startOfYear = moment().startOf('year');
            if (currQuarter <= 2) {
                let secondQuarter = moment(startOfYear).quarter(2);
                let endDate = moment(secondQuarter).endOf('quarter');
                this.getStatisticalDataOnCaseByInsuranceProvider(startOfYear, endDate,parseInt(this.selectedCaseTypeInsurance));
            } else if (currQuarter > 2) {
                let startDate = moment(startOfYear).quarter(3);
                let endDate = moment().endOf('year');
                this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
            }
        } else if (this.selectedCaseByInsuranceFilterOption == '6') {
            let startDate = moment().startOf('year');
            let endDate = moment().endOf('year');
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        } else if (this.selectedOption == '7') {
            let startDate = moment().subtract(30, 'days');
            let endDate = moment();
            this.getStatisticalDataOnCaseByInsuranceProvider(startDate, endDate,parseInt(this.selectedCaseTypeInsurance));
        }
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
