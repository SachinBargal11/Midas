import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorsService} from '../../../services/doctors-service';
import {DoctorDetail} from '../../../models/doctor-details';
import {Doctor} from '../../../models/doctor';
import {User} from '../../../models/user';
import {Contact} from '../../../models/contact';
import {Address} from '../../../models/address';
import $ from 'jquery';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {Calendar, InputMask, AutoComplete, SelectItem} from 'primeng/primeng';
import {Gender} from '../../../models/enums/Gender';
import {UserType} from '../../../models/enums/UserType';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';
import {HTTP_PROVIDERS}    from '@angular/http';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'update-doctor',
    templateUrl: 'templates/pages/doctors/update-doctor.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, InputMask, AutoComplete],
    providers: [HTTP_PROVIDERS, DoctorsService, StateService, StatesStore, FormBuilder],
    pipes: [LimitPipe]
})

export class UpdateDoctorComponent implements OnInit {
    states: any[];
    doctor = DoctorDetail.prototype.doctor;
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
                    this._doctorsStore.selectDoctor(doctorDetail);
                   this.doctor = doctorDetail.doctor;                    
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
                firstName: doctorFormValues.userInfo.firstname,
                middleName: doctorFormValues.userInfo.middlename,
                lastName: doctorFormValues.userInfo.lastname,
                userType: parseInt(doctorFormValues.userInfo.userType), 
                password: doctorFormValues.userInfo.password               
            })
            // contactInfo: new Contact({
            //     cellPhone: doctorFormValues.contact.cellPhone,
            //     emailAddress: doctorFormValues.contact.email,
            //     faxNo: doctorFormValues.contact.faxNo,
            //     homePhone: doctorFormValues.contact.homePhone,
            //     workPhone: doctorFormValues.contact.workPhone,
            // }),
            // address: new Address({
            //     address1: doctorFormValues.address.address1,
            //     address2: doctorFormValues.address.address2,
            //     city: doctorFormValues.address.city,
            //     country: doctorFormValues.address.country,
            //     state: doctorFormValues.address.state,
            //     zipCode: doctorFormValues.address.zipCode,
            // })
        });
        this.isSaveDoctorProgress = true;
        var result;

        result = this._doctorsStore.updateDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                var notification = new Notification({
                    'title': 'Doctor updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/doctors']);
            },
            (error) => {
                var notification = new Notification({
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
