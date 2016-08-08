System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var UserDetailRecord, UserDetail;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            UserDetailRecord = immutable_1.Record({
                // account: null,
                user: null,
                address: null,
                contactInfo: null,
            });
            UserDetail = (function (_super) {
                __extends(UserDetail, _super);
                function UserDetail(props) {
                    _super.call(this, props);
                }
                return UserDetail;
            }(UserDetailRecord));
            exports_1("UserDetail", UserDetail);
        }
    }
});
//# sourceMappingURL=user-details.js.map