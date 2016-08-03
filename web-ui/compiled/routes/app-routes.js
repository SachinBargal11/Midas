System.register(['@angular/router', '../components/pages/login', '../components/pages/signup', '../components/pages/dashboard', './patient-routes', './user-routes', './guards/validate-active-session', './guards/validate-inactive-session', '../components/pages/change-password'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, login_1, signup_1, dashboard_1, patient_routes_1, user_routes_1, validate_active_session_1, validate_inactive_session_1, change_password_1;
    var appRoutes, APP_ROUTER_PROVIDER;
    return {
        setters:[
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
            function (patient_routes_1_1) {
                patient_routes_1 = patient_routes_1_1;
            },
            function (user_routes_1_1) {
                user_routes_1 = user_routes_1_1;
            },
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (validate_inactive_session_1_1) {
                validate_inactive_session_1 = validate_inactive_session_1_1;
            },
            function (change_password_1_1) {
                change_password_1 = change_password_1_1;
            }],
        execute: function() {
            exports_1("appRoutes", appRoutes = [
                {
                    path: '',
                    redirectTo: '/dashboard',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: login_1.LoginComponent,
                    canActivate: [validate_inactive_session_1.ValidateInActiveSession]
                },
                {
                    path: 'signup',
                    component: signup_1.SignupComponent,
                    canActivate: [validate_inactive_session_1.ValidateInActiveSession]
                },
                {
                    path: 'change-password',
                    component: change_password_1.ChangePasswordComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'dashboard',
                    component: dashboard_1.DashboardComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ].concat(user_routes_1.UsersRoutes, patient_routes_1.PatientsShellRoutes));
            exports_1("APP_ROUTER_PROVIDER", APP_ROUTER_PROVIDER = router_1.provideRouter(appRoutes));
        }
    }
});
//# sourceMappingURL=app-routes.js.map