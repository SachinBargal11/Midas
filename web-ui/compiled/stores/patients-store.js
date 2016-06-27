System.register(['@angular/core', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/patients-service', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, patients_service_1, immutable_1, Rx_1;
    var PatientsStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (patients_service_1_1) {
                patients_service_1 = patients_service_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            PatientsStore = (function () {
                function PatientsStore(_patientsService) {
                    this._patientsService = _patientsService;
                    this._patients = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this._selectedPatients = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.loadInitialData();
                }
                Object.defineProperty(PatientsStore.prototype, "patients", {
                    get: function () {
                        return this._patients.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PatientsStore.prototype, "selectedPatients", {
                    get: function () {
                        return this._selectedPatients.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                PatientsStore.prototype.loadInitialData = function () {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._patientsService.getPatients().subscribe(function (patients) {
                            _this._patients.next(immutable_1.List(patients));
                            resolve(patients);
                        }, function (error) {
                            reject(error);
                        });
                    });
                };
                PatientsStore.prototype.findPatientById = function (id) {
                    var patients = this._patients.getValue();
                    var index = patients.findIndex(function (currentPatient) { return currentPatient.id === id; });
                    this.currentPatient = patients.get(index);
                    return patients.get(index);
                };
                PatientsStore.prototype.addPatient = function (patient) {
                    var _this = this;
                    var obs = this._patientsService.addPatient(patient);
                    obs.subscribe(function (res) {
                        _this._patients.next(_this._patients.getValue().push(patient));
                    });
                    return obs;
                };
                PatientsStore.prototype.selectPatient = function (patient) {
                    var selectedPatients = this._selectedPatients.getValue();
                    var index = selectedPatients.findIndex(function (currentPatient) { return currentPatient.id === patient.id; });
                    if (index < 0) {
                        this._selectedPatients.next(this._selectedPatients.getValue().push(patient));
                    }
                };
                PatientsStore.prototype.deselectPatient = function (patient) {
                    var selectedPatients = this._selectedPatients.getValue();
                    var index = selectedPatients.findIndex(function (currentPatient) { return currentPatient.id === patient.id; });
                    this._selectedPatients.next(selectedPatients.delete(index));
                };
                PatientsStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [patients_service_1.PatientsService])
                ], PatientsStore);
                return PatientsStore;
            }());
            exports_1("PatientsStore", PatientsStore);
        }
    }
});
//# sourceMappingURL=patients-store.js.map