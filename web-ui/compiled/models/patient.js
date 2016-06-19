// import {Moment} from 'moment';
// export interface Patient {
System.register(['immutable', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, moment_1;
    var PatientRecord, Patient;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            PatientRecord = immutable_1.Record({
                id: 0,
                firstname: "",
                lastname: "",
                email: "",
                mobileNo: "",
                address: "",
                dob: moment_1.default(0),
                createdUser: 0
            });
            Patient = (function (_super) {
                __extends(Patient, _super);
                function Patient(props) {
                    _super.call(this, props);
                }
                return Patient;
            }(PatientRecord));
            exports_1("Patient", Patient);
        }
    }
});
//# sourceMappingURL=patient.js.map