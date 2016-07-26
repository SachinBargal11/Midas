System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../scripts/environment', '../stores/session-store', './adapters/patient-adapter'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, environment_1, session_store_1, patient_adapter_1;
    var PatientsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
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
            function (patient_adapter_1_1) {
                patient_adapter_1 = patient_adapter_1_1;
            }],
        execute: function() {
            PatientsService = (function () {
                function PatientsService(_http, _sessionStore) {
                    this._http = _http;
                    this._sessionStore = _sessionStore;
                    this._url = environment_1.default.SERVICE_BASE_URL + "/patients";
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                PatientsService.prototype.getPatient = function (patientId) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.get(_this._url + "?id=" + patientId).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var patient = null;
                            if (data.length) {
                                patient = patient_adapter_1.PatientAdapter.parseResponse(data[0]);
                                resolve(patient);
                            }
                            else {
                                reject(new Error('NOT_FOUND'));
                            }
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                PatientsService.prototype.getPatients = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.get(_this._url + "?createdUser=" + _this._sessionStore.session.user.id)
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var patients = data.map(function (patientData) {
                                return patient_adapter_1.PatientAdapter.parseResponse(patientData);
                            });
                            resolve(patients);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                PatientsService.prototype.addPatient = function (patient) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.post(_this._url, JSON.stringify(patient), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (patientData) {
                            var parsedPatient = null;
                            parsedPatient = patient_adapter_1.PatientAdapter.parseResponse(patientData);
                            resolve(parsedPatient);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                PatientsService.prototype.updatePatient = function (patient) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.put(_this._url + "/" + patient.id, JSON.stringify(patient), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (patientData) {
                            var parsedPatient = null;
                            parsedPatient = patient_adapter_1.PatientAdapter.parseResponse(patientData);
                            resolve(parsedPatient);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                PatientsService.prototype.deletePatient = function (patient) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.delete(_this._url + "/" + patient.id)
                            .map(function (res) { return res.json(); })
                            .subscribe(function (patient) {
                            resolve(patient);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                PatientsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_store_1.SessionStore])
                ], PatientsService);
                return PatientsService;
            }());
            exports_1("PatientsService", PatientsService);
        }
    }
});
//# sourceMappingURL=patients-service.js.map