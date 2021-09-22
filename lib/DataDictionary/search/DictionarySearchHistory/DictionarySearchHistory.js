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

require("./DictionarySearchHistory.css");

var DictionarySearchHistory = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DictionarySearchHistory, _React$Component);

  var _super = (0, _createSuper2.default)(DictionarySearchHistory);

  function DictionarySearchHistory() {
    var _this;

    (0, _classCallCheck2.default)(this, DictionarySearchHistory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleClick = function (keyword) {
      _this.props.onClickSearchHistoryItem(keyword);
    };

    _this.handleClearHistory = function () {
      _this.props.onClearSearchHistoryItems();
    };

    return _this;
  }

  (0, _createClass2.default)(DictionarySearchHistory, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.searchHistoryItems && this.props.searchHistoryItems.length > 0) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "dictionary-search-history"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "dictionary-search-history__title"
        }, /*#__PURE__*/_react.default.createElement("h4", {
          className: "dictionary-search-history__title-text"
        }, "Last Search"), /*#__PURE__*/_react.default.createElement("span", {
          className: "dictionary-search-history__clear",
          onClick: this.handleClearHistory,
          role: "button",
          onKeyPress: this.handleClearHistory,
          tabIndex: 0
        }, "Clear History")), /*#__PURE__*/_react.default.createElement("div", null, this.props.searchHistoryItems && this.props.searchHistoryItems.map(function (item) {
          var zeroCountModifier = item.matchedCount === 0 ? 'dictionary-search-history__item-badge--zero' : '';
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "dictionary-search-history__item",
            key: item.keywordStr,
            onClick: function onClick() {
              return _this2.handleClick(item.keywordStr);
            },
            role: "button",
            onKeyPress: function onKeyPress() {
              return _this2.handleClick(item.keywordStr);
            },
            tabIndex: 0
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: "dictionary-search-history__item-keyword"
          }, item.keywordStr), /*#__PURE__*/_react.default.createElement("span", {
            className: "dictionary-search-history__item-badge ".concat(zeroCountModifier)
          }, item.matchedCount));
        })));
      }

      return null;
    }
  }]);
  return DictionarySearchHistory;
}(_react.default.Component);

DictionarySearchHistory.defaultProps = {
  searchHistoryItems: [],
  onClickSearchHistoryItem: function onClickSearchHistoryItem() {},
  onClearSearchHistoryItems: function onClearSearchHistoryItems() {}
};
var _default = DictionarySearchHistory;
exports.default = _default;