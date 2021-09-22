"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _DictionarySearchHistory = _interopRequireDefault(require("./DictionarySearchHistory"));

var ReduxDictionarySearchHistory = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      searchHistoryItems: state.ddgraph.searchHistoryItems
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onClearSearchHistoryItems: function onClearSearchHistoryItems() {
        return dispatch((0, _action.clearSearchHistoryItems)());
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DictionarySearchHistory.default);
}();

var _default = ReduxDictionarySearchHistory;
exports.default = _default;