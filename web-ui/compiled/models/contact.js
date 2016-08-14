System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var ContactRecord, Contact;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            ContactRecord = immutable_1.Record({
                id: 0,
                name: "",
                cellPhone: "",
                emailAddress: "",
                homePhone: "",
                workPhone: "",
                faxNo: "",
                isDeleted: 0,
                createByUserId: 0,
                updateByUserId: 0,
                createDate: null,
                updateDate: null //Moment
            });
            Contact = (function (_super) {
                __extends(Contact, _super);
                function Contact(props) {
                    _super.call(this, props);
                }
                return Contact;
            }(ContactRecord));
            exports_1("Contact", Contact);
        }
    }
});
//# sourceMappingURL=contact.js.map