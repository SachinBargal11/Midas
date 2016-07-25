System.register(['@angular/core', '@angular/forms', '@angular/router', '../../utils/AppValidators', '../elements/loader', '../../services/authentication-service', 'angular2-notifications', '../../stores/session-store', '../../models/user'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, authentication_service_1, angular2_notifications_1, session_store_1, user_1;
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
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(fb, _authenticationService, _notificationsService, _sessionStore, _router) {
                    this.fb = fb;
                    this._authenticationService = _authenticationService;
                    this._notificationsService = _notificationsService;
                    this._sessionStore = _sessionStore;
                    this._router = _router;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.signupForm = this.fb.group({
                        name: ['', forms_1.Validators.required],
                        email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                        mobileNo: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator]],
                        password: ['', forms_1.Validators.required],
                        confirmPassword: ['', forms_1.Validators.required]
                    }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') });
                    this.signupFormControls = this.signupForm.controls;
                }
                SignupComponent.prototype.ngOnInit = function () {
                };
                SignupComponent.prototype.register = function () {
                    var _this = this;
                    this.isSignupInProgress = true;
                    var result;
                    var user = new user_1.User({
                        'name': this.signupForm.value.name,
                        'email': this.signupForm.value.email,
                        'phone': this.signupForm.value.mobileNo,
                        'password': this.signupForm.value.password
                    });
                    result = this._authenticationService.register(user);
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
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService, session_store_1.SessionStore, router_1.Router])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.js.map