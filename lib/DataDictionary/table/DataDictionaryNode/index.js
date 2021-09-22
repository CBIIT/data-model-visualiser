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

var _utils = require("../../utils");

var _helper = require("../../NodeCategories/helper");

var _ = _interopRequireDefault(require("../DataDictionaryPropertyTable/."));

require("./DataDictionaryNode.css");

var DataDictionaryNode = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataDictionaryNode, _React$Component);

  var _super = (0, _createSuper2.default)(DataDictionaryNode);

  function DataDictionaryNode() {
    var _this;

    (0, _classCallCheck2.default)(this, DataDictionaryNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleCloseNode = function () {
      _this.props.onExpandNode(null);
    };

    _this.handleDownloadTemplate = function (e, format) {
      e.stopPropagation(); // no toggling

      (0, _utils.downloadTemplate)(format, _this.props.node.id);
    };

    return _this;
  }

  (0, _createClass2.default)(DataDictionaryNode, [{
    key: "handleClickNode",
    value: function handleClickNode(nodeID) {
      if (!this.props.expanded) {
        this.props.onExpandNode(nodeID);
      } else {
        this.props.onExpandNode(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-node",
        style: {
          borderLeftColor: (0, _helper.getCategoryColor)(this.props.node.category)
        },
        onClick: function onClick() {
          return _this2.handleClickNode(_this2.props.node.id);
        },
        onKeyPress: function onKeyPress() {
          return _this2.handleClickNode(_this2.props.node.id);
        },
        role: "button",
        tabIndex: 0
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-node__title"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "g3-icon g3-icon--folder data-dictionary-node__file-icon"
      }), this.props.node.title, /*#__PURE__*/_react.default.createElement("i", {
        className: "g3-icon g3-icon--chevron-".concat(this.props.expanded ? 'down' : 'right', " data-dictionary-node__toggle-icon")
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-node__description"
      }, this.props.description), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-node__download-group"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-node__button-wrap"
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "data-dictionary-node__download-button",
        onClick: function onClick(e) {
          _this2.handleDownloadTemplate(e, 'json');
        },
        label: "JSON",
        rightIcon: "download",
        buttonType: "secondary"
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-node__button-wrap"
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "data-dictionary-node__download-button",
        onClick: function onClick(e) {
          _this2.handleDownloadTemplate(e, 'tsv');
        },
        label: "TSV",
        rightIcon: "download",
        buttonType: "secondary"
      })))), this.props.expanded && /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-node__property"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-node__property-close",
        onClick: this.handleCloseNode,
        onKeyPress: this.handleCloseNode,
        role: "button",
        tabIndex: 0
      }, "Close tab", /*#__PURE__*/_react.default.createElement("i", {
        className: "g3-icon g3-icon--cross data-dictionary-node__property-close-icon"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-node__property-summary"
      }, /*#__PURE__*/_react.default.createElement("span", null, this.props.node.title), /*#__PURE__*/_react.default.createElement("span", null, " has "), /*#__PURE__*/_react.default.createElement("span", null, Object.keys(this.props.node.properties).length), /*#__PURE__*/_react.default.createElement("span", null, " properties. ")), /*#__PURE__*/_react.default.createElement(_.default, {
        properties: this.props.node.properties,
        requiredProperties: this.props.node.required
      })));
    }
  }]);
  return DataDictionaryNode;
}(_react.default.Component);

DataDictionaryNode.defaultProps = {
  description: '',
  expanded: false,
  onExpandNode: function onExpandNode() {}
};
var _default = DataDictionaryNode;
exports.default = _default;