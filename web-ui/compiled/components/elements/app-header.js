System.register(['@angular/core', '@angular/router-deprecated', '../elements/loader', '../../services/authentication', 'angular2-notifications', '@angular/common', 'ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, loader_1, authentication_1, angular2_notifications_1, common_1, ng2_bootstrap_1;
    var AppHeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (authentication_1_1) {
                authentication_1 = authentication_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            AppHeaderComponent = (function () {
                function AppHeaderComponent(_authenticationService, _notificationsService, _router) {
                    this._authenticationService = _authenticationService;
                    this._notificationsService = _notificationsService;
                    this._router = _router;
                    this.disabled = false;
                    this.status = { isopen: false };
                    this.options = {
                        timeOut: 5000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                }
                AppHeaderComponent.prototype.toggleDropdown = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    this.status.isopen = !this.status.isopen;
                };
                AppHeaderComponent.prototype.ngOnInit = function () {
                    if (window.localStorage.hasOwnProperty('session_user_name')) {
                        this.user_name = window.localStorage.getItem('session_user_name');
                    }
                    else {
                        this._router.navigate(['Login']);
                    }
                };
                AppHeaderComponent.prototype.logout = function () {
                    window.localStorage.removeItem('session_user_name');
                    this._router.navigate(['Login']);
                };
                AppHeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'app-header',
                        templateUrl: 'templates/elements/app-header.html',
                        directives: [loader_1.LoaderComponent, angular2_notifications_1.SimpleNotificationsComponent, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES],
                        providers: [authentication_1.AuthenticationService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [authentication_1.AuthenticationService, angular2_notifications_1.NotificationsService, router_deprecated_1.Router])
                ], AppHeaderComponent);
                return AppHeaderComponent;
            }());
            exports_1("AppHeaderComponent", AppHeaderComponent);
        }
    }
});
//# sourceMappingURL=app-header.js.map