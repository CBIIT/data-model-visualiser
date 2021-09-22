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

var _utils = require("../../utils");

var _highlightHelper = require("../../highlightHelper");

require("./DataDictionaryPropertyTable.css");

var DataDictionaryPropertyTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataDictionaryPropertyTable, _React$Component);

  var _super = (0, _createSuper2.default)(DataDictionaryPropertyTable);

  function DataDictionaryPropertyTable() {
    (0, _classCallCheck2.default)(this, DataDictionaryPropertyTable);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DataDictionaryPropertyTable, [{
    key: "render",
    value: function render() {
      var _this = this;

      var borderModifier = this.props.hasBorder ? '' : 'data-dictionary-property-table--without-border';
      var propertyKeysList = this.props.hideIsRequired ? Object.keys(this.props.properties) : Object.keys(this.props.properties).sort(function (k1, k2) {
        var required1 = _this.props.requiredProperties.includes(k1);

        var required2 = _this.props.requiredProperties.includes(k2);

        if (required1) return -1;
        if (required2) return 1;
        return 0;
      });
      var needHighlightSearchResult = this.props.onlyShowMatchedProperties || this.props.needHighlightSearchResult;
      var matchedPropertiesSummary = needHighlightSearchResult ? (0, _highlightHelper.getMatchesSummaryForProperties)(this.props.properties, this.props.matchedResult.matches) : [];
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-property-table ".concat(borderModifier)
      }, /*#__PURE__*/_react.default.createElement("table", {
        className: "data-dictionary-property-table__table"
      }, /*#__PURE__*/_react.default.createElement("thead", {
        className: "data-dictionary-property-table__head"
      }, /*#__PURE__*/_react.default.createElement("tr", {
        className: "data-dictionary-property-table__row"
      }, /*#__PURE__*/_react.default.createElement("th", {
        className: "data-dictionary-property-table__data data-dictionary-property-table__data--property"
      }, "Property"), /*#__PURE__*/_react.default.createElement("th", {
        className: "data-dictionary-property-table__data data-dictionary-property-table__data--type"
      }, "Type"), !this.props.hideIsRequired && /*#__PURE__*/_react.default.createElement("th", {
        className: "data-dictionary-property-table__data data-dictionary-property-table__data--required"
      }, "Required"), /*#__PURE__*/_react.default.createElement("th", {
        className: "data-dictionary-property-table__data data-dictionary-property-table__data--description"
      }, "Description"), /*#__PURE__*/_react.default.createElement("th", {
        className: "data-dictionary-property-table__data data-dictionary-property-table__data--term"
      }, "Src"))), /*#__PURE__*/_react.default.createElement("tbody", null, propertyKeysList.map(function (propertyKey) {
        var property = _this.props.properties[propertyKey];
        var nameMatch = null;
        var descriptionMatch = null;
        var typeMatchList = null;

        if (_this.props.needHighlightSearchResult) {
          var matchedSummaryItem = matchedPropertiesSummary.find(function (item) {
            return item.propertyKey === propertyKey;
          });

          if (matchedSummaryItem) {
            nameMatch = matchedSummaryItem.nameMatch;
            descriptionMatch = matchedSummaryItem.descriptionMatch;
            typeMatchList = matchedSummaryItem.typeMatchList;
          } else if (_this.props.onlyShowMatchedProperties) {
            return null;
          }
        }

        var termID = '';
        var termLink = '';
        var type = '';

        if ('src' in property) {
          try {
            termID = property.src;
            termLink = property.term.termDef && property.term.termDef.term_url;
          } catch (err) {}
        }

        var propertyNameFragment = (0, _highlightHelper.getPropertyNameFragment)(propertyKey, nameMatch, 'data-dictionary-property-table__span');

        if ('type' in property) {
          try {
            type = property.type;
          } catch (err) {}
        }

        var propertyDescriptionFragment = (0, _highlightHelper.getPropertyDescriptionFragment)(property, descriptionMatch, 'data-dictionary-property-table__span');

        var isRequired = _this.props.requiredProperties.includes(propertyKey);

        return /*#__PURE__*/_react.default.createElement("tr", {
          key: propertyKey
        }, /*#__PURE__*/_react.default.createElement("td", {
          className: "data-dictionary-property-table__data"
        }, propertyNameFragment), /*#__PURE__*/_react.default.createElement("td", {
          className: "data-dictionary-property-table__data"
        }, /*#__PURE__*/_react.default.createElement("p", null, JSON.stringify(type))), !_this.props.hideIsRequired && /*#__PURE__*/_react.default.createElement("td", {
          className: "data-dictionary-property-table__data"
        }, isRequired ? /*#__PURE__*/_react.default.createElement("span", {
          className: "data-dictionary-property-table__required"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "g3-icon g3-icon--star data-dictionary-property-table__required-icon"
        }), "Required") : /*#__PURE__*/_react.default.createElement("span", null, "No")), /*#__PURE__*/_react.default.createElement("td", {
          className: "data-dictionary-property-table__data"
        }, /*#__PURE__*/_react.default.createElement("p", null, propertyDescriptionFragment)), /*#__PURE__*/_react.default.createElement("td", {
          className: "data-dictionary-property-table__data"
        }, /*#__PURE__*/_react.default.createElement("p", null, JSON.stringify(termID))));
      }))));
    }
  }]);
  return DataDictionaryPropertyTable;
}(_react.default.Component);

DataDictionaryPropertyTable.defaultProps = {
  requiredProperties: [],
  hasBorder: true,
  needHighlightSearchResult: false,
  matchedResult: {},
  hideIsRequired: false,
  onlyShowMatchedProperties: false
};
var _default = DataDictionaryPropertyTable;
exports.default = _default;