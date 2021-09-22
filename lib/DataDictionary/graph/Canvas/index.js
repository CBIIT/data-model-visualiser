"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _Canvas = _interopRequireDefault(require("./Canvas"));

var ReduxCanvas = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      isGraphView: state.ddgraph.isGraphView,
      needReset: state.ddgraph.needReset
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onClickBlankSpace: function onClickBlankSpace() {
        return dispatch((0, _action.clickBlankSpace)());
      },
      onCanvasBoundingBoxUpdate: function onCanvasBoundingBoxUpdate(canvasBoundingRect) {
        return dispatch((0, _action.setCanvasBoundingRect)(canvasBoundingRect));
      },
      onResetCanvasFinished: function onResetCanvasFinished() {
        return dispatch((0, _action.setNeedReset)(false));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Canvas.default);
}();

var _default = ReduxCanvas;
exports.default = _default;