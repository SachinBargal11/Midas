System.register(['@angular/core', '@angular/forms', '@angular/router', '../../utils/AppValidators', '../elements/loader', 'angular2-notifications', '../../stores/session-store', '../../services/authentication-service'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, angular2_notifications_1, session_store_1, authentication_service_1;
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
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            ChangePasswordComponent = (function () {
                function ChangePasswordComponent(fb, _router, _authenticationService, _notificationsService, _sessionStore) {
                    this.fb = fb;
                    this._router = _router;
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
                    this.changePassForm = this.fb.group({
                        oldpassword: ['', forms_1.Validators.required],
                        password: ['', forms_1.Validators.required],
                        confirmPassword: ['', forms_1.Validators.required]
                    }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') });
                    this.changePassFormControls = this.changePassForm.controls;
                }
                ChangePasswordComponent.prototype.ngOnInit = function () {
                    // if (!this._sessionStore.isAuthenticated()) {
                    //     this._router.navigate(['/dashboard']);
                    // }       
                };
                ChangePasswordComponent.prototype.changePassword = function () {
                    var _this = this;
                    this.isPassChangeInProgress = true;
                    var result;
                    var userId = this._sessionStore.session.user.id;
                    var oldpassword = this.changePassForm.value.oldpassword;
                    var newpassword = {
                        'password': this.changePassForm.value.confirmPassword
                    };
                    result = this._authenticationService.authenticatePassword(userId, oldpassword);
                    result.subscribe(function (response) {
                        _this._authenticationService.updatePassword(userId, newpassword)
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
                        providers: [authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService, session_store_1.SessionStore])
                ], ChangePasswordComponent);
                return ChangePasswordComponent;
            }());
            exports_1("ChangePasswordComponent", ChangePasswordComponent);
        }
    }
});
//# sourceMappingURL=change-password.js.map