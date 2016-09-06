System.register(['@angular/core', '@angular/http', 'underscore', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../scripts/environment', '../stores/session-store', './adapters/doctor-adapter', '../models/enums/UserType'], function(exports_1, context_1) {
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
    var core_1, http_1, underscore_1, Observable_1, environment_1, session_store_1, doctor_adapter_1, UserType_1;
    var DoctorsService;
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
            function (doctor_adapter_1_1) {
                doctor_adapter_1 = doctor_adapter_1_1;
            },
            function (UserType_1_1) {
                UserType_1 = UserType_1_1;
            }],
        execute: function() {
            DoctorsService = (function () {
                function DoctorsService(_http, _sessionStore) {
                    this._http = _http;
                    this._sessionStore = _sessionStore;
                    this._url = "" + environment_1.default.SERVICE_BASE_URL;
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                DoctorsService.prototype.getDoctor = function (doctorId) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.get(_this._url + '/Doctor/Get/' + doctorId).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var parsedDoctor = null;
                            parsedDoctor = doctor_adapter_1.DoctorAdapter.parseResponse(data);
                            resolve(parsedDoctor);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsService.prototype.getDoctors = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.post(_this._url + '/Doctor/GetAll', JSON.stringify({ 'doctor': [{}] }), {
                            headers: _this._headers
                        }).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var doctors = data.map(function (doctorData) {
                                return doctor_adapter_1.DoctorAdapter.parseResponse(doctorData);
                            });
                            resolve(doctors);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsService.prototype.addDoctor = function (doctorDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var doctorDetailRequestData = doctorDetail.toJS();
                        // add/replace values which need to be changed
                        underscore_1.default.extend(doctorDetailRequestData.user, {
                            userType: UserType_1.UserType[doctorDetailRequestData.user.userType],
                            dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
                        });
                        // remove unneeded keys 
                        doctorDetailRequestData.user = underscore_1.default.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.address = underscore_1.default.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.contactInfo = underscore_1.default.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.doctor = underscore_1.default.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        return _this._http.post(_this._url + '/Doctor/Add', JSON.stringify(doctorDetailRequestData), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (doctorData) {
                            var parsedDoctor = null;
                            parsedDoctor = doctor_adapter_1.DoctorAdapter.parseResponse(doctorData);
                            resolve(parsedDoctor);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsService.prototype.updateDoctor = function (doctorDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var doctorDetailRequestData = doctorDetail.toJS();
                        // add/replace values which need to be changed
                        underscore_1.default.extend(doctorDetailRequestData.user, {
                            userType: UserType_1.UserType[doctorDetailRequestData.user.userType],
                            dateOfBirth: doctorDetailRequestData.user.dateOfBirth ? doctorDetailRequestData.user.dateOfBirth.toISOString() : null
                        });
                        // remove unneeded keys 
                        doctorDetailRequestData.user = underscore_1.default.omit(doctorDetailRequestData.user, 'accountId', 'gender', 'status', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.address = underscore_1.default.omit(doctorDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.contactInfo = underscore_1.default.omit(doctorDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        doctorDetailRequestData.doctor = underscore_1.default.omit(doctorDetailRequestData.doctor, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        return _this._http.post(_this._url + '/Doctor/Add', JSON.stringify(doctorDetailRequestData), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (doctorData) {
                            var parsedDoctor = null;
                            parsedDoctor = doctor_adapter_1.DoctorAdapter.parseResponse(doctorData);
                            resolve(parsedDoctor);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                DoctorsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_store_1.SessionStore])
                ], DoctorsService);
                return DoctorsService;
            }());
            exports_1("DoctorsService", DoctorsService);
        }
    }
});
//# sourceMappingURL=doctors-service.js.map