System.register(['immutable', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1, moment_1;
    var NotificationRecord, Notification;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            NotificationRecord = immutable_1.Record({
                // actionTakenAt: null,
                // actionTakenBy: null,
                // actedTakenUpon: null,
                // actionType: "",
                title: '',
                createdAt: moment_1.default(),
                type: '',
                isRead: false
            });
            Notification = (function (_super) {
                __extends(Notification, _super);
                function Notification(props) {
                    _super.call(this, props);
                }
                return Notification;
            }(NotificationRecord));
            exports_1("Notification", Notification);
        }
    }
});
//# sourceMappingURL=notification.js.map