System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gender;
    return {
        setters:[],
        execute: function() {
            (function (Gender) {
                Gender[Gender["Male"] = 1] = "Male";
                Gender[Gender["Female"] = 2] = "Female";
            })(Gender || (Gender = {}));
            exports_1("Gender", Gender);
        }
    }
});
//# sourceMappingURL=Gender.js.map