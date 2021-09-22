"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _GraphDrawer = _interopRequireDefault(require("./GraphDrawer"));

var ReduxGraphDrawer = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      nodes: state.ddgraph.nodes,
      edges: state.ddgraph.edges,
      graphBoundingBox: state.ddgraph.graphBoundingBox,
      layoutInitialized: state.ddgraph.layoutInitialized,
      highlightingNode: state.ddgraph.highlightingNode,
      relatedNodeIDs: state.ddgraph.relatedNodeIDs,
      secondHighlightingNodeCandidateIDs: state.ddgraph.secondHighlightingNodeCandidateIDs,
      pathRelatedToSecondHighlightingNode: state.ddgraph.pathRelatedToSecondHighlightingNode,
      secondHighlightingNodeID: state.ddgraph.secondHighlightingNodeID,
      isGraphView: state.ddgraph.isGraphView,
      matchedNodeIDs: state.ddgraph.matchedNodeIDs,
      matchedNodeIDsInNameAndDescription: state.ddgraph.matchedNodeIDsInNameAndDescription,
      searchResult: state.ddgraph.searchResult,
      isSearchMode: state.ddgraph.isSearchMode
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onHoverNode: function onHoverNode(nodeID) {
        return dispatch((0, _action.hoverNode)(nodeID));
      },
      onCancelHoverNode: function onCancelHoverNode() {
        return dispatch((0, _action.hoverNode)(null));
      },
      onClickNode: function onClickNode(nodeID) {
        return dispatch((0, _action.clickNode)(nodeID));
      },
      onGraphNodesSVGElementsUpdated: function onGraphNodesSVGElementsUpdated(graphNodesSVGElements) {
        return dispatch((0, _action.setGraphNodesSVGElements)(graphNodesSVGElements));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_GraphDrawer.default);
}();

var _default = ReduxGraphDrawer;
exports.default = _default;