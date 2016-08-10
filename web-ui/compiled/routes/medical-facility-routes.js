System.register(['./guards/validate-active-session', '../components/pages/medical-facilities/add-medical-facility', '../components/pages/medical-facilities/medical-facilities-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validate_active_session_1, add_medical_facility_1, medical_facilities_list_1;
    var MedicalFacilitiesRoutes;
    return {
        setters:[
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (add_medical_facility_1_1) {
                add_medical_facility_1 = add_medical_facility_1_1;
            },
            function (medical_facilities_list_1_1) {
                medical_facilities_list_1 = medical_facilities_list_1_1;
            }],
        execute: function() {
            exports_1("MedicalFacilitiesRoutes", MedicalFacilitiesRoutes = [
                {
                    path: 'medical-facilities',
                    component: medical_facilities_list_1.MedicalFacilitiesListComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'medical-facilities/add',
                    component: add_medical_facility_1.AddMedicalFacilityComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ]);
        }
    }
});
//# sourceMappingURL=medical-facility-routes.js.map