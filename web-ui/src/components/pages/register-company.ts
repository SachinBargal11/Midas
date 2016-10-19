import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {AuthenticationService} from '../../services/authentication-service';
import {Company} from '../../models/company';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'register-company',
    templateUrl: 'templates/pages/register-company.html',
    providers: [NotificationsService, FormBuilder]
})

export class RegisterCompanyComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    registercompanyform: FormGroup;
    userformControls;
    isSignupInProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _authenticationService: AuthenticationService,
        private _elRef: ElementRef
    ) {
        this.registercompanyform = this.fb.group({
                companyName: ['', Validators.required],
                contactName: ['', Validators.required],
                taxId: [''],
                phoneNo: ['', Validators.required],
                companyType: [''],
                email: ['', [Validators.required, AppValidators.emailValidator]],
                subscriptionPlan: ['', Validators.required]
        });

        this.userformControls = this.registercompanyform.controls;

    }

    ngOnInit() {
    }


    saveUser() {
        this.isSignupInProgress = true;
        let result;
        let registercompanyformValues = this.registercompanyform.value;
        let companyDetail = new Company({
                companyName: registercompanyformValues.companyName,
                contactName: registercompanyformValues.contactName,
                taxId: registercompanyformValues.taxId,
                phoneNo: registercompanyformValues.phoneNo,
                companyType: parseInt(registercompanyformValues.companyType),
                email: registercompanyformValues.email,
                subscriptionPlan: parseInt(registercompanyformValues.subscriptionPlan)
        });
        result = this._authenticationService.registerCompany(companyDetail);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'You are suceessfully Registered!');
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