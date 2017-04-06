import { DoctorSpeciality } from '../models/doctor-speciality';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { DoctorsStore } from '../stores/doctors-store';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Doctor } from '../models/doctor';
import { User } from '../../../commons/models/user';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Speciality } from '../../../account-setup/models/speciality';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'access',
    templateUrl: './doctor-specific-information.html'
})

export class DoctorSpecificInformationComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    doctorform: FormGroup;
    doctorformControls: any;
    isSaveDoctorProgress = false;
    doctor = new Doctor({});
    user = new User({});
    userId: number;
    specialities: Speciality[] = [];
    specialitiesArr: SelectItem[] = [];
    selectedSpecialities: string[] = [];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorsStore: DoctorsStore,
        private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _route: ActivatedRoute
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
            this._progressBarService.show();

            let fetchDoctorDetails = this._doctorsStore.fetchDoctorById(this.userId);
            let fetchSpecialities = this._specialityStore.getSpecialities();

            Observable.forkJoin([fetchSpecialities, fetchDoctorDetails])
                .subscribe((results) => {
                    let specialities: Speciality[] = results[0];
                    let doctorDetail: Doctor = results[1];

                    this.doctor = doctorDetail;
                    this.selectedSpecialities = _.map(doctorDetail.doctorSpecialities, (currentDoctorSpeciality: DoctorSpeciality) => {
                        return currentDoctorSpeciality.id.toString();
                    });

                    this.specialitiesArr = _.map(specialities, (currentSpeciality: Speciality) => {
                        return {
                            label: `${currentSpeciality.specialityCode} - ${currentSpeciality.name}`,
                            value: currentSpeciality.id.toString()
                        };
                    });

                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.doctorform = this.fb.group({
            licenseNumber: ['', Validators.required],
            wcbAuthorization: ['', Validators.required],
            wcbRatingCode: ['', Validators.required],
            npi: ['', Validators.required],
            taxType: ['', [Validators.required, AppValidators.selectedValueValidator]],
            title: ['', Validators.required],
            speciality: ['']
        });

        this.doctorformControls = this.doctorform.controls;
    }

    ngOnInit() {
    }

    updateDoctor() {
        let doctorFormValues = this.doctorform.value;
        let doctorSpecialities = [];
        let input = doctorFormValues.speciality;
        for (let i = 0; i < input.length; ++i) {
            doctorSpecialities.push({ 'id': parseInt(input[i]) });
        }
        let doctorDetail = new Doctor({
            id: this.doctor.id,
            licenseNumber: doctorFormValues.licenseNumber,
            wcbAuthorization: doctorFormValues.wcbAuthorization,
            wcbRatingCode: doctorFormValues.wcbRatingCode,
            npi: doctorFormValues.npi,
            taxType: doctorFormValues.taxType,
            title: doctorFormValues.title,
            doctorSpecialities: doctorSpecialities,
            user: new User({
                id: this.userId
            })
        });
        this._progressBarService.show();
        this.isSaveDoctorProgress = true;
        let result;

        result = this._doctorsStore.updateDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Doctor updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/users']);
            },
            (error) => {
                let errString = 'Unable to update Doctor.';
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
