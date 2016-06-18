System.register(['@angular/core', '@angular/router-deprecated', './patients-list', './patient-details', './add-patient', '../../../stores/patients-store'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, patients_list_1, patient_details_1, add_patient_1, patients_store_1;
    var PatientsShellComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (patients_list_1_1) {
                patients_list_1 = patients_list_1_1;
            },
            function (patient_details_1_1) {
                patient_details_1 = patient_details_1_1;
            },
            function (add_patient_1_1) {
                add_patient_1 = add_patient_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            }],
        execute: function() {
            PatientsShellComponent = (function () {
                function PatientsShellComponent(router, _routeParams, _patientsStore) {
                    this.router = router;
                    this._routeParams = _routeParams;
                    this._patientsStore = _patientsStore;
                }
                PatientsShellComponent.prototype.ngOnInit = function () {
                };
                PatientsShellComponent.prototype.deselectPatient = function (event, patient) {
                    event.stopPropagation();
                    event.preventDefault();
                    this._patientsStore.deselectPatient(patient);
                    this.router.navigate(['PatientsList']);
                };
                PatientsShellComponent.prototype.isCurrentRoute = function (route) {
                    var instruction = this.router.generate(route);
                    return this.router.isRouteActive(instruction);
                };
                PatientsShellComponent = __decorate([
                    core_1.Component({
                        selector: 'patients-shell',
                        templateUrl: 'templates/pages/patients/patients-shell.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/', name: 'PatientsList', component: patients_list_1.PatientsListComponent, useAsDefault: true },
                        { path: '/:id/...', name: 'PatientDetails', component: patient_details_1.PatientDetailsComponent },
                        { path: '/add', name: 'AddPatient', component: add_patient_1.AddPatientComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, patients_store_1.PatientsStore])
                ], PatientsShellComponent);
                return PatientsShellComponent;
            }());
            exports_1("PatientsShellComponent", PatientsShellComponent);
        }
    }
});
//# sourceMappingURL=patients-shell.js.map