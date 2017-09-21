import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../commons/utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';
import { UserType } from '../../commons/models/enums/user-type';

import { AuthenticationService } from '../services/authentication-service';
import { Signup } from '../../account-setup/models/signup';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'account-activation',
    templateUrl: './account-activation.html'
})

export class AccountActivationComponent implements OnInit {
    isTokenValidated: boolean = false;
    isTokenValid: boolean = false;
    token: any;
    user: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    companyForm: FormGroup;
    companyFormControls;

    changePassForm: FormGroup;
    changePassFormControls;
    isPassChangeInProgress;

    isUser: boolean = false;

    companyId: number;
    companyMaster: any;
    company: any;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            this.token = routeParams.token;
            let result = this._authenticationService.checkForValidToken(this.token);
            result.subscribe(
                (data: any) => {
                    // check for response
                    this.isTokenValidated = true;
                    this.isTokenValid = true;
                    this.user = data.user;
                    this.company = data.company;

                    if (this.company.id > 0) {
                        let resultForUpdate = this._authenticationService.fetchByCompanyId(this.company.id);
                        resultForUpdate.subscribe(
                            (companyMaster: Signup) => {
                                this.companyMaster = companyMaster.originalResponse;
                                if (this.companyMaster.signup.company.companyStatusTypeId == 3) {
                                    if (this.user.userCompanies.userStatusID = 1) {
                                        this.isUser = true;
                                    }
                                    else {
                                        // this._router.navigate(['/account/login']);
                                        window.location.assign(environment.HOME_URL);
                                    }
                                }
                                else if (this.companyMaster.signup.company.companyStatusTypeId == 2) {
                                    this.isUser = true;
                                }
                                // else if (this.companyMaster.signup.company.companyStatusTypeId == 3) {
                                //     this._router.navigate(['/account/login']);
                                // }
                            },
                            (error) => {
                                this._router.navigate(['../'], { relativeTo: this._route });
                            },
                            () => {

                            });
                    }
                },
                (error) => {
                    this.isTokenValidated = true;
                    // this._notificationsService.error('Error!', 'Activation code is invalid.');
                    // setTimeout(() => {
                    //     this._router.navigate(['/account/login']);
                    // }, 3000);
                },
                () => {
                });

            // if (this.companyId > 0) {
            //     this.companyId = 56;
            //     let resultForUpdate = this._authenticationService.fetchByCompanyId(this.companyId);
            //     resultForUpdate.subscribe(
            //         (companyMaster: Signup) => {
            //             this.companyMaster = companyMaster;
            //         },
            //         (error) => {
            //             this._router.navigate(['../'], { relativeTo: this._route });
            //         },
            //         () => {

            //         });
            // }
        });


        this.changePassForm = this.fb.group({
            // companyName: ['', [Validators.required]],
            // firstName: ['', Validators.required],
            // lastName: ['', Validators.required],
            // taxId: ['', [Validators.required, Validators.maxLength(10)]],
            // phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            // companyType: ['', Validators.required],
            // email: ['', [Validators.required, AppValidators.emailValidator]],
            // subscriptionPlan: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(20), AppValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;

        this.companyForm = this.fb.group({
            companyName: [''],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.maxLength(10)]],
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: [''],
            email: [''],
            subscriptionPlan: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(20), AppValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.companyFormControls = this.companyForm.controls;

    }

    ngOnInit() {
    }

    updatePassword() {
        let requestData = { user: null, company: null };
        requestData.user = {
            id: this.user.id,
            userName: this.user.userName,
            password: this.changePassForm.value.password
        },
            requestData.company = {
                id: this.companyMaster.signup.company.id
            };
        this.isPassChangeInProgress = true;

        this._authenticationService.updatePassword(requestData)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Your password has been set successfully!');
                setTimeout(() => {
                    // this._router.navigate(['/account/login']);
                    window.location.assign(environment.HOME_URL);
                }, 3000);
            },
            error => {
                this.isPassChangeInProgress = false;
                let errString = 'Unable to set your password.';
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    updateCompany() {
        this.isPassChangeInProgress = true;
        let requestData;
        requestData = new Signup({
            user: {
                id: this.companyMaster.signup.user.id,
                userName: this.companyForm.value.email,
                firstName: this.companyForm.value.firstName,
                lastName: this.companyForm.value.lastName,
                password: this.companyForm.value.password
            },
            contactInfo: {
                id: this.companyMaster.signup.contactInfo.id,
                cellPhone: this.companyForm.value.phoneNo.replace(/\-/g, ''),
                emailAddress: this.companyForm.value.email
            },
            company: {
                id: this.companyMaster.signup.company.id,
                name: this.companyForm.value.companyName,
                companyType: this.companyForm.value.companyType,
                taxId: this.companyForm.value.taxId,
                subsCriptionType: this.companyForm.value.subscriptionPlan
            }
        })
        // this._progressBarService.show();
        this._authenticationService.updateCompany(requestData)
            .subscribe(
            (response) => {
                this._notificationsService.success('Success', 'Your password has been set successfully!');
                setTimeout(() => {
                    // this._router.navigate(['/account/login']);
        window.location.assign(environment.HOME_URL);
                }, 3000);
            },
            error => {
                this.isPassChangeInProgress = false;
                let errString = 'Unable to set your password.';
                this._notificationsService.error('Error!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
        // this.location.back();
        // this._router.navigate(['/account/login']);
        window.location.assign(environment.HOME_URL);
    }
}