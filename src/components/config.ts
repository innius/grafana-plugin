import angular from "angular";
export class InniusAppConfigCtrl {
    appModel: any;
    backendSrv: any;
    alertSrv: any;
    validKey: boolean;
    errorMsg: string;
    appEditCtrl: any;
    constructor($scope: any, $injector: any, private $q: angular.IQService, backendSrv: any, alertSrv: any, contextSrv: any, datasourceSrv: any) {
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



    reset(): void {
        this.appModel.jsonData.apiKeySet = false;
        this.validKey = false;
        this.errorMsg = "";
    }

    validateKey(): void {
        var self = this;
        var p = this.backendSrv.get("api/plugin-proxy/innius-dashboard-app/api/ping");
        p.then((resp) => {
            self.validKey = true;
            self.errorMsg = "";
        }, (resp) => {
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
    }


    preUpdate(): angular.IPromise<any> {
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
    }

    connect(): any {
        var self = this;

        return this.backendSrv.request({ url: "/connect" })
            .then((resp) => {
                return self.createDatasource()
                    .then(() => {
                        self.appModel.secureJsonData.apiKey = resp;
                        self.appModel.enabled = true;
                        self.appModel.jsonData.apiKeySet = true;
                        self.validKey = true;
                    });
            },
            (err) => {
                if (self.appModel.enabled) {
                    self.alertSrv.set("failed to enable innius app", err.statusText, "error", 10000);
                    self.appModel.enabled = false;
                    self.appModel.jsonData.apiKeySet = false;
                    self.appModel.secureJsonData.apiKey = "";
                    self.errorMsg = "";
                    self.validKey = false;
                }
            });
    }

    createDatasource(): any {
        const innius = "innius";
        let datasource = {
            name: innius,
            type: `${innius}-datasource`,
            access: "proxy",
            isDefault: true
        }
        return this.backendSrv.get(`/api/datasources/name/${innius}`)
            .then(
            () => { return this.$q.resolve() },
            (err) => {
                if (err.status === 404) {
                    return this.backendSrv.post(`/api/datasources/`, datasource);
                }
                throw err;
            });
    }
}
InniusAppConfigCtrl.templateUrl = "components/config.html";