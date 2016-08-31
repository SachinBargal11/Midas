System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var DoctorRecord, Doctor;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            DoctorRecord = immutable_1.Record({
                id: 0,
                licenseNumber: '',
                wcbAuthorization: '',
                wcbRatingCode: '',
                npi: '',
                federalTaxId: '',
                taxType: '',
                assignNumber: '',
                title: '',
                isDeleted: 0,
                createByUserId: 0,
                updateByUserId: 0,
                createDate: null,
                updateDate: null //Moment
            });
            Doctor = (function (_super) {
                __extends(Doctor, _super);
                function Doctor(props) {
                    _super.call(this, props);
                }
                return Doctor;
            }(DoctorRecord));
            exports_1("Doctor", Doctor);
        }
    }
});
//# sourceMappingURL=doctor.js.map