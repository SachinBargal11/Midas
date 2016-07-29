System.register(['@angular/core', '@angular/forms', '@angular/router', 'ng2-bootstrap', '../../utils/AppValidators', '../elements/loader', '../../services/authentication-service', '../../models/account-details', '../../models/user', '../../models/contact', '../../models/address', '../../models/account', '../../stores/session-store', '../../stores/notifications-store', 'angular2-notifications', 'primeng/primeng'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, forms_1, router_1, ng2_bootstrap_1, AppValidators_1, loader_1, authentication_service_1, account_details_1, user_1, contact_1, address_1, account_1, session_store_1, notifications_store_1, angular2_notifications_1, primeng_1;
    var SignupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (account_details_1_1) {
                account_details_1 = account_details_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(fb, _router, _notificationsStore, _notificationsService, _sessionStore, _authenticationService, _elRef) {
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._notificationsService = _notificationsService;
                    this._sessionStore = _sessionStore;
                    this._authenticationService = _authenticationService;
                    this._elRef = _elRef;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSignupInProgress = false;
                    this.signupform = this.fb.group({
                        user: this.fb.group({
                            // userName: ['', [Validators.required, AppValidators.emailValidator]],
                            password: ['', forms_1.Validators.required],
                            confirmPassword: ['', forms_1.Validators.required],
                            firstname: ['', forms_1.Validators.required],
                            middlename: [''],
                            lastname: ['', forms_1.Validators.required],
                            email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]]
                        }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') }),
                        contactInfo: this.fb.group({
                            cellPhone: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator]],
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
                            accountName: ['', forms_1.Validators.required]
                        })
                    });
                    this.userformControls = this.signupform.controls;
                }
                SignupComponent.prototype.ngOnInit = function () {
                };
                SignupComponent.prototype.saveUser = function () {
                    var _this = this;
                    this.isSignupInProgress = true;
                    var result;
                    var signupFormValues = this.signupform.value;
                    var accountDetail = new account_details_1.AccountDetail({
                        account: new account_1.Account({
                            name: signupFormValues.account.accountName
                        }),
                        user: new user_1.User({
                            firstName: signupFormValues.user.firstname,
                            middleName: signupFormValues.user.middlename,
                            lastName: signupFormValues.user.lastname,
                            userName: signupFormValues.user.email,
                            password: signupFormValues.user.password
                        }),
                        contactInfo: new contact_1.Contact({
                            cellPhone: signupFormValues.contactInfo.cellPhone,
                            emailAddress: signupFormValues.user.email,
                            faxNo: signupFormValues.contactInfo.faxNo,
                            homePhone: signupFormValues.contactInfo.homePhone,
                            workPhone: signupFormValues.contactInfo.workPhone,
                        }),
                        address: new address_1.Address({
                            address1: signupFormValues.address.address1,
                            address2: signupFormValues.address.address2,
                            city: signupFormValues.address.city,
                            country: signupFormValues.address.country,
                            state: signupFormValues.address.state,
                            zipCode: signupFormValues.address.zipCode,
                        })
                    });
                    result = this._authenticationService.register(accountDetail);
                    result.subscribe(function (response) {
                        _this._notificationsService.success('Welcome!', 'You have suceessfully registered!');
                        setTimeout(function () {
                            _this._router.navigate(['/login']);
                        }, 3000);
                    }, function (error) {
                        _this.isSignupInProgress = false;
                        _this._notificationsService.error('Oh No!', 'Unable to register user.');
                    }, function () {
                        _this.isSignupInProgress = false;
                    });
                };
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup',
                        templateUrl: 'templates/pages/signup.html',
                        directives: [
                            forms_1.FORM_DIRECTIVES,
                            forms_1.REACTIVE_FORM_DIRECTIVES,
                            ng2_bootstrap_1.DROPDOWN_DIRECTIVES,
                            router_1.ROUTER_DIRECTIVES,
                            loader_1.LoaderComponent,
                            primeng_1.Calendar,
                            primeng_1.InputMask,
                            primeng_1.RadioButton,
                            angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, angular2_notifications_1.NotificationsService, session_store_1.SessionStore, authentication_service_1.AuthenticationService, core_1.ElementRef])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.js.map