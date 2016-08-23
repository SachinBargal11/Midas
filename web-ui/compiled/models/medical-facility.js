System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var MedicalFacilityRecord, MedicalFacility;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            MedicalFacilityRecord = immutable_1.Record({
                id: 0,
                name: '',
                prefix: '',
                defaultAttorneyUserid: 0,
                isDeleted: 0,
                createByUserId: 0,
                updateByUserId: 0,
                createDate: null,
                updateDate: null //Moment
            });
            MedicalFacility = (function (_super) {
                __extends(MedicalFacility, _super);
                function MedicalFacility(props) {
                    _super.call(this, props);
                }
                return MedicalFacility;
            }(MedicalFacilityRecord));
            exports_1("MedicalFacility", MedicalFacility);
        }
    }
});
//# sourceMappingURL=medical-facility.js.map