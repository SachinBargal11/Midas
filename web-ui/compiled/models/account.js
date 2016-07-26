System.register(['immutable', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, moment_1;
    var AccountRecord, Account;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            AccountRecord = immutable_1.Record({
                id: 0,
                name: "",
                addressID: 2,
                contactInfoID: 3,
                isDeleted: true,
                createByUserID: 0,
                updateByUserID: 0,
                createDate: moment_1.default(),
                updateDate: moment_1.default()
            });
            Account = (function (_super) {
                __extends(Account, _super);
                function Account(props) {
                    _super.call(this, props);
                }
                Object.defineProperty(Account.prototype, "displayName", {
                    get: function () {
                        return this.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Account;
            }(AccountRecord));
            exports_1("Account", Account);
        }
    }
});
//# sourceMappingURL=account.js.map