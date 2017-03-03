import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { User } from '../../../commons/models/user';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { UserType } from '../../../commons/models/enums/user-type';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { StatesStore } from '../../../commons/stores/states-store';


@Component({
    selector: 'add-patient',
    templateUrl: './add-patient.html'
})

export class AddPatientComponent implements OnInit {
    states: any[];
    cities: any[];
    selectedCity = 0;
    minDate: Date;
    maxDate: Date;
    patientform: FormGroup;
    patientformControls;
    isCitiesLoading = false;
    isSavePatientProgress = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this.patientform = this.fb.group({
            userInfo: this.fb.group({
                ssn: ['', Validators.required],
                weight: [''],
                height: [''],
                maritalStatusId: ['', Validators.required],
                dateOfFirstTreatment: [''],
                dob: [''],
                firstname: ['', Validators.required],
                middlename: [''],
                lastname: ['', Validators.required],
                gender: ['', Validators.required]
            }),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
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
        this.patientformControls = this.patientform.controls;

    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    savePatient() {
        this.isSavePatientProgress = true;
        let patientFormValues = this.patientform.value;
        let result;
        let patient = new Patient({
            ssn: patientFormValues.userInfo.ssn,
            weight: patientFormValues.userInfo.weight,
            height: patientFormValues.userInfo.height,
            dateOfFirstTreatment: patientFormValues.userInfo.dateOfFirstTreatment ? moment(patientFormValues.userInfo.dateOfFirstTreatment) : null,
            maritalStatusId: patientFormValues.userInfo.maritalStatusId,
            createByUserId: this._sessionStore.session.account.user.id,
            companyId: this._sessionStore.session.currentCompany.id,
            user: new User({
                dateOfBirth: patientFormValues.userInfo.dob ? moment(patientFormValues.userInfo.dob) : null,
                firstName: patientFormValues.userInfo.firstname,
                middleName: patientFormValues.userInfo.middlename,
                lastName: patientFormValues.userInfo.lastname,
                userType: UserType.PATIENT,
                userName: patientFormValues.contact.email,
                createByUserId: this._sessionStore.session.account.user.id,
                gender: patientFormValues.userInfo.gender,
                contact: new Contact({
                    cellPhone: patientFormValues.contact.cellPhone ? patientFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    emailAddress: patientFormValues.contact.email,
                    faxNo: patientFormValues.contact.faxNo ? patientFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: patientFormValues.contact.homePhone,
                    workPhone: patientFormValues.contact.workPhone,
                    createByUserId: this._sessionStore.session.account.user.id
                }),
                address: new Address({
                    address1: patientFormValues.address.address1,
                    address2: patientFormValues.address.address2,
                    city: patientFormValues.address.city,
                    country: patientFormValues.address.country,
                    state: patientFormValues.address.state,
                    zipCode: patientFormValues.address.zipCode,
                    createByUserId: this._sessionStore.session.account.user.id
                })
            })
        });
        this._progressBarService.show();
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/patients']);
            },
            (error) => {
                let errString = 'Unable to add patient.';
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