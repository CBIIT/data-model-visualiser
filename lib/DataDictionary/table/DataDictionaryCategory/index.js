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

var _utils = require("../../../utils");

var _ = _interopRequireDefault(require("../DataDictionaryNode/."));

require("./DataDictionaryCategory.css");

var DataDictionaryCategory = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataDictionaryCategory, _React$Component);

  var _super = (0, _createSuper2.default)(DataDictionaryCategory);

  function DataDictionaryCategory() {
    (0, _classCallCheck2.default)(this, DataDictionaryCategory);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DataDictionaryCategory, [{
    key: "render",
    value: function render() {
      var _this = this;

      var IconSVG = (0, _helper.getCategoryIconSVG)(this.props.category);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-category"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-category__head",
        style: {
          borderLeftColor: (0, _helper.getCategoryColor)(this.props.category)
        }
      }, /*#__PURE__*/_react.default.createElement(IconSVG, {
        className: "data-dictionary-category__icon"
      }), /*#__PURE__*/_react.default.createElement("span", null, (0, _utils.capitalizeFirstLetter)(this.props.category)), /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-category__download_template"
      }, "Download Template")), this.props.nodes.map(function (node) {
        return /*#__PURE__*/_react.default.createElement(_.default, {
          node: node,
          key: node.id,
          description: node.description,
          expanded: _this.props.highlightingNodeID && _this.props.highlightingNodeID === node.id,
          onExpandNode: _this.props.onExpandNode
        });
      }));
    }
  }]);
  return DataDictionaryCategory;
}(_react.default.Component);

DataDictionaryCategory.defaultProps = {
  highlightingNodeID: null,
  onExpandNode: function onExpandNode() {}
};
var _default = DataDictionaryCategory;
exports.default = _default;