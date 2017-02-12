import { PatientAdapter } from '../services/adapters/patient-adapter';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { User } from '../../../commons/models/user';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { StatesStore } from '../../../commons/stores/states-store';

@Component({
    selector: 'demographics',
    templateUrl: './demographics.html'
})

export class DemographicsComponent implements OnInit {
    patientId: number;
    patientInfo: Patient;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    demographicsform: FormGroup;
    demographicsformControls;
    isSavePatientProgress = false;
    selectedCity = 0;
    isCitiesLoading = false;
    states: any[];
    cities: any[];
    dateOfFirstTreatment: Date;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            this.patientId = parseInt(params.patientId, 10);
            this._progressBarService.show();
            let result = this._patientsStore.getPatientById(this.patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.dateOfFirstTreatment = this.patientInfo.dateOfFirstTreatment
                        ? this.patientInfo.dateOfFirstTreatment.toDate()
                        : null;
                    if (this.patientInfo.user.address.state) {
                        this.loadCities(this.patientInfo.user.address.state);
                    }
                },
                (error) => {
                    this._router.navigate(['/patient-manager/patients']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

        });
        this.demographicsform = this.fb.group({
            userInfo: this.fb.group({
                ssn: ['', Validators.required],
                weight: [''],
                height: [''],
                dateOfFirstTreatment: ['']
            }),
            contact: this.fb.group({
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
            }),
            address: this.fb.group({
                address1: [''],
                address2: [''],
                city: [''],
                zipCode: [''],
                state: [''],
                country: ['']
            })
        });

        this.demographicsformControls = this.demographicsform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    selectState(event) {
        this.selectedCity = 0;
        let currentState = event.target.value;
        this.loadCities(currentState);
    }

    loadCities(stateName) {
        this.isCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.cities = cities; },
                null,
                () => { this.isCitiesLoading = false; });
        } else {
            this.cities = [];
            this.isCitiesLoading = false;
        }
    }

    savePatient() {
        this.isSavePatientProgress = true;
        let demographicsFormValues = this.demographicsform.value;
        let result;
        let updatedPatient = this.patientInfo.toJS();
        updatedPatient = _.extend(updatedPatient, {
            ssn: demographicsFormValues.userInfo.ssn,
            weight: parseInt(demographicsFormValues.userInfo.weight, 10),
            height: parseInt(demographicsFormValues.userInfo.height, 10),
            dateOfFirstTreatment: demographicsFormValues.userInfo.dateOfFirstTreatment ? moment(demographicsFormValues.userInfo.dateOfFirstTreatment) : null,
            updateByUserId: this._sessionStore.session.account.user.id,
            companyId: this._sessionStore.session.currentCompany.id,
            user: _.extend(updatedPatient.user, {
                id: this.patientInfo.user.id,
                updateByUserId: this._sessionStore.session.account.user.id,
                contact: _.extend(updatedPatient.user.contact, {
                    id: updatedPatient.user.contact.id,
                    cellPhone: demographicsFormValues.contact.cellPhone ? demographicsFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    faxNo: demographicsFormValues.contact.faxNo ? demographicsFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: demographicsFormValues.contact.homePhone,
                    workPhone: demographicsFormValues.contact.workPhone,
                    updateByUserId: this._sessionStore.session.account.user.id
                }),
                address: _.extend(updatedPatient.user.address, {
                    id: updatedPatient.user.address.id,
                    address1: demographicsFormValues.address.address1,
                    address2: demographicsFormValues.address.address2,
                    city: demographicsFormValues.address.city,
                    country: demographicsFormValues.address.country,
                    state: demographicsFormValues.address.state,
                    zipCode: demographicsFormValues.address.zipCode,
                    updateByUserId: this._sessionStore.session.account.user.id
                })
            })
        });
        updatedPatient.user.contactInfo = updatedPatient.user.contact;
        updatedPatient.user.addressInfo = updatedPatient.user.address;
        updatedPatient.user = _.omit(updatedPatient.user, 'contact', 'address');
        let patient: Patient = PatientAdapter.parseResponse(updatedPatient);
        this._progressBarService.show();
        result = this._patientsStore.updatePatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/patients']);
            },
            (error) => {
                let errString = 'Unable to update patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSavePatientProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSavePatientProgress = false;
                this._progressBarService.hide();
            });
    }

}
