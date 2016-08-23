import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {SessionStore} from '../../stores/session-store';

@Component({
    selector: 'login',
    templateUrl: 'templates/pages/login.html',
    directives: [
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        LoaderComponent,
        SimpleNotificationsComponent
    ],
    providers: [NotificationsService, FormBuilder]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormControls;
    isLoginInProgress;
    options = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    constructor(
        private fb: FormBuilder,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, AppValidators.emailValidator]],
            password: ['', Validators.required],
        });
        this.loginFormControls = this.loginForm.controls;
    }

    ngOnInit() {

    }

    login() {
        let result;
        this.isLoginInProgress = true;
        result = this._sessionStore.login(this.loginForm.value.email, this.loginForm.value.password);

        result.subscribe(
            response => {
                this._router.navigate(['/dashboard']);
            },
            error => {
                this.isLoginInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to authenticate user.');
            },
            () => {
                this.isLoginInProgress = false;
            });
    }
}