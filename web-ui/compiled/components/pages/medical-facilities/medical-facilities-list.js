System.register(['@angular/core', '@angular/router', '../../../stores/medical-facilities-store', '../../../pipes/reverse-array-pipe', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, medical_facilities_store_1, reverse_array_pipe_1, limit_array_pipe_1;
    var MedicalFacilitiesListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (medical_facilities_store_1_1) {
                medical_facilities_store_1 = medical_facilities_store_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            MedicalFacilitiesListComponent = (function () {
                function MedicalFacilitiesListComponent(_router, _medicalFacilityStore) {
                    this._router = _router;
                    this._medicalFacilityStore = _medicalFacilityStore;
                }
                MedicalFacilitiesListComponent.prototype.ngOnInit = function () {
                };
                MedicalFacilitiesListComponent = __decorate([
                    core_1.Component({
                        selector: 'medical-facilities-list',
                        templateUrl: 'templates/pages/medical-facilities/medical-facilities-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        pipes: [reverse_array_pipe_1.ReversePipe, limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, medical_facilities_store_1.MedicalFacilityStore])
                ], MedicalFacilitiesListComponent);
                return MedicalFacilitiesListComponent;
            }());
            exports_1("MedicalFacilitiesListComponent", MedicalFacilitiesListComponent);
        }
    }
});
//# sourceMappingURL=medical-facilities-list.js.map