System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/doctors-service', './session-store', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Observable_1, doctors_service_1, session_store_1, immutable_1, Rx_1;
    var DoctorsStore;
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
            function (doctors_service_1_1) {
                doctors_service_1 = doctors_service_1_1;
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
            DoctorsStore = (function () {
                function DoctorsStore(_doctorsService, _sessionStore) {
                    var _this = this;
                    this._doctorsService = _doctorsService;
                    this._sessionStore = _sessionStore;
                    this._doctors = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this._selectedDoctors = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                    this._sessionStore.userLogoutEvent.subscribe(function () {
                        _this.resetStore();
                    });
                }
                DoctorsStore.prototype.resetStore = function () {
                    this._doctors.next(this._doctors.getValue().clear());
                    this._selectedDoctors.next(this._selectedDoctors.getValue().clear());
                };
                Object.defineProperty(DoctorsStore.prototype, "doctors", {
                    get: function () {
                        return this._doctors.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DoctorsStore.prototype, "selectedDoctors", {
                    get: function () {
                        return this._selectedDoctors.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                DoctorsStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._doctorsService.getDoctors().subscribe(function (doctors) {
                            _this._doctors.next(immutable_1.List(doctors));
                            resolve(doctors);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsStore.prototype.findDoctorById = function (id) {
                    var doctors = this._doctors.getValue();
                    var index = doctors.findIndex(function (currentDoctor) { return currentDoctor.doctor.id === id; });
                    return doctors.get(index);
                };
                DoctorsStore.prototype.fetchDoctorById = function (id) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var matchedDoctor = _this.findDoctorById(id);
                        if (matchedDoctor) {
                            resolve(matchedDoctor);
                        }
                        else {
                            _this._doctorsService.getDoctor(id)
                                .subscribe(function (doctorDetail) {
                                resolve(doctorDetail);
                            }, function (error) {
                                reject(error);
                            });
                        }
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsStore.prototype.addDoctor = function (doctorDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._doctorsService.addDoctor(doctorDetail).subscribe(function (doctor) {
                            _this._doctors.next(_this._doctors.getValue().push(doctor));
                            resolve(doctor);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                DoctorsStore.prototype.updateDoctor = function (doctorDetail) {
                    var _this = this;
                    var doctors = this._doctors.getValue();
                    var index = doctors.findIndex(function (currentDoctor) { return currentDoctor.doctor.id === doctorDetail.doctor.id; });
                    var promise = new Promise(function (resolve, reject) {
                        _this._doctorsService.updateDoctor(doctorDetail).subscribe(function (doctorDetail) {
                            _this._doctors.next(_this._doctors.getValue().push(doctorDetail));
                            resolve(doctorDetail);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                DoctorsStore.prototype.selectDoctor = function (doctorDetail) {
                    var selectedDoctors = this._selectedDoctors.getValue();
                    var index = selectedDoctors.findIndex(function (currentDoctor) { return currentDoctor.doctor.id === doctorDetail.doctor.id; });
                    if (index < 0) {
                        this._selectedDoctors.next(this._selectedDoctors.getValue().push(doctorDetail));
                    }
                };
                DoctorsStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [doctors_service_1.DoctorsService, session_store_1.SessionStore])
                ], DoctorsStore);
                return DoctorsStore;
            }());
            exports_1("DoctorsStore", DoctorsStore);
        }
    }
});
//# sourceMappingURL=doctors-store.js.map