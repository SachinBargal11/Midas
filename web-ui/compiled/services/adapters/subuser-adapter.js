System.register(['../../models/sub-user', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var sub_user_1, moment_1;
    var SubUserAdapter;
    return {
        setters:[
            function (sub_user_1_1) {
                sub_user_1 = sub_user_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            SubUserAdapter = (function () {
                function SubUserAdapter() {
                }
                SubUserAdapter.parseResponse = function (subuserData) {
                    var subuser = null;
                    if (subuserData) {
                        subuser = new sub_user_1.SubUser({
                            id: subuserData.id,
                            firstname: subuserData.firstname,
                            lastname: subuserData.lastname,
                            email: subuserData.email,
                            mobileNo: subuserData.mobileNo,
                            address: subuserData.address,
                            dob: moment_1.default(subuserData.dob)
                        });
                    }
                    return subuser;
                };
                return SubUserAdapter;
            }());
            exports_1("SubUserAdapter", SubUserAdapter);
        }
    }
});
//# sourceMappingURL=subuser-adapter.js.map