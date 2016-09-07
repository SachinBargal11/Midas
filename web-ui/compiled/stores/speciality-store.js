System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/speciality-service', './session-store', 'immutable', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Observable_1, speciality_service_1, session_store_1, immutable_1, Rx_1;
    var SpecialityStore;
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
            function (speciality_service_1_1) {
                speciality_service_1 = speciality_service_1_1;
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
            SpecialityStore = (function () {
                function SpecialityStore(_specialityService, _sessionStore) {
                    var _this = this;
                    this._specialityService = _specialityService;
                    this._sessionStore = _sessionStore;
                    this._specialties = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this._selectedSpecialties = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                SpecialityStore.prototype.resetStore = function () {
                    this._specialties.next(this._specialties.getValue().clear());
                    this._selectedSpecialties.next(this._selectedSpecialties.getValue().clear());
                };
                Object.defineProperty(SpecialityStore.prototype, "specialties", {
                    get: function () {
                        return this._specialties.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpecialityStore.prototype, "selectedSpecialities", {
                    get: function () {
                        return this._selectedSpecialties.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                SpecialityStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._specialityService.getSpecialities().subscribe(function (specialties) {
                            _this._specialties.next(immutable_1.List(specialties));
                            resolve(specialties);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                SpecialityStore.prototype.findSpecialityById = function (id) {
                    var specialties = this._specialties.getValue();
                    var index = specialties.findIndex(function (currentSpecialty) { return currentSpecialty.specialty.id === id; });
                    return specialties.get(index);
                };
                SpecialityStore.prototype.fetchSpecialityById = function (id) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var matchedSpecialty = _this.findSpecialityById(id);
                        if (matchedSpecialty) {
                            resolve(matchedSpecialty);
                        }
                        else {
                            _this._specialityService.getSpeciality(id)
                                .subscribe(function (specialty) {
                                resolve(specialty);
                            }, function (error) {
                                reject(error);
                            });
                        }
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                SpecialityStore.prototype.addSpeciality = function (specialty) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._specialityService.addSpeciality(specialty).subscribe(function (specialty) {
                            _this._specialties.next(_this._specialties.getValue().push(specialty));
                            resolve(specialty);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                SpecialityStore.prototype.updateSpeciality = function (specialty) {
                    var _this = this;
                    // let specialities = this._specialties.getValue();
                    // let index = specialities.findIndex((currentSpecialty: Specialty) => currentSpecialty.specialty.id === specialty.specialty.id);
                    var promise = new Promise(function (resolve, reject) {
                        _this._specialityService.updateSpeciality(specialty).subscribe(function (currentSpecialty) {
                            _this._specialties.next(_this._specialties.getValue().push(specialty));
                            resolve(specialty);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                SpecialityStore.prototype.selectSpecialities = function (specialty) {
                    var selectedSpecialties = this._selectedSpecialties.getValue();
                    var index = selectedSpecialties.findIndex(function (currentSpecialty) { return currentSpecialty.specialty.id === specialty.specialty.id; });
                    if (index < 0) {
                        this._selectedSpecialties.next(this._selectedSpecialties.getValue().push(specialty));
                    }
                };
                SpecialityStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [speciality_service_1.SpecialityService, session_store_1.SessionStore])
                ], SpecialityStore);
                return SpecialityStore;
            }());
            exports_1("SpecialityStore", SpecialityStore);
        }
    }
});
//# sourceMappingURL=speciality-store.js.map