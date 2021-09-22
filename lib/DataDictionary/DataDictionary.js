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

var _DataDictionaryTable = _interopRequireDefault(require("./table/DataDictionaryTable"));

var _DataModelStructure = _interopRequireDefault(require("./DataModelStructure"));

var _ = _interopRequireDefault(require("./graph/DataDictionaryGraph/."));

var _2 = _interopRequireDefault(require("./search/DictionarySearcher/."));

var _3 = _interopRequireDefault(require("./search/DictionarySearchHistory/."));

require("./DataDictionary.css");

var DataDictionary = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataDictionary, _React$Component);

  var _super = (0, _createSuper2.default)(DataDictionary);

  function DataDictionary(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DataDictionary);
    _this = _super.call(this, props);

    _this.setGraphView = function (isGraphView) {
      _this.props.onSetGraphView(isGraphView);
    };

    _this.handleClickSearchHistoryItem = function (keyword) {
      _this.dictionarySearcherRef.current.getWrappedInstance().launchSearchFromOutside(keyword);
    };

    _this.handleClearSearchResult = function () {
      _this.dictionarySearcherRef.current.getWrappedInstance().launchClearSearchFromOutside();
    };

    _this.dictionarySearcherRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(DataDictionary, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__sidebar"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__switch"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary__switch-button ".concat(!this.props.isGraphView ? '' : 'data-dictionary__switch-button--active'),
        onClick: function onClick() {
          _this2.setGraphView(true);
        },
        onKeyPress: function onKeyPress() {
          _this2.setGraphView(true);
        },
        role: "button",
        tabIndex: 0
      }, "Graph View"), /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary__switch-button ".concat(this.props.isGraphView ? '' : 'data-dictionary__switch-button--active'),
        onClick: function onClick() {
          _this2.setGraphView(false);
        },
        onKeyPress: function onKeyPress() {
          _this2.setGraphView(true);
        },
        role: "button",
        tabIndex: 0
      }, "Table View")), /*#__PURE__*/_react.default.createElement(_2.default, {
        ref: this.dictionarySearcherRef
      }), /*#__PURE__*/_react.default.createElement(_DataModelStructure.default, null), /*#__PURE__*/_react.default.createElement(_3.default, {
        onClickSearchHistoryItem: this.handleClickSearchHistoryItem
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__search-history"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__main"
      }, this.props.isGraphView ? /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__graph ".concat(this.props.isGraphView ? '' : 'data-dictionary__graph--hidden')
      }, /*#__PURE__*/_react.default.createElement(_.default, {
        onClearSearchResult: this.handleClearSearchResult
      })) : /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary__table ".concat(!this.props.isGraphView ? '' : 'data-dictionary__table--hidden')
      }, /*#__PURE__*/_react.default.createElement(_DataDictionaryTable.default, null))));
    }
  }]);
  return DataDictionary;
}(_react.default.Component);

DataDictionary.defaultProps = {
  onSetGraphView: function onSetGraphView() {},
  isGraphView: false
};
var _default = DataDictionary;
exports.default = _default;