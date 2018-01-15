import { Grafana as grafana } from "./grafana"
/// <reference path="../typings/modules/angular/index.d.ts" />
import * as angular from "angular";
import * as _ from "lodash";

export interface Target {
    domain: string
    machine: string
    type: string
    sensor: string
    kpi: string
    hide: boolean, 
    refId: string, 
    valueType: string,  
    alias: string,
}

class Machine {
    machineid: string
}

class Sensor {
    id: string
}
export class QueryResult {
    target: Target
    datapoints: Array<number[]>
}

export interface QueryResponse {
    target: Target,
    datapoints: { t: number, v: number }[]
}

export class InniusDatasource {
    constructor(
        private instanceSettings: grafana.InstanceSettings, private $q: angular.IQService,
        private backendSrv: grafana.GrafanaBackendService, private templateSrv: grafana.GrafanaTemplateService) {
    }

    private url(path: string): string {
        return "api/plugin-proxy/innius-grafana-plugin/api" + path
    }

    inniusDatasourceRequest(options: angular.IRequestConfig ) : angular.IHttpPromise<any> {
        return this.backendSrv.datasourceRequest(options)
    }

    testDatasource(): angular.IPromise<grafana.GrafanaTestDatasourceResult> {
        return this.inniusDatasourceRequest({
            url: this.url("/ping"),
            method: "GET",
        }).then((x) => {
            if (x.status === 200) {
                return { status: "success", message: "Data source is working", title: "Success" }
            }
        })
    }

    query(query: grafana.GrafanaBackendQueryOptions): angular.IHttpPromise<grafana.QueryResult> {
        let targets = query.targets.map(x => this.buildQueryParameters(x));
        query.targets = targets;
        
        query.targets = query.targets.filter(t => !t.hide);

        if (query.targets.length <= 0) {
            return this.$q.when({ data: [] });
        }

        return this.inniusDatasourceRequest({
            url: this.url("/query"),
            data: query,
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then((resp) => this.transformQueryResult(resp.data))
    }

    transformQueryResult(data: QueryResponse[]): { data: QueryResult[] } {
        return {
            data: data.map(result => {
                return {
                    target: result.target,
                    datapoints: result.datapoints.map(x => [x.v, x.t])
                }
            })
        }
    }
    
    buildQueryParameters(target: Target): any {
        let self = this;
        function replace(s: string): string[] {
            return self.templateSrv.replace(s);            
        }
        
        return {
            domain: target.domain,
            machine: replace(target.machine),
            sensor: replace(target.sensor),
            kpi: replace(target.kpi),
            type: target.type,
            valuetype : target.valueType, 
            hide: target.hide, 
            refId : target.refId,
            alias : target.alias,
        }
    }

    searchCompanies() : angular.IPromise<grafana.MetricFindQueryResult[]> {
        return this.inniusDatasourceRequest({
            url: this.url("/search/companies"),            
            method: "GET"
        }).then(x => x.data.map((s : String) => { return { text: s, value: s} }))
    }    

    searchMachines(domain: string, filter: string): angular.IPromise<grafana.MetricFindQueryResult[]> {
        return this.inniusDatasourceRequest({
            url: this.url("/search/machines"),
            data: {
                domain: domain, 
                machinefilter: filter
            },
            method: "POST"
        }).then(x => x.data
            .map((m: Machine) => { return { text: m.machineid, value: m.machineid } })
            .sort((a, b) => {
                return sort(a.value, b.value)
            }));
    }

    searchSensors(domain: string, machineid: string, filter: string): angular.IPromise<grafana.MetricFindQueryResult[]> {
        return this.inniusDatasourceRequest({
            url: this.url(`/search/sensors`),
            data: {
                domain: domain,
                machineid: machineid,
                sensorfilter: filter,
            },
            method: "POST"
        }).then(x => x.data
            .map((s: Sensor) => { return { text: s.id, value: s.id } })
            .sort((a, b) => {
                return sort(a.value, b.value)
            })
        )
    }

    searchKpis(domain: string, machineid: string, filter: string): angular.IPromise<grafana.MetricFindQueryResult[]> {
        return this.inniusDatasourceRequest({
            url: this.url(`/search/kpis`),
            data: {
                domain: domain, 
                machineid: machineid,
                kpifilter: filter,
            },
            method: "POST"
        }).then(x => x.data.map((s: Sensor) => { return { text: s.id, value: s.id } }))
    }

    annotateQuery(options: grafana.AnnotateQueryOptions): angular.IHttpPromise<grafana.AnnotateQueryResult[]> {
        return this.$q.when([]);
    }

    metricFindQuery(query: string, foo: any): angular.IHttpPromise<grafana.AnnotateQueryResult[]> {
        switch (query) {
            case "machine":
                return this.searchMachines("");          
        }
        return this.$q.when([]);
    }
}

function sort(a: string, b: string) : number {
    let aa = a.toUpperCase();
    let bb = b.toUpperCase();
    if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }                
      return 0;
}