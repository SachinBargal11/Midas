System.register(['@angular/core', '@angular/http', 'underscore', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../scripts/environment', '../stores/session-store', './adapters/user-adapter', '../models/enums/UserType'], function(exports_1, context_1) {
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
    var core_1, http_1, underscore_1, Observable_1, environment_1, session_store_1, user_adapter_1, UserType_1;
    var UsersService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (environment_1_1) {
                environment_1 = environment_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (user_adapter_1_1) {
                user_adapter_1 = user_adapter_1_1;
            },
            function (UserType_1_1) {
                UserType_1 = UserType_1_1;
            }],
        execute: function() {
            UsersService = (function () {
                function UsersService(_http, _sessionStore) {
                    this._http = _http;
                    this._sessionStore = _sessionStore;
                    this._url = "" + environment_1.default.SERVICE_BASE_URL;
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                UsersService.prototype.getUsers = function (accountId) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.post(_this._url + "/Account/Get", JSON.stringify({ "id": accountId }), {
                            headers: _this._headers
                        }).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var users = data.users.map(function (userData) {
                                return user_adapter_1.UserAdapter.parseResponse(userData);
                            });
                            resolve(users);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                UsersService.prototype.addUser = function (userDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var userDetailRequestData = userDetail.toJS();
                        // add/replace values which need to be changed
                        underscore_1.default.extend(userDetailRequestData.user, {
                            userType: UserType_1.UserType[userDetailRequestData.user.userType],
                            dateOfBirth: userDetailRequestData.user.dateOfBirth ? userDetailRequestData.user.dateOfBirth.toISOString() : null
                        });
                        // remove unneeded keys 
                        userDetailRequestData.user = underscore_1.default.omit(userDetailRequestData.user, 'gender', 'status', 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                        userDetailRequestData.address = underscore_1.default.omit(userDetailRequestData.address, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                        userDetailRequestData.contactInfo = underscore_1.default.omit(userDetailRequestData.contactInfo, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                        return _this._http.post(_this._url + '/User/Add', JSON.stringify(userDetailRequestData), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (userData) {
                            var parsedUser = null;
                            parsedUser = user_adapter_1.UserAdapter.parseResponse(userData);
                            resolve(parsedUser);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                UsersService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_store_1.SessionStore])
                ], UsersService);
                return UsersService;
            }());
            exports_1("UsersService", UsersService);
        }
    }
});
//# sourceMappingURL=users-service.js.map