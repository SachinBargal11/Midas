System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var MedicalFacilityRecord, MedicalFacilityDetail;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            MedicalFacilityRecord = immutable_1.Record({
                account: null,
                user: null,
                address: null,
                contactInfo: null,
                medicalFacility: null,
            });
            MedicalFacilityDetail = (function (_super) {
                __extends(MedicalFacilityDetail, _super);
                function MedicalFacilityDetail(props) {
                    _super.call(this, props);
                }
                return MedicalFacilityDetail;
            }(MedicalFacilityRecord));
            exports_1("MedicalFacilityDetail", MedicalFacilityDetail);
        }
    }
});
//# sourceMappingURL=medical-facility-details.js.map