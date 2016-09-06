System.register(['@angular/core', '@angular/forms', '@angular/router', '../../utils/AppValidators', '../elements/loader', 'angular2-notifications', '../../models/user-details', '../../models/user', '../../models/contact', '../../models/address', '../../models/account', '../../stores/users-store', '../../services/users-service', '../../stores/session-store', '../../services/authentication-service'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, angular2_notifications_1, user_details_1, user_1, contact_1, address_1, account_1, users_store_1, users_service_1, session_store_1, authentication_service_1;
    var ChangePasswordComponent;
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
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (user_details_1_1) {
                user_details_1 = user_details_1_1;
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
            function (users_store_1_1) {
                users_store_1 = users_store_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            ChangePasswordComponent = (function () {
                function ChangePasswordComponent(fb, _router, _route, _usersStore, _usersService, _authenticationService, _notificationsService, _sessionStore) {
                    var _this = this;
                    this.fb = fb;
                    this._router = _router;
                    this._route = _route;
                    this._usersStore = _usersStore;
                    this._usersService = _usersService;
                    this._authenticationService = _authenticationService;
                    this._notificationsService = _notificationsService;
                    this._sessionStore = _sessionStore;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    var userId = this._sessionStore.session.user.id;
                    var result = this._usersService.getUser(userId);
                    result.subscribe(function (userDetail) {
                        _this.userDetail = userDetail;
                    }, function (error) {
                        _this._router.navigate(['/users']);
                    }, function () {
                    });
                    this.changePassForm = this.fb.group({
                        oldpassword: [''],
                        password: ['', forms_1.Validators.required],
                        confirmPassword: ['', forms_1.Validators.required]
                    }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') });
                    this.changePassFormControls = this.changePassForm.controls;
                }
                ChangePasswordComponent.prototype.ngOnInit = function () {
                };
                ChangePasswordComponent.prototype.updatePassword = function () {
                    var _this = this;
                    var userDetail = new user_details_1.UserDetail({
                        account: new account_1.Account({
                            id: this._sessionStore.session.account_id
                        }),
                        user: new user_1.User({
                            id: this.userDetail.user.id,
                            firstName: this.userDetail.user.firstName,
                            middleName: this.userDetail.user.middleName,
                            lastName: this.userDetail.user.lastName,
                            userType: this.userDetail.user.userType,
                            userName: this.userDetail.user.userName,
                            password: this.changePassForm.value.password
                        }),
                        contactInfo: new contact_1.ContactInfo({
                            cellPhone: this.userDetail.contactInfo.cellPhone,
                            emailAddress: this.userDetail.contactInfo.emailAddress,
                            faxNo: this.userDetail.contactInfo.faxNo,
                            homePhone: this.userDetail.contactInfo.homePhone,
                            workPhone: this.userDetail.contactInfo.workPhone,
                        }),
                        address: new address_1.Address({
                            address1: this.userDetail.address.address1,
                            address2: this.userDetail.address.address2,
                            city: this.userDetail.address.city,
                            country: this.userDetail.address.country,
                            state: this.userDetail.address.state,
                            zipCode: this.userDetail.address.zipCode,
                        })
                    });
                    this.isPassChangeInProgress = true;
                    var userName = this._sessionStore.session.user.userName;
                    var oldpassword = this.changePassForm.value.oldpassword;
                    var result = this._sessionStore.authenticatePassword(userName, oldpassword);
                    result.subscribe(function (response) {
                        _this._usersStore.updatePassword(userDetail)
                            .subscribe(function (response) {
                            _this._notificationsService.success('Success', 'Password changed successfully!');
                            setTimeout(function () {
                                _this._router.navigate(['/dashboard']);
                            }, 3000);
                        });
                    }, function (error) {
                        _this._notificationsService.error('Error!', 'Please enter old password correctly.');
                    }, function () {
                        _this.isPassChangeInProgress = false;
                    });
                };
                ChangePasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'change-password',
                        templateUrl: 'templates/pages/change-password.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [forms_1.FormBuilder, authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, users_store_1.UsersStore, users_service_1.UsersService, authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService, session_store_1.SessionStore])
                ], ChangePasswordComponent);
                return ChangePasswordComponent;
            }());
            exports_1("ChangePasswordComponent", ChangePasswordComponent);
        }
    }
});
//# sourceMappingURL=change-password.js.map