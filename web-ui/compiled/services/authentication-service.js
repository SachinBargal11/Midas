System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/map', '../scripts/environment', './adapters/user-adapter', 'underscore', '../models/enums/AccountStatus', '../models/enums/UserType'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, environment_1, user_adapter_1, underscore_1, AccountStatus_1, UserType_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (environment_1_1) {
                environment_1 = environment_1_1;
            },
            function (user_adapter_1_1) {
                user_adapter_1 = user_adapter_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (AccountStatus_1_1) {
                AccountStatus_1 = AccountStatus_1_1;
            },
            function (UserType_1_1) {
                UserType_1 = UserType_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(_http) {
                    this._http = _http;
                    this._url = "" + environment_1.default.SERVICE_BASE_URL;
                }
                AuthenticationService.prototype.register = function (accountDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        var accountDetailRequestData;
                        try {
                            accountDetailRequestData = accountDetail.toJS();
                            // add/replace values which need to be changed
                            underscore_1.default.extend(accountDetailRequestData.user, {
                                userType: UserType_1.UserType[accountDetailRequestData.user.userType],
                                dateOfBirth: accountDetailRequestData.user.dateOfBirth ? accountDetailRequestData.user.dateOfBirth.toISOString() : null
                            });
                            underscore_1.default.extend(accountDetailRequestData.account, {
                                status: AccountStatus_1.AccountStatus[accountDetailRequestData.account.status]
                            });
                            // remove unneeded keys 
                            accountDetailRequestData.user = underscore_1.default.omit(accountDetailRequestData.user, 'accountID', 'gender', 'status', 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                            accountDetailRequestData.address = underscore_1.default.omit(accountDetailRequestData.address, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                            accountDetailRequestData.contactInfo = underscore_1.default.omit(accountDetailRequestData.contactInfo, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                            accountDetailRequestData.account = underscore_1.default.omit(accountDetailRequestData.account, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                        }
                        catch (error) {
                            reject(error);
                        }
                        return _this._http.post(_this._url + '/Account/Signup', JSON.stringify(accountDetailRequestData), {
                            headers: headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data.errorMessage) {
                                reject(new Error(data.errorMessage));
                            }
                            else {
                                resolve(data);
                            }
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                AuthenticationService.prototype.authenticate = function (email, password) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var promise = new Promise(function (resolve, reject) {
                        var autheticateRequestData = {
                            user: {
                                'userName': email,
                                'password': password
                            }
                        };
                        return _this._http.post(_this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                            headers: headers
                        }).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data) {
                                var user = user_adapter_1.UserAdapter.parseUserResponse(data);
                                resolve(user);
                            }
                            else {
                                reject(new Error('INVALID_CREDENTIALS'));
                            }
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                AuthenticationService.prototype.authenticatePassword = function (userName, oldpassword) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var promise = new Promise(function (resolve, reject) {
                        var autheticateRequestData = {
                            user: {
                                'userName': userName,
                                'password': oldpassword
                            }
                        };
                        return _this._http.post(_this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                            headers: headers
                        }).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data) {
                                var user = user_adapter_1.UserAdapter.parseUserResponse(data);
                                resolve(user);
                            }
                            else {
                                reject(new Error('INVALID_CREDENTIALS'));
                            }
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                AuthenticationService.prototype.updatePassword = function (userId, newpassword) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        return _this._http.patch(_this._url + "/" + userId, JSON.stringify(newpassword), {
                            headers: headers
                        }).map(function (res) { return res.json(); }).subscribe(function (data) {
                            if (data.length) {
                                var user = user_adapter_1.UserAdapter.parseResponse(data[0]);
                                resolve(data);
                            }
                            else {
                                resolve(data);
                            }
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication-service.js.map