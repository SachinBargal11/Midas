System.register(['../../models/patient', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var patient_1, moment_1;
    var PatientAdapter;
    return {
        setters:[
            function (patient_1_1) {
                patient_1 = patient_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            PatientAdapter = (function () {
                function PatientAdapter() {
                }
                PatientAdapter.parseResponse = function (patientData) {
                    var patient = null;
                    if (patientData) {
                        patient = new patient_1.Patient({
                            id: patientData.id,
                            firstname: patientData.firstname,
                            lastname: patientData.lastname,
                            email: patientData.email,
                            mobileNo: patientData.mobileNo,
                            address: patientData.address,
                            dob: moment_1.default(patientData.dob)
                        });
                    }
                    return patient;
                };
                return PatientAdapter;
            }());
            exports_1("PatientAdapter", PatientAdapter);
        }
    }
});
//# sourceMappingURL=patient-adapter.js.map