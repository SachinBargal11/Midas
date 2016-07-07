System.register(['@angular/core', '@angular/router', '../stores/session-store'], function(exports_1, context_1) {
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
    var core_1, router_1, session_store_1;
    var AuthGuard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            }],
        execute: function() {
            AuthGuard = (function () {
                function AuthGuard(_sessionStore, _router) {
                    this._sessionStore = _sessionStore;
                    this._router = _router;
                }
                AuthGuard.prototype.canActivate = function (next, state) {
                    if (this._sessionStore.isAuthenticated()) {
                        return true;
                    }
                    this._router.navigate(['/login']);
                    return false;
                };
                AuthGuard = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof session_store_1.SessionStore !== 'undefined' && session_store_1.SessionStore) === 'function' && _a) || Object, router_1.Router])
                ], AuthGuard);
                return AuthGuard;
                var _a;
            }());
            exports_1("AuthGuard", AuthGuard);
        }
    }
});
//# sourceMappingURL=auth-guard.js.map