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

var _Button = _interopRequireDefault(require("@gen3/ui-component/dist/components/Button"));

require("./NodePopup.css");

var NodePopup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(NodePopup, _React$Component);

  var _super = (0, _createSuper2.default)(NodePopup);

  function NodePopup() {
    var _this;

    (0, _classCallCheck2.default)(this, NodePopup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleClickPropertyButton = function () {
      _this.props.onOpenOverlayPropertyTable();
    };

    return _this;
  }

  (0, _createClass2.default)(NodePopup, [{
    key: "render",
    value: function render() {
      if (!this.props.highlightingNode) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      }

      var highlightingNodeSVGElement = this.props.graphNodesSVGElements && this.props.graphNodesSVGElements[this.props.highlightingNode.id];
      var svgBoundingBox = highlightingNodeSVGElement && highlightingNodeSVGElement.getBoundingClientRect ? highlightingNodeSVGElement.getBoundingClientRect() : {
        top: 0,
        left: 0,
        width: 0,
        bottom: 0
      };
      var popupLeft = svgBoundingBox.left - this.props.canvasBoundingRect.left + svgBoundingBox.width / 2;
      var popupTop = svgBoundingBox.bottom - this.props.canvasBoundingRect.top;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "node-popup",
        style: {
          top: popupTop,
          left: popupLeft
        }
      }, this.props.highlightingNode && /*#__PURE__*/_react.default.createElement("div", {
        className: "node-popup__wrapper"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "node-popup__content"
      }, /*#__PURE__*/_react.default.createElement("li", {
        className: "node-popup__list-item"
      }, this.props.highlightingNode.requiredPropertiesCount, " required properties"), /*#__PURE__*/_react.default.createElement("li", {
        className: "node-popup__list-item"
      }, this.props.highlightingNode.optionalPropertiesCount, " optional properties"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "node-popup__button",
        onClick: this.handleClickPropertyButton,
        label: "Open properties",
        buttonType: "secondary"
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "node-popup__arrow node-popup__arrow--outer"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "node-popup__arrow node-popup__arrow--inner"
      }), /*#__PURE__*/_react.default.createElement("i", {
        className: "node-popup__close g3-icon g3-icon--cross",
        onClick: this.props.onClosePopup,
        onKeyPress: this.props.onClosePopup,
        role: "button",
        tabIndex: 0
      })));
    }
  }]);
  return NodePopup;
}(_react.default.Component);

NodePopup.defaultProps = {
  highlightingNode: null,
  graphNodesSVGElements: null,
  onClosePopup: function onClosePopup() {},
  canvasBoundingRect: {
    top: 0,
    left: 0
  },
  onOpenOverlayPropertyTable: function onOpenOverlayPropertyTable() {}
};
var _default = NodePopup;
exports.default = _default;