System.register(['@angular/core', '@angular/common', '@angular/router-deprecated', '../../utils/AppValidators', '../elements/loader', '../../services/authentication', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, AppValidators_1, loader_1, authentication_1, angular2_notifications_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (authentication_1_1) {
                authentication_1 = authentication_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(fb, _authenticationService, _notificationsService, _router, _routeParams) {
                    this._authenticationService = _authenticationService;
                    this._notificationsService = _notificationsService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: false,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.loginForm = fb.group({
                        email: ['', common_1.Validators.compose([common_1.Validators.required, AppValidators_1.AppValidators.emailValidator])],
                        password: ['', common_1.Validators.required],
                    });
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (window.localStorage.hasOwnProperty('session_user_name')) {
                        this._router.navigate(['Dashboard']);
                    }
                };
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    var result;
                    this.isLoginInProgress = true;
                    var getParam = {
                        email: this.loginForm.value.email,
                        password: this.loginForm.value.password
                    };
                    result = this._authenticationService.authenticate(getParam);
                    result.subscribe(function (response) {
                        if (response.length) {
                            window.localStorage.setItem('session_user_name', response[0].name);
                            _this._router.navigate(['Dashboard']);
                        }
                        else {
                            _this._notificationsService.error('Oh No!', 'Invalid username and password.');
                        }
                    }, function (error) {
                        _this._notificationsService.error('Oh No!', 'Unable to authenticate user.');
                    }, function () {
                        _this.isLoginInProgress = false;
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'templates/pages/login.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [authentication_1.AuthenticationService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, authentication_1.AuthenticationService, angular2_notifications_1.NotificationsService, router_deprecated_1.Router, router_deprecated_1.RouteParams])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.js.map