System.register(['@angular/core', '@angular/forms', '@angular/router', '../../../utils/AppValidators', '../../elements/loader', '../../../models/medical-facility', '../../../models/medical-facility-details', '../../../models/user', '../../../models/account', '../../../models/contact', '../../../models/address', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment', 'primeng/primeng', '../../../stores/medical-facilities-store', '../../../services/medical-facility-service', '../../../stores/states-store', '../../../services/state-service', '@angular/http', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, medical_facility_1, medical_facility_details_1, user_1, account_1, contact_1, address_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1, medical_facilities_store_1, medical_facility_service_1, states_store_1, state_service_1, http_1, limit_array_pipe_1;
    var AddMedicalFacilityComponent;
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
            function (medical_facility_1_1) {
                medical_facility_1 = medical_facility_1_1;
            },
            function (medical_facility_details_1_1) {
                medical_facility_details_1 = medical_facility_details_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
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
            function (medical_facilities_store_1_1) {
                medical_facilities_store_1 = medical_facilities_store_1_1;
            },
            function (medical_facility_service_1_1) {
                medical_facility_service_1 = medical_facility_service_1_1;
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
            AddMedicalFacilityComponent = (function () {
                function AddMedicalFacilityComponent(_stateService, _statesStore, _medicalFacilitiesStore, fb, _router, _notificationsStore, _sessionStore, _elRef) {
                    this._stateService = _stateService;
                    this._statesStore = _statesStore;
                    this._medicalFacilitiesStore = _medicalFacilitiesStore;
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._elRef = _elRef;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveMedicalFacilityProgress = false;
                    this.medicalFacilityForm = this.fb.group({
                        name: ['', forms_1.Validators.required],
                        prefix: ['', forms_1.Validators.required],
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
                    this.medicalFacilityFormControls = this.medicalFacilityForm.controls;
                }
                AddMedicalFacilityComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._stateService.getStates()
                        .subscribe(function (states) { return _this.states = states; });
                };
                AddMedicalFacilityComponent.prototype.saveMedicalFacility = function () {
                    var _this = this;
                    var medicalFacilityFormValues = this.medicalFacilityForm.value;
                    var medicalFacilityDetail = new medical_facility_details_1.MedicalFacilityDetail({
                        account: new account_1.Account({
                            id: this._sessionStore.session.account_id
                        }),
                        user: new user_1.User({
                            id: this._sessionStore.session.user.id
                        }),
                        medicalfacility: new medical_facility_1.MedicalFacility({
                            name: medicalFacilityFormValues.name,
                            prefix: medicalFacilityFormValues.prefix
                        }),
                        contactInfo: new contact_1.ContactInfo({
                            cellPhone: medicalFacilityFormValues.contact.cellPhone,
                            emailAddress: medicalFacilityFormValues.contact.email,
                            faxNo: medicalFacilityFormValues.contact.faxNo,
                            homePhone: medicalFacilityFormValues.contact.homePhone,
                            workPhone: medicalFacilityFormValues.contact.workPhone,
                        }),
                        address: new address_1.Address({
                            address1: medicalFacilityFormValues.address.address1,
                            address2: medicalFacilityFormValues.address.address2,
                            city: medicalFacilityFormValues.address.city,
                            country: medicalFacilityFormValues.address.country,
                            state: medicalFacilityFormValues.address.state,
                            zipCode: medicalFacilityFormValues.address.zipCode,
                        })
                    });
                    this.isSaveMedicalFacilityProgress = true;
                    var result;
                    result = this._medicalFacilitiesStore.addMedicalFacility(medicalFacilityDetail);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Medical facility added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/medical-facilities']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to add Medical facility.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveMedicalFacilityProgress = false;
                    });
                };
                AddMedicalFacilityComponent = __decorate([
                    core_1.Component({
                        selector: 'add-medical-facility',
                        templateUrl: 'templates/pages/medical-facilities/add-medical-facility.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.InputMask, primeng_1.AutoComplete],
                        providers: [http_1.HTTP_PROVIDERS, medical_facility_service_1.MedicalFacilityService, state_service_1.StateService, states_store_1.StatesStore, forms_1.FormBuilder],
                        pipes: [limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [state_service_1.StateService, states_store_1.StatesStore, medical_facilities_store_1.MedicalFacilityStore, forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, core_1.ElementRef])
                ], AddMedicalFacilityComponent);
                return AddMedicalFacilityComponent;
            }());
            exports_1("AddMedicalFacilityComponent", AddMedicalFacilityComponent);
        }
    }
});
//# sourceMappingURL=add-medical-facility.js.map