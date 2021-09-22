"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _ActionLayer = _interopRequireDefault(require("./ActionLayer"));

var ReduxActionLayer = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      isSearchMode: state.ddgraph.isSearchMode
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps)(_ActionLayer.default);
}();

var _default = ReduxActionLayer;
exports.default = _default;