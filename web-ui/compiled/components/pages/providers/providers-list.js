System.register(['@angular/core', '@angular/router', '../../../services/providers-service', '../../../pipes/reverse-array-pipe', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, providers_service_1, reverse_array_pipe_1, limit_array_pipe_1;
    var ProvidersListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (providers_service_1_1) {
                providers_service_1 = providers_service_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            ProvidersListComponent = (function () {
                function ProvidersListComponent(_router, _providersService) {
                    this._router = _router;
                    this._providersService = _providersService;
                }
                ProvidersListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._providersService.getProviders()
                        .subscribe(function (providers) { return _this.providers = providers; });
                };
                ProvidersListComponent = __decorate([
                    core_1.Component({
                        selector: 'providers-list',
                        templateUrl: 'templates/pages/providers/providers-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [providers_service_1.ProvidersService],
                        pipes: [reverse_array_pipe_1.ReversePipe, limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, providers_service_1.ProvidersService])
                ], ProvidersListComponent);
                return ProvidersListComponent;
            }());
            exports_1("ProvidersListComponent", ProvidersListComponent);
        }
    }
});
//# sourceMappingURL=providers-list.js.map