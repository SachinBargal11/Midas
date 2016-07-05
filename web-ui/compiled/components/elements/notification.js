System.register(['@angular/core', '../../stores/notifications-store', '../../pipes/time-ago-pipe', '../../pipes/reverse-array-pipe'], function(exports_1, context_1) {
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
    var core_1, notifications_store_1, time_ago_pipe_1, reverse_array_pipe_1;
    var NotificationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (time_ago_pipe_1_1) {
                time_ago_pipe_1 = time_ago_pipe_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            }],
        execute: function() {
            NotificationComponent = (function () {
                function NotificationComponent(_notificationsStore) {
                    this._notificationsStore = _notificationsStore;
                    console.log(this._notificationsStore.notifications);
                }
                NotificationComponent.prototype.ngOnInit = function () {
                };
                NotificationComponent = __decorate([
                    core_1.Component({
                        selector: 'notification',
                        templateUrl: 'templates/elements/notification.html',
                        pipes: [time_ago_pipe_1.TimeAgoPipe, reverse_array_pipe_1.ReversePipe]
                    }), 
                    __metadata('design:paramtypes', [notifications_store_1.NotificationsStore])
                ], NotificationComponent);
                return NotificationComponent;
            }());
            exports_1("NotificationComponent", NotificationComponent);
        }
    }
});
//# sourceMappingURL=notification.js.map