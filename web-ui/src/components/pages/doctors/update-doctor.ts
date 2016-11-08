import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {UsersStore} from '../../../stores/users-store';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorsService} from '../../../services/doctors-service';
import {DoctorDetail} from '../../../models/doctor-details';
import {Doctor} from '../../../models/doctor';
import {User} from '../../../models/user';
import {ContactInfo} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'update-doctor',
    templateUrl: 'templates/pages/doctors/update-doctor.html',
    providers: [DoctorsService, StateService, StatesStore, FormBuilder]
})

export class UpdateDoctorComponent implements OnInit {
    states: any[];
    doctor = new Doctor({});
    doctorUser = new User({});
    address = new Address({});
    contactInfo = new ContactInfo({});
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
        private _usersStore: UsersStore,
        private fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let doctorId: number = parseInt(routeParams.id);
            let result = this._doctorsStore.fetchDoctorById(doctorId);
            result.subscribe(
                (doctorDetail: DoctorDetail) => {
                    this.doctor = doctorDetail.doctor;
                    this.doctorUser = doctorDetail.doctor.doctorUser;
                    this.address = doctorDetail.address;
                    this.contactInfo = doctorDetail.contactInfo;
                },
                (error) => {
                    this._router.navigate(['/doctors']);
                },
                () => {
                });
        });
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
                firstName: ['', Validators.required],
                middleName: [''],
                lastName: ['', Validators.required],
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


    updateDoctor() {
        let doctorFormValues = this.doctorform.value;
        let doctorDetail = new DoctorDetail({
            doctor: new Doctor({
                id: this.doctor.id,
                licenseNumber: doctorFormValues.doctor.licenseNumber,
                wcbAuthorization: doctorFormValues.doctor.wcbAuthorization,
                wcbRatingCode: doctorFormValues.doctor.wcbRatingCode,
                npi: doctorFormValues.doctor.npi,
                federalTaxId: doctorFormValues.doctor.federalTaxId,
                taxType: doctorFormValues.doctor.taxType,
                assignNumber: doctorFormValues.doctor.assignNumber,
                title: doctorFormValues.doctor.title,
            }),
            user: new User({
                userName: doctorFormValues.contact.email,
                firstName: doctorFormValues.userInfo.firstName,
                middleName: doctorFormValues.userInfo.middleName,
                lastName: doctorFormValues.userInfo.lastName,
                userType: parseInt(doctorFormValues.userInfo.userType),
                password: doctorFormValues.userInfo.password
            }),
            contactInfo: new ContactInfo({
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

        result = this._doctorsStore.updateDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Doctor updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/doctors']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update Doctor.',
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
