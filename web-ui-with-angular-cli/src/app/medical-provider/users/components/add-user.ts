import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { UsersStore } from '../stores/users-store';
import { DoctorsStore } from '../stores/doctors-store';
import { User } from '../../../commons/models/user';
import { Doctor } from '../models/doctor';
import { UsersService } from '../services/users-service';
// import { Account } from '../../../models/account';
// import { Company } from '../../../models/company';
// import { UserRole } from '../../../commons/models/user-role';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as $ from 'jquery';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { UserType } from '../../../commons/models/enums/user-type';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.html'
})

export class AddUserComponent implements OnInit {
    states: any[];
    cities: any[];
    selectedRole: any[] = ['1'];
    selectedCity = 0;
    specialitiesArr: SelectItem[] = [];
    // selectedSpeciality: SelectItem[] = [];
    selectedSpeciality: any[];
    userform: FormGroup;
    userformControls;
    isSaveUserProgress = false;
    isCitiesLoading = false;
    doctorRole = false;
    doctorFlag: boolean = false;

    constructor(
        private _statesStore: StatesStore,
        private _userService: UsersService,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _doctorsStore: DoctorsStore,
        private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._progressBarService.show();
        this._specialityStore.getSpecialities()
            .subscribe((specialties) => {
                let specialities: Speciality[] = specialties;
                this.selectedSpeciality = ['2'];
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


        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                role: ['', [Validators.required]]
            }),
            doctor: this.fb.group(this.initDoctorModel()),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
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

        this.userformControls = this.userform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    onSelectedRoleChange(roleValues: any) {
        const doctorCtrl = this.userformControls.doctor;
        if (_.contains(roleValues, '3')) {
            Object.keys(doctorCtrl.controls).forEach(key => {
                doctorCtrl.controls[key].setValidators(this.initDoctorModel()[key][1]);
                doctorCtrl.controls[key].updateValueAndValidity();
            });
            this.doctorFlag = true;
        } else {
            Object.keys(doctorCtrl.controls).forEach(key => {
                doctorCtrl.controls[key].setValidators(null);
                doctorCtrl.controls[key].updateValueAndValidity();
            });
            this.doctorFlag = false;
        }
    }
    initDoctorModel() {
        const model = {
            licenseNumber: ['', Validators.required],
            wcbAuthorization: ['', Validators.required],
            wcbRatingCode: ['', Validators.required],
            npi: ['', Validators.required],
            taxType: ['', [Validators.required, AppValidators.selectedValueValidator]],
            title: ['', Validators.required],
            speciality: ['2', Validators.required]
        };
        return model;
    }


    saveUser() {
        let result;
        let userFormValues = this.userform.value;
        let doctorSpecialities = [];
        let selectedSpeciality = userFormValues.doctor.speciality;
        selectedSpeciality.forEach(element => {
            doctorSpecialities.push({ 'id': parseInt(element) });
        });

        let roles = [];
        let input = this.selectedRole;
        for (let i = 0; i < input.length; ++i) {
            roles.push({ 'roleType': parseInt(input[i]) });
        }
        this.selectedRole.forEach(element => {
            if (element === '3') {
                this.doctorRole = true;
            }
        });
        if (!this.doctorRole) {
            let userDetail = new User({
                firstName: userFormValues.userInfo.firstname,
                lastName: userFormValues.userInfo.lastname,
                userType: UserType.STAFF,
                roles: roles,
                userName: userFormValues.contact.email,
                contact: new Contact({
                    cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    emailAddress: userFormValues.contact.email,
                    faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: userFormValues.contact.homePhone,
                    workPhone: userFormValues.contact.workPhone,
                }),
                address: new Address({
                    address1: userFormValues.address.address1,
                    address2: userFormValues.address.address2,
                    city: userFormValues.address.city,
                    country: userFormValues.address.country,
                    state: userFormValues.address.state,
                    zipCode: userFormValues.address.zipCode,
                })
            });
            result = this._usersStore.addUser(userDetail);
        }
        else {
            let doctorDetail = new Doctor({
                licenseNumber: userFormValues.doctor.licenseNumber,
                wcbAuthorization: userFormValues.doctor.wcbAuthorization,
                wcbRatingCode: userFormValues.doctor.wcbRatingCode,
                npi: userFormValues.doctor.npi,
                taxType: userFormValues.doctor.taxType,
                // title: 'Dr',
                title: userFormValues.doctor.title,
                doctorSpecialities: doctorSpecialities,

                user: new User({
                    firstName: userFormValues.userInfo.firstname,
                    lastName: userFormValues.userInfo.lastname,
                    userType: UserType.STAFF,
                    roles: roles,
                    userName: userFormValues.contact.email,
                    contact: new Contact({
                        cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                        emailAddress: userFormValues.contact.email,
                        faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                        homePhone: userFormValues.contact.homePhone,
                        workPhone: userFormValues.contact.workPhone,
                    }),
                    address: new Address({
                        address1: userFormValues.address.address1,
                        address2: userFormValues.address.address2,
                        city: userFormValues.address.city,
                        country: userFormValues.address.country,
                        state: userFormValues.address.state,
                        zipCode: userFormValues.address.zipCode,
                    })
                })
            });
            result = this._doctorsStore.addDoctor(doctorDetail);
        }
        this._progressBarService.show();
        this.isSaveUserProgress = true;

        // result = this._usersStore.addUser(userDetail);
        // result = this._doctorsStore.addDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/users']);
            },
            (error) => {
                let errString = 'Unable to add User.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveUserProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveUserProgress = false;
                this._progressBarService.hide();
            });

    }

}
