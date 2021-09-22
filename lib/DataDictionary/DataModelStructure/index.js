"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../action.js");

var _DataModelStructure = _interopRequireDefault(require("./DataModelStructure"));

var ReduxDataModelStructure = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dataModelStructure: state.ddgraph.dataModelStructure,
      isGraphView: state.ddgraph.isGraphView,
      overlayPropertyHidden: state.ddgraph.overlayPropertyHidden,
      relatedNodeIDs: state.ddgraph.dataModelStructureRelatedNodeIDs,
      allRoutes: state.ddgraph.dataModelStructureAllRoutesBetween,
      clickingNodeName: state.ddgraph.highlightingNode ? state.ddgraph.highlightingNode.label : '',
      dictionaryVersion: state.versionInfo.dictionaryVersion
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onSetGraphView: function onSetGraphView(isGraphView) {
        return dispatch((0, _action.setGraphView)(isGraphView));
      },
      onSetOverlayPropertyTableHidden: function onSetOverlayPropertyTableHidden(hidden) {
        return dispatch((0, _action.setOverlayPropertyTableHidden)(hidden));
      },
      onResetGraphCanvas: function onResetGraphCanvas() {
        return dispatch((0, _action.setNeedReset)(true));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DataModelStructure.default);
}();

var _default = ReduxDataModelStructure;
exports.default = _default;