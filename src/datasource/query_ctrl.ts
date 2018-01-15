import { QueryCtrl } from "app/plugins/sdk";
import "./css/query-editor.css!"
import { Grafana as grafana } from "./grafana"
import * as _ from "lodash";
import angular from "angular";
import { InniusDatasource } from "./datasource"

export class InniusDatasourceQueryCtrl extends QueryCtrl {
    public scope: any
    public target: any
    public templateUrl: string
    public machineSegment: grafana.Segment;    
    public sensorSegment: grafana.Segment;
    public companySegment : grafana.Segment;
    private kpiSegment: grafana.Segment;
    public datasource: InniusDatasource;    
    constructor($scope: any, $injector: any, private uiSegmentSrv: grafana.UIService, private $q: angular.IQService) {
        super($scope, $injector);
     
        this.target.type = this.target.type || "sensor";
        this.target.valueType = this.target.valueType || "timeserie";
        this.companySegment = uiSegmentSrv.getSegmentForValue(this.target.domain, "select company");        
        this.machineSegment = uiSegmentSrv.getSegmentForValue(this.target.machine, "select machine");        
        this.sensorSegment = uiSegmentSrv.getSegmentForValue(this.target.sensor, "select sensor");
        this.kpiSegment = uiSegmentSrv.getSegmentForValue(this.target.kpi, "select kpi");
    }

    searchCompanies(): angular.IPromise<grafana.Segment[]> {        
        return this.datasource.searchCompanies().then(this.uiSegmentSrv.transformToSegments(false));
    }

    companyChanged() : void {        
        this.target.domain = this.companySegment.value;
        this.refresh();
    }
    searchMachines(measurementFilter: string): any {
        return this.datasource.searchMachines(this.target.domain, measurementFilter).then(this.uiSegmentSrv.transformToSegments(false));
    }

    machineChanged(): void {
        this.target.machine = this.machineSegment.value;
        this.refresh();
    }

    searchSensors(measurementFilter: any): any {
        return this.datasource.searchSensors(this.target.domain, this.target.machine, measurementFilter)
            .then(this.uiSegmentSrv.transformToSegments(false))
    }

    sensorChanged(): void {
        this.target.sensor = this.sensorSegment.value
        this.refresh();
    }

    searchKpis(measurementFilter: string): any {
       return this.datasource.searchKpis(this.target.domain, this.target.machine, measurementFilter)
            .then(this.uiSegmentSrv.transformToSegments(false))
    }

    kpiChanged(): void {
        this.target.kpi = this.kpiSegment.value;
        this.refresh();
    }

    getCollapsedText() : string {
        if (this.target.alias) {
            return this.target.alias;
        } 

        let txt = [
            this.target.type, 
            this.target.type === "sensor" ? this.sensorSegment.value : this.kpiSegment.value, 
            this.machineSegment.value, 
            this.companySegment.value
        ]
       return txt.join(" ")
    }
    
    private refresh(): void {
        this.panelCtrl.refresh();
    }
}

InniusDatasourceQueryCtrl.templateUrl = "datasource/partials/query.editor.html";

