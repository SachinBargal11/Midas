import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {DoctorsStore} from '../../../stores/doctors-store';
import { DoctorsService } from '../../../services/doctors-service';
import {DoctorDetail} from '../../../models/doctor-details';
import {Doctor} from '../../../models/doctor';
import {User} from '../../../models/user';
import {DoctorSpeciality} from '../../../models/doctor-speciality';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import { UsersStore } from '../../../stores/users-store';
import {SpecialityStore} from '../../../stores/speciality-store';
import {Speciality} from '../../../models/speciality';

@Component({
    selector: 'doctor-speciality',
    templateUrl: 'templates/pages/doctors/doctor-speciality.html',
    providers: [FormBuilder]
})

export class DoctorSpecialityComponent implements OnInit {
    specialities: Speciality[];
    doctor = new Doctor({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    doctorspecialityform: FormGroup;
    doctorspecialityformControls;
    isSaveDoctorProgress = false;

    constructor(
        private _doctorsStore: DoctorsStore,
        private _doctorsService: DoctorsService,
        private fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _usersStore: UsersStore,
        private _specialityStore: SpecialityStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let doctorId: number = parseInt(routeParams.id);
            let result = this._doctorsStore.fetchDoctorById(doctorId);
            result.subscribe(
                (doctorDetail: Doctor) => {
                    this.doctor = doctorDetail;
                },
                (error) => {
                    this._router.navigate(['/doctors']);
                },
                () => {
                });
        });
        this.doctorspecialityform = this.fb.group({
                speciality: ['', [Validators.required, AppValidators.selectedValueValidator]]
        });

        this.doctorspecialityformControls = this.doctorspecialityform.controls;
    }

    ngOnInit() {
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; });
    }


    saveDoctorSpeciality() {
        let doctorspecialityformValues = this.doctorspecialityform.value;
        let doctorSpeciality = new DoctorSpeciality({
            doctor: {
	        	id: this.doctor.id
	        },
	        specialties: [
	        	doctorspecialityformValues.speciality	
            ]
        });
        this.isSaveDoctorProgress = true;
        let result;

        result = this._doctorsService.addDoctorSpeciality(doctorSpeciality);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Doctor Speciality added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/doctors']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add Doctor Speciality.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveDoctorProgress = false;
            });

    }

}
