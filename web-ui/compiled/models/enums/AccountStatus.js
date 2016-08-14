System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccountStatus;
    return {
        setters:[],
        execute: function() {
            (function (AccountStatus) {
                AccountStatus[AccountStatus["active"] = 1] = "active";
                AccountStatus[AccountStatus["inActive"] = 2] = "inActive";
                AccountStatus[AccountStatus["suspended"] = 3] = "suspended";
                AccountStatus[AccountStatus["limited"] = 4] = "limited";
            })(AccountStatus || (AccountStatus = {}));
            exports_1("AccountStatus", AccountStatus);
        }
    }
});
//# sourceMappingURL=AccountStatus.js.map