System.register(['@angular/core', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/state-service', './session-store', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, state_service_1, session_store_1, immutable_1, Rx_1;
    var StatesStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
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
            StatesStore = (function () {
                function StatesStore(_statesService, _sessionStore) {
                    var _this = this;
                    this._statesService = _statesService;
                    this._sessionStore = _sessionStore;
                    this._states = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                StatesStore.prototype.resetStore = function () {
                    this._states.next(this._states.getValue().clear());
                };
                Object.defineProperty(StatesStore.prototype, "states", {
                    get: function () {
                        return this._states.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                StatesStore.prototype.getStates = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._statesService.getStates().subscribe(function (states) {
                            _this._states.next(immutable_1.List(states));
                            resolve(states);
                        }, function (error) {
                            reject(error);
                        });
                    });
                };
                StatesStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [state_service_1.StateService, session_store_1.SessionStore])
                ], StatesStore);
                return StatesStore;
            }());
            exports_1("StatesStore", StatesStore);
        }
    }
});
//# sourceMappingURL=states-store.js.map