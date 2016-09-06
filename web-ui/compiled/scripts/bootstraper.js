/** Angular Modules */
System.register(['@angular/core', '@angular/platform-browser-dynamic', '@angular/platform-browser', '@angular/forms', '../components/AppRoot', '@angular/http', 'primeng/primeng', 'angular2-notifications', '../stores/session-store', '../services/authentication-service', '../stores/users-store', '../services/users-service', '../stores/providers-store', '../services/providers-service', '../stores/medical-facilities-store', '../services/medical-facility-service', '../stores/doctors-store', '../services/doctors-service', '../stores/patients-store', '../services/patients-service', '../stores/states-store', '../services/state-service', '../stores/notifications-store', '../routes/app-routes', '../routes/guards/validate-active-session', '../routes/guards/validate-inactive-session', '../components/pages/login', '../components/pages/signup', '../components/pages/dashboard', '../components/pages/patients/patients-shell', '../components/pages/patients/patients-list', '../components/pages/patients/add-patient', '../components/pages/patients/patient-details', '../components/pages/patients/profile-patient', '../components/elements/app-header', '../components/elements/main-nav', '../components/elements/notification', '../components/pages/change-password', '../components/pages/users/add-user', '../components/pages/users/users-list', '../components/pages/users/update-user', '../components/pages/providers/add-provider', '../components/pages/providers/providers-list', '../components/pages/medical-facilities/add-medical-facility', '../components/pages/medical-facilities/medical-facilities-list', '../components/pages/doctors/add-doctor', '../components/pages/doctors/update-doctor', '../components/pages/doctors/doctors-list'], function(exports_1, context_1) {
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
    var core_1, platform_browser_dynamic_1, platform_browser_1, forms_1, AppRoot_1, http_1, primeng_1, angular2_notifications_1, session_store_1, authentication_service_1, users_store_1, users_service_1, providers_store_1, providers_service_1, medical_facilities_store_1, medical_facility_service_1, doctors_store_1, doctors_service_1, patients_store_1, patients_service_1, states_store_1, state_service_1, notifications_store_1, app_routes_1, validate_active_session_1, validate_inactive_session_1, login_1, signup_1, dashboard_1, patients_shell_1, patients_list_1, add_patient_1, patient_details_1, profile_patient_1, app_header_1, main_nav_1, notification_1, change_password_1, add_user_1, users_list_1, update_user_1, add_provider_1, providers_list_1, add_medical_facility_1, medical_facilities_list_1, add_doctor_1, update_doctor_1, doctors_list_1;
    var BootStraper;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (AppRoot_1_1) {
                AppRoot_1 = AppRoot_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (users_store_1_1) {
                users_store_1 = users_store_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (providers_store_1_1) {
                providers_store_1 = providers_store_1_1;
            },
            function (providers_service_1_1) {
                providers_service_1 = providers_service_1_1;
            },
            function (medical_facilities_store_1_1) {
                medical_facilities_store_1 = medical_facilities_store_1_1;
            },
            function (medical_facility_service_1_1) {
                medical_facility_service_1 = medical_facility_service_1_1;
            },
            function (doctors_store_1_1) {
                doctors_store_1 = doctors_store_1_1;
            },
            function (doctors_service_1_1) {
                doctors_service_1 = doctors_service_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            },
            function (patients_service_1_1) {
                patients_service_1 = patients_service_1_1;
            },
            function (states_store_1_1) {
                states_store_1 = states_store_1_1;
            },
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (validate_inactive_session_1_1) {
                validate_inactive_session_1 = validate_inactive_session_1_1;
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
            function (patients_list_1_1) {
                patients_list_1 = patients_list_1_1;
            },
            function (add_patient_1_1) {
                add_patient_1 = add_patient_1_1;
            },
            function (patient_details_1_1) {
                patient_details_1 = patient_details_1_1;
            },
            function (profile_patient_1_1) {
                profile_patient_1 = profile_patient_1_1;
            },
            function (app_header_1_1) {
                app_header_1 = app_header_1_1;
            },
            function (main_nav_1_1) {
                main_nav_1 = main_nav_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
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
            function (update_user_1_1) {
                update_user_1 = update_user_1_1;
            },
            function (add_provider_1_1) {
                add_provider_1 = add_provider_1_1;
            },
            function (providers_list_1_1) {
                providers_list_1 = providers_list_1_1;
            },
            function (add_medical_facility_1_1) {
                add_medical_facility_1 = add_medical_facility_1_1;
            },
            function (medical_facilities_list_1_1) {
                medical_facilities_list_1 = medical_facilities_list_1_1;
            },
            function (add_doctor_1_1) {
                add_doctor_1 = add_doctor_1_1;
            },
            function (update_doctor_1_1) {
                update_doctor_1 = update_doctor_1_1;
            },
            function (doctors_list_1_1) {
                doctors_list_1 = doctors_list_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            BootStraper = (function () {
                function BootStraper() {
                }
                BootStraper = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            app_routes_1.APP_ROUTER_PROVIDER,
                            primeng_1.InputTextModule,
                            primeng_1.DataTableModule,
                            primeng_1.ButtonModule,
                            primeng_1.DialogModule,
                            angular2_notifications_1.SimpleNotificationsModule
                        ],
                        declarations: [
                            AppRoot_1.AppRoot,
                            login_1.LoginComponent,
                            signup_1.SignupComponent,
                            dashboard_1.DashboardComponent,
                            patients_list_1.PatientsListComponent,
                            add_patient_1.AddPatientComponent,
                            patient_details_1.PatientDetailsComponent,
                            profile_patient_1.PatientProfileComponent,
                            patients_shell_1.PatientsShellComponent,
                            app_header_1.AppHeaderComponent,
                            main_nav_1.MainNavComponent,
                            change_password_1.ChangePasswordComponent,
                            notification_1.NotificationComponent,
                            add_user_1.AddUserComponent,
                            update_user_1.UpdateUserComponent,
                            users_list_1.UsersListComponent,
                            add_provider_1.AddProviderComponent,
                            providers_list_1.ProvidersListComponent,
                            add_medical_facility_1.AddMedicalFacilityComponent,
                            medical_facilities_list_1.MedicalFacilitiesListComponent,
                            add_doctor_1.AddDoctorComponent,
                            update_doctor_1.UpdateDoctorComponent,
                            doctors_list_1.DoctorsListComponent
                        ],
                        providers: [
                            session_store_1.SessionStore,
                            authentication_service_1.AuthenticationService,
                            users_store_1.UsersStore,
                            users_service_1.UsersService,
                            providers_store_1.ProvidersStore,
                            providers_service_1.ProvidersService,
                            medical_facilities_store_1.MedicalFacilityStore,
                            medical_facility_service_1.MedicalFacilityService,
                            doctors_store_1.DoctorsStore,
                            doctors_service_1.DoctorsService,
                            patients_store_1.PatientsStore,
                            patients_service_1.PatientsService,
                            states_store_1.StatesStore,
                            state_service_1.StateService,
                            notifications_store_1.NotificationsStore,
                            validate_active_session_1.ValidateActiveSession,
                            validate_inactive_session_1.ValidateInActiveSession,
                            http_1.Http,
                            http_1.HTTP_PROVIDERS,
                            forms_1.FormBuilder
                        ],
                        bootstrap: [
                            AppRoot_1.AppRoot
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BootStraper);
                return BootStraper;
            }());
            exports_1("BootStraper", BootStraper);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(BootStraper);
        }
    }
});
//# sourceMappingURL=bootstraper.js.map