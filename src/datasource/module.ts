import {InniusDatasource} from "./datasource";
import {InniusDatasourceQueryCtrl} from "./query_ctrl";

class GraphiteQueryOptionsCtrl {
  static templateUrl : string = "datasource/partials/query.options.html";
}

class AnnotationsQueryCtrl {
  static templateUrl : string = "datasource/partials/annotations.editor.html";
}

export {
  InniusDatasource as Datasource,
  InniusDatasourceQueryCtrl as QueryCtrl,  
  GraphiteQueryOptionsCtrl as QueryOptionsCtrl,
  AnnotationsQueryCtrl as AnnotationsQueryCtrl,
};