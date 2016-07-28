System.register(['../../models/user-details'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_details_1;
    var UserAdapter;
    return {
        setters:[
            function (user_details_1_1) {
                user_details_1 = user_details_1_1;
            }],
        execute: function() {
            UserAdapter = (function () {
                function UserAdapter() {
                }
                UserAdapter.parseResponse = function (userData) {
                    var user = null;
                    if (userData) {
                        user = new user_details_1.UserDetail({
                            user: userData.user,
                            contactInfo: userData.contactInfo,
                            address: userData.address
                        });
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