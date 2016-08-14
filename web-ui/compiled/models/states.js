System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var StatesRecord, States;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            StatesRecord = immutable_1.Record({});
            States = (function (_super) {
                __extends(States, _super);
                function States(props) {
                    _super.call(this, props);
                }
                return States;
            }(StatesRecord));
            exports_1("States", States);
        }
    }
});
//# sourceMappingURL=states.js.map