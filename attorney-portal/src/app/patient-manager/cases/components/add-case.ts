import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
// import { Employer } from '../../patients/models/employer';
// import { EmployerStore } from '../../patients/stores/employer-store';
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
import { MedicalProviderMasterStore } from '../../../account-setup/stores/medical-provider-master-store';
import { Account } from '../../../account/models/account';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'underscore';
import { MedicalProviderMaster } from '../../../account-setup/models/medical-provider-master';

@Component({
    selector: 'add-case',
    templateUrl: './add-case.html'
})

export class AddCaseComponent implements OnInit {
    medicare = '0';
    medicaid = '0';
    ssdisabililtyIncome = '0';
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    attorneys: Attorney[];
    //employer: Employer;
    isSaveProgress = false;
    patientId: number;
    idPatient: any = '';
    patient: Patient;
    patientName: string;
    patients: Patient[];
    // patientsWithoutCase: Patient[];
    patientsWithoutCase: SelectItem[] = [];
    allProviders: MedicalProviderMaster[];
    currentProviderId: number = 0;
    providerId: number = 0;
    searchDialogVisible: boolean = false;
    selectedMP;

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
        //  private _employerStore: EmployerStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
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

                // this._employerStore.getCurrentEmployer(this.patientId)
                //     .subscribe(employer => this.employer = employer);
            }
        });



        this.caseform = this.fb.group({
            patientId: ['', Validators.required],
            caseTypeId: ['', Validators.required],
            carrierCaseNo: [''],
            caseStatusId: ['1', Validators.required],
            providerId: [''],
            caseSource: [''],
            claimNumber: [''],
            medicare: [''],
            medicaid: [''],
            ssdisabililtyIncome: ['']

        });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
        this._medicalProviderMasterStore.getAllPreferredMedicalProviders()
            .subscribe((allProviders: MedicalProviderMaster[]) => {
                 let defaultLabel: any[] = [{
                    label: '-Select Provider-',
                    value: ''
                }]
                let allProvider = _.map(allProviders, (currentProvider: MedicalProviderMaster) => {
                    return {
                        label: `${currentProvider.prefferedProvider.name}`,
                        value: currentProvider.prefferedProvider.id
                    };
                })
                this.allProviders = _.union(defaultLabel, allProvider);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });



        // this.loadPatients();
        this.loadPatientsWithoutCase();
    }

    providerChange(event) {
        this.providerId = parseInt(event.value);
        // if (this.providerId > 0) {
        //     this.caseform.get("caseSource").disable();
        // }
        // else {
        //     this.caseform.get("caseSource").enable();
        // }
    }

    casesourceChange(event) {
        let CaseSource: string = event.target.value;
        // if (CaseSource != "") {
        //     this.caseform.get("providerId").disable();
        // }
        // else {
        //     this.caseform.get("providerId").enable();
        // }
    }

    showDialog() {
        this.searchDialogVisible = true;
    }
    
    closeDialog(event) {
        this.searchDialogVisible = false;
        let mp = event;
        this.selectedMP = mp.id;
    }


    selectPatient(event) {
        let currentPatient: number = parseInt(event.value);
        let idPatient = parseInt(event.value);
        if (event.value != '') {
            //let result = this._employerStore.getCurrentEmployer(currentPatient);
            //result.subscribe((employer) => { this.employer = employer; }, null);
        }
    }

    loadPatientsWithoutCase() {
        this._progressBarService.show();
        this._patientsStore.getPatients()
            .subscribe(patients => {
                let defaultLabel: any[] = [{
                    label: '-Select Patient-',
                    value: ''
                }]
                let patientsWithoutCase = _.map(patients, (currPatient: Patient) => {
                    return {
                        label: `${currPatient.user.firstName}  ${currPatient.user.lastName}`,
                        value: currPatient.id
                    };
                })
                this.patientsWithoutCase = _.union(defaultLabel, patientsWithoutCase);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    handleSearchDialogHide() {}

    saveCase() {
        this.isSaveProgress = true;
        let caseFormValues = this.caseform.value;
        let result;
          let caseCompanyMapping: any[] = [];
        if (caseFormValues.providerId) {
            caseCompanyMapping = [{
                company: {
                    id: caseFormValues.providerId
                },
                addedByCompanyId: this._sessionStore.session.currentCompany.id
            },
            {
                isOriginator: 'true',
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                addedByCompanyId: this._sessionStore.session.currentCompany.id
            }]
        } else {
            caseCompanyMapping = [{
                isOriginator: 'true',
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                addedByCompanyId: this._sessionStore.session.currentCompany.id
            }]
        }
        let caseDetail: Case = new Case({
            patientId: (this.patientId) ? this.patientId : parseInt(this.idPatient),
            caseName: 'caseName',
            caseTypeId: caseFormValues.caseTypeId,
            carrierCaseNo: caseFormValues.carrierCaseNo,
            caseStatusId: caseFormValues.caseStatusId,
            caseSource: caseFormValues.caseSource,
            claimFileNumber: caseFormValues.claimNumber,
            medicare: caseFormValues.medicare == '1'? true : false,
            medicaid: caseFormValues.medicaid == '1'? true : false,
            ssdisabililtyIncome: caseFormValues.ssdisabililtyIncome == '1'? true : false,
            createByUserID: this._sessionStore.session.account.user.id,
            createDate: moment(),
            createdByCompanyId: this._sessionStore.session.currentCompany.id,
            caseCompanyMapping: caseCompanyMapping
          
        });

        this._progressBarService.show();
        result = this._casesStore.addCase(caseDetail);
        result.subscribe(
            (response) => {
                if (this.providerId >= 0) {

                    let result1 = this._patientsStore.assignPatientToMedicalProvider((this.patientId) ? this.patientId : parseInt(this.idPatient), response.id, this.providerId);
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