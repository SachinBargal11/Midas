import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { DoctorsStore } from '../../../stores/doctors-store';
import { DoctorsService } from '../../../services/doctors-service';
import { Doctor } from '../../../models/doctor';
import { User } from '../../../models/user';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { StatesStore } from '../../../stores/states-store';
import { StateService } from '../../../services/state-service';
import { UsersStore } from '../../../stores/users-store';
import { ProgressBarService } from '../../../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-doctor',
    templateUrl: 'templates/pages/doctors/add-doctor.html'
})

export class AddDoctorComponent implements OnInit {
    user = new User({});
    userJS;
    users: any[];
    states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    doctorform: FormGroup;
    doctorformControls;
    isSaveDoctorProgress = false;

    constructor(
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _doctorsService: DoctorsService,
        private _doctorsStore: DoctorsStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _progressBarService: ProgressBarService,
        private _usersStore: UsersStore
    ) {
        this.userJS = this.user.toJS();
        this.doctorform = this.fb.group({
            doctor: this.fb.group({
                licenseNumber: ['', Validators.required],
                wcbAuthorization: ['', Validators.required],
                wcbRatingCode: ['', Validators.required],
                npi: ['', Validators.required],
                taxType: ['', Validators.required],
                title: ['', Validators.required],
                user: ['', Validators.required]
            })
        });

        this.doctorformControls = this.doctorform.controls;
    }

    ngOnInit() {
        this._usersStore.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }


    saveDoctor() {
        let doctorFormValues = this.doctorform.value;
        let doctorDetail = new Doctor({
            licenseNumber: doctorFormValues.doctor.licenseNumber,
            wcbAuthorization: doctorFormValues.doctor.wcbAuthorization,
            wcbRatingCode: doctorFormValues.doctor.wcbRatingCode,
            npi: doctorFormValues.doctor.npi,
            taxType: doctorFormValues.doctor.taxType,
            title: doctorFormValues.doctor.title,
            user: new User({
                id: doctorFormValues.doctor.user
            })
        });
        this._progressBarService.show();
        this.isSaveDoctorProgress = true;
        let result;

        result = this._doctorsStore.addDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Doctor added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/doctors']);
            },
            (error) => {
                let errString = 'Unable to add Doctor.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveDoctorProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveDoctorProgress = false;
                this._progressBarService.hide();
            });

    }

}
