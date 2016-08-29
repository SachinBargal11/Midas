System.register(['../../models/medical-facility-details', 'underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var medical_facility_details_1, underscore_1;
    var MedicalFacilityAdapter;
    return {
        setters:[
            function (medical_facility_details_1_1) {
                medical_facility_details_1 = medical_facility_details_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            MedicalFacilityAdapter = (function () {
                function MedicalFacilityAdapter() {
                }
                // static parseMedicalFacilityResponse(medicalFacilityData: any): MedicalFacility {
                //     let medicalFacility = null;
                //     let tempMedicalFacility = _.omit(medicalFacilityData, 'defaultAttorneyUserid', 'updateDate');
                //     if (medicalFacilityData) {
                //          medicalFacility = new MedicalFacility({
                //             name: medicalFacilityData.name,
                //             prefix: medicalFacilityData.prefix,
                //             // defaultAttorneyUserid: medicalFacilityData.defaultAttorneyUserid
                //          });
                //     }
                //     return medicalFacility;
                // }
                MedicalFacilityAdapter.parseResponse = function (medicalFacilityData) {
                    var medicalFacility = null;
                    var tempMedicalFacility = underscore_1.default.omit(medicalFacilityData, 'address', 'contactInfo', 'updateDate');
                    if (medicalFacilityData) {
                        medicalFacility = new medical_facility_details_1.MedicalFacilityDetail({
                            medicalfacility: tempMedicalFacility,
                            account: medicalFacilityData.account,
                            user: medicalFacilityData.user,
                            address: medicalFacilityData.address,
                            contactInfo: medicalFacilityData.contactInfo
                        });
                    }
                    return medicalFacility;
                };
                return MedicalFacilityAdapter;
            }());
            exports_1("MedicalFacilityAdapter", MedicalFacilityAdapter);
        }
    }
});
//# sourceMappingURL=medical-facility-adapter.js.map