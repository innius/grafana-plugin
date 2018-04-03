System.register(["app/plugins/sdk", "./css/query-editor.css!"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, InniusDatasourceQueryCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            InniusDatasourceQueryCtrl = /** @class */ (function (_super) {
                __extends(InniusDatasourceQueryCtrl, _super);
                function InniusDatasourceQueryCtrl($scope, $injector, uiSegmentSrv, $q) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.uiSegmentSrv = uiSegmentSrv;
                    _this.$q = $q;
                    _this.target.type = _this.target.type || "sensor";
                    _this.target.valueType = _this.target.valueType || "timeserie";
                    _this.companySegment = uiSegmentSrv.getSegmentForValue(_this.target.domain, "select company");
                    _this.machineSegment = uiSegmentSrv.getSegmentForValue(_this.target.machine, "select machine");
                    _this.sensorSegment = uiSegmentSrv.getSegmentForValue(_this.target.sensor, "select sensor");
                    _this.kpiSegment = uiSegmentSrv.getSegmentForValue(_this.target.kpi, "select kpi");
                    return _this;
                }
                InniusDatasourceQueryCtrl.prototype.searchCompanies = function () {
                    return this.datasource.searchCompanies().then(this.uiSegmentSrv.transformToSegments(false));
                };
                InniusDatasourceQueryCtrl.prototype.companyChanged = function () {
                    this.target.domain = this.companySegment.value;
                    this.refresh();
                };
                InniusDatasourceQueryCtrl.prototype.searchMachines = function (measurementFilter) {
                    return this.datasource.searchMachines(this.target.domain, measurementFilter).then(this.uiSegmentSrv.transformToSegments(false));
                };
                InniusDatasourceQueryCtrl.prototype.machineChanged = function () {
                    this.target.machine = this.machineSegment.value;
                    this.refresh();
                };
                InniusDatasourceQueryCtrl.prototype.searchSensors = function (measurementFilter) {
                    return this.datasource.searchSensors(this.target.domain, this.target.machine, measurementFilter)
                        .then(this.uiSegmentSrv.transformToSegments(false));
                };
                InniusDatasourceQueryCtrl.prototype.sensorChanged = function () {
                    this.target.sensor = this.sensorSegment.value;
                    this.refresh();
                };
                InniusDatasourceQueryCtrl.prototype.searchKpis = function (measurementFilter) {
                    return this.datasource.searchKpis(this.target.domain, this.target.machine, measurementFilter)
                        .then(this.uiSegmentSrv.transformToSegments(false));
                };
                InniusDatasourceQueryCtrl.prototype.kpiChanged = function () {
                    this.target.kpi = this.kpiSegment.value;
                    this.refresh();
                };
                InniusDatasourceQueryCtrl.prototype.getCollapsedText = function () {
                    if (this.target.alias) {
                        return this.target.alias;
                    }
                    var txt = [
                        this.target.type,
                        this.target.type === "sensor" ? this.sensorSegment.value : this.kpiSegment.value,
                        this.machineSegment.value,
                        this.companySegment.value
                    ];
                    return txt.join(" ");
                };
                InniusDatasourceQueryCtrl.prototype.refresh = function () {
                    this.panelCtrl.refresh();
                };
                return InniusDatasourceQueryCtrl;
            }(sdk_1.QueryCtrl));
            exports_1("InniusDatasourceQueryCtrl", InniusDatasourceQueryCtrl);
            InniusDatasourceQueryCtrl.templateUrl = "datasource/partials/query.editor.html";
        }
    };
});
