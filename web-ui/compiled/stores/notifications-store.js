System.register(['@angular/core', 'immutable', "rxjs/Rx", 'rxjs/add/operator/share', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, immutable_1, Rx_1;
    var NotificationsStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            NotificationsStore = (function () {
                function NotificationsStore() {
                    this._notifications = new Rx_1.BehaviorSubject(immutable_1.List([]));
                    this.recentlyAdded = false;
                    this.isOpen = false;
                    this.recentlyAddedCount = 0;
                }
                Object.defineProperty(NotificationsStore.prototype, "notifications", {
                    get: function () {
                        return this._notifications.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                NotificationsStore.prototype.addNotification = function (notification) {
                    this.recentlyAdded = this.isOpen ? false : true;
                    if (!this.isOpen) {
                        this.recentlyAddedCount++;
                    }
                    this._notifications.next(this._notifications.getValue().push(notification));
                };
                NotificationsStore.prototype.toggleVisibility = function () {
                    if (this.isOpen) {
                        this.recentlyAddedCount = 0;
                    }
                    this.isOpen = !this.isOpen;
                    this.recentlyAdded = false;
                };
                NotificationsStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], NotificationsStore);
                return NotificationsStore;
            }());
            exports_1("NotificationsStore", NotificationsStore);
        }
    }
});
//# sourceMappingURL=notifications-store.js.map