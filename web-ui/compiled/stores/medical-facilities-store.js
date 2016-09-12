System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/medical-facility-service', './session-store', 'immutable', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Observable_1, medical_facility_service_1, session_store_1, immutable_1, Rx_1;
    var MedicalFacilityStore;
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
            function (medical_facility_service_1_1) {
                medical_facility_service_1 = medical_facility_service_1_1;
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
            MedicalFacilityStore = (function () {
                function MedicalFacilityStore(_medicalFacilitiesService, _sessionStore) {
                    var _this = this;
                    this._medicalFacilitiesService = _medicalFacilitiesService;
                    this._sessionStore = _sessionStore;
                    this._medicalFacilities = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                MedicalFacilityStore.prototype.resetStore = function () {
                    this._medicalFacilities.next(this._medicalFacilities.getValue().clear());
                };
                Object.defineProperty(MedicalFacilityStore.prototype, "medicalFacilities", {
                    get: function () {
                        return this._medicalFacilities.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                MedicalFacilityStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var accountId = this._sessionStore.session.account_id;
                    var promise = new Promise(function (resolve, reject) {
                        _this._medicalFacilitiesService.getMedicalFacilities(accountId).subscribe(function (medicalFacilities) {
                            _this._medicalFacilities.next(immutable_1.List(medicalFacilities));
                            resolve(medicalFacilities);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                MedicalFacilityStore.prototype.addMedicalFacility = function (medicalFacilityDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._medicalFacilitiesService.addMedicalFacility(medicalFacilityDetail).subscribe(function (medicalFacility) {
                            _this._medicalFacilities.next(_this._medicalFacilities.getValue().push(medicalFacility));
                            resolve(medicalFacility);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                MedicalFacilityStore.prototype.updateMedicalFacility = function (medicalFacilityDetail) {
                    var _this = this;
                    // let medicalFacilities = this._medicalFacilities.getValue();
                    // let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacilityDetail) => currentMedicalFacility.user.id === medicalFacilityDetail.medicalfacility.id);
                    var promise = new Promise(function (resolve, reject) {
                        _this._medicalFacilitiesService.updateMedicalFacility(medicalFacilityDetail).subscribe(function (medicalFacilityDetail) {
                            _this._medicalFacilities.next(_this._medicalFacilities.getValue().push(medicalFacilityDetail));
                            resolve(medicalFacilityDetail);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                MedicalFacilityStore.prototype.updateSpecialityDetail = function (specialtyDetail, medicalFacilityDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._medicalFacilitiesService.updateSpecialityDetail(specialtyDetail, medicalFacilityDetail).subscribe(function (medicalFacility) {
                            _this._medicalFacilities.next(_this._medicalFacilities.getValue().push(medicalFacility));
                            resolve(medicalFacility);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                MedicalFacilityStore.prototype.findMedicalFacilityById = function (id) {
                    var medicalFacilities = this._medicalFacilities.getValue();
                    var index = medicalFacilities.findIndex(function (currentMedicalFacility) { return currentMedicalFacility.medicalfacility.id === id; });
                    return medicalFacilities.get(index);
                };
                MedicalFacilityStore.prototype.fetchMedicalFacilityById = function (id) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var matchedMedicalFacility = _this.findMedicalFacilityById(id);
                        if (matchedMedicalFacility) {
                            resolve(matchedMedicalFacility);
                        }
                        else {
                            _this._medicalFacilitiesService.fetchMedicalFacilityById(id).subscribe(function (medicalFacility) {
                                resolve(medicalFacility);
                            }, function (error) {
                                reject(error);
                            });
                        }
                    });
                    return Observable_1.Observable.from(promise);
                };
                MedicalFacilityStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [medical_facility_service_1.MedicalFacilityService, session_store_1.SessionStore])
                ], MedicalFacilityStore);
                return MedicalFacilityStore;
            }());
            exports_1("MedicalFacilityStore", MedicalFacilityStore);
        }
    }
});
//# sourceMappingURL=medical-facilities-store.js.map