System.register(['../components/pages/patients/patients-list', '../components/pages/patients/patient-details', '../components/pages/patients/add-patient', '../components/pages/patients/patients-shell', '../components/pages/patients/profile-patient'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var patients_list_1, patient_details_1, add_patient_1, patients_shell_1, profile_patient_1;
    var PatientsShellRoutes;
    return {
        setters:[
            function (patients_list_1_1) {
                patients_list_1 = patients_list_1_1;
            },
            function (patient_details_1_1) {
                patient_details_1 = patient_details_1_1;
            },
            function (add_patient_1_1) {
                add_patient_1 = add_patient_1_1;
            },
            function (patients_shell_1_1) {
                patients_shell_1 = patients_shell_1_1;
            },
            function (profile_patient_1_1) {
                profile_patient_1 = profile_patient_1_1;
            }],
        execute: function() {
            exports_1("PatientsShellRoutes", PatientsShellRoutes = [
                {
                    path: 'patients',
                    component: patients_shell_1.PatientsShellComponent,
                    children: [
                        {
                            path: '',
                            component: patients_list_1.PatientsListComponent
                        },
                        {
                            path: 'add',
                            component: add_patient_1.AddPatientComponent
                        },
                        {
                            path: ':id',
                            component: patient_details_1.PatientDetailsComponent,
                            children: [
                                {
                                    path: '',
                                    component: profile_patient_1.PatientProfileComponent
                                }
                            ]
                        }
                    ]
                }
            ]);
        }
    }
});
//# sourceMappingURL=patient-routes.js.map