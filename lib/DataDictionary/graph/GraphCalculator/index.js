"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _GraphCalculator = _interopRequireDefault(require("./GraphCalculator"));

var _action = require("../../action");

var ReduxGraphCalculator = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      countsSearch: state.submission.counts_search,
      linksSearch: state.submission.links_search,
      highlightingNode: state.ddgraph.highlightingNode,
      nodes: state.ddgraph.nodes,
      edges: state.ddgraph.edges,
      secondHighlightingNodeID: state.ddgraph.secondHighlightingNodeID,
      layoutInitialized: state.ddgraph.layoutInitialized
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onGraphLayoutCalculated: function onGraphLayoutCalculated(layout) {
        return dispatch((0, _action.setGraphLayout)(layout));
      },
      onGraphLegendCalculated: function onGraphLegendCalculated(legendItems) {
        return dispatch((0, _action.setGraphLegend)(legendItems));
      },
      onHighlightRelatedNodesCalculated: function onHighlightRelatedNodesCalculated(relatedNodeIDs) {
        return dispatch((0, _action.setRelatedNodeIDs)(relatedNodeIDs));
      },
      onSecondHighlightingNodeCandidateIDsCalculated: function onSecondHighlightingNodeCandidateIDsCalculated(secondHighlightingNodeCandidateIDs) {
        return dispatch((0, _action.setSecondHighlightingNodeCandidateIDs)(secondHighlightingNodeCandidateIDs));
      },
      onPathRelatedToSecondHighlightingNodeCalculated: function onPathRelatedToSecondHighlightingNodeCalculated(pathRelatedToSecondHighlightingNode) {
        return dispatch((0, _action.setPathRelatedToSecondHighlightingNode)(pathRelatedToSecondHighlightingNode));
      },
      onDataModelStructureCalculated: function onDataModelStructureCalculated(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes) {
        return dispatch((0, _action.setDataModelStructure)(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_GraphCalculator.default);
}();

var _default = ReduxGraphCalculator;
exports.default = _default;