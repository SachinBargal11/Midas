import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { Employer } from '../../patients/models/employer';
import { EmployerStore } from '../../patients/stores/employer-store';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';
import { PatientsStore } from '../../patients/stores/patients-store';
import { Patient } from '../../patients/models/patient';
import { Attorney } from '../../../account-setup/models/attorney';
import { AttorneyMasterStore } from '../../../account-setup/stores/attorney-store';
import * as _ from 'underscore';
import { Account } from '../../../account/models/account';
import {SelectItem} from 'primeng/primeng'

@Component({
    selector: 'add-case',
    templateUrl: './add-case.html'
})

export class AddCaseComponent implements OnInit {
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    employer: Employer;
    isSaveProgress = false;
    patientId: number;
    idPatient: any = 0;
    patient: Patient;
    patientName: string;
    patients: Patient[];
    // patientsWithoutCase: Patient[];
    patientsWithoutCase: SelectItem[] = [];
    attorneys: Attorney[];
    attorneyId: number = 0;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _patientsStore: PatientsStore,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _employerStore: EmployerStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            if (this.patientId) {
                this._progressBarService.show();
                this._patientStore.fetchPatientById(this.patientId)
                    .subscribe(
                    (patient: Patient) => {
                        this.patient = patient;
                        this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                    },
                    (error) => {
                        this._router.navigate(['../'], { relativeTo: this._route });
                        this._progressBarService.hide();
                    },
                    () => {
                        this._progressBarService.hide();
                    });

                this._employerStore.getCurrentEmployer(this.patientId)
                    .subscribe(employer => this.employer = employer);
            }
        });



        this.caseform = this.fb.group({
            // caseName: [''],
            patientId: ['', Validators.required],
            caseTypeId: ['', Validators.required],
            carrierCaseNo: [''],
            locationId: ['', Validators.required],
            // patientEmpInfoId: ['', Validators.required],
            caseStatusId: ['1', Validators.required],
            attorneyId: [''],
            caseSource: ['']
        });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
        this._locationsStore.getLocations()
            .subscribe(locations => this.locations = locations);

        this._attorneyMasterStore.getAttorneyMasters()
            // .subscribe(attorneys => this.attorneys = attorneys);
            .subscribe((attorneys: Attorney[]) => {
                // let matchingAttorneys: Attorney[] = _.filter(attorneys, (currentAttorney: Attorney) => {
                //     return currentAttorney.user != null;
                // });
                this.attorneys = attorneys;
            });

        this.loadPatientsWithoutCase();
    }


    attorneyChange(event) {
        this.attorneyId = parseInt(event.target.value);
        // if (this.attorneyId > 0) {
        //     this.caseform.get("caseSource").disable();
        // }
        // else {
        //     this.caseform.get("caseSource").enable();
        // }
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

    selectPatient(event) {
        let currentPatient: number = parseInt(event.value);
        let idPatient = parseInt(event.value);
        let result = this._employerStore.getCurrentEmployer(currentPatient);
        result.subscribe((employer) => { this.employer = employer; }, null);
        console.log(this.employer)
    }

    loadPatientsWithoutCase() {
        this._progressBarService.show();
        this._patientsStore.getPatientsWithNoCase()
            .subscribe(patients => {
                // this.patientsWithoutCase = patients;
            this.patientsWithoutCase = _.map(patients, (currPatient: Patient) => {
                return {
                    label: `${currPatient.user.firstName} - ${currPatient.user.lastName}`,
                    value: currPatient.id
                };
            })
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    saveCase() {
        this.isSaveProgress = true;
        let caseFormValues = this.caseform.value;
        let result;
        let caseCompanyMapping;
        let caseDetail: Case = new Case({
            // patientId: this.patientId,
            patientId: (this.patientId) ? this.patientId : parseInt(this.idPatient),
            // patientId: caseFormValues.patientId,
            caseName: 'caseName',
            caseTypeId: caseFormValues.caseTypeId,
            carrierCaseNo: caseFormValues.carrierCaseNo,
            locationId: caseFormValues.locationId,
            patientEmpInfoId: (this.employer.id) ? this.employer.id : null,
            caseStatusId: caseFormValues.caseStatusId,
            // attorneyId: caseFormValues.attorneyId,
            caseSource: caseFormValues.caseSource,
            createByUserID: this._sessionStore.session.account.user.id,
            createDate: moment(),
            createdByCompanyId: this._sessionStore.session.currentCompany.id,
            caseCompanyMapping:  [{
                company: {  
                    id: caseFormValues.attorneyId
                },
                addedByCompanyId:this._sessionStore.session.currentCompany.id
            },
                {  
                  isOriginator: 'true',
                  company: {  
                    id: this._sessionStore.session.currentCompany.id
                },
                addedByCompanyId:this._sessionStore.session.currentCompany.id
                }]
        });

        this._progressBarService.show();
        result = this._casesStore.addCase(caseDetail);
        result.subscribe(
            (response) => {
                if (this.attorneyId > 0) {
                    let result1 = this._patientsStore.assignPatientToAttorney((this.patientId) ? this.patientId : parseInt(this.idPatient), response.id, this.attorneyId);
                    result1.subscribe(
                        (response) => {
                            let notification = new Notification({
                                'title': 'Case added successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()
                            });
                            this._notificationsStore.addNotification(notification);
                            this._router.navigate(['../'], { relativeTo: this._route });
                        },
                        (error) => {
                            let errString = 'Unable to add case.';
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

                let notification = new Notification({
                    'title': 'Case added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add case.';
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
}
