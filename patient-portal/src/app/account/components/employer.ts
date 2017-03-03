import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { Employer } from '../models/employer';
import { Patient } from '../models/patient';
import { Contact } from '../../commons/models/contact';
import { Address } from '../../commons/models/address';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { Notification } from '../../commons/models/notification';
import * as moment from 'moment';
import { AppValidators } from '../../commons/utils/AppValidators';
import { StatesStore } from '../../commons/stores/states-store';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { EmployerStore } from '../stores/employer-store';
import { PatientsStore } from '../stores/patients-store';
import * as _ from 'underscore';
import { PhoneFormatPipe } from '../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../commons/pipes/faxno-format-pipe';

@Component({
    selector: 'employer',
    templateUrl: './employer.html'
})

export class PatientEmployerComponent implements OnInit {
    title: string;
    cellPhone: string;
    faxNo: string;
    states: any[];
    cities: any[];
    patientId: number;
    employer: Employer[];
    currentEmployer: Employer;
    selectedCity = '';
    isCitiesLoading = false;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    employerform: FormGroup;
    employerformControls;
    isSaveProgress = false;
    isSaveEmployerProgress = false;


    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _employerStore: EmployerStore,
        private _patientsStore: PatientsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe

    ) {
            this.patientId = this._sessionStore.session.user.id;
            this._progressBarService.show();
            let result = this._employerStore.getEmployers(this.patientId);
            result.subscribe(
                (employer: Employer[]) => {
                    this.employer = employer;
                    this.currentEmployer = _.find(this.employer, (employer) => {
                        return employer.isCurrentEmp;
                    });
                    this.title = this.currentEmployer ? 'Edit Employer' : 'Add Employer';
                    if (this.currentEmployer) {
                        this.cellPhone = this._phoneFormatPipe.transform(this.currentEmployer.contact.cellPhone);
                        this.faxNo = this._faxNoFormatPipe.transform(this.currentEmployer.contact.faxNo);
                    } else {
                        this.currentEmployer = new Employer({
                            address: new Address({}),
                            contact: new Contact({})
                        });

                    }

                },
                (error) => {
                    this._router.navigate(['/dashboard']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        this.employerform = this.fb.group({
            jobTitle: ['', Validators.required],
            employerName: ['', Validators.required],
            isCurrentEmployer: ['', Validators.required],
            address: [''],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: ['']
        });

        this.employerformControls = this.employerform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }


    save() {

        this.isSaveEmployerProgress = true;
        let employerformValues = this.employerform.value;
        let result;
        let addResult;
        let employer = new Employer({
            patientId: this.patientId,
            jobTitle: employerformValues.jobTitle,
            empName: employerformValues.employerName,
            isCurrentEmp: parseInt(employerformValues.isCurrentEmployer),
            contact: new Contact({
                cellPhone: employerformValues.cellPhone ? employerformValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: employerformValues.email,
                faxNo: employerformValues.faxNo ? employerformValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: employerformValues.homePhone,
                workPhone: employerformValues.workPhone

            }),
            address: new Address({
                address1: employerformValues.address,
                address2: employerformValues.address2,
                city: employerformValues.city,
                country: employerformValues.country,
                state: employerformValues.state,
                zipCode: employerformValues.zipcode

            })
        });
        this._progressBarService.show();

        if (this.currentEmployer.id) {
            result = this._employerStore.updateEmployer(employer, this.currentEmployer.id);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Employer updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/dashboard']);
                },
                (error) => {
                    let errString = 'Unable to update employer.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveEmployerProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveEmployerProgress = false;
                    this._progressBarService.hide();
                });
        } else {
            addResult = this._employerStore.addEmployer(employer);

            addResult.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Employer added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/dashboard']);
                },
                (error) => {
                    let errString = 'Unable to add employer.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveEmployerProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveEmployerProgress = false;
                    this._progressBarService.hide();
                });
        }

    }


}
