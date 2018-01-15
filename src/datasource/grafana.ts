/// <reference path="../typings/modules/angular/index.d.ts" />
import * as angular from "angular";

export namespace Grafana {
    export interface QueryCtrl {}

    export interface InstanceSettings {
        url: string
        jsonData: {
            token : string
        }
    }

    export interface GrafanaBackendService {
        datasourceRequest(options: angular.IRequestConfig): angular.IHttpPromise<any>
    }

    export interface MetricFindQueryOptions {
        target: string
    }

    export interface MetricFindQueryResult {
        text: string
        value: string
    }
    
    export interface Range {
        from: string
        to: string
    }

    export interface AnnotateQueryResult {
        annotation: Annotation
        title: string
        time: number
        text: string
        tags: string
    }

    export interface Annotation {
        datasource: string
        enable: boolean
        name: string
    }

    export interface AnnotateQueryOptions {
        range: Range
        rangeRaw: Range
        annotation: Annotation

    }

    export interface GrafanaDataSource {
        testDatasource(): angular.IPromise<GrafanaTestDatasourceResult>
        query(options: GrafanaBackendQueryOptions): angular.IHttpPromise<QueryResult>
        metricFindQuery(options: MetricFindQueryOptions | string): angular.IHttpPromise<MetricFindQueryResult[]>
        annotateQuery(options: AnnotateQueryOptions): angular.IHttpPromise<AnnotateQueryResult[]>
    }

    export interface GrafanaTemplateService {
        replace(target: any, scopedVars?: any, format?: any): any
    }

    export interface GrafanaBackendTarget {
        refId: string
        target: string
        hide: boolean
        type: string
    }

    export interface GrafanaBackendQueryOptions {
        targets: GrafanaBackendTarget[]
    }

    export interface GrafanaTestDatasourceResult {
        status: string
        message: string
        title: string
    }

    export interface QueryResult { }

    export interface SegmentOptions {
            value? : string 
            html? : string 
            expandable?: boolean
            fake?: boolean 
            type?: string 
            text?: string
    }

    export interface Segment extends SegmentOptions {}

    export interface UIService {
        newSelectMetric() : Segment
        newSegment(options: SegmentOptions) : Segment
        transformToSegments(addTemplateVars: boolean, segmentFilter? : any) : (results : MetricFindQueryResult[] ) => Segment[]
        getSegmentForValue(options : SegmentOptions, value : any) : any 
        newKeyValue(value: any) : Segment
    }
}