import { Contact } from '../../commons/models/contact';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../commons/utils/AppValidators';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AuthenticationService } from '../services/authentication-service';
import { RegistrationService } from '../services/registration-service';
// import { CompanyStore } from '../../stores/company-store';
import { Company } from '../models/company';
import { Account } from '../models/account';
import { User } from '../../commons/models/user';
import { UserRole } from '../../commons/models/user-role';
import { UserType } from '../../commons/models/enums/user-type';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'register-company',
    templateUrl: './register-company.html'
})

export class RegisterCompanyComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    registercompanyform: FormGroup;
    userformControls;
    isRegistrationInProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _authenticationService: AuthenticationService,
        private _registrationService: RegistrationService,
        private _elRef: ElementRef
    ) {
        this.registercompanyform = this.fb.group({
            companyName: ['', [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.maxLength(10)]],
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            subscriptionPlan: ['', Validators.required]
        });

        this.userformControls = this.registercompanyform.controls;

    }

    ngOnInit() {
    }

    saveUser() {
        this.isRegistrationInProgress = true;
        let result;
        let registercompanyformValues = this.registercompanyform.value;
        let company = new Account({
            companies: new Company({
                name: registercompanyformValues.companyName,
                taxId: registercompanyformValues.taxId,
                companyType: registercompanyformValues.companyType
            }),
            user: new User({
                userName: registercompanyformValues.email,
                firstName: registercompanyformValues.firstName,
                lastName: registercompanyformValues.lastName,
                userType: UserType.ATTORNEY,
                contact: new Contact({
                    cellPhone: registercompanyformValues.phoneNo.replace(/\-/g, ''),
                    emailAddress: registercompanyformValues.email
                })
            }),
            role: new UserRole({
                name: 'Admin',
                roleType: 'Admin',
                status: 'active'
            }),
            subscriptionPlan: registercompanyformValues.subscriptionPlan
        });
        result = this._registrationService.registerCompany(company);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'Your company has been registered successfully! Check your email for activation.');
                setTimeout(() => {
                    this._router.navigate(['/account/login']);
                }, 3000);
            },
            (error) => {
                this.isRegistrationInProgress = false;
                let errString = 'Unable to Register User.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isRegistrationInProgress = false;
            });

    }
    goBack(): void {
        // this.location.back();
        this._router.navigate(['/account/login']);
    }
}