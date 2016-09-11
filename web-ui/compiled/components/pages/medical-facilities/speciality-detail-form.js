System.register(['@angular/core', '@angular/router', '@angular/forms', 'moment', '../../../services/medical-facility-service', '../../../stores/medical-facilities-store', '../../../models/speciality-details', '../../../models/medical-facility-details', '../../../stores/speciality-store', '../../../utils/AppValidators', '../../../stores/notifications-store', '../../../models/notification'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, moment_1, medical_facility_service_1, medical_facilities_store_1, speciality_details_1, medical_facility_details_1, speciality_store_1, AppValidators_1, notifications_store_1, notification_1;
    var SpecialityDetailFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (medical_facility_service_1_1) {
                medical_facility_service_1 = medical_facility_service_1_1;
            },
            function (medical_facilities_store_1_1) {
                medical_facilities_store_1 = medical_facilities_store_1_1;
            },
            function (speciality_details_1_1) {
                speciality_details_1 = speciality_details_1_1;
            },
            function (medical_facility_details_1_1) {
                medical_facility_details_1 = medical_facility_details_1_1;
            },
            function (speciality_store_1_1) {
                speciality_store_1 = speciality_store_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            }],
        execute: function() {
            SpecialityDetailFormComponent = (function () {
                function SpecialityDetailFormComponent(_route, _router, fb, _notificationsStore, _medicalFacilityService, _medicalFacilityStore, _specialityStore) {
                    this._route = _route;
                    this._router = _router;
                    this.fb = fb;
                    this._notificationsStore = _notificationsStore;
                    this._medicalFacilityService = _medicalFacilityService;
                    this._medicalFacilityStore = _medicalFacilityStore;
                    this._specialityStore = _specialityStore;
                    this._specialityDetailJS = null;
                    this.isSpecialityDetailSaveInProgress = false;
                    this.specialities = this._specialityStore.specialties;
                    this.specialityDetailForm = this.fb.group({
                        isUnitApply: [''],
                        followUpDays: ['', forms_1.Validators.required],
                        followupTime: ['', forms_1.Validators.required],
                        initialDays: ['', forms_1.Validators.required],
                        initialTime: ['', forms_1.Validators.required],
                        isInitialEvaluation: [''],
                        include1500: [''],
                        associatedSpeciality: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.selectedValueValidator]],
                        allowMultipleVisit: ['']
                    });
                    this.specialityDetailFormControls = this.specialityDetailForm.controls;
                }
                Object.defineProperty(SpecialityDetailFormComponent.prototype, "specialityDetailJS", {
                    get: function () {
                        if (!this._specialityDetailJS) {
                            this._specialityDetailJS = this.specialityDetail.toJS();
                        }
                        return this._specialityDetailJS;
                    },
                    enumerable: true,
                    configurable: true
                });
                SpecialityDetailFormComponent.prototype.saveSpecialityDetail = function () {
                    var _this = this;
                    var specialityDetailFormValues = this.specialityDetailForm.value;
                    var specialtyDetail = new speciality_details_1.SpecialityDetail({
                        id: this.specialityDetail.id,
                        isUnitApply: parseInt(specialityDetailFormValues.isUnitApply),
                        followUpDays: parseInt(specialityDetailFormValues.followUpDays),
                        followupTime: parseInt(specialityDetailFormValues.followupTime),
                        initialDays: parseInt(specialityDetailFormValues.initialDays),
                        initialTime: parseInt(specialityDetailFormValues.initialTime),
                        isInitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation),
                        include1500: parseInt(specialityDetailFormValues.include1500),
                        associatedSpeciality: parseInt(specialityDetailFormValues.associatedSpeciality),
                        allowMultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit)
                    });
                    this.isSpecialityDetailSaveInProgress = true;
                    var result;
                    result = this._medicalFacilityStore.updateSpecialityDetail(specialtyDetail, this.medicalFacilityDetail);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Speciality saved successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/medical-facilities/' + _this.medicalFacilityDetail.medicalfacility.id + '/specialities']);
                    }, function (error) {
                        _this.isSpecialityDetailSaveInProgress = false;
                        var notification = new notification_1.Notification({
                            'title': 'Unable to save Speciality.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSpecialityDetailSaveInProgress = false;
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', speciality_details_1.SpecialityDetail)
                ], SpecialityDetailFormComponent.prototype, "specialityDetail", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', medical_facility_details_1.MedicalFacilityDetail)
                ], SpecialityDetailFormComponent.prototype, "medicalFacilityDetail", void 0);
                SpecialityDetailFormComponent = __decorate([
                    core_1.Component({
                        selector: 'speciality-detail-form',
                        templateUrl: 'templates/pages/medical-facilities/speciality-detail-form.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        providers: [forms_1.FormBuilder]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder, notifications_store_1.NotificationsStore, medical_facility_service_1.MedicalFacilityService, medical_facilities_store_1.MedicalFacilityStore, speciality_store_1.SpecialityStore])
                ], SpecialityDetailFormComponent);
                return SpecialityDetailFormComponent;
            }());
            exports_1("SpecialityDetailFormComponent", SpecialityDetailFormComponent);
        }
    }
});
//# sourceMappingURL=speciality-detail-form.js.map