System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/providers-service', './session-store', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Observable_1, providers_service_1, session_store_1, immutable_1, Rx_1;
    var ProvidersStore;
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
            function (providers_service_1_1) {
                providers_service_1 = providers_service_1_1;
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
            ProvidersStore = (function () {
                function ProvidersStore(_providersService, _sessionStore) {
                    var _this = this;
                    this._providersService = _providersService;
                    this._sessionStore = _sessionStore;
                    this._providers = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                ProvidersStore.prototype.resetStore = function () {
                    this._providers.next(this._providers.getValue().clear());
                };
                Object.defineProperty(ProvidersStore.prototype, "provides", {
                    get: function () {
                        return this._providers.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                ProvidersStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._providersService.getProviders().subscribe(function (providers) {
                            _this._providers.next(immutable_1.List(providers));
                            resolve(providers);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                ProvidersStore.prototype.addProvider = function (providerDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._providersService.addProvider(providerDetail).subscribe(function (provider) {
                            _this._providers.next(_this._providers.getValue().push(provider));
                            resolve(provider);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                ProvidersStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [providers_service_1.ProvidersService, session_store_1.SessionStore])
                ], ProvidersStore);
                return ProvidersStore;
            }());
            exports_1("ProvidersStore", ProvidersStore);
        }
    }
});
//# sourceMappingURL=providers-store.js.map