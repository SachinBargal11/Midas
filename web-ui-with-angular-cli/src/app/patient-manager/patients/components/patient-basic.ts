import { Patient } from '../models/patient';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { User } from '../../../commons/models/user';

@Component({
    selector: 'basic',
    templateUrl: './patient-basic.html'
})

export class PatientBasicComponent implements OnInit {
    patientId: number;
    patientInfo: Patient;
    dateOfBirth: Date;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    basicform: FormGroup;
    basicformControls;
    isSavePatientProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore
    ) {
        this._route.parent.params.subscribe((params: any) => {
            this.patientId = parseInt(params.patientId, 10);
            this._progressBarService.show();
            let result = this._patientsStore.getPatientById(this.patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.dateOfBirth = this.patientInfo.user.dateOfBirth
                        ? this.patientInfo.user.dateOfBirth.toDate()
                        : null;
                },
                (error) => {
                    this._router.navigate(['/patient-manager/patients']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

        });
        this.basicform = this.fb.group({
            dob: [''],
            firstname: ['', Validators.required],
            middlename: [''],
            lastname: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatusId: ['', Validators.required]
        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    savePatient() {
        this.isSavePatientProgress = true;
        let basicFormValues = this.basicform.value;
        let result;
        let patient = new Patient({
            id: this.patientId,
            ssn: this.patientInfo.ssn,
            weight: this.patientInfo.weight,
            height: this.patientInfo.height,
            maritalStatusId: basicFormValues.maritalStatusId,
            updateByUserId: this._sessionStore.session.account.user.id,
            companyId: this._sessionStore.session.currentCompany.id,
            user: new User({
                id: this.patientInfo.user.id,
                dateOfBirth: basicFormValues.dob ? moment(basicFormValues.dob) : null,
                firstName: basicFormValues.firstname,
                middleName: basicFormValues.middlename,
                lastName: basicFormValues.lastname,
                updateByUserId: this._sessionStore.session.account.user.id,
                gender: basicFormValues.gender,
                contact: this.patientInfo.user.contact,
                address: this.patientInfo.user.address
            })
        });
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
