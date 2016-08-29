System.register(['./guards/validate-active-session', '../components/pages/doctors/add-doctor', '../components/pages/doctors/update-doctor', '../components/pages/doctors/doctors-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validate_active_session_1, add_doctor_1, update_doctor_1, doctors_list_1;
    var DoctorsRoutes;
    return {
        setters:[
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
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
            exports_1("DoctorsRoutes", DoctorsRoutes = [
                {
                    path: 'doctors',
                    component: doctors_list_1.DoctorsListComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'doctors/add',
                    component: add_doctor_1.AddDoctorComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'doctors/update/:id',
                    component: update_doctor_1.UpdateDoctorComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ]);
        }
    }
});
//# sourceMappingURL=doctor-routes.js.map