System.register(['@angular/core', '@angular/common', '@angular/router-deprecated', '../../../utils/AppValidators', '../../elements/loader', 'angular2-notifications', '../../../stores/patients-store', '../../../models/patient', 'jquery', 'eonasdan-bootstrap-datetimepicker', '../../../stores/session-store'], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, AppValidators_1, loader_1, angular2_notifications_1, patients_store_1, patient_1, jquery_1, session_store_1;
    var AddPatientComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            },
            function (patient_1_1) {
                patient_1 = patient_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            }],
        execute: function() {
            AddPatientComponent = (function () {
                function AddPatientComponent(fb, _router, _notificationsService, _sessionStore, _routeParams, _patientsStore, _elRef) {
                    this._router = _router;
                    this._notificationsService = _notificationsService;
                    this._sessionStore = _sessionStore;
                    this._routeParams = _routeParams;
                    this._patientsStore = _patientsStore;
                    this._elRef = _elRef;
                    this.patient = new patient_1.Patient({
                        'firstname': '',
                        'lastname': '',
                        'email': '',
                        'mobileNo': '',
                        'address': '',
                        'dob': ''
                    });
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSavePatientProgress = false;
                    this.patientform = fb.group({
                        firstname: ['', common_1.Validators.required],
                        lastname: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([common_1.Validators.required, AppValidators_1.AppValidators.emailValidator])],
                        mobileNo: ['', common_1.Validators.compose([common_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator])],
                        address: [''],
                        dob: ['', common_1.Validators.required]
                    });
                }
                AddPatientComponent.prototype.ngOnInit = function () {
                    if (!this._sessionStore.isAuthenticated()) {
                        this._router.navigate(['Login']);
                    }
                    jquery_1.default(this._elRef.nativeElement).find('.datepickerElem').datetimepicker({
                        format: 'll'
                    });
                };
                AddPatientComponent.prototype.savePatient = function () {
                    var _this = this;
                    this.isSavePatientProgress = true;
                    var result;
                    var patient = new patient_1.Patient({
                        'firstname': this.patientform.value.firstname,
                        'lastname': this.patientform.value.lastname,
                        'email': this.patientform.value.email,
                        'mobileNo': this.patientform.value.mobileNo,
                        'address': this.patientform.value.address,
                    });
                    result = this._patientsStore.addPatient(patient);
                    result.subscribe(function (response) {
                        _this._notificationsService.success('Success', 'Patient added successfully!');
                        setTimeout(function () {
                            _this._router.navigate(['PatientsList']);
                        }, 3000);
                    }, function (error) {
                        _this._notificationsService.error('Error', 'Unable to add patient.');
                    }, function () {
                        _this.isSavePatientProgress = false;
                    });
                };
                AddPatientComponent = __decorate([
                    core_1.Component({
                        selector: 'add-patient',
                        templateUrl: 'templates/pages/patients/add-patient.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_deprecated_1.Router, angular2_notifications_1.NotificationsService, session_store_1.SessionStore, router_deprecated_1.RouteParams, patients_store_1.PatientsStore, core_1.ElementRef])
                ], AddPatientComponent);
                return AddPatientComponent;
            }());
            exports_1("AddPatientComponent", AddPatientComponent);
        }
    }
});
//# sourceMappingURL=add-patient.js.map