import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { UsersStore } from '../stores/users-store';
import { DoctorsStore } from '../stores/doctors-store';
import { Doctor } from '../models/doctor';
import { User } from '../../../commons/models/user';
import { UsersService } from '../services/users-service';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { StatesStore } from '../../../commons/stores/states-store';
import { StateService } from '../../../commons/services/state-service';
import { UserType } from '../../../commons/models/enums/user-type';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { error } from 'selenium-webdriver';

@Component({
    selector: 'basic',
    templateUrl: './user-basic.html'
})

export class UserBasicComponent implements OnInit {
    userId: number;
    userRoleFlag: number;
    doctorFlag: boolean = false;
    cellPhone: string;
    selectedRole: any[] = [];
    isCalendarPublic: boolean = false;
    faxNo: string;
    userType: any;
    states: any[];
    cities: any[];
    selectedCity;
    specialitiesArr: SelectItem[] = [];
    testSpecialitiesArr: SelectItem[] = [];
    selectedSpecialities: any[] = [];
    selectedTestSpecialities: any[] = [];
    selectedDoctorSpecialities: SelectItem[] = [];
    selectedDoctorTestSpecialities: SelectItem[] = [];
    user: User;
    doctor: Doctor;
    doctorDetail: Doctor;
    doctorRole = false;
    address = new Address({});
    contact = new Contact({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    userform: FormGroup;
    userformControls;
    isSaveUserProgress = false;
    isCitiesLoading = false;

    constructor(
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _userService: UsersService,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _doctorsStore: DoctorsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _specialityStore: SpecialityStore,
        private _elRef: ElementRef,
        private _roomsStore: RoomsStore
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
            this.userRoleFlag = parseInt(routeParams.userRoleFlag);
        });
        this._specialityStore.getSpecialities()
            .subscribe((specialties) => {
                let specialities: Speciality[] = specialties;
                this.specialitiesArr = _.map(specialities, (currentSpeciality: Speciality) => {
                    return {
                        label: `${currentSpeciality.specialityCode} - ${currentSpeciality.name}`,
                        value: currentSpeciality.id.toString()
                    };
                });
            },
            (error) => {
                this._router.navigate(['../../']);
            });
           
            this._roomsStore.getTests()
            .subscribe((testSpecialties) => {
                let testSpecialities: Tests[] = testSpecialties;
                this.testSpecialitiesArr = _.map(testSpecialities, (currentTestSpeciality: Tests) => {
                    return {
                        label: `${currentTestSpeciality.name}`,
                        value: currentTestSpeciality.id.toString()
                    };
                });
            },
            (error) => {
                this._router.navigate(['../../']);
            });
        // this._route.params.subscribe((routeParams: any) => {
        //     let userRoleFlag: number = parseInt(routeParams.userRoleFlag);
        if (this.userRoleFlag === 2) {
            this._progressBarService.show();
            this._doctorsStore.fetchDoctorByIdandCompnayID(this.userId,this._sessionStore.session.currentCompany.id)
                .subscribe(
                (doctorDetail: Doctor) => {
                    this.doctorDetail = doctorDetail;
                    this.doctor = doctorDetail;
                    this.isCalendarPublic = doctorDetail.isCalendarPublic;
                    this.user = doctorDetail.user;
                    this.cellPhone = this._phoneFormatPipe.transform(this.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.user.contact.faxNo);
                    this.selectedRole = _.map(this.user.roles, (currentRole: any) => {
                    return currentRole.roleType.toString();
                  });
                   
                    this.selectedDoctorSpecialities = _.map(doctorDetail.doctorSpecialities, (currentDoctorSpeciality: any) => {
                        return currentDoctorSpeciality.speciality.id.toString();
                    });
                    
                    this.selectedDoctorTestSpecialities = _.map(doctorDetail.doctorRoomTestMappings, (currentDoctorTestSpeciality: any) => {
                       
                        return currentDoctorTestSpeciality.testSpeciality.id.toString();
                    });
                    this.selectedSpecialities = _.map(doctorDetail.doctorSpecialities, (currentDoctorSpeciality: any) => {
                        return currentDoctorSpeciality.speciality.id.toString();
                    });
                   
                    this.selectedTestSpecialities = _.map(doctorDetail.doctorRoomTestMappings, (currentDoctorTestSpeciality: any) => {
                        return currentDoctorTestSpeciality.testSpeciality.id.toString();
                    });
                    if (!this.user.address || !this.user.contact) {
                        this.user = new User({
                            address: new Address({}),
                            contact: new Contact({})
                        });
                    }
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        } else if (this.userRoleFlag === 1) {
            this._progressBarService.show();
            let result = this._usersStore.fetchUserByIdAndCompnayID(this.userId,this._sessionStore.session.currentCompany.id);
            result.subscribe(
                (userDetail: User) => {
                    this.selectedSpecialities = ['2'];
                    //this.selectedTestSpecialities =[''];
                    this.user = userDetail;
                    this.cellPhone = this._phoneFormatPipe.transform(this.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.user.contact.faxNo);
                    this.userType = UserType[userDetail.userType];
                    this.selectedRole = _.map(this.user.roles, (currentRole: any) => {
                        return currentRole.roleType.toString();
                    });
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        }
        // });
        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                role: ['', Validators.required],
                gender: ['', [Validators.required]]
            }),
            doctor: this.fb.group(this.initDoctorModel()),
            contact: this.fb.group({
                emailAddress: [{ value: '', disabled: true }, [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: [''],
                alternateEmail: ['', [AppValidators.emailValidator]],
                officeExtension: [''],
                preferredCommunication: [''],
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
            // .subscribe(states => this.states = states);
            .subscribe(states =>
            // this.states = states);
            {
                let defaultLabel: any[] = [{
                    label: '-Select State-',
                    value: ''
                }]
                let allStates = _.map(states, (currentState: any) => {
                    return {
                        label: `${currentState.statetext}`,
                        value: currentState.statetext
                    };
                })
                this.states = _.union(defaultLabel, allStates);
            },
            (error) => {
            },
            () => {

            });
    }

    onSelectedRoleChange(roleValues: any) {
        const doctorCtrl = this.userformControls.doctor;
        if (_.contains(roleValues, '3')) {
            if (this.doctorDetail) {
                this.doctor = this.doctorDetail;
            } else {
               this._doctorsStore.fetchDoctorById(this.userId)
               .subscribe(
                (doctorDetail1: Doctor) => {

                    this.doctorDetail = doctorDetail1;
                    this.doctor = doctorDetail1;
                    this.isCalendarPublic = doctorDetail1.isCalendarPublic;
                    this.user = doctorDetail1.user;
                    this.cellPhone = this._phoneFormatPipe.transform(this.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.user.contact.faxNo);
                    this.selectedRole = _.map(this.user.roles, (currentRole: any) => {
                    return currentRole.roleType.toString();
                    });

                    this.selectedDoctorSpecialities = _.map(doctorDetail1.doctorSpecialities, (currentDoctorSpeciality: any) => {
                        return currentDoctorSpeciality.speciality.id.toString();
                    });
                    
                    this.selectedDoctorTestSpecialities = _.map(doctorDetail1.doctorRoomTestMappings, (currentDoctorTestSpeciality: any) => {
                       
                        return currentDoctorTestSpeciality.testSpeciality.id.toString();
                    });
                    this.selectedSpecialities = _.map(doctorDetail1.doctorSpecialities, (currentDoctorSpeciality: any) => {
                        return currentDoctorSpeciality.speciality.id.toString();
                    });
                   
                    this.selectedTestSpecialities = _.map(doctorDetail1.doctorRoomTestMappings, (currentDoctorTestSpeciality: any) => {
                        return currentDoctorTestSpeciality.testSpeciality.id.toString();
                    });
                },
                (error)=>{
                    this.doctor = new Doctor({ speciality: '2'});
               },
               ()=>{
                   this.doctor = new Doctor({ speciality: '2'});
                });
               // this.doctor = new Doctor({ speciality: '2' });
            }
            Object.keys(doctorCtrl.controls).forEach(key => {
                doctorCtrl.controls[key].setValidators(this.initDoctorModel()[key][1]);
                doctorCtrl.controls[key].updateValueAndValidity();
            });
            this.doctorFlag = true;
        } else {
            this.doctor = new Doctor({});
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
            speciality: ['2', Validators.required],
            testSpeciality:[''],
            isCalendarPublic: ['']
        };
        return model;
    }

    updateUser() {
        let result;
        let userFormValues = this.userform.value;
        let roles = [];
        let input = _.uniq(this.selectedRole);
        for (let i = 0; i < input.length; ++i) {
            roles.push({ 'roleType': parseInt(input[i], 10) });
        }
        this.selectedRole.forEach((element) => {
            if (parseInt(element, 10) === 3) {
                this.doctorRole = true;
            }
        });
        if (!this.doctorRole) {
            let existingUserJS = this.user.toJS();
            let userDetail = new User({
                id: this.user.id,
                firstName: userFormValues.userInfo.firstName,
                lastName: userFormValues.userInfo.lastName,
                userType: UserType.STAFF,
                roles: roles,
                userName: this.user.userName,
                gender: userFormValues.userInfo.gender,
                contact: new Contact({
                    id: this.user.contact.id,
                    cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    emailAddress: this.user.contact.emailAddress,
                    faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: userFormValues.contact.homePhone,
                    workPhone: userFormValues.contact.workPhone,
                    officeExtension: userFormValues.contact.officeExtension,
                    alternateEmail: userFormValues.contact.alternateEmail,
                    preferredCommunication: userFormValues.contact.preferredCommunication,


                }),
                address: new Address({
                    id: this.user.address.id,
                    address1: userFormValues.address.address1,
                    address2: userFormValues.address.address2,
                    city: userFormValues.address.city,
                    country: userFormValues.address.country,
                    state: userFormValues.address.state,
                    zipCode: userFormValues.address.zipCode,
                })
            });
            result = this._usersStore.updateUser(userDetail);
        } else {
            let doctorSpecialities = [];
            let doctorTestSpecialities = [];
            let input = userFormValues.doctor.speciality;
            let testinput = userFormValues.doctor.testSpeciality;
            for (let i = 0; i < input.length; ++i) {
                doctorSpecialities.push({ 'id': parseInt(input[i]) });
            }
            for (let j = 0; j < testinput.length; ++j) {
                doctorTestSpecialities.push({ 'id': parseInt(testinput[j]) });
            }
            let existingDoctorJS = this.doctor.toJS();
            let doctorDetail = new Doctor({
                id: this.user.id,
                licenseNumber: userFormValues.doctor.licenseNumber,
                wcbAuthorization: userFormValues.doctor.wcbAuthorization,
                wcbRatingCode: userFormValues.doctor.wcbRatingCode,
                npi: userFormValues.doctor.npi,
                taxType: userFormValues.doctor.taxType,
                title: userFormValues.doctor.title,
                doctorSpecialities: doctorSpecialities,
                doctorRoomTestMappings: doctorTestSpecialities,
                isCalendarPublic: userFormValues.doctor.isCalendarPublic,
                genderId: userFormValues.userInfo.gender,
                user: new User({
                    id: this.user.id,
                    firstName: userFormValues.userInfo.firstName,
                    lastName: userFormValues.userInfo.lastName,
                    userType: UserType.STAFF,
                    roles: roles,
                    userName: this.user.userName,
                    gender: userFormValues.userInfo.gender,
                    contact: new Contact({
                        id: this.user.contact.id,
                        cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                        emailAddress: this.user.contact.emailAddress,
                        faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                        homePhone: userFormValues.contact.homePhone,
                        workPhone: userFormValues.contact.workPhone,
                        officeExtension: userFormValues.contact.officeExtension,
                        alternateEmail: userFormValues.contact.alternateEmail,
                        preferredCommunication: userFormValues.contact.preferredCommunication,
                    }),
                    address: new Address({
                        id: this.user.address.id,
                        address1: userFormValues.address.address1,
                        address2: userFormValues.address.address2,
                        city: userFormValues.address.city,
                        country: userFormValues.address.country,
                        state: userFormValues.address.state,
                        zipCode: userFormValues.address.zipCode,
                    })
                })
            });
            result = this._doctorsStore.updateDoctor(doctorDetail);
        }
        this._progressBarService.show();
        this.isSaveUserProgress = true;

        // result = this._usersStore.updateUser(userDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/users']);
            },
            (error) => {
                let errString = 'Unable to update user.';
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
