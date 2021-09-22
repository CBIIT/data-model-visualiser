"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _Legend = _interopRequireDefault(require("./Legend"));

var ReduxLegend = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      items: state.ddgraph.legendItems
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps)(_Legend.default);
}();

var _default = ReduxLegend;
exports.default = _default;