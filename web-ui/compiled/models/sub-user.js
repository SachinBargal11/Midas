System.register(['immutable', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, moment_1;
    var UserRecord, AddressRecord, ContactAddress, SubUserRecord, SubUser;
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
                UserID: 0,
                AccountID: 0,
                UserName: "",
                MiddleName: "",
                LastName: "",
                Gender: "",
                UserType: 0,
                ReferencefromUserTypetableImageLink: "",
                DateOfBirth: moment_1.default(),
                Password: "",
                CreateByUserID: 0
            });
            AddressRecord = immutable_1.Record({
                id: 0,
                firstname: "",
                lastname: "",
                email: "",
                mobileNo: "",
                address: "",
                dob: moment_1.default(),
                createdUser: 0
            });
            ContactAddress = immutable_1.Record({});
            SubUserRecord = immutable_1.Record({
                UserData: {
                    UserInfo: UserRecord,
                    AddressInfo: AddressRecord,
                    ContactInfo: ContactAddress
                }
            });
            SubUser = (function (_super) {
                __extends(SubUser, _super);
                function SubUser(props) {
                    _super.call(this, props);
                }
                return SubUser;
            }(SubUserRecord));
            exports_1("SubUser", SubUser);
        }
    }
});
//# sourceMappingURL=sub-user.js.map