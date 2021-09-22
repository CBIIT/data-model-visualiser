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

var _highlightHelper = require("../../highlightHelper");

var _ = _interopRequireDefault(require("../../table/DataDictionaryPropertyTable/."));

require("./OverlayPropertyTable.css");

var OverlayPropertyTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(OverlayPropertyTable, _React$Component);

  var _super = (0, _createSuper2.default)(OverlayPropertyTable);

  function OverlayPropertyTable() {
    var _this;

    (0, _classCallCheck2.default)(this, OverlayPropertyTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.getTitle = function () {
      if (_this.props.isSearchMode) {
        var nodeTitleFragment = (0, _highlightHelper.getNodeTitleFragment)(_this.props.matchedResult.matches, _this.props.node.title, 'overlay-property-table__span');
        return nodeTitleFragment;
      }

      return _this.props.node.title;
    };

    _this.getDescription = function () {
      if (_this.props.isSearchMode) {
        var nodeDescriptionFragment = (0, _highlightHelper.getNodeDescriptionFragment)(_this.props.matchedResult.matches, _this.props.node.description, 'overlay-property-table__span');
        return nodeDescriptionFragment;
      }

      return _this.props.node.description;
    };

    _this.handleClose = function () {
      _this.props.onCloseOverlayPropertyTable();
    };

    _this.handleOpenAllProperties = function () {
      _this.props.onOpenMatchedProperties();
    };

    _this.handleDisplayOnlyMatchedProperties = function () {
      _this.props.onCloseMatchedProperties();
    };

    return _this;
  }

  (0, _createClass2.default)(OverlayPropertyTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.node || this.props.hidden) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      var IconSVG = (0, _helper.getCategoryIconSVG)(this.props.node.category);
      var searchedNodeNotOpened = this.props.isSearchMode && !this.props.isSearchResultNodeOpened;
      var needHighlightSearchResult = this.props.isSearchMode;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__background"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__fixed-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__content"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__category"
      }, /*#__PURE__*/_react.default.createElement(IconSVG, {
        className: "overlay-property-table__category-icon"
      }), /*#__PURE__*/_react.default.createElement("h4", {
        className: "overlay-property-table__category-text"
      }, this.props.node.category), this.props.isSearchMode && /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "overlay-property-table__toggle-node",
        onClick: searchedNodeNotOpened ? this.handleOpenAllProperties : this.handleDisplayOnlyMatchedProperties,
        label: searchedNodeNotOpened ? 'See All' : 'See Only Matched',
        buttonType: "secondary"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "overlay-property-table__close",
        onClick: this.handleClose,
        onKeyPress: this.handleClose,
        role: "button",
        tabIndex: 0
      }, "Close", /*#__PURE__*/_react.default.createElement("i", {
        className: "overlay-property-table__close-icon g3-icon g3-icon--cross g3-icon--sm"
      })), /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "overlay-property-table__download-button",
        onClick: function onClick() {
          (0, _utils.downloadTemplate)('tsv', _this2.props.node.id);
        },
        label: "TSV",
        buttonType: "secondary",
        rightIcon: "download"
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "overlay-property-table__download-button",
        onClick: function onClick() {
          (0, _utils.downloadTemplate)('json', _this2.props.node.id);
        },
        label: "JSON",
        buttonType: "secondary",
        rightIcon: "download"
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "overlay-property-table__property"
      }, /*#__PURE__*/_react.default.createElement(_.default, {
        properties: this.props.node.properties,
        requiredProperties: this.props.node.required,
        hasBorder: false,
        onlyShowMatchedProperties: searchedNodeNotOpened,
        needHighlightSearchResult: needHighlightSearchResult,
        hideIsRequired: searchedNodeNotOpened,
        matchedResult: this.props.matchedResult
      })))));
    }
  }]);
  return OverlayPropertyTable;
}(_react.default.Component);

OverlayPropertyTable.defaultProps = {
  hidden: true,
  node: null,
  onCloseOverlayPropertyTable: function onCloseOverlayPropertyTable() {},
  isSearchMode: false,
  matchedResult: {},
  onOpenMatchedProperties: function onOpenMatchedProperties() {},
  onCloseMatchedProperties: function onCloseMatchedProperties() {},
  isSearchResultNodeOpened: false
};
var _default = OverlayPropertyTable;
exports.default = _default;