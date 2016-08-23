System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var SessionRecord, Session;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            SessionRecord = immutable_1.Record({
                user: null
            });
            Session = (function (_super) {
                __extends(Session, _super);
                function Session() {
                    _super.apply(this, arguments);
                    this._user = null;
                }
                Object.defineProperty(Session.prototype, "user", {
                    get: function () {
                        return this._user;
                    },
                    set: function (value) {
                        this._user = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Session.prototype, "displayName", {
                    get: function () {
                        return this._user.firstName + ' ' + this._user.lastName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Session.prototype, "account_id", {
                    get: function () {
                        return this._user.accountId;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Session;
            }(SessionRecord));
            exports_1("Session", Session);
        }
    }
});
//# sourceMappingURL=session.js.map