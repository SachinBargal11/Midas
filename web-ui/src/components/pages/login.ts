import {Component, OnInit} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {SessionStore} from '../../stores/session-store';

@Component({
    selector: 'login',
    templateUrl: 'templates/pages/login.html',
    directives: [ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [NotificationsService]
})

export class LoginComponent implements OnInit {
    loginForm: ControlGroup;
    isLoginInProgress;
    options = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    constructor(
        fb: FormBuilder,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _router: Router,
        private _routeParams: RouteParams
    ) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, AppValidators.emailValidator])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
        if (this._sessionStore.isAuthenticated()) {
            this._router.navigate(['Dashboard']);
        }
    }

    login() {
        var result;
        this.isLoginInProgress = true;

        result = this._sessionStore.login(this.loginForm.value.email, this.loginForm.value.password);

        result.subscribe(
            response => {
                this._router.navigate(['Dashboard']);
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