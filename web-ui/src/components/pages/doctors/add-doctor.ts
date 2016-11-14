import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorsService} from '../../../services/doctors-service';
import {DoctorDetail} from '../../../models/doctor-details';
import {Doctor} from '../../../models/doctor';
import {User} from '../../../models/user';
import {Contact} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'add-doctor',
    templateUrl: 'templates/pages/doctors/add-doctor.html',
    providers: [DoctorsService, StateService, StatesStore, FormBuilder]
})

export class AddDoctorComponent implements OnInit {
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
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.doctorform = this.fb.group({
            doctor: this.fb.group({
                licenseNumber: ['', Validators.required],
                wcbAuthorization: ['', Validators.required],
                wcbRatingCode: ['', Validators.required],
                npi: ['', Validators.required],
                federalTaxId: ['', Validators.required],
                taxType: ['', Validators.required],
                assignNumber: ['', Validators.required],
                title: ['', Validators.required]
            }),
            userInfo: this.fb.group({
                firstname: ['', Validators.required],
                middlename: [''],
                lastname: ['', Validators.required],
                userType: ['', Validators.required],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') }),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required]],
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

        this.doctorformControls = this.doctorform.controls;
    }

    ngOnInit() {
        this._stateService.getStates()
            .subscribe(states => this.states = states);
    }


    saveDoctor() {
        let doctorFormValues = this.doctorform.value;
        let doctorDetail = new DoctorDetail({
            doctor: new Doctor({
                licenseNumber: doctorFormValues.doctor.licenseNumber,
                wcbAuthorization: doctorFormValues.doctor.wcbAuthorization,
                wcbRatingCode: doctorFormValues.doctor.wcbRatingCode,
                npi: doctorFormValues.doctor.npi,
                federalTaxId: doctorFormValues.doctor.federalTaxId,
                taxType: doctorFormValues.doctor.taxType,
                assignNumber: doctorFormValues.doctor.assignNumber,
                title: doctorFormValues.doctor.title
            }),
            user: new User({
                userName: doctorFormValues.contact.email,
                firstName: doctorFormValues.userInfo.firstname,
                middleName: doctorFormValues.userInfo.middlename,
                lastName: doctorFormValues.userInfo.lastname,
                userType: parseInt(doctorFormValues.userInfo.userType),
                password: doctorFormValues.userInfo.password
            }),
            contactInfo: new Contact({
                cellPhone: doctorFormValues.contact.cellPhone,
                emailAddress: doctorFormValues.contact.email,
                faxNo: doctorFormValues.contact.faxNo,
                homePhone: doctorFormValues.contact.homePhone,
                workPhone: doctorFormValues.contact.workPhone,
            }),
            address: new Address({
                address1: doctorFormValues.address.address1,
                address2: doctorFormValues.address.address2,
                city: doctorFormValues.address.city,
                country: doctorFormValues.address.country,
                state: doctorFormValues.address.state,
                zipCode: doctorFormValues.address.zipCode,
            })
        });
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
                let notification = new Notification({
                    'title': 'Unable to add Doctor.',
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
