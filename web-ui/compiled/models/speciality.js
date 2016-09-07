System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var SpecialtyRecord, Specialty;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            SpecialtyRecord = immutable_1.Record({
                specialty: {
                    id: 0,
                    name: '',
                    specialityCode: '',
                    isDeleted: 0,
                    createByUserID: 0,
                    updateByUserID: 0,
                    createDate: null,
                    updateDate: null
                }
            });
            Specialty = (function (_super) {
                __extends(Specialty, _super);
                function Specialty(props) {
                    _super.call(this, props);
                }
                return Specialty;
            }(SpecialtyRecord));
            exports_1("Specialty", Specialty);
        }
    }
});
//# sourceMappingURL=speciality.js.map