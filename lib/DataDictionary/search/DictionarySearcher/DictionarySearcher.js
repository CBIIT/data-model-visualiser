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

var _AutoComplete = _interopRequireDefault(require("@gen3/ui-component/dist/components/AutoComplete"));

var _stringSimilarity = require("string-similarity");

var _searchHelper = require("./searchHelper");

require("./DictionarySearcher.css");

var DictionarySearcher = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DictionarySearcher, _React$Component);

  var _super = (0, _createSuper2.default)(DictionarySearcher);

  function DictionarySearcher(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DictionarySearcher);
    _this = _super.call(this, props);

    _this.onClearResult = function () {
      _this.resetSearchResult();

      _this.autoCompleteRef.current.clearInput();
    };

    _this.launchClearSearchFromOutside = function () {
      _this.onClearResult();
    };

    _this.launchSearchFromOutside = function (keyword) {
      _this.autoCompleteRef.current.setInputText(keyword);

      _this.search(keyword);
    };

    _this.search = function (str) {
      _this.props.setIsSearching(true);

      var _searchKeyword = (0, _searchHelper.searchKeyword)(_this.searchData, str),
          result = _searchKeyword.result,
          errorMsg = _searchKeyword.errorMsg;

      if (!result || result.length === 0) {
        _this.props.setIsSearching(false);

        _this.props.onSearchResultUpdated([], []);

        _this.setState({
          isSearchFinished: true,
          hasError: true,
          errorMsg: errorMsg,
          suggestionList: []
        });

        return;
      }

      var summary = (0, _searchHelper.getSearchSummary)(result);

      _this.setState({
        isSearchFinished: true,
        hasError: false,
        searchResult: {
          matchedNodes: result,
          summary: summary
        },
        suggestionList: []
      });

      _this.props.setIsSearching(false);

      _this.props.onSearchResultUpdated(result, summary);

      _this.props.onSearchHistoryItemCreated({
        keywordStr: str,
        matchedCount: summary.generalMatchedNodeIDs.length
      });

      _this.props.onSaveCurrentSearchKeyword(str);
    };

    _this.resetSearchResult = function () {
      _this.setState({
        isSearchFinished: false,
        searchResult: {
          matchedNodes: [],
          summary: {}
        }
      });

      _this.props.onSearchResultCleared();
    };

    _this.inputChangeFunc = function (inputText) {
      _this.props.onStartSearching();

      _this.resetSearchResult();

      var _searchKeyword2 = (0, _searchHelper.searchKeyword)(_this.searchData, inputText),
          result = _searchKeyword2.result;

      var matchedStrings = {};
      result.forEach(function (resItem) {
        resItem.matches.forEach(function (matchItem) {
          if (!matchedStrings[matchItem.value]) {
            matchedStrings[matchItem.value] = {
              matchedPieceIndices: matchItem.indices.map(function (arr) {
                return [arr[0], arr[1] + 1];
              })
            };
          }
        });
      });
      var suggestionList = Object.keys(matchedStrings).sort(function (str1, str2) {
        return (0, _stringSimilarity.compareTwoStrings)(str2, inputText) - (0, _stringSimilarity.compareTwoStrings)(str1, inputText);
      }).map(function (str) {
        return {
          fullString: str,
          matchedPieceIndices: matchedStrings[str].matchedPieceIndices
        };
      });

      _this.setState({
        suggestionList: suggestionList
      });
    };

    _this.suggestionItemClickFunc = function (suggestionItem) {
      _this.autoCompleteRef.current.setInputText(suggestionItem.fullString);

      _this.search(suggestionItem.fullString);
    };

    _this.submitInputFunc = function (inputText) {
      _this.search(inputText);
    };

    _this.searchData = (0, _searchHelper.prepareSearchData)(props.dictionary);
    _this.autoCompleteRef = /*#__PURE__*/_react.default.createRef();
    _this.state = {
      suggestionList: [],
      isSearchFinished: false,
      searchResult: {
        matchedNodes: [],
        summary: {}
      },
      hasError: false,
      errorMsg: ''
    };
    return _this;
  }

  (0, _createClass2.default)(DictionarySearcher, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // resume search status after switching back from other pages
      if (this.props.currentSearchKeyword) {
        this.autoCompleteRef.current.setInputText(this.props.currentSearchKeyword);
        this.search(this.props.currentSearchKeyword);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-searcher"
      }, /*#__PURE__*/_react.default.createElement(_AutoComplete.default, {
        ref: this.autoCompleteRef,
        suggestionList: this.state.suggestionList,
        inputPlaceHolderText: "Search in Dictionary",
        onSuggestionItemClick: this.suggestionItemClickFunc,
        onInputChange: this.inputChangeFunc,
        onSubmitInput: this.submitInputFunc
      }), this.state.isSearchFinished && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !this.state.hasError && (this.state.searchResult.matchedNodes.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "dictionary-searcher__result"
      }, /*#__PURE__*/_react.default.createElement("h4", {
        className: "dictionary-searcher__result-text"
      }, "Search Results"), /*#__PURE__*/_react.default.createElement("span", {
        className: "dictionary-searcher__result-clear body",
        onClick: this.onClearResult,
        role: "button",
        tabIndex: 0,
        onKeyPress: this.onClearResult
      }, "Clear Result")), /*#__PURE__*/_react.default.createElement("li", {
        className: "dictionary-searcher__result-item body"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "dictionary-searcher__result-count"
      }, this.state.searchResult.summary.matchedNodeNameAndDescriptionsCount), " matches in nodes (title and description)"), /*#__PURE__*/_react.default.createElement("li", {
        className: "dictionary-searcher__result-item body"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "dictionary-searcher__result-count"
      }, this.state.searchResult.summary.matchedPropertiesCount), " matches in node properties")) : /*#__PURE__*/_react.default.createElement("p", null, _searchHelper.ZERO_RESULT_FOUND_MSG)), this.state.hasError && /*#__PURE__*/_react.default.createElement("p", null, this.state.errorMsg)));
    }
  }]);
  return DictionarySearcher;
}(_react.default.Component);

DictionarySearcher.defaultProps = {
  setIsSearching: function setIsSearching() {},
  onSearchResultUpdated: function onSearchResultUpdated() {},
  onSearchHistoryItemCreated: function onSearchHistoryItemCreated() {},
  onSearchResultCleared: function onSearchResultCleared() {},
  onSaveCurrentSearchKeyword: function onSaveCurrentSearchKeyword() {},
  currentSearchKeyword: '',
  onStartSearching: function onStartSearching() {}
};
var _default = DictionarySearcher;
exports.default = _default;