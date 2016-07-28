System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccountStatus;
    return {
        setters:[],
        execute: function() {
            (function (AccountStatus) {
                AccountStatus[AccountStatus["Active"] = 1] = "Active";
                AccountStatus[AccountStatus["InActive"] = 2] = "InActive";
                AccountStatus[AccountStatus["Suspended"] = 3] = "Suspended";
                AccountStatus[AccountStatus["Limited"] = 4] = "Limited";
            })(AccountStatus || (AccountStatus = {}));
            exports_1("AccountStatus", AccountStatus);
        }
    }
});
//# sourceMappingURL=AccountStatus.js.map