"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _NodePopup = _interopRequireDefault(require("./NodePopup"));

var ReduxNodePopup = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      highlightingNode: state.ddgraph.highlightingNode,
      canvasBoundingRect: state.ddgraph.canvasBoundingRect,
      graphNodesSVGElements: state.ddgraph.graphNodesSVGElements
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onClosePopup: function onClosePopup() {
        return dispatch((0, _action.resetGraphHighlight)());
      },
      onOpenOverlayPropertyTable: function onOpenOverlayPropertyTable() {
        return dispatch((0, _action.setOverlayPropertyTableHidden)(false));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_NodePopup.default);
}();

var _default = ReduxNodePopup;
exports.default = _default;