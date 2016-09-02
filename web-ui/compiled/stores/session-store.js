System.register(['@angular/core', 'rxjs/Observable', '../services/authentication-service', '../models/user', '../models/session'], function(exports_1, context_1) {
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
    var core_1, Observable_1, authentication_service_1, user_1, session_1;
    var SessionStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            }],
        execute: function() {
            SessionStore = (function () {
                function SessionStore(_authenticationService) {
                    this._authenticationService = _authenticationService;
                    this.userLogoutEvent = new core_1.EventEmitter(true);
                    this._session = new session_1.Session();
                    this.__USER_STORAGE_KEY__ = 'logged_user';
                }
                Object.defineProperty(SessionStore.prototype, "session", {
                    get: function () {
                        return this._session;
                    },
                    enumerable: true,
                    configurable: true
                });
                SessionStore.prototype.isAuthenticated = function () {
                    return this.session.user ? true : false;
                };
                SessionStore.prototype.authenticate = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var storedUser = window.localStorage.getItem(_this.__USER_STORAGE_KEY__);
                        if (storedUser) {
                            var user = new user_1.User(JSON.parse(storedUser));
                            _this._populateSession(user);
                            resolve(_this._session);
                        }
                        else {
                            reject(new Error('SAVED_AUTHENTICATION_NOT_FOUND'));
                        }
                    });
                    return Observable_1.Observable.from(promise);
                };
                SessionStore.prototype.login = function (userId, password) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._authenticationService.authenticate(userId, password).subscribe(function (user) {
                            _this._populateSession(user);
                            resolve(_this._session);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                SessionStore.prototype.logout = function () {
                    this._resetSession();
                    window.localStorage.removeItem(this.__USER_STORAGE_KEY__);
                };
                SessionStore.prototype.authenticatePassword = function (userName, oldpassword) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._authenticationService.authenticatePassword(userName, oldpassword).subscribe(function (user) {
                            resolve(user);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                SessionStore.prototype._populateSession = function (user) {
                    this._session.user = user;
                    window.localStorage.setItem(this.__USER_STORAGE_KEY__, JSON.stringify(user.toJS()));
                };
                SessionStore.prototype._resetSession = function () {
                    this.session.user = null;
                    this.userLogoutEvent.emit(null);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SessionStore.prototype, "userLogoutEvent", void 0);
                SessionStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [authentication_service_1.AuthenticationService])
                ], SessionStore);
                return SessionStore;
            }());
            exports_1("SessionStore", SessionStore);
        }
    }
});
//# sourceMappingURL=session-store.js.map