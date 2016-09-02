import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {UsersStore} from '../../../stores/users-store';
import {UserDetail} from '../../../models/user-details';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users-service';
import {AccountDetail} from '../../../models/account-details';
import {Account} from '../../../models/account';
import {ContactInfo} from '../../../models/contact';
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
    selector: 'update-user',
    templateUrl: 'templates/pages/users/update-user.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, InputMask, AutoComplete],
    providers: [HTTP_PROVIDERS, UsersService, StateService, StatesStore, FormBuilder],
    pipes: [LimitPipe]
})

export class UpdateUserComponent implements OnInit {
    states: any[];
    user = new User({});
    address: Address;
    contactInfo: ContactInfo;
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
                (userDetail: UserDetail) => {
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
        let userDetail = new UserDetail({
            account: new Account({
               id: this._sessionStore.session.account_id
            }),
            user: new User({
                id: this.user.id,
                firstName: userFormValues.firstName,
                middleName: userFormValues.middleName,
                lastName: userFormValues.lastName,
                userType: parseInt(userFormValues.userType),
                userName: userFormValues.contact.emailAddress,
                password: userFormValues.password
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
