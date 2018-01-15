System.register(["./components/config"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config_1;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            exports_1("ConfigCtrl", config_1.InniusAppConfigCtrl);
        }
    };
});
