System.register(['@angular/platform-browser-dynamic', '@angular/router', '../components/AppRoot', '@angular/core', '@angular/common', '@angular/http', '../stores/session-store', '../services/authentication-service', '../stores/patients-store', '../services/patients-service', '../stores/notifications-store', '../routes/app-routes', '../routes/guards/validate-active-session', '../routes/guards/validate-inactive-session'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, router_1, AppRoot_1, core_1, common_1, http_1, session_store_1, authentication_service_1, patients_store_1, patients_service_1, notifications_store_1, app_routes_1, validate_active_session_1, validate_inactive_session_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AppRoot_1_1) {
                AppRoot_1 = AppRoot_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            },
            function (patients_service_1_1) {
                patients_service_1 = patients_service_1_1;
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
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(AppRoot_1.AppRoot, [
                router_1.ROUTER_DIRECTIVES,
                http_1.HTTP_PROVIDERS,
                session_store_1.SessionStore,
                authentication_service_1.AuthenticationService,
                patients_service_1.PatientsService,
                patients_store_1.PatientsStore,
                notifications_store_1.NotificationsStore,
                app_routes_1.APP_ROUTER_PROVIDER,
                validate_active_session_1.ValidateActiveSession,
                validate_inactive_session_1.ValidateInActiveSession,
                core_1.provide(common_1.LocationStrategy, {
                    useValue: [router_1.ROUTER_DIRECTIVES],
                    useClass: common_1.HashLocationStrategy
                })
            ]);
        }
    }
});
//# sourceMappingURL=bootstraper.js.map