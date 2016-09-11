System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppValidators;
    return {
        setters:[],
        execute: function() {
            AppValidators = (function () {
                function AppValidators() {
                }
                AppValidators.emailValidator = function (control) {
                    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (control.value && !regEx.test(control.value)) {
                        return { emailValidator: true };
                    }
                };
                AppValidators.mobileNoValidator = function (control) {
                    var regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if (control.value && !regEx.test(control.value)) {
                        return { mobileNoValidator: true };
                    }
                };
                AppValidators.matchingPasswords = function (passwordKey, confirmPasswordKey) {
                    return function (group) {
                        var password = group.controls[passwordKey];
                        var confirmPassword = group.controls[confirmPasswordKey];
                        if (password.value !== confirmPassword.value) {
                            return {
                                mismatchedPasswords: true
                            };
                        }
                    };
                };
                AppValidators.selectedValueValidator = function (control) {
                    if (!control.value) {
                        return { selectedValueValidator: true };
                    }
                };
                return AppValidators;
            }());
            exports_1("AppValidators", AppValidators);
        }
    }
});
//# sourceMappingURL=AppValidators.js.map