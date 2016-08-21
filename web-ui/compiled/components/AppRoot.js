System.register(['@angular/core', '@angular/router', '../stores/session-store', '../stores/notifications-store', '../stores/states-store'], function(exports_1, context_1) {
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
    var core_1, router_1, session_store_1, notifications_store_1, states_store_1;
    var AppRoot;
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
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (states_store_1_1) {
                states_store_1 = states_store_1_1;
            }],
        execute: function() {
            AppRoot = (function () {
                function AppRoot(_router, _sessionStore, _notificationsStore, _statesStore) {
                    this._router = _router;
                    this._sessionStore = _sessionStore;
                    this._notificationsStore = _notificationsStore;
                    this._statesStore = _statesStore;
                }
                AppRoot.prototype.ngOnInit = function () {
                    var _this = this;
                    this._sessionStore.authenticate().subscribe(function (response) {
                    }, function (error) {
                        _this._router.navigate(['/login']);
                    }),
                        this._statesStore.getStates();
                };
                AppRoot = __decorate([
                    core_1.Component({
                        selector: 'app-root',
                        templateUrl: 'templates/AppRoot.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, session_store_1.SessionStore, notifications_store_1.NotificationsStore, states_store_1.StatesStore])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
        }
    }
});
//# sourceMappingURL=AppRoot.js.map