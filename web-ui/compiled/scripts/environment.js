System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LOCAL_DEV_ENV, DEV_ENV, Environment;
    return {
        setters:[],
        execute: function() {
            LOCAL_DEV_ENV = {
                // 'SERVICE_BASE_URL' : 'http://localhost:3004'
                'SERVICE_BASE_URL': 'http://codearray.dlinkddns.com:7003/midasapi'
            };
            DEV_ENV = {
                'SERVICE_BASE_URL': 'http://gyb-db.herokuapp.com'
            };
            Environment = LOCAL_DEV_ENV;
            exports_1("default",Environment);
        }
    }
});
//# sourceMappingURL=environment.js.map