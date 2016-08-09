System.register(['immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var immutable_1;
    var ProviderRecord, Provider;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            ProviderRecord = immutable_1.Record({
                provider: {
                    id: 0,
                    name: "",
                    npi: "",
                    federalTaxID: "",
                    prefix: "",
                    providerMedicalFacilities: "",
                    isDeleted: 0,
                    createByUserID: 0,
                    updateByUserID: 0,
                    createDate: null,
                    updateDate: null
                }
            });
            Provider = (function (_super) {
                __extends(Provider, _super);
                function Provider(props) {
                    _super.call(this, props);
                }
                return Provider;
            }(ProviderRecord));
            exports_1("Provider", Provider);
        }
    }
});
//# sourceMappingURL=provider.js.map