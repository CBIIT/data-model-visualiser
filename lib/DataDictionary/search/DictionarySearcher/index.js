"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _DictionarySearcher = _interopRequireDefault(require("./DictionarySearcher"));

var ReduxDictionarySearcher = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      currentSearchKeyword: state.ddgraph.currentSearchKeyword
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setIsSearching: function setIsSearching(isSearching) {
        return dispatch((0, _action.setIsSearching)(isSearching));
      },
      onSearchResultUpdated: function onSearchResultUpdated(result, summary) {
        return dispatch((0, _action.setSearchResult)(result, summary));
      },
      onSearchHistoryItemCreated: function onSearchHistoryItemCreated(searchHistoryItem) {
        return dispatch((0, _action.addSearchHistoryItem)(searchHistoryItem));
      },
      onSearchResultCleared: function onSearchResultCleared() {
        return dispatch((0, _action.clearSearchResult)());
      },
      onSaveCurrentSearchKeyword: function onSaveCurrentSearchKeyword(keyword) {
        return dispatch((0, _action.saveCurrentSearchKeyword)(keyword));
      },
      onStartSearching: function onStartSearching() {
        return dispatch((0, _action.resetGraphHighlight)());
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(_DictionarySearcher.default);
}();

var _default = ReduxDictionarySearcher;
exports.default = _default;