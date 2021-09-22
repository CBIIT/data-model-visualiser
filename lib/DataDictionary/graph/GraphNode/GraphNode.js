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

var _helper = require("../../NodeCategories/helper");

var _utils = require("../../utils");

var _highlightHelper = require("../../highlightHelper");

require("./GraphNode.css");

var GraphNode = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(GraphNode, _React$Component);

  var _super = (0, _createSuper2.default)(GraphNode);

  function GraphNode(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GraphNode);
    _this = _super.call(this, props);
    _this.svgElement = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(GraphNode, [{
    key: "getSVGElement",
    value: function getSVGElement() {
      return this.svgElement.current;
    }
  }, {
    key: "render",
    value: function render() {
      if (!(this.props.node.id !== undefined && this.props.node.type !== undefined && this.props.node.textPadding !== undefined && this.props.node.topCenterX !== undefined && this.props.node.topCenterY !== undefined && this.props.node.width !== undefined && this.props.node.height !== undefined && this.props.node.color !== undefined && this.props.node.names !== undefined && this.props.node.iconRadius !== undefined) && this.props.node.textLineGap !== undefined && this.props.node.fontSize !== undefined) {
        return null;
      }

      var nodeFadedClassModifier = this.props.isFaded ? 'graph-node--faded' : '';
      var nodeHalfFadedClassModifier = this.props.isHalfFaded ? 'graph-node--half-faded' : '';
      var nodeDashedClassModifier = this.props.isDashed ? 'graph-node--dashed' : '';
      var nodeClickableClassModifier = this.props.isClickable ? 'graph-node--clickable' : 'graph-node--not-clickable';
      var nodeIsCurrentHighlightingClassModifier = this.props.isHighlightingNode ? 'graph-drawer__node--current-highlighting' : '';
      var IconSVG = (0, _helper.getCategoryIconSVG)(this.props.node.type);
      return /*#__PURE__*/_react.default.createElement("g", {
        ref: this.svgElement,
        key: this.props.node.id,
        transform: "translate(".concat(this.props.node.topCenterX, ", ").concat(this.props.node.topCenterY, ") "),
        className: "graph-node \n          ".concat(nodeFadedClassModifier, " \n          ").concat(nodeHalfFadedClassModifier, " \n          ").concat(nodeDashedClassModifier, " \n          ").concat(nodeClickableClassModifier, " \n          ").concat(nodeIsCurrentHighlightingClassModifier),
        onMouseOver: this.props.onMouseOver,
        onMouseOut: this.props.onMouseOut,
        onClick: this.props.onClick,
        id: this.props.node.id
      }, /*#__PURE__*/_react.default.createElement("rect", {
        className: "graph-node__rect",
        x: -this.props.node.width / 2,
        y: 0,
        width: this.props.node.width,
        height: this.props.node.height,
        rx: 4,
        ry: 4,
        stroke: this.props.node.color
      }), (0, _highlightHelper.getNodeTitleSVGFragment)(this.props.node.names, this.props.matchedNodeNameIndices, this.props.node.fontSize, this.props.node.textPadding, this.props.node.textLineGap), /*#__PURE__*/_react.default.createElement("g", {
        transform: "translate(".concat(-this.props.node.iconRadius, ", ").concat(-this.props.node.iconRadius, ")")
      }, IconSVG ? /*#__PURE__*/_react.default.createElement(IconSVG, null) : /*#__PURE__*/_react.default.createElement("circle", {
        cx: this.props.node.iconRadius,
        cy: this.props.node.iconRadius,
        r: this.props.node.iconRadius,
        fill: this.props.node.color
      })));
    }
  }]);
  return GraphNode;
}(_react.default.Component);

GraphNode.defaultProps = {
  onMouseOver: function onMouseOver() {},
  onMouseOut: function onMouseOut() {},
  onClick: function onClick() {},
  matchedNodeNameIndices: []
};
var _default = GraphNode;
exports.default = _default;