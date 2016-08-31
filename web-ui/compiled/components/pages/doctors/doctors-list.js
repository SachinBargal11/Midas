System.register(['@angular/core', '@angular/router', '../../../stores/doctors-store', '../../../services/doctors-service', '../../../pipes/reverse-array-pipe', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, doctors_store_1, doctors_service_1, reverse_array_pipe_1, limit_array_pipe_1;
    var DoctorsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (doctors_store_1_1) {
                doctors_store_1 = doctors_store_1_1;
            },
            function (doctors_service_1_1) {
                doctors_service_1 = doctors_service_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            DoctorsListComponent = (function () {
                function DoctorsListComponent(_router, _doctorsStore, _doctorsService) {
                    this._router = _router;
                    this._doctorsStore = _doctorsStore;
                    this._doctorsService = _doctorsService;
                }
                DoctorsListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var user = this._doctorsService.getDoctors()
                        .subscribe(function (doctors) { return _this.doctors = doctors; });
                };
                DoctorsListComponent.prototype.selectDoctor = function (doctor) {
                    this._router.navigate(['/doctors/update/' + doctor.doctor.id]);
                };
                DoctorsListComponent = __decorate([
                    core_1.Component({
                        selector: 'doctors-list',
                        templateUrl: 'templates/pages/doctors/doctors-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        pipes: [reverse_array_pipe_1.ReversePipe, limit_array_pipe_1.LimitPipe],
                        providers: [doctors_store_1.DoctorsStore]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, doctors_store_1.DoctorsStore, doctors_service_1.DoctorsService])
                ], DoctorsListComponent);
                return DoctorsListComponent;
            }());
            exports_1("DoctorsListComponent", DoctorsListComponent);
        }
    }
});
//# sourceMappingURL=doctors-list.js.map