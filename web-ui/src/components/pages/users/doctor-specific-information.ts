import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
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
import _ from 'underscore';
import { SelectItem } from 'primeng/primeng';

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
    userId: number;
    // specialities: SelectItem[];
    specialities: Speciality[] = [];
    specialitiesArr: SelectItem[];
    selectedSpecialities: string[] = ['1', '2'];

    cities: SelectItem[];
    selectedCity: number[] = [1, 2, 3];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorsStore: DoctorsStore,
        private _specialityStore: SpecialityStore,
        private _route: ActivatedRoute
    ) {
        this.specialitiesArr = [];
        this.cities = [];
        this.cities.push({ label: 'New York', value: 1 });
        this.cities.push({ label: 'Rome', value: 2 });
        this.cities.push({ label: 'London', value: 3 });
        this.cities.push({ label: 'Istanbul', value: 4 });
        this.cities.push({ label: 'Paris', value: 5 });

        this._route.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);

            let fetchDoctorDetails = this._doctorsStore.fetchDoctorById(this.userId);
            let fetchSpecialities = this._specialityStore.getSpecialities();

            Observable.forkJoin([fetchSpecialities, fetchDoctorDetails])
                .subscribe((results) => {
                    let specialities: Speciality[] = results[0];
                    let doctorDetail: Doctor = results[1];

                    this.doctor = doctorDetail;
                    this.selectedSpecialities = _.map(doctorDetail.doctorSpecialities, (currentDoctorSpeciality: Speciality) => {
                        return currentDoctorSpeciality.id.toString();
                    });

                    this.specialities = specialities;
                    this.specialitiesArr = _.map(specialities, (currentSpeciality: Speciality) => {
                        return {
                            label: `${currentSpeciality.specialityCode} - ${currentSpeciality.name}`,
                            value: currentSpeciality.id.toString()
                        };
                    });
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
            speciality: [''],
            speciality1: ['']
        });

        this.doctorformControls = this.doctorform.controls;
    }

    ngOnInit() {
    }

    updateDoctor() {
        debugger;
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
                    'title': ErrorMessageFormatter.getErrorMessages(error, errString),
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
