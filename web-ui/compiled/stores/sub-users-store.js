System.register(['@angular/core', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../services/subusers-service', 'immutable', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Observable_1, subusers_service_1, immutable_1, Rx_1;
    var SubUsersStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (subusers_service_1_1) {
                subusers_service_1 = subusers_service_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            SubUsersStore = (function () {
                function SubUsersStore(_subusersService) {
                    this._subusersService = _subusersService;
                    this._subusers = new Rx_1.BehaviorSubject(immutable_1.List([]));
                }
                SubUsersStore.prototype.addSubUser = function (subuser) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        _this._subusersService.addSubUser(subuser).subscribe(function (subuser) {
                            _this._subusers.next(_this._subusers.getValue().push(subuser));
                            resolve(subuser);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.from(promise);
                };
                SubUsersStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [subusers_service_1.SubUsersService])
                ], SubUsersStore);
                return SubUsersStore;
            }());
            exports_1("SubUsersStore", SubUsersStore);
        }
    }
});
//# sourceMappingURL=sub-users-store.js.map