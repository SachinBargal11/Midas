System.register(['@angular/core', '@angular/forms', '@angular/router', '../../../utils/AppValidators', '../../elements/loader', '../../../stores/doctors-store', '../../../services/doctors-service', '../../../models/doctor-details', '../../../models/doctor', '../../../models/user', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment', 'primeng/primeng', '../../../stores/states-store', '../../../services/state-service', '@angular/http', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, doctors_store_1, doctors_service_1, doctor_details_1, doctor_1, user_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1, states_store_1, state_service_1, http_1, limit_array_pipe_1;
    var UpdateDoctorComponent;
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
            function (doctors_store_1_1) {
                doctors_store_1 = doctors_store_1_1;
            },
            function (doctors_service_1_1) {
                doctors_service_1 = doctors_service_1_1;
            },
            function (doctor_details_1_1) {
                doctor_details_1 = doctor_details_1_1;
            },
            function (doctor_1_1) {
                doctor_1 = doctor_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
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
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (states_store_1_1) {
                states_store_1 = states_store_1_1;
            },
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            UpdateDoctorComponent = (function () {
                function UpdateDoctorComponent(_stateService, _statesStore, _doctorsService, _doctorsStore, fb, _router, _route, _notificationsStore, _sessionStore, _elRef) {
                    var _this = this;
                    this._stateService = _stateService;
                    this._statesStore = _statesStore;
                    this._doctorsService = _doctorsService;
                    this._doctorsStore = _doctorsStore;
                    this.fb = fb;
                    this._router = _router;
                    this._route = _route;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._elRef = _elRef;
                    this.doctor = doctor_details_1.DoctorDetail.prototype.doctor;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveDoctorProgress = false;
                    this._route.params.subscribe(function (routeParams) {
                        var doctorId = parseInt(routeParams.id);
                        var result = _this._doctorsStore.fetchDoctorById(doctorId);
                        result.subscribe(function (doctorDetail) {
                            _this.doctor = doctorDetail.doctor;
                        }, function (error) {
                            _this._router.navigate(['/doctors']);
                        }, function () {
                        });
                    });
                    this.doctorform = this.fb.group({
                        doctor: this.fb.group({
                            licenseNumber: ['', forms_1.Validators.required],
                            wcbAuthorization: ['', forms_1.Validators.required],
                            wcbRatingCode: ['', forms_1.Validators.required],
                            npi: ['', forms_1.Validators.required],
                            federalTaxId: ['', forms_1.Validators.required],
                            taxType: ['', forms_1.Validators.required],
                            assignNumber: ['', forms_1.Validators.required],
                            title: ['', forms_1.Validators.required]
                        }),
                        userInfo: this.fb.group({
                            firstname: ['', forms_1.Validators.required],
                            middlename: [''],
                            lastname: ['', forms_1.Validators.required],
                            userType: ['', forms_1.Validators.required],
                            password: ['', forms_1.Validators.required],
                            confirmPassword: ['', forms_1.Validators.required],
                        }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') }),
                        contact: this.fb.group({
                            email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                            cellPhone: ['', [forms_1.Validators.required]],
                            homePhone: [''],
                            workPhone: [''],
                            faxNo: ['']
                        }),
                        address: this.fb.group({
                            address1: [''],
                            address2: [''],
                            city: [''],
                            zipCode: [''],
                            state: [''],
                            country: ['']
                        })
                    });
                    this.doctorformControls = this.doctorform.controls;
                }
                UpdateDoctorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._stateService.getStates()
                        .subscribe(function (states) { return _this.states = states; });
                };
                UpdateDoctorComponent.prototype.updateDoctor = function () {
                    var _this = this;
                    var doctorFormValues = this.doctorform.value;
                    var doctorDetail = new doctor_details_1.DoctorDetail({
                        doctor: new doctor_1.Doctor({
                            id: this.doctor.id,
                            licenseNumber: doctorFormValues.doctor.licenseNumber,
                            wcbAuthorization: doctorFormValues.doctor.wcbAuthorization,
                            wcbRatingCode: doctorFormValues.doctor.wcbRatingCode,
                            npi: doctorFormValues.doctor.npi,
                            federalTaxId: doctorFormValues.doctor.federalTaxId,
                            taxType: doctorFormValues.doctor.taxType,
                            assignNumber: doctorFormValues.doctor.assignNumber,
                            title: doctorFormValues.doctor.title,
                        }),
                        user: new user_1.User({
                            userName: doctorFormValues.contact.email,
                            firstName: doctorFormValues.userInfo.firstname,
                            middleName: doctorFormValues.userInfo.middlename,
                            lastName: doctorFormValues.userInfo.lastname,
                            userType: parseInt(doctorFormValues.userInfo.userType),
                            password: doctorFormValues.userInfo.password
                        })
                    });
                    this.isSaveDoctorProgress = true;
                    var result;
                    result = this._doctorsStore.updateDoctor(doctorDetail);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Doctor updated successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/doctors']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to update Doctor.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveDoctorProgress = false;
                    });
                };
                UpdateDoctorComponent = __decorate([
                    core_1.Component({
                        selector: 'update-doctor',
                        templateUrl: 'templates/pages/doctors/update-doctor.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.InputMask, primeng_1.AutoComplete],
                        providers: [http_1.HTTP_PROVIDERS, doctors_service_1.DoctorsService, state_service_1.StateService, states_store_1.StatesStore, forms_1.FormBuilder],
                        pipes: [limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [state_service_1.StateService, states_store_1.StatesStore, doctors_service_1.DoctorsService, doctors_store_1.DoctorsStore, forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, notifications_store_1.NotificationsStore, session_store_1.SessionStore, core_1.ElementRef])
                ], UpdateDoctorComponent);
                return UpdateDoctorComponent;
            }());
            exports_1("UpdateDoctorComponent", UpdateDoctorComponent);
        }
    }
});
//# sourceMappingURL=update-doctor.js.map