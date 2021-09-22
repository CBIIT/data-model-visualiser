"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _NodeTooltip = _interopRequireDefault(require("./NodeTooltip"));

var ReduxNodeTooltip = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      hoveringNode: state.ddgraph.hoveringNode,
      canvasBoundingRect: state.ddgraph.canvasBoundingRect,
      graphNodesSVGElements: state.ddgraph.graphNodesSVGElements
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps)(_NodeTooltip.default);
}();

var _default = ReduxNodeTooltip;
exports.default = _default;