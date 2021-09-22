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

require("./NodeTooltip.css");

var NodeTooltip = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(NodeTooltip, _React$Component);

  var _super = (0, _createSuper2.default)(NodeTooltip);

  function NodeTooltip() {
    (0, _classCallCheck2.default)(this, NodeTooltip);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(NodeTooltip, [{
    key: "render",
    value: function render() {
      if (!this.props.hoveringNode) return null;
      var hoveringNodeSVGElement = this.props.graphNodesSVGElements && this.props.graphNodesSVGElements[this.props.hoveringNode.id];
      var svgBoundingBox = hoveringNodeSVGElement ? hoveringNodeSVGElement.getBoundingClientRect() : {
        top: 0,
        left: 0,
        width: 0
      };
      var gap = 10;
      var tooltipLeft = svgBoundingBox.left - this.props.canvasBoundingRect.left + svgBoundingBox.width / 2;
      var tooltipBottom = window.innerHeight - svgBoundingBox.top + gap;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "node-tooltip",
        style: {
          bottom: tooltipBottom,
          left: tooltipLeft
        }
      }, this.props.hoveringNode && /*#__PURE__*/_react.default.createElement("div", {
        className: "node-tooltip__wrapper"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "node-tooltip__text"
      }, this.props.hoveringNode.label), /*#__PURE__*/_react.default.createElement("span", {
        className: "node-tooltip__arrow"
      })));
    }
  }]);
  return NodeTooltip;
}(_react.default.Component);

NodeTooltip.defaultProps = {
  hoveringNode: null,
  canvasBoundingRect: {
    top: 0,
    left: 0
  },
  graphNodesSVGElements: {}
};
var _default = NodeTooltip;
exports.default = _default;