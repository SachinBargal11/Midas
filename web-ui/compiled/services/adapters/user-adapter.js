System.register(['../../models/user', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1, moment_1;
    var UserAdapter;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            UserAdapter = (function () {
                function UserAdapter() {
                }
                UserAdapter.parseResponse = function (userData) {
                    var user = null;
                    if (userData) {
                        user = new user_1.User({
                            id: userData.id,
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            email: userData.email,
                            mobileNo: userData.mobileNo,
                            address: userData.address,
                            dob: moment_1.default(userData.dob)
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