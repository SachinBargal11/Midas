System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var DoctorDetailRecord, DoctorDetail;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            DoctorDetailRecord = immutable_1.Record({
                doctor: null,
                user: null,
                address: null,
                contactInfo: null,
            });
            DoctorDetail = (function (_super) {
                __extends(DoctorDetail, _super);
                function DoctorDetail(props) {
                    _super.call(this, props);
                }
                return DoctorDetail;
            }(DoctorDetailRecord));
            exports_1("DoctorDetail", DoctorDetail);
        }
    }
});
//# sourceMappingURL=doctor-details.js.map