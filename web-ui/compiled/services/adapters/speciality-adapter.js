System.register(['../../models/speciality'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var speciality_1;
    var SpecialityAdapter;
    return {
        setters:[
            function (speciality_1_1) {
                speciality_1 = speciality_1_1;
            }],
        execute: function() {
            SpecialityAdapter = (function () {
                function SpecialityAdapter() {
                }
                SpecialityAdapter.parseResponse = function (specialtyData) {
                    var specialty = null;
                    var tempSpeciality = _.omit(specialtyData, 'updateDate');
                    if (specialtyData) {
                        specialty = new speciality_1.Speciality({
                            specialty: {
                                id: specialtyData.id,
                                name: specialtyData.name,
                                specialityCode: specialtyData.specialityCode
                            }
                        });
                    }
                    return specialty;
                };
                return SpecialityAdapter;
            }());
            exports_1("SpecialityAdapter", SpecialityAdapter);
        }
    }
});
//# sourceMappingURL=speciality-adapter.js.map