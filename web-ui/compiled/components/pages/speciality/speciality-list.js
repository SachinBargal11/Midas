System.register(['@angular/core', '@angular/router', '../../../services/speciality-service', '../../../pipes/reverse-array-pipe', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, speciality_service_1, reverse_array_pipe_1, limit_array_pipe_1;
    var SpecialityListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (speciality_service_1_1) {
                speciality_service_1 = speciality_service_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            SpecialityListComponent = (function () {
                function SpecialityListComponent(_router, _specialityService) {
                    this._router = _router;
                    this._specialityService = _specialityService;
                }
                SpecialityListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var specialty = this._specialityService.getSpecialities()
                        .subscribe(function (specialties) { return _this.specialties = specialties; });
                };
                SpecialityListComponent.prototype.selectSpeciality = function (specialty) {
                    this._router.navigate(['/specialities/update/' + specialty.specialty.id]);
                };
                SpecialityListComponent = __decorate([
                    core_1.Component({
                        selector: 'speciality-list',
                        templateUrl: 'templates/pages/speciality/speciality-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        pipes: [reverse_array_pipe_1.ReversePipe, limit_array_pipe_1.LimitPipe],
                        providers: [speciality_service_1.SpecialityService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, speciality_service_1.SpecialityService])
                ], SpecialityListComponent);
                return SpecialityListComponent;
            }());
            exports_1("SpecialityListComponent", SpecialityListComponent);
        }
    }
});
//# sourceMappingURL=speciality-list.js.map