import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { AuthenticationService } from '../../services/authentication-service';
import { CompanyStore } from '../../stores/company-store';
import { Company } from '../../models/company';
import { SessionStore } from '../../stores/session-store';
import { NotificationsStore } from '../../stores/notifications-store';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'register-company',
    templateUrl: 'templates/pages/register-company.html',
    providers: [NotificationsService, FormBuilder]
})

export class RegisterCompanyComponent implements OnInit {
    // company = new Company({});
    company: any[];
    companyName: any[];
    email: any[];
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
        private _companyStore: CompanyStore,
        private _elRef: ElementRef
    ) {
        this.registercompanyform = this.fb.group({
            companyName: ['', [Validators.required, AppValidators.companyNameTaken(['John', 'sachin', 'Jill', 'Jackie', 'Jim'])]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', Validators.required],
            phoneNo: ['', Validators.required],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator, AppValidators.emailTaken(['john@yahoo.com', 'sachin@gmail.com', 'jill@gmail.com', 'jackie@yahoo.com', 'jim@gmail.com'])]],
            subscriptionPlan: ['', Validators.required]
        });

        this.userformControls = this.registercompanyform.controls;

    }

    ngOnInit() {
        // this.show();
    }
    show() {
        this._authenticationService.getCompanies()
            .subscribe(
            (company: Company[]) => {
                this.company = company;
                function getFields(input, field) {
                    let output = [];
                    for (let i = 0; i < input.length; ++i)
                        output.push(input[i][field]);
                    return output;
                }
                //  this.companyName = getFields(company, 'companyName');
                this.email = getFields(company, 'email');
            });
        // alert(this._authenticationService.companies);
    }
    saveUser() {
        this.isRegistrationInProgress = true;
        let result;
        let registercompanyformValues = this.registercompanyform.value;
        let companyDetail = new Company({
            company: {
                name: registercompanyformValues.companyName,
                taxId: registercompanyformValues.taxId,
                companyType: registercompanyformValues.companyType,
                subsCriptionType: registercompanyformValues.subscriptionPlan
            },
            user: {
                userName: registercompanyformValues.email,
                firstName: registercompanyformValues.firstName,
                lastName: registercompanyformValues.lastName,
                userType: 'Owner'
            },
            contactInfo: {
                cellPhone: registercompanyformValues.phoneNo,
                emailAddress: registercompanyformValues.email
            },
            role: {
                name: 'Doctor',
                roleType: 'Admin',
                status: 'active'
            }
        });
        result = this._authenticationService.registerCompany(companyDetail);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'Your company has been registered successfully! Check your email for activation.');
                setTimeout(() => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            (error) => {
                let errorObj = JSON.parse(error._body);
                let errorString = 'Unable to register company.';
                if (errorObj.message) {
                    errorString = errorObj.message;
                }
                this.isRegistrationInProgress = false;
                this._notificationsService.error('Oh No!', errorString);
            },
            () => {
                this.isRegistrationInProgress = false;
            });

    }
    goBack(): void {
        // this.location.back();
        this._router.navigate(['/login']);
    }
}