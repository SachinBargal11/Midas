System.register(['@angular/core', 'underscore'], function(exports_1, context_1) {
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
    var core_1, underscore_1;
    var MapToJSPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            MapToJSPipe = (function () {
                function MapToJSPipe() {
                }
                MapToJSPipe.prototype.transform = function (items, args) {
                    return underscore_1.default.map(items, function (datum) {
                        return datum.toJS();
                    });
                };
                MapToJSPipe = __decorate([
                    core_1.Pipe({
                        name: 'mapToJS',
                        pure: false
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MapToJSPipe);
                return MapToJSPipe;
            }());
            exports_1("MapToJSPipe", MapToJSPipe);
        }
    }
});
//# sourceMappingURL=map-to-js.js.map