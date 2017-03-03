import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { UsersStore } from '../stores/users-store';
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

@Component({
    selector: 'basic',
    templateUrl: './user-basic.html'
})

export class UserBasicComponent implements OnInit {
    cellPhone: string;
    selectedRole: string[] = [];
    faxNo: string;
    userType: any;
    states: any[];
    cities: any[];
    selectedCity;
    user: User;
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
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.userId);
            this._progressBarService.show();
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: User) => {
                    this.user = userDetail;
                    this.selectedRole = _.map(this.user.roles, (currentRole: any) => {
                        return currentRole.roleType.toString();
                    });
                    this.cellPhone = this._phoneFormatPipe.transform(this.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.user.contact.faxNo);
                    this.selectedCity = userDetail.address.city;
                    this.userType = UserType[userDetail.userType];
                    this.loadCities(userDetail.address.state);
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                role: ['', Validators.required]
            }),
            contact: this.fb.group({
                email: [{ value: '', disabled: true }, [Validators.required, AppValidators.emailValidator]],
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
        // this._statesStore.getCities()
        //         .subscribe(cities => this.cities = cities);
    }

    selectState(event) {
        let currentState = event.target.value;
        if (currentState === this.user.address.state) {
            this.loadCities(currentState);
            this.selectedCity = this.user.address.city;
        } else {
            this.loadCities(currentState);
            this.selectedCity = '';
        }
    }
    loadCities(stateName) {
        this.isCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.cities = cities; },
                null,
                () => { this.isCitiesLoading = false; });
        } else {
            this.cities = [];
            this.isCitiesLoading = false;
        }
    }


    updateUser() {
        let userFormValues = this.userform.value;
        let roles = [];
        let input = this.selectedRole;
        for (let i = 0; i < input.length; ++i) {
            roles.push({ 'roleType': parseInt(input[i]) });
        }
        let userDetail = new User({
            id: this.user.id,
            roles: roles,
            firstName: userFormValues.userInfo.firstName,
            lastName: userFormValues.userInfo.lastName,
            userType: UserType.STAFF,
            userName: this.user.userName,
            contact: new Contact({
                cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                emailAddress: this.contact.emailAddress,
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
        this._progressBarService.show();
        this.isSaveUserProgress = true;
        let result;

        result = this._usersStore.updateUser(userDetail);
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
