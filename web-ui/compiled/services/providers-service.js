System.register(['@angular/core', '@angular/http', 'underscore', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../scripts/environment', '../stores/session-store', './adapters/provider-adapter'], function(exports_1, context_1) {
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
    var core_1, http_1, underscore_1, Observable_1, environment_1, session_store_1, provider_adapter_1;
    var ProvidersService;
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
            function (provider_adapter_1_1) {
                provider_adapter_1 = provider_adapter_1_1;
            }],
        execute: function() {
            ProvidersService = (function () {
                function ProvidersService(_http, _sessionStore) {
                    this._http = _http;
                    this._sessionStore = _sessionStore;
                    this._url = "" + environment_1.default.SERVICE_BASE_URL;
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                ProvidersService.prototype.getProviders = function () {
                    return this._http.get(this._url + '/Provider/GetAll').map(function (res) { return res.json(); });
                };
                ProvidersService.prototype.addProvider = function (providerDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var providerDetailRequestData = providerDetail.toJS();
                        // remove unneeded keys 
                        providerDetailRequestData.provider = underscore_1.default.omit(providerDetailRequestData.provider, 'providerMedicalFacilities', 'createDate', 'updateByUserID', 'updateDate');
                        return _this._http.post(_this._url + '/Provider/Add', JSON.stringify(providerDetailRequestData), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (providerData) {
                            var parsedProvider = null;
                            parsedProvider = provider_adapter_1.ProviderAdapter.parseResponse(providerData);
                            resolve(parsedProvider);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                ProvidersService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_store_1.SessionStore])
                ], ProvidersService);
                return ProvidersService;
            }());
            exports_1("ProvidersService", ProvidersService);
        }
    }
});
//# sourceMappingURL=providers-service.js.map