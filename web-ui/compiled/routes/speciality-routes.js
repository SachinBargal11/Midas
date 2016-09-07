System.register(['./guards/validate-active-session', '../components/pages/speciality/add-speciality', '../components/pages/speciality/update-speciality', '../components/pages/speciality/speciality-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validate_active_session_1, add_speciality_1, update_speciality_1, speciality_list_1;
    var SpecialityRoutes;
    return {
        setters:[
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (add_speciality_1_1) {
                add_speciality_1 = add_speciality_1_1;
            },
            function (update_speciality_1_1) {
                update_speciality_1 = update_speciality_1_1;
            },
            function (speciality_list_1_1) {
                speciality_list_1 = speciality_list_1_1;
            }],
        execute: function() {
            exports_1("SpecialityRoutes", SpecialityRoutes = [
                {
                    path: 'specialities',
                    component: speciality_list_1.SpecialityListComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'specialities/add',
                    component: add_speciality_1.AddSpecialityComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'specialities/update/:id',
                    component: update_speciality_1.UpdateSpecialityComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ]);
        }
    }
});
//# sourceMappingURL=speciality-routes.js.map