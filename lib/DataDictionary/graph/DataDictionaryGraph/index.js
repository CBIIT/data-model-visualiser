"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("../GraphCalculator/."));

var _2 = _interopRequireDefault(require("../Legend/."));

var _3 = _interopRequireDefault(require("../Canvas/."));

var _4 = _interopRequireDefault(require("../GraphDrawer/."));

var _5 = _interopRequireDefault(require("../NodeTooltip/."));

var _6 = _interopRequireDefault(require("../NodePopup/."));

var _7 = _interopRequireDefault(require("../OverlayPropertyTable/."));

var _8 = _interopRequireDefault(require("../ActionLayer/."));

var DataDictionaryGraph = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataDictionaryGraph, _React$Component);

  var _super = (0, _createSuper2.default)(DataDictionaryGraph);

  function DataDictionaryGraph() {
    (0, _classCallCheck2.default)(this, DataDictionaryGraph);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DataDictionaryGraph, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.default, null), /*#__PURE__*/_react.default.createElement(_2.default, null), /*#__PURE__*/_react.default.createElement(_3.default, null, /*#__PURE__*/_react.default.createElement(_4.default, null)), /*#__PURE__*/_react.default.createElement(_5.default, null), /*#__PURE__*/_react.default.createElement(_6.default, null), /*#__PURE__*/_react.default.createElement(_7.default, null), /*#__PURE__*/_react.default.createElement(_8.default, {
        onClearSearchResult: this.props.onClearSearchResult
      }));
    }
  }]);
  return DataDictionaryGraph;
}(_react.default.Component);

DataDictionaryGraph.defaultProps = {
  onClearSearchResult: function onClearSearchResult() {}
};
var _default = DataDictionaryGraph;
exports.default = _default;