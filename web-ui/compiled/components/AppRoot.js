System.register(['@angular/core', '@angular/router-deprecated', './pages/login', './pages/signup', './pages/dashboard', './pages/patients/patients-shell', './elements/app-header', './elements/main-nav', '../stores/session-store', './elements/notification', '../stores/notifications-store'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, login_1, signup_1, dashboard_1, patients_shell_1, app_header_1, main_nav_1, session_store_1, notification_1, notifications_store_1;
    var AppRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (signup_1_1) {
                signup_1 = signup_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (patients_shell_1_1) {
                patients_shell_1 = patients_shell_1_1;
            },
            function (app_header_1_1) {
                app_header_1 = app_header_1_1;
            },
            function (main_nav_1_1) {
                main_nav_1 = main_nav_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            }],
        execute: function() {
            AppRoot = (function () {
                function AppRoot(router, _sessionStore, _notificationsStore) {
                    this.router = router;
                    this._sessionStore = _sessionStore;
                    this._notificationsStore = _notificationsStore;
                }
                AppRoot.prototype.ngOnInit = function () {
                    var _this = this;
                    this._sessionStore.authenticate().subscribe(function (response) {
                    }, function (error) {
                        _this.router.navigate(['Login']);
                    });
                };
                AppRoot = __decorate([
                    router_deprecated_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_1.LoginComponent },
                        { path: '/signup', name: 'Signup', component: signup_1.SignupComponent },
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_1.DashboardComponent },
                        { path: '/patients/...', name: 'Patients', component: patients_shell_1.PatientsShellComponent },
                        { path: '/*other', name: 'Other', redirectTo: ['Dashboard'] }
                    ]),
                    core_1.Component({
                        selector: 'app-root',
                        templateUrl: 'templates/AppRoot.html',
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES,
                            app_header_1.AppHeaderComponent,
                            main_nav_1.MainNavComponent,
                            notification_1.NotificationComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, session_store_1.SessionStore, notifications_store_1.NotificationsStore])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
        }
    }
});
//# sourceMappingURL=AppRoot.js.map