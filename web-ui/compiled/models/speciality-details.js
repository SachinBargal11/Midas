System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var SpecialityDetailRecord, SpecialityDetail;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            SpecialityDetailRecord = immutable_1.Record({
                id: 0,
                isUnitApply: 1,
                followUpDays: 0,
                followupTime: 0,
                initialDays: 0,
                initialTime: 0,
                isInitialEvaluation: 1,
                include1500: 1,
                associatedSpeciality: 0,
                allowMultipleVisit: 1
            });
            SpecialityDetail = (function (_super) {
                __extends(SpecialityDetail, _super);
                function SpecialityDetail(props) {
                    _super.call(this, props);
                }
                return SpecialityDetail;
            }(SpecialityDetailRecord));
            exports_1("SpecialityDetail", SpecialityDetail);
        }
    }
});
//# sourceMappingURL=speciality-details.js.map