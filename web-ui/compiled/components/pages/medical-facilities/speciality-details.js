System.register(['@angular/core', '@angular/router', '../../../services/medical-facility-service', '../../../stores/medical-facilities-store', '../../../pipes/map-to-js'], function(exports_1, context_1) {
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
    var core_1, router_1, medical_facility_service_1, medical_facilities_store_1, map_to_js_1;
    var SpecialityDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (medical_facility_service_1_1) {
                medical_facility_service_1 = medical_facility_service_1_1;
            },
            function (medical_facilities_store_1_1) {
                medical_facilities_store_1 = medical_facilities_store_1_1;
            },
            function (map_to_js_1_1) {
                map_to_js_1 = map_to_js_1_1;
            }],
        execute: function() {
            SpecialityDetailsComponent = (function () {
                function SpecialityDetailsComponent(_route, _router, _medicalFacilityService, _medicalFacilityStore) {
                    var _this = this;
                    this._route = _route;
                    this._router = _router;
                    this._medicalFacilityService = _medicalFacilityService;
                    this._medicalFacilityStore = _medicalFacilityStore;
                    this._route.params.subscribe(function (routeParams) {
                        var medicalFacilityId = parseInt(routeParams.id);
                        var result = _this._medicalFacilityStore.fetchMedicalFacilityById(medicalFacilityId);
                        result.subscribe(function (medicalFacilityDetail) {
                            _this.medicalFacilityDetail = medicalFacilityDetail;
                        }, function (error) {
                            _this._router.navigate(['/medical-facilities']);
                        }, function () {
                        });
                    });
                }
                Object.defineProperty(SpecialityDetailsComponent.prototype, "specialityDetails", {
                    get: function () {
                        return this.medicalFacilityDetail ? this.medicalFacilityDetail.specialityDetails : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                SpecialityDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'speciality-details',
                        templateUrl: 'templates/pages/medical-facilities/speciality-details.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [map_to_js_1.MapToJSPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, medical_facility_service_1.MedicalFacilityService, medical_facilities_store_1.MedicalFacilityStore])
                ], SpecialityDetailsComponent);
                return SpecialityDetailsComponent;
            }());
            exports_1("SpecialityDetailsComponent", SpecialityDetailsComponent);
        }
    }
});
//# sourceMappingURL=speciality-details.js.map