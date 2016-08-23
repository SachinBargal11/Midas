System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var AddressRecord, Address;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            AddressRecord = immutable_1.Record({
                id: 0,
                name: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                isDeleted: 0,
                createByUserId: 0,
                updateByUserId: 0,
                createDate: null,
                updateDate: null // Moment
            });
            Address = (function (_super) {
                __extends(Address, _super);
                function Address(props) {
                    _super.call(this, props);
                }
                return Address;
            }(AddressRecord));
            exports_1("Address", Address);
        }
    }
});
//# sourceMappingURL=address.js.map