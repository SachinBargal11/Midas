System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserType;
    return {
        setters:[],
        execute: function() {
            (function (UserType) {
                UserType[UserType["Admin"] = 1] = "Admin";
                UserType[UserType["Owner"] = 2] = "Owner";
                UserType[UserType["Doctor"] = 3] = "Doctor";
                UserType[UserType["Patient"] = 4] = "Patient";
                UserType[UserType["Attorney"] = 5] = "Attorney";
                UserType[UserType["Adjuster"] = 6] = "Adjuster";
                UserType[UserType["Accounts"] = 7] = "Accounts";
            })(UserType || (UserType = {}));
            exports_1("UserType", UserType);
        }
    }
});
//# sourceMappingURL=UserType.js.map