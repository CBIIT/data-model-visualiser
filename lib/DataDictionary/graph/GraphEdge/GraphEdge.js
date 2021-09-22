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

require("./GraphEdge.css");

var GraphEdge = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(GraphEdge, _React$Component);

  var _super = (0, _createSuper2.default)(GraphEdge);

  function GraphEdge() {
    (0, _classCallCheck2.default)(this, GraphEdge);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(GraphEdge, [{
    key: "render",
    value: function render() {
      var edgeRequiredClassModifier = this.props.edge.required ? 'graph-edge--required' : '';
      var edgeFadedClassModifier = this.props.isFaded ? 'graph-edge--faded' : '';
      var edgeHalfFadedClassModifier = this.props.isHalfFaded ? 'graph-edge--half-faded' : '';
      var edgeHighlightedClassModifier = this.props.isHighlighted ? 'graph-edge--highlighted' : '';
      return /*#__PURE__*/_react.default.createElement("path", {
        className: "graph-edge \n          ".concat(edgeRequiredClassModifier, " \n          ").concat(edgeFadedClassModifier, " \n          ").concat(edgeHalfFadedClassModifier, " \n          ").concat(edgeHighlightedClassModifier) // marker-end="url(#markerArrow)"//adding arrow
        ,
        d: this.props.edge.pathString
      });
    }
  }]);
  return GraphEdge;
}(_react.default.Component);

var _default = GraphEdge;
exports.default = _default;