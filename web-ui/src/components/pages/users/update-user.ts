import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {UsersStore} from '../../../stores/users-store';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users-service';
import {AccountDetail} from '../../../models/account-details';
import {Account} from '../../../models/account';
import {ContactInfo} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'update-user',
    templateUrl: 'templates/pages/users/update-user.html',
    providers: [UsersService, StateService, StatesStore, FormBuilder]
})

export class UpdateUserComponent implements OnInit {
    states: any[];
    user = new User({});
    address = new Address({});
    contactInfo = new ContactInfo({});
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
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.id);
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: AccountDetail) => {
                    this.user = userDetail.user;
                    this.address = userDetail.address;
                    this.contactInfo = userDetail.contactInfo;
                },
                (error) => {
                    this._router.navigate(['/users']);
                },
                () => {
                });
        });
        this.userform = this.fb.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            userType: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            contact: this.fb.group({
                emailAddress: ['', [Validators.required, AppValidators.emailValidator]],
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
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.userformControls = this.userform.controls;
    }

    ngOnInit() {
        this._stateService.getStates()
            .subscribe(states => this.states = states);
    }


    updateUser() {
        let userFormValues = this.userform.value;
        let userDetail = new AccountDetail({
            account: new Account({
                id: this._sessionStore.session.account_id
            }),
            user: new User({
                id: this.user.id,
                firstName: userFormValues.firstName,
                middleName: userFormValues.middleName,
                lastName: userFormValues.lastName,
                userType: parseInt(userFormValues.userType), // UserType[1],//,                
                password: userFormValues.password,
                userName: userFormValues.contact.emailAddress
            }),
            contactInfo: new ContactInfo({
                cellPhone: userFormValues.contact.cellPhone,
                emailAddress: userFormValues.contact.emailAddress,
                faxNo: userFormValues.contact.faxNo,
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
                this._router.navigate(['/users']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update user.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveUserProgress = false;
            });

    }

}
