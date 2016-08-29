System.register(['../../models/doctor-details', 'underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var doctor_details_1, underscore_1;
    var DoctorAdapter;
    return {
        setters:[
            function (doctor_details_1_1) {
                doctor_details_1 = doctor_details_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            DoctorAdapter = (function () {
                function DoctorAdapter() {
                }
                // static parseDoctorResponse(doctorData: any): Doctor {
                //     let doctor = null;
                //     if (doctorData) {
                //         let tempDoctor = _.omit(doctorData, 'updateDate');
                //         if (doctorData.doctor) {
                //             tempDoctor.user = doctorData.user.id;
                //         }
                //         doctor = new Doctor(tempDoctor);
                //     }
                //     return doctor;
                // }
                DoctorAdapter.parseResponse = function (doctorData) {
                    var doctor = null;
                    var tempDoctor = underscore_1.default.omit(doctorData, 'updateDate');
                    if (doctorData) {
                        doctor = new doctor_details_1.DoctorDetail({
                            doctor: tempDoctor,
                            user: doctorData.user,
                            address: doctorData.address,
                            contactInfo: doctorData.contactInfo
                        });
                    }
                    return doctor;
                };
                return DoctorAdapter;
            }());
            exports_1("DoctorAdapter", DoctorAdapter);
        }
    }
});
//# sourceMappingURL=doctor-adapter.js.map