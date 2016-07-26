import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication-service';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {SessionStore} from '../../stores/session-store';
import {User} from '../../models/user';

@Component({
    selector: 'signup',
    templateUrl: 'templates/pages/signup.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [AuthenticationService, NotificationsService]
})

export class SignupComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    signupForm: FormGroup;
    signupFormControls;
    isSignupInProgress;
    constructor(
        private fb: FormBuilder,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _router: Router
    ) {
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            mobileNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });
        
        this.signupFormControls = this.signupForm.controls;
    }

    ngOnInit() {
        
    }

    register() {
        this.isSignupInProgress = true;
        var result;
        var user = new User({
            'name': this.signupForm.value.name,
            'email': this.signupForm.value.email,
            'phone': this.signupForm.value.mobileNo,
            'password': this.signupForm.value.password
        });
        result = this._authenticationService.register(user);


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