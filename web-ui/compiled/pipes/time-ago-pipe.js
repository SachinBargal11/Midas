System.register(['@angular/core', 'moment'], function(exports_1, context_1) {
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
    var core_1, moment;
    var momentConstructor, TimeAgoPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }],
        execute: function() {
            // under systemjs, moment is actually exported as the default export, so we account for that
            momentConstructor = moment.default || moment;
            TimeAgoPipe = (function () {
                function TimeAgoPipe(_cdRef) {
                    this._cdRef = _cdRef;
                }
                TimeAgoPipe.prototype.transform = function (value) {
                    var _this = this;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var momentInstance = momentConstructor(value);
                    this._removeTimer();
                    var timeToUpdate = this._getSecondsUntilUpdate(momentInstance) * 1000;
                    this._currentTimer = window.setTimeout(function () { return _this._cdRef.markForCheck(); }, timeToUpdate);
                    return momentConstructor(value).from(momentConstructor());
                };
                TimeAgoPipe.prototype.ngOnDestroy = function () {
                    this._removeTimer();
                };
                TimeAgoPipe.prototype._removeTimer = function () {
                    if (this._currentTimer) {
                        window.clearTimeout(this._currentTimer);
                        this._currentTimer = null;
                    }
                };
                TimeAgoPipe.prototype._getSecondsUntilUpdate = function (momentInstance) {
                    var howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
                    if (howOld < 1) {
                        return 1;
                    }
                    else if (howOld < 60) {
                        return 30;
                    }
                    else if (howOld < 180) {
                        return 300;
                    }
                    else {
                        return 3600;
                    }
                };
                TimeAgoPipe = __decorate([
                    core_1.Pipe({ name: 'amTimeAgo', pure: false }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], TimeAgoPipe);
                return TimeAgoPipe;
            }());
            exports_1("TimeAgoPipe", TimeAgoPipe);
        }
    }
});
//# sourceMappingURL=time-ago-pipe.js.map