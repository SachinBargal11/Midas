System.register(['immutable', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, moment_1;
    var UserRecord, User;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            UserRecord = immutable_1.Record({
                id: 0,
                userType: 1,
                accountID: 1,
                userName: "",
                firstName: "",
                middleName: "",
                lastName: "",
                gender: 1,
                imageLink: "",
                addressID: 7,
                contactInfoID: 8,
                dateOfBirth: moment_1.default(),
                password: "",
                isDeleted: true,
                createByUserID: 0,
                updateByUserID: 0,
                createDate: moment_1.default(),
                updateDate: moment_1.default()
            });
            User = (function (_super) {
                __extends(User, _super);
                function User(props) {
                    _super.call(this, props);
                }
                Object.defineProperty(User.prototype, "displayName", {
                    get: function () {
                        return this.firstName + " " + this.lastName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return User;
            }(UserRecord));
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map