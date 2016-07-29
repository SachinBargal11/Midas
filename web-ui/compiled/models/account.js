System.register(['immutable', './enums/AccountStatus'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, AccountStatus_1;
    var AccountRecord, Account;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AccountStatus_1_1) {
                AccountStatus_1 = AccountStatus_1_1;
            }],
        execute: function() {
            AccountRecord = immutable_1.Record({
                id: 0,
                name: "",
                status: AccountStatus_1.AccountStatus.active,
                isDeleted: 0,
                createByUserID: 0,
                updateByUserID: 0,
                createDate: null,
                updateDate: null
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