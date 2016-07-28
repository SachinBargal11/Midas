System.register(['immutable', './enums/UserType', './enums/Gender'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, UserType_1, Gender_1;
    var UserRecord, User;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (UserType_1_1) {
                UserType_1 = UserType_1_1;
            },
            function (Gender_1_1) {
                Gender_1 = Gender_1_1;
            }],
        execute: function() {
            UserRecord = immutable_1.Record({
                id: 0,
                name: "",
                userType: UserType_1.UserType.Admin,
                accountID: 1,
                userName: "",
                firstName: "",
                middleName: "",
                lastName: "",
                gender: Gender_1.Gender.Male,
                imageLink: "",
                address: null,
                contact: null,
                dateOfBirth: null,
                password: "",
                isDeleted: false,
                createByUserID: 0,
                updateByUserID: 0,
                createDate: null,
                updateDate: null //Moment
            });
            User = (function (_super) {
                __extends(User, _super);
                function User(props) {
                    _super.call(this, props);
                }
                Object.defineProperty(User.prototype, "displayName", {
                    get: function () {
                        // return this.firstName + " " + this.lastName;
                        return this.name;
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