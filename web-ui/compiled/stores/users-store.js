System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/users-service', './session-store', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Observable_1, users_service_1, session_store_1, immutable_1, Rx_1;
    var UsersStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            UsersStore = (function () {
                function UsersStore(_usersService, _sessionStore) {
                    var _this = this;
                    this._usersService = _usersService;
                    this._sessionStore = _sessionStore;
                    this._users = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this._selectedUsers = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                UsersStore.prototype.resetStore = function () {
                    this._users.next(this._users.getValue().clear());
                };
                Object.defineProperty(UsersStore.prototype, "users", {
                    get: function () {
                        return this._users.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UsersStore.prototype, "selectedUsers", {
                    get: function () {
                        return this._selectedUsers.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                UsersStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var accountId = this._sessionStore.session.account_id;
                    var promise = new Promise(function (resolve, reject) {
                        _this._usersService.getUsers(accountId).subscribe(function (users) {
                            _this._users.next(immutable_1.List(users));
                            resolve(users);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                UsersStore.prototype.findUserById = function (id) {
                    var users = this._users.getValue();
                    var index = users.findIndex(function (currentUser) { return currentUser.user.id === id; });
                    return users.get(index);
                };
                UsersStore.prototype.fetchUserById = function (id) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var matchedUser = _this.findUserById(id);
                        if (matchedUser) {
                            resolve(matchedUser);
                        }
                        else {
                            _this._usersService.getUser(id)
                                .subscribe(function (userDetail) {
                                resolve(userDetail);
                            }, function (error) {
                                reject(error);
                            });
                        }
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                UsersStore.prototype.addUser = function (userDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._usersService.addUser(userDetail).subscribe(function (user) {
                            _this._users.next(_this._users.getValue().push(user));
                            resolve(user);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                UsersStore.prototype.updateUser = function (userDetail) {
                    var _this = this;
                    var users = this._users.getValue();
                    var index = users.findIndex(function (currentUser) { return currentUser.user.id === userDetail.user.id; });
                    var promise = new Promise(function (resolve, reject) {
                        _this._usersService.updateUser(userDetail).subscribe(function (userDetail) {
                            _this._users.next(_this._users.getValue().push(userDetail));
                            resolve(userDetail);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                UsersStore.prototype.selectUser = function (userDetail) {
                    var selectedUsers = this._selectedUsers.getValue();
                    var index = selectedUsers.findIndex(function (currentUser) { return currentUser.user.id === userDetail.user.id; });
                    if (index < 0) {
                        this._selectedUsers.next(this._selectedUsers.getValue().push(userDetail));
                    }
                };
                UsersStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [users_service_1.UsersService, session_store_1.SessionStore])
                ], UsersStore);
                return UsersStore;
            }());
            exports_1("UsersStore", UsersStore);
        }
    }
});
//# sourceMappingURL=users-store.js.map