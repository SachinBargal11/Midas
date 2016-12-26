import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../../utils/AppValidators';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { DoctorsStore } from '../../../stores/doctors-store';
import { SpecialityStore } from '../../../stores/speciality-store';
import { Doctor } from '../../../models/doctor';
import { User } from '../../../models/user';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { Speciality } from '../../../models/speciality';

@Component({
    selector: 'access',
    templateUrl: 'templates/pages/users/doctor-specific-information.html',
    providers: [FormBuilder],
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
    userId:number;
    specialities: Speciality[];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorsStore: DoctorsStore,
        private _specialityStore: SpecialityStore,
        private _route: ActivatedRoute
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
            let result = this._doctorsStore.fetchDoctorById(this.userId);
            result.subscribe(
                (doctorDetail: Doctor) => {
                    this.doctor = doctorDetail;
                    this.user = doctorDetail.user;
                },
                (error) => {
                    this._router.navigate(['../../']);
                },
                () => {
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
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; });
    }

    updateDoctor() {
        let doctorFormValues = this.doctorform.value;
           var doctorSpecialities = [];
           let input = doctorFormValues.speciality;
           for (var i=0; i < input.length ; ++i) {
               doctorSpecialities.push({'id':parseInt(input[i])});
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
                let notification = new Notification({
                    'title': 'Unable to update Doctor.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveDoctorProgress = false;
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveDoctorProgress = false;
            });

    }

}
