// /// <reference path="../typings/modules/angular/index.d.ts" />
// /// <reference path="../typings/globals/chai/index.d.ts" />
// /// <reference path="../typings/globals/mocha/index.d.ts" />

// // import * as angular from "angular"
// import { assert } from "chai";
// // import * as Q from "q";

// // import { Grafana as grafana } from "../src/grafana"
// import { InniusDatasource } from "../src/datasource/datasource"

// // interface testContext {
// //     backendService: grafana.GrafanaBackendService
// //     $q: any
// //     ds: GenericDatasource
// //     templateService: grafana.GrafanaTemplateService
// // }

// describe("innius datasource", () => {
//     describe("query", () => {
//         it("should transform api response to grafana format", () => {
//             let ds = new InniusDatasource(null, null, null, null);
//             const data = [
//                 {
//                     "target": {
//                         "machine": "foo",
//                         "type": "bar",
//                         "id": "baz"
//                     },
//                     "datapoints": [
//                         {
//                             "t": 1490338550,
//                             "v": 860
//                         },
//                         {
//                             "t": 1490339550,
//                             "v": 861
//                         }                        
//                     ]
//                 }
//             ]
//             let result = ds.transformQueryResult(data).data;
//             assert.equal(result[0].target, data[0].target);
//             assert.deepEqual(result[0].datapoints, [[860,1490338550],[861,1490339550]])            
//         })
//     })
// })

// // describe("InniusDataSource", () => {
// //     let ctx: testContext = {};
// //     beforeEach(() => {
// //         ctx.$q = Q;
// //         ctx.backendService = {
// //             datasourceRequest: function (foo: any): any {
// //                 return Promise.resolve<angular.IHttpPromiseCallbackArg<any>>({ status: 200 })
// //             }
// //         }
// //         ctx.templateService = {
// //             replace(target: any, scopedVars: any, format: any): any {
// //                 return target
// //             }
// //         }
// //         ctx.ds = new InniusDatasource({ url: "foo" }, ctx.$q, ctx.backendService, ctx.templateService)
// //     })

// //     it("test the datasource", (done) => {
// //         ctx.ds.testDatasource().then(x => {
// //             assert.isString(x.message)
// //             assert.isString(x.status)
// //             assert.isString(x.title)
// //             done()
// //         })
// //     });

// //     // it("should return an empty array when no targets are set", (done) => {
// //     //     ctx.ds.query({ targets: [] }).then(result => {
// //     //         assert.equal(result.data, 0);
// //     //         done()
// //     //     })
// //     // });

// //     it("should return the service result when a target is set", (done) => {
// //         ctx.backendService.datasourceRequest = function (options: angular.IRequestConfig): any {
// //             return ctx.$q.when({
// //                 data: [
// //                     {
// //                         target: 'X',
// //                         datapoints: [1, 2, 3]
// //                     }
// //                 ]
// //             });
// //         }
// //         let targets = [
// //             { refId: "foo", target: "bar", type: "table", hide: false }
// //         ]
// //         ctx.ds.query({ targets: targets }).then(result => {
// //             var series = result.data[0];
// //             assert.equal(series.target, "X")
// //             assert.deepEqual(series.datapoints, [1, 2, 3])
// //             done()
// //         })
// //     });

// //     it("should return the metric results when a target is null", (done) => {
// //         ctx.backendService.datasourceRequest = function (options: angular.IRequestConfig): any {
// //             return ctx.$q.when({
// //                 data: [
// //                     "trn:plantage:machine:foo",
// //                     "trn:plantage:machine:bar",
// //                 ]
// //             });
// //         }

// //         ctx.ds.metricFindQuery({ target: "" }).then(result => {
// //             assert.equal(result[0].text, "trn:plantage:machine:foo")
// //             assert.equal(result[1].text, "trn:plantage:machine:bar")
// //             done()
// //         })
// //     })

// //     it("should return the metric target results when a target is set", (done) => {
// //         ctx.backendService.datasourceRequest = function (options: angular.IRequestConfig): any {
// //             let target = options.data.target;
// //             var result = [target + "_0", target + "_1", target + "_2"];
// //             return ctx.$q.when({
// //                 data: result
// //             });
// //         }
// //         let trn = "trn:plantage:machine:foo"
// //         ctx.ds.metricFindQuery({ target: trn }).then(result => {
// //             assert.equal(result[0].text, trn + "_0")            
// //             done()
// //         })
// //     })
// // })