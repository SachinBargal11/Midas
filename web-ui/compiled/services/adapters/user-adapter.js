System.register(['../../models/user', '../../models/user-details', 'underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1, user_details_1, underscore_1;
    var UserAdapter;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_details_1_1) {
                user_details_1 = user_details_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            UserAdapter = (function () {
                function UserAdapter() {
                }
                UserAdapter.parseUserResponse = function (userData) {
                    var user = null;
                    if (userData) {
                        // let tempUser = _.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
                        var tempUser = underscore_1.default.omit(userData, 'account', 'updateDate');
                        if (userData.account) {
                            tempUser.accountId = userData.account.id;
                        }
                        user = new user_1.User(tempUser);
                    }
                    return user;
                };
                UserAdapter.parseResponse = function (userData) {
                    var user = null;
                    // let tempUser = _.omit(userData, 'address', 'account', 'contactInfo', 'updateDate');
                    var tempUser = underscore_1.default.omit(userData, 'account', 'updateDate');
                    if (userData) {
                        user = new user_details_1.UserDetail({
                            user: tempUser,
                            address: userData.address,
                            contactInfo: userData.contactInfo,
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