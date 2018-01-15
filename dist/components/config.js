System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InniusAppConfigCtrl;
    return {
        setters: [],
        execute: function () {
            InniusAppConfigCtrl = (function () {
                function InniusAppConfigCtrl($scope, $injector, $q, backendSrv, alertSrv, contextSrv, datasourceSrv) {
                    this.$q = $q;
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.alertSrv = alertSrv;
                    this.validKey = false;
                    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
                    if (this.appModel.jsonData === null) {
                        this.appModel.jsonData = {};
                    }
                    if (!this.appModel.secureJsonData) {
                        this.appModel.secureJsonData = {};
                    }
                    if (this.appModel.enabled) {
                        this.validateKey();
                    }
                }
                InniusAppConfigCtrl.prototype.reset = function () {
                    this.appModel.jsonData.apiKeySet = false;
                    this.validKey = false;
                    this.errorMsg = "";
                };
                InniusAppConfigCtrl.prototype.validateKey = function () {
                    var self = this;
                    var p = this.backendSrv.get("api/plugin-proxy/innius-dashboard-app/api/ping");
                    p.then(function (resp) {
                        self.validKey = true;
                        self.errorMsg = "";
                    }, function (resp) {
                        if (self.appModel.enabled) {
                            self.alertSrv.set("failed to verify apiKey", resp.statusText, "error", 10000);
                            self.appModel.enabled = false;
                            self.appModel.jsonData.apiKeySet = false;
                            self.appModel.secureJsonData.apiKey = "";
                            self.errorMsg = "invalid apiKey";
                            self.validKey = false;
                        }
                    });
                    return p;
                };
                InniusAppConfigCtrl.prototype.preUpdate = function () {
                    var model = this.appModel;
                    if (!model.enabled) {
                        model.jsonData.apiKeySet = false;
                        model.secureJsonData.apiKey = "";
                        return this.$q.resolve();
                    }
                    if (!model.jsonData.apiKeySet && !model.secureJsonData.apiKey) {
                        return this.connect();
                    }
                    model.jsonData.apiKeySet = true;
                    return this.$q.resolve();
                };
                InniusAppConfigCtrl.prototype.connect = function () {
                    var self = this;
                    return this.backendSrv.request({ url: "/connect" })
                        .then(function (resp) {
                        return self.createDatasource()
                            .then(function () {
                            self.appModel.secureJsonData.apiKey = resp;
                            self.appModel.enabled = true;
                            self.appModel.jsonData.apiKeySet = true;
                            self.validKey = true;
                        });
                    }, function (err) {
                        if (self.appModel.enabled) {
                            self.alertSrv.set("failed to enable innius app", err.statusText, "error", 10000);
                            self.appModel.enabled = false;
                            self.appModel.jsonData.apiKeySet = false;
                            self.appModel.secureJsonData.apiKey = "";
                            self.errorMsg = "";
                            self.validKey = false;
                        }
                    });
                };
                InniusAppConfigCtrl.prototype.createDatasource = function () {
                    var _this = this;
                    var innius = "innius";
                    var datasource = {
                        name: innius,
                        type: innius + "-datasource",
                        access: "proxy",
                        isDefault: true
                    };
                    return this.backendSrv.get("/api/datasources/name/" + innius)
                        .then(function () { return _this.$q.resolve(); }, function (err) {
                        if (err.status === 404) {
                            return _this.backendSrv.post("/api/datasources/", datasource);
                        }
                        throw err;
                    });
                };
                return InniusAppConfigCtrl;
            }());
            exports_1("InniusAppConfigCtrl", InniusAppConfigCtrl);
            InniusAppConfigCtrl.templateUrl = "components/config.html";
        }
    };
});
