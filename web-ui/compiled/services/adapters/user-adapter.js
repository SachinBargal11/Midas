System.register(['../../models/user', 'underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1, underscore_1;
    var UserAdapter;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            UserAdapter = (function () {
                function UserAdapter() {
                }
                UserAdapter.parseResponse = function (userData) {
                    var user = null;
                    if (userData) {
                        var tempUser = underscore_1.default.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
                        user = new user_1.User(tempUser);
                    }
                    return user;
                };
                return UserAdapter;
            }());
            exports_1("UserAdapter", UserAdapter);
        }
    }
});
//# sourceMappingURL=user-adapter.js.map