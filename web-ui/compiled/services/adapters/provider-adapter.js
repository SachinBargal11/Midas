System.register(['../../models/provider'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var provider_1;
    var ProviderAdapter;
    return {
        setters:[
            function (provider_1_1) {
                provider_1 = provider_1_1;
            }],
        execute: function() {
            ProviderAdapter = (function () {
                function ProviderAdapter() {
                }
                ProviderAdapter.parseResponse = function (providerData) {
                    var provider = null;
                    if (providerData) {
                        provider = new provider_1.Provider({
                            id: providerData.id,
                            name: providerData.name,
                            npi: providerData.npi,
                            federalTaxID: providerData.federalTaxID,
                            prefix: providerData.prefix
                        });
                    }
                    return provider;
                };
                return ProviderAdapter;
            }());
            exports_1("ProviderAdapter", ProviderAdapter);
        }
    }
});
//# sourceMappingURL=provider-adapter.js.map