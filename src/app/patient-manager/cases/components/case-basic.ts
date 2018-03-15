import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { Employer } from '../../cases/models/employer';
import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
import { EmployerStore } from '../../cases/stores/employer-store';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { CaseLabel } from '../models/case-label';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';
import { Attorney } from '../../../account-setup/models/attorney';
import { AttorneyMasterStore } from '../../../account-setup/stores/attorney-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { PendingReferral } from '../../referals/models/pending-referral';

@Component({
    selector: 'case-basic',
    templateUrl: './case-basic.html'
})

export class CaseBasicComponent implements OnInit {
    caseDetail: Case;
    readOnlyCaseDetail: CaseLabel;
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    attorneys: Attorney[];
    employer: Employer;
    patient: Patient;
    isSaveProgress = false;
    caseId: number;
    caseStatusId: number;
    patientId: number;
    patientName: string;
    // transportation: any;
    attorneyId: number = 0;
    currentAttorneyId: number;
    companyId:  number;
    caseDetails: Case[];
    referredToMe: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _employerStore: EmployerStore,
        private _patientStore: PatientsStore,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef,
        private confirmationService: ConfirmationService,
    ) {
        this.companyId = sessionStore.session.currentCompany.id;
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            debugger;
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this.MatchReferal();
            let fetchPatient = this._patientStore.fetchPatientById(this.patientId);
            let fetchlocations = this._locationsStore.getLocations();
            let fetchEmployer = this._employerStore.getCurrentEmployer(this.patientId);
            let fetchAttorneys = this._attorneyMasterStore.getAttorneyMasters();
            // let fetchCaseDetail = this._casesStore.caseGetById(this.caseId);
            let fetchCaseDetail = this._casesStore.getCaseForCaseIdAndCompanyId(this.caseId, this.companyId);
            // let fetchReadOnlyCaseDetail = this._casesStore.getCaseReadOnly(this.caseId, this.companyId);

            Observable.forkJoin([fetchPatient, fetchlocations, fetchEmployer, fetchAttorneys, fetchCaseDetail])
                .subscribe(
                (results) => {
                    // let matchingAttorneys: Attorney[] = _.filter(results[3], (currentAttorney: Attorney) => {
                    //     return currentAttorney.user != null;
                    // });
                    this.patient = results[0];
                    this.patientName = this.patient.user.firstName + ' ' + this.patient.user.lastName;
                    this.locations = results[1];
                    this.employer = results[2];
                    this.attorneys = results[3];
                    this.caseDetail = results[4];
                    // this.readOnlyCaseDetail = results[5];
                    this.currentAttorneyId = this.caseDetail.attorneyProviderId;
                    this.caseStatusId = this.caseDetail.caseStatusId;
                    let defaultLabel: any[] = [{
                        label: '-Select Attorney-',
                        value: '0'
                    }]
                    let attorney = _.map(this.attorneys, (currentAttorney: Attorney) => {
                        return {
                            label: `${currentAttorney.prefferedAttorney.name}`,
                            value: currentAttorney.prefferedAttorney.id
                        };
                    })
                    this.attorneys = _.union(defaultLabel, attorney);
                },
                (error) => {
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
            // this.transportation = this.caseDetail.transportation == true ? '1' : this.caseDetail.transportation == false ? '0': '';

            // if (this.caseDetail.attorneyId != null) {
            //     if (this.caseDetail.attorneyId != null && this.caseDetail.attorneyId > 0) {
            //         // this.caseDetail.caseSource = "";
            //         this.caseform.get("caseSource").disable();

            //     }
            //     else {
            //         this.caseform.get("caseSource").enable();
            //     }
            // }
            // else {
            //     if (this.caseDetail.caseSource != null && this.caseDetail.caseSource != "") {
            //         this.caseform.get("attorneyId").disable();
            //     }
            //     else {
            //         this.caseform.get("attorneyId").enable();
            //     }
            // }
            // if (this.caseDetail.attorneyId != null && this.caseDetail.attorneyId > 0) {
            //     if (this.caseDetail.caseSource != null && this.caseDetail.caseSource != "") {
            //         this.caseform.get("attorneyId").disable();
            //     }
            //     else {
            //         this.caseform.get("attorneyId").enable();
            //     }
            // }

        },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

        this.caseform = this.fb.group({
            // caseName: [''],
            patientId: [{ value: '', disabled: true }],
            caseTypeId: ['', Validators.required],
            carrierCaseNo: [''],
            // locationId: ['', Validators.required],
            // patientEmpInfoId: ['', Validators.required],
            caseStatusId: ['', Validators.required],
            attorneyId: [''],
            caseSource: [''],
            claimNumber: ['']
            // transportation: [1, Validators.required],
        });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
    }

    attorneyChange(event) {
        this.attorneyId = parseInt(event.value);
        // if (this.attorneyId > 0) {
        //     this.caseform.get("caseSource").disable();
        // }
        // else {
        //     this.caseform.get("caseSource").enable();
        // }
        if (this.caseDetail.attorneyProviderId != 0) {
            if (this.attorneyId == 0) {
                this.confirmationService.confirm({
                    message: 'Removing attorney from a case will revoke all the permissions from this assigned attorney.Please confirm if you want to proceed?',
                    header: 'Change Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.currentAttorneyId = this.attorneyId;
                    },
                    reject: () => {
                        this.currentAttorneyId = this.caseDetail.attorneyProviderId;
                    }
                });
            }
            else
                this.confirmationService.confirm({
                    message: 'Changing attorney from a case will revoke all the permissions from old assigned attorney.Please confirm if you want to proceed?',
                    header: 'Change Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.currentAttorneyId = this.attorneyId;
                    },
                    reject: () => {
                        this.currentAttorneyId = this.caseDetail.attorneyProviderId;
                    }
                });
        }
        else {
            this.attorneyId = parseInt(event.target.value);
        }
    }

    casesourceChange(event) {
        let CaseSource: string = event.target.value;
        // if (CaseSource != "") {
        //     this.caseform.get("attorneyId").disable();
        // }
        // else {
        //     this.caseform.get("attorneyId").enable();
        // }
    }

    saveCase() {

        this.isSaveProgress = true;
        let caseFormValues = this.caseform.value;
        let result;
        let caseDetailJS = this.caseDetail.toJS();
        let caseDetail: Case = new Case(_.extend(caseDetailJS, {
            // caseName: caseFormValues.caseName,
            id: this.caseId,
            patientId: this.patientId,
            caseTypeId: caseFormValues.caseTypeId,
            carrierCaseNo: caseFormValues.carrierCaseNo,
            // locationId: parseInt(caseFormValues.locationId, 10),
            patientEmpInfoId: (this.employer.id) ? this.employer.id : null,
            caseStatusId: caseFormValues.caseStatusId,
            attorneyId: parseInt(caseFormValues.attorneyId, 10),
            caseStatus: caseFormValues.caseStatusId,
            caseSource: caseFormValues.caseSource,
            claimFileNumber: caseFormValues.claimNumber,
            updateByUserID: this.sessionStore.session.account.user.id,
            updateDate: moment(),
            createdByCompanyId: this.sessionStore.session.currentCompany.id
        }));

        this._progressBarService.show();
        result = this._casesStore.updateCase(caseDetail);
        result.subscribe(
            (response) => {
                if (this.attorneyId >= 0) {
                    let result1 = this._patientStore.assignPatientToAttorney(this.patientId, this.caseId, this.attorneyId);
                    result1.subscribe(
                        (response) => {
                            let notification = new Notification({
                                'title': 'Case updated successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()
                            });
                            this._notificationsStore.addNotification(notification);
                            // this._router.navigate(['../'], { relativeTo: this._route });
                            this._notificationsService.success('Success!', 'Case updated successfully!');
                        },
                        (error) => {
                            let errString = 'Unable to update case.';
                            let notification = new Notification({
                                'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                'type': 'ERROR',
                                'createdAt': moment()
                            });
                            this.isSaveProgress = false;
                            this._notificationsStore.addNotification(notification);
                            this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            this._progressBarService.hide();
                        },
                        () => {
                            this.isSaveProgress = false;
                            this._progressBarService.hide();
                        });
                }

                // let notification = new Notification({
                //     'title': 'Case updated successfully!',
                //     'type': 'SUCCESS',
                //     'createdAt': moment()
                // });
                // this._notificationsStore.addNotification(notification);
                // this._notificationsService.success('Success!', 'Case updated successfully!');
            },
            // (error) => {
            //     let errString = 'Unable to update case.';
            //     let notification = new Notification({
            //         'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
            //         'type': 'ERROR',
            //         'createdAt': moment()
            //     });
            //     this.isSaveProgress = false;
            //     this._notificationsStore.addNotification(notification);
            //     this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            //     this._progressBarService.hide();
            // },
            () => {
                // this.isSaveProgress = false;
                // this._progressBarService.hide();
            });
    }

    MatchReferal() {    
        //this._casesStore.MatchReferal(this.patientId);
        this._progressBarService.show();
        let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
        let result = this._patientStore.getPatientById(this.patientId);
        Observable.forkJoin([caseResult, result])
            .subscribe(
            (results) => {
                this.caseDetails = results[0];
                if (this.caseDetails.length > 0) {
                    let matchedCompany = null;
                    matchedCompany = _.find(this.caseDetails[0].referral, (currentReferral: PendingReferral) => {
                        return currentReferral.toCompanyId == this.sessionStore.session.currentCompany.id
                    })
                    if (matchedCompany) {
                        this.referredToMe = true;
                    } else {
                        this.referredToMe = false;
                    }
                } else {
                    this.referredToMe = false;
                }                
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });    
    }    
}
