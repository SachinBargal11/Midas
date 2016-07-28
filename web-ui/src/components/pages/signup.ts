import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication-service';
import {AccountDetail} from '../../models/account-details';
import {Account} from '../../models/account';
import {User} from '../../models/user';
import {Contact} from '../../models/contact';
import {Address} from '../../models/address';
import $ from 'jquery';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {Notification} from '../../models/notification';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import Moment from 'moment';
import {Calendar, RadioButton, SelectItem} from 'primeng/primeng';

@Component({
    selector: 'signup',
    templateUrl: 'templates/pages/signup.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, RadioButton]
})

export class SignupComponent implements OnInit {

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    signupform: FormGroup;
    userformControls;
    isSaveUserProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _authenticationService: AuthenticationService,
        private _elRef: ElementRef
    ) {
        this.signupform = this.fb.group({
            user: this.fb.group({
                // userName: ['', [Validators.required, AppValidators.emailValidator]],
                password: ['123456', Validators.required],
                confirmPassword: ['123456', Validators.required],
                firstname: ['test', Validators.required],
                middlename: [''],
                lastname: ['test', Validators.required],
                email: ['t@yahoo.com', [Validators.required, AppValidators.emailValidator]]
            }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') }),
            contactInfo: this.fb.group({
                
                cellPhone: ['1234567890', [Validators.required, AppValidators.mobileNoValidator]],
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
                accountName: ['test123', Validators.required]

            })
        });

        this.userformControls = this.signupform.controls;

    }

    ngOnInit() {

    }


    saveUser() {
        this.isSaveUserProgress = true;
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
                userName: signupFormValues.contactInfo.email
            }),
            contactInfo: new Contact({
                cellPhone: signupFormValues.contactInfo.cellPhone,
                emailAddress: signupFormValues.contactInfo.email,
                faxNo: signupFormValues.contactInfo.faxNo,
                homePhone: signupFormValues.contactInfo.homePhone,
                workPhone: signupFormValues.contactInfo.workPhone,
            }),
            address: new Address({
                address1: signupFormValues.address.address1,
                address2: signupFormValues.address.address2,
                city: signupFormValues.address.city,
                country: signupFormValues.address.country,
                state: signupFormValues.address.state,
                zipCode: signupFormValues.address.zipCode,
            })
        });

        result = this._authenticationService.register(accountDetail);
        result.subscribe(
            (response) => {
                var notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/users/add']);
            },
            (error) => {
                var notification = new Notification({
                    'title': 'Unable to add user.',
                    'type': 'ERROR',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveUserProgress = false;
            });

    }

}