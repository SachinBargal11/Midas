import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication-service';
import {AccountDetail} from '../../models/account-details';
import {User} from '../../models/user';
import {Contact} from '../../models/contact';
import {Address} from '../../models/address';
import {Account} from '../../models/account';
import {StatesStore} from '../../stores/states-store';
import {StateService} from '../../services/state-service';
import $ from 'jquery';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {Notification} from '../../models/notification';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import Moment from 'moment';
import {Calendar, InputMask, RadioButton, SelectItem} from 'primeng/primeng';

@Component({
    selector: 'signup',
    templateUrl: 'templates/pages/signup.html',
    directives: [
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        ROUTER_DIRECTIVES,
        LoaderComponent,
        Calendar,
        InputMask,
        RadioButton,
        SimpleNotificationsComponent],
    providers: [NotificationsService, StateService, StatesStore]
})

export class SignupComponent implements OnInit {
   states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    signupform: FormGroup;
    userformControls;
    isSignupInProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _authenticationService: AuthenticationService,
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _elRef: ElementRef
    ) {
        this.signupform = this.fb.group({
            user: this.fb.group({
                // userName: ['', [Validators.required, AppValidators.emailValidator]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                firstname: ['', Validators.required],
                middlename: [''],
                lastname: ['', Validators.required],
                email: ['', [Validators.required, AppValidators.emailValidator]]
            }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') }),
            contactInfo: this.fb.group({

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
            }),
            account: this.fb.group({
                accountName: ['', Validators.required]

            })
        });

        this.userformControls = this.signupform.controls;

    }

    ngOnInit() {
                    this._stateService.getStates()
                        .subscribe(states => this.states = states);
    }


    saveUser() {
        this.isSignupInProgress = true;
        var result;
        let signupFormValues = this.signupform.value;
        let accountDetail = new AccountDetail({
            account: new Account({
                name: signupFormValues.account.accountName
            }),
            user: new User({
                firstName: signupFormValues.user.firstname,
                middleName: signupFormValues.user.middlename,
                lastName: signupFormValues.user.lastname,
                userName: signupFormValues.user.email,
                password: signupFormValues.user.password
            }),
            contactInfo: new Contact({
                cellPhone: signupFormValues.contactInfo.cellPhone,
                emailAddress: signupFormValues.user.email,
                faxNo: signupFormValues.contactInfo.faxNo,
                homePhone: signupFormValues.contactInfo.homePhone,
                workPhone: signupFormValues.contactInfo.workPhone
            }),
            address: new Address({
                address1: signupFormValues.address.address1,
                address2: signupFormValues.address.address2,
                city: signupFormValues.address.city,
                country: signupFormValues.address.country,
                state: signupFormValues.address.state,
                zipCode: signupFormValues.address.zipCode
            })
        });
        result = this._authenticationService.register(accountDetail);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'You have suceessfully registered!');
                setTimeout(() => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            error => {
                this.isSignupInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to register user.');
            },
            () => {
                this.isSignupInProgress = false;
            });

    }

}