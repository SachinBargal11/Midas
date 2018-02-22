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
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.html'
})

export class AddUserComponent implements OnInit {
    userType: any;
    states: any[];
    taxTypes: any[];
    cities: any[];
    selectedRole: any[] = ['1'];
    isCalendarPublic: boolean = false;
    user = new User({});
    address = new Address({});
    contact = new Contact({});
    // selectedRole: any[] = [];
    selectedCity = 0;
    specialitiesArr: SelectItem[] = [];
    testSpecialitiesArr: SelectItem[] = [];
    // selectedSpeciality: SelectItem[] = [];
    selectedSpeciality: any[];
    selectedTestSpeciality: any[];
    userform: FormGroup;
    userformControls;
    isSaveUserProgress = false;
    isCitiesLoading = false;
    doctorRole = false;
    doctorFlag: boolean = false;
    displayExistPopup: boolean = false;
    isExist: boolean = false;
    users: any;
    isPatientOrDoctor: string = 'doctor';
    existUserData: any;
    userCompany: User;
    isuserCompany: boolean = false;
    constructor(
        private _statesStore: StatesStore,
        private _userService: UsersService,
        private _fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _doctorsStore: DoctorsStore,
        private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef,
        private _roomsStore: RoomsStore,
        private confirmationService: ConfirmationService
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

            this._progressBarService.show();
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
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });


        this.userform = this._fb.group({
            userInfo: this._fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                role: ['', [Validators.required]],
                gender: ['', [Validators.required]]
            }),
            doctor: this._fb.group(this.initDoctorModel()),
            contact: this._fb.group({
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: [''],
                alternateEmail: ['', [AppValidators.emailValidator]],
                officeExtension: [''],
                preferredCommunication: [''],
            }),
            address: this._fb.group({
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

        this._doctorsStore.getDoctorsTaxType()
            .subscribe(taxType => this.taxTypes = taxType);
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
            speciality: ['2', Validators.required],
            testSpeciality:[''],
            isCalendarPublic: ['']
        };
        return model;
    }

    getUserByUserName(event)
    {
       let userName : string = event.target.value
       this._progressBarService.show();
       let result = this._usersStore.fetchUserByUserName(userName);
       result.subscribe(
           (userDetail: any) => {
               this.user = userDetail;
               this.contact = userDetail.contactInfo,
               this.address = userDetail.addressInfo,
               this.userType = UserType[userDetail.userType];
               if(this.user.userName != undefined &&  this.user.userName != "")
               {
                let resultnew = this._usersStore.fetchUserByIdAndCompnayID(this.user.id,this._sessionStore.session.currentCompany.id);
                resultnew.subscribe(
                   (responsenew : any)=>{
                       if(responsenew.id > 0)
                       {
                        let errString = 'User already exists.';
                        let notification = new Notification({
                            'title': errString,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', errString);
                       }
                       else{
                        this.confirmationService.confirm({
                            message: 'Already  user exists in portal do you want to Associate with your company',
                            header: 'Confirmation',
                            icon: 'fa fa-floppy-o',
                            accept: () => {                         
                                let result1;
                                result1 = this._usersStore.mapUserToCompnay(userName,this._sessionStore.session.currentCompany.id,this._sessionStore.session.user.id);
                                result1.subscribe(
                                    (response) => {
                                        let notification = new Notification({
                                            'title': 'User Associated successfully!',
                                            'type': 'SUCCESS',
                                            'createdAt': moment()
                                            });
                                            this._notificationsStore.addNotification(notification);
                                            this._router.navigate(['/medical-provider/users']);
                                    },
                                    (error) => {
                                        let errString = 'Unable to Associated user ';
                                        let notification = new Notification({
                                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                            'type': 'ERROR',
                                            'createdAt': moment()
                                        });
                                        this._progressBarService.hide();
                                        this._notificationsStore.addNotification(notification);
                                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));                                                    
                                    },
                                    () => {
                                        this._progressBarService.hide();
                                    });
            
                            }});
                       }
                   },
                   (error)=>{
                    this._progressBarService.hide();
                   },
                   ()=>{
                    this._progressBarService.hide();
                   });
            }
           },
           (error) => {
               this._progressBarService.hide();
           },
           () => {
               this._progressBarService.hide();
           });
        
    }

    saveUser() {
        let result;
        let userFormValues = this.userform.value;
        let doctorSpecialities = [];
        let doctorRoomTestMappings = [];
        let roles = [];
        let input = this.selectedRole;
        for (let i = 0; i < input.length; ++i) {
            roles.push({ 'roleType': parseInt(input[i], 10) });
        }
        this.selectedRole.forEach(element => {
            if (parseInt(element, 10) === 3) {
                this.doctorRole = true;
            }
        });
        if (!this.doctorRole) {
            let userDetail = new User({
                firstName: userFormValues.userInfo.firstname,
                lastName: userFormValues.userInfo.lastname,
                userType: UserType.STAFF,
                roles: roles,
                userName: userFormValues.userInfo.email,
                gender: userFormValues.userInfo.gender,
                contact: new Contact({
                    cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    emailAddress: userFormValues.userInfo.email,
                    faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: userFormValues.contact.homePhone,
                    workPhone: userFormValues.contact.workPhone,
                    // officeExtension: userFormValues.officeExtension,
                    // alternateEmail: userFormValues.alternateEmail,
                    // preferredCommunication: userFormValues.preferredCommunication,

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
            this._progressBarService.show();
            this.isSaveUserProgress = true;
            result = this._usersStore.addUser(userDetail);
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
        else {
            let doctorDetail;
            let selectedSpeciality = userFormValues.doctor.speciality;
            selectedSpeciality.forEach(element => {
                doctorSpecialities.push({ 'id': parseInt(element) });
            });
            let selectedTestSpeciality = userFormValues.doctor.testSpeciality;
            if(selectedTestSpeciality != undefined)
            {
                selectedTestSpeciality.forEach(element => {
                    doctorRoomTestMappings.push({'id': parseInt(element)});
                });
            }

            this._usersStore.getIsExistingUser(userFormValues.contact.email)
                .subscribe((data: any) => {
                    this.existUserData = data;
                    this.users = data.user;
                    this.isExist = false;
                    this.displayExistPopup = false;
                    if (data.isDoctor == true) {
                        this.isExist = true;
                        this.displayExistPopup = true;
                    } else if (data.isDoctor == false && data.isPatient == false && data.user != null) {
                        let errString = 'User already exists & it is staff.';
                        let notification = new Notification({
                            'title': errString,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', errString);
                    } else if (data.isDoctor == false && data.isPatient == true) {
                        let errString = 'User already exists & it is patient.';
                        let notification = new Notification({
                            'title': errString,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', errString);

                    }
                    else {
                        doctorDetail = new Doctor({
                            licenseNumber: userFormValues.doctor.licenseNumber,
                            wcbAuthorization: userFormValues.doctor.wcbAuthorization,
                            wcbRatingCode: userFormValues.doctor.wcbRatingCode,
                            npi: userFormValues.doctor.npi,
                            taxType: userFormValues.doctor.taxType,
                            // title: 'Dr',
                            title: userFormValues.doctor.title,
                            doctorSpecialities: doctorSpecialities,
                            doctorRoomTestMappings:doctorRoomTestMappings,
                            isCalendarPublic: userFormValues.doctor.isCalendarPublic,
                            genderId: userFormValues.userInfo.gender,
                            user: new User({
                                firstName: userFormValues.userInfo.firstname,
                                lastName: userFormValues.userInfo.lastname,
                                userType: UserType.STAFF,
                                roles: roles,
                                userName: userFormValues.userInfo.email,
                                gender: userFormValues.userInfo.gender,
                                contact: new Contact({
                                    cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                                    emailAddress: userFormValues.userInfo.email,
                                    faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                                    homePhone: userFormValues.contact.homePhone,
                                    workPhone: userFormValues.contact.workPhone,
                                    // officeExtension: userFormValues.officeExtension,
                                    // alternateEmail: userFormValues.alternateEmail,
                                    // preferredCommunication: userFormValues.preferredCommunication,

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
                        this._progressBarService.show();
                        this.isSaveUserProgress = true;
                        result = this._doctorsStore.addDoctor(doctorDetail);
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
                                let errString = 'Unable to add user.';
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

                },
                (error) => { });
        }

    }

}
