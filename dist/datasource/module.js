System.register(["./datasource", "./query_ctrl"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var datasource_1, query_ctrl_1, GraphiteQueryOptionsCtrl, AnnotationsQueryCtrl;
    return {
        setters: [
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }
        ],
        execute: function () {
            exports_1("Datasource", datasource_1.InniusDatasource);
            exports_1("QueryCtrl", query_ctrl_1.InniusDatasourceQueryCtrl);
            GraphiteQueryOptionsCtrl = /** @class */ (function () {
                function GraphiteQueryOptionsCtrl() {
                }
                GraphiteQueryOptionsCtrl.templateUrl = "datasource/partials/query.options.html";
                return GraphiteQueryOptionsCtrl;
            }());
            exports_1("QueryOptionsCtrl", GraphiteQueryOptionsCtrl);
            AnnotationsQueryCtrl = /** @class */ (function () {
                function AnnotationsQueryCtrl() {
                }
                AnnotationsQueryCtrl.templateUrl = "datasource/partials/annotations.editor.html";
                return AnnotationsQueryCtrl;
            }());
            exports_1("AnnotationsQueryCtrl", AnnotationsQueryCtrl);
        }
    };
});
