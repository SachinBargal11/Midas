System.register(['@angular/core', '@angular/router', './pages/login', './pages/signup', './pages/dashboard', './pages/patients/patients-shell', './elements/app-header', './elements/main-nav', '../stores/session-store', './elements/notification', '../stores/notifications-store', './pages/change-password', './pages/users/add-user', './pages/users/users-list', './pages/providers/add-provider', './pages/providers/providers-list', '../stores/states-store', '../services/state-service'], function(exports_1, context_1) {
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
    var core_1, router_1, login_1, signup_1, dashboard_1, patients_shell_1, app_header_1, main_nav_1, session_store_1, notification_1, notifications_store_1, change_password_1, add_user_1, users_list_1, add_provider_1, providers_list_1, states_store_1, state_service_1;
    var AppRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            },
            function (change_password_1_1) {
                change_password_1 = change_password_1_1;
            },
            function (add_user_1_1) {
                add_user_1 = add_user_1_1;
            },
            function (users_list_1_1) {
                users_list_1 = users_list_1_1;
            },
            function (add_provider_1_1) {
                add_provider_1 = add_provider_1_1;
            },
            function (providers_list_1_1) {
                providers_list_1 = providers_list_1_1;
            },
            function (states_store_1_1) {
                states_store_1 = states_store_1_1;
            },
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
            }],
        execute: function() {
            AppRoot = (function () {
                function AppRoot(_router, _sessionStore, _notificationsStore, _statesStore) {
                    this._router = _router;
                    this._sessionStore = _sessionStore;
                    this._notificationsStore = _notificationsStore;
                    this._statesStore = _statesStore;
                }
                AppRoot.prototype.ngOnInit = function () {
                    var _this = this;
                    this._sessionStore.authenticate().subscribe(function (response) {
                    }, function (error) {
                        _this._router.navigate(['/login']);
                    }),
                        this._statesStore.getStates();
                };
                AppRoot = __decorate([
                    core_1.Component({
                        selector: 'app-root',
                        templateUrl: 'templates/AppRoot.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            app_header_1.AppHeaderComponent,
                            main_nav_1.MainNavComponent,
                            notification_1.NotificationComponent
                        ],
                        providers: [states_store_1.StatesStore, state_service_1.StateService],
                        precompile: [login_1.LoginComponent,
                            signup_1.SignupComponent,
                            change_password_1.ChangePasswordComponent,
                            add_user_1.AddUserComponent,
                            users_list_1.UsersListComponent,
                            dashboard_1.DashboardComponent,
                            add_provider_1.AddProviderComponent,
                            providers_list_1.ProvidersListComponent,
                            patients_shell_1.PatientsShellComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, session_store_1.SessionStore, notifications_store_1.NotificationsStore, states_store_1.StatesStore])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
        }
    }
});
//# sourceMappingURL=AppRoot.js.map