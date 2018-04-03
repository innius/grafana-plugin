System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function sort(a, b) {
        var aa = a.toUpperCase();
        var bb = b.toUpperCase();
        if (aa < bb) {
            return -1;
        }
        if (aa > bb) {
            return 1;
        }
        return 0;
    }
    var Machine, Sensor, QueryResult, InniusDatasource;
    return {
        setters: [],
        execute: function () {
            Machine = /** @class */ (function () {
                function Machine() {
                }
                return Machine;
            }());
            Sensor = /** @class */ (function () {
                function Sensor() {
                }
                return Sensor;
            }());
            QueryResult = /** @class */ (function () {
                function QueryResult() {
                }
                return QueryResult;
            }());
            exports_1("QueryResult", QueryResult);
            InniusDatasource = /** @class */ (function () {
                function InniusDatasource(instanceSettings, $q, backendSrv, templateSrv) {
                    this.instanceSettings = instanceSettings;
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                }
                InniusDatasource.prototype.url = function (path) {
                    return "api/plugin-proxy/innius-dashboard-app/api" + path;
                };
                InniusDatasource.prototype.inniusDatasourceRequest = function (options) {
                    return this.backendSrv.datasourceRequest(options);
                };
                InniusDatasource.prototype.testDatasource = function () {
                    return this.inniusDatasourceRequest({
                        url: this.url("/ping"),
                        method: "GET",
                    }).then(function (x) {
                        if (x.status === 200) {
                            return { status: "success", message: "Data source is working", title: "Success" };
                        }
                    });
                };
                InniusDatasource.prototype.query = function (query) {
                    var _this = this;
                    var targets = query.targets.map(function (x) { return _this.buildQueryParameters(x); });
                    query.targets = targets;
                    query.targets = query.targets.filter(function (t) { return !t.hide; });
                    if (query.targets.length <= 0) {
                        return this.$q.when({ data: [] });
                    }
                    return this.inniusDatasourceRequest({
                        url: this.url("/query"),
                        data: query,
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    }).then(function (resp) { return _this.transformQueryResult(resp.data); });
                };
                InniusDatasource.prototype.transformQueryResult = function (data) {
                    return {
                        data: data.map(function (result) {
                            return {
                                target: result.target,
                                datapoints: result.datapoints.map(function (x) { return [x.v, x.t]; })
                            };
                        })
                    };
                };
                InniusDatasource.prototype.buildQueryParameters = function (target) {
                    var self = this;
                    function replace(s) {
                        return self.templateSrv.replace(s);
                    }
                    return {
                        domain: target.domain,
                        machine: replace(target.machine),
                        sensor: replace(target.sensor),
                        kpi: replace(target.kpi),
                        type: target.type,
                        valuetype: target.valueType,
                        hide: target.hide,
                        refId: target.refId,
                        alias: target.alias,
                    };
                };
                InniusDatasource.prototype.searchCompanies = function () {
                    return this.inniusDatasourceRequest({
                        url: this.url("/search/companies"),
                        method: "GET"
                    }).then(function (x) { return x.data.map(function (s) { return { text: s, value: s }; }); });
                };
                InniusDatasource.prototype.searchMachines = function (domain, filter) {
                    return this.inniusDatasourceRequest({
                        url: this.url("/search/machines"),
                        data: {
                            domain: domain,
                            machinefilter: filter
                        },
                        method: "POST"
                    }).then(function (x) { return x.data
                        .map(function (m) { return { text: m.machineid, value: m.machineid }; })
                        .sort(function (a, b) {
                        return sort(a.value, b.value);
                    }); });
                };
                InniusDatasource.prototype.searchSensors = function (domain, machineid, filter) {
                    return this.inniusDatasourceRequest({
                        url: this.url("/search/sensors"),
                        data: {
                            domain: domain,
                            machineid: machineid,
                            sensorfilter: filter,
                        },
                        method: "POST"
                    }).then(function (x) { return x.data
                        .map(function (s) { return { text: s.name, value: s.name }; })
                        .sort(function (a, b) {
                        return sort(a.value, b.value);
                    }); });
                };
                InniusDatasource.prototype.searchKpis = function (domain, machineid, filter) {
                    return this.inniusDatasourceRequest({
                        url: this.url("/search/kpis"),
                        data: {
                            domain: domain,
                            machineid: machineid,
                            kpifilter: filter,
                        },
                        method: "POST"
                    }).then(function (x) { return x.data.map(function (s) { return { text: s.id, value: s.id }; }); });
                };
                InniusDatasource.prototype.annotateQuery = function (options) {
                    return this.$q.when([]);
                };
                InniusDatasource.prototype.metricFindQuery = function (query, foo) {
                    switch (query) {
                        case "machine":
                            return this.searchMachines("");
                    }
                    return this.$q.when([]);
                };
                return InniusDatasource;
            }());
            exports_1("InniusDatasource", InniusDatasource);
        }
    };
});
