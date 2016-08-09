System.register(['./guards/validate-active-session', '../components/pages/providers/add-provider', '../components/pages/providers/providers-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validate_active_session_1, add_provider_1, providers_list_1;
    var ProvidersRoutes;
    return {
        setters:[
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (add_provider_1_1) {
                add_provider_1 = add_provider_1_1;
            },
            function (providers_list_1_1) {
                providers_list_1 = providers_list_1_1;
            }],
        execute: function() {
            exports_1("ProvidersRoutes", ProvidersRoutes = [
                {
                    path: 'providers',
                    component: providers_list_1.ProvidersListComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'providers/add',
                    component: add_provider_1.AddProviderComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ]);
        }
    }
});
//# sourceMappingURL=provider-routes.js.map