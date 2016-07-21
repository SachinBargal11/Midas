System.register(['@angular/core', '@angular/forms', '@angular/router', '../../../utils/AppValidators', '../../elements/loader', '../../../stores/patients-store', '../../../models/patient', 'jquery', 'eonasdan-bootstrap-datetimepicker', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, patients_store_1, patient_1, jquery_1, session_store_1, notifications_store_1, notification_1, moment_1;
    var AddPatientComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
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
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            AddPatientComponent = (function () {
                function AddPatientComponent(fb, _router, _notificationsStore, _sessionStore, _patientsStore, _elRef) {
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
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
                    this.patientform = this.fb.group({
                        firstname: ['', forms_1.Validators.required],
                        lastname: ['', forms_1.Validators.required],
                        email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                        mobileNo: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator]],
                        address: [''],
                        dob: ['']
                    });
                    this.patientformControls = this.patientform.controls;
                }
                AddPatientComponent.prototype.ngOnInit = function () {
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
                        'dob': jquery_1.default("#dob").val(),
                        'createdUser': this._sessionStore.session.user.id
                    });
                    result = this._patientsStore.addPatient(patient);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Patient added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/patients']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to add patient.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSavePatientProgress = false;
                    });
                };
                AddPatientComponent = __decorate([
                    core_1.Component({
                        selector: 'add-patient',
                        templateUrl: 'templates/pages/patients/add-patient.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, patients_store_1.PatientsStore, core_1.ElementRef])
                ], AddPatientComponent);
                return AddPatientComponent;
            }());
            exports_1("AddPatientComponent", AddPatientComponent);
        }
    }
});
//# sourceMappingURL=add-patient.js.map