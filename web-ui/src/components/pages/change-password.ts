import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';

import {User} from '../../models/user';
import {SessionStore} from '../../stores/session-store';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
    selector: 'change-password',
    templateUrl: 'templates/pages/change-password.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [AuthenticationService, NotificationsService]
})

export class ChangePasswordComponent implements OnInit {
    
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    changePassForm: FormGroup;
    changePassFormControls;
    isPassChangeInProgress;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
    ) {
        this.changePassForm = this.fb.group({
        oldpassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });
        
        this.changePassFormControls = this.changePassForm.controls;
}

    ngOnInit() {
        // if (!this._sessionStore.isAuthenticated()) {
        //     this._router.navigate(['/dashboard']);
        // }       
    }
    changePassword() {
        this.isPassChangeInProgress = true;
        var result;
        var userId: any = this._sessionStore.session.user.id;
        var oldpassword = this.changePassForm.value.oldpassword;
        var newpassword: any = {   
            'password': this.changePassForm.value.confirmPassword
        }
        
        result = this._authenticationService.authenticatePassword(userId, oldpassword);
         
           result.subscribe(
            (response) => { 
            this._authenticationService.updatePassword(userId, newpassword)        
            .subscribe(
            (response) => {
                this._notificationsService.success('Success','Password changed successfully!');
                setTimeout(() => {
                    this._router.navigate(['/dashboard']);
                }, 3000);
            });
            },
            error => {
            this._notificationsService.error('Error!', 'Please enter old password correctly.');
            },
            () => {
                this.isPassChangeInProgress = false;
            });       
        } 
        
}