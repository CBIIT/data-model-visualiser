"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.category2NodeList = category2NodeList;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./DataDictionaryTable.css");

var _utils = require("../../utils");

var _ = _interopRequireDefault(require("../DataDictionaryCategory/."));

/**
 * Just exported for testing
 * Little helper that extacts a mapping of category-name to
 * the list of nodes in that category given a dictionary definition object
 *
 * @param {Object} dictionary
 * @return {} mapping from category to node list
 */

/* eslint-disable no-param-reassign */
function category2NodeList(dictionary) {
  var res = Object.keys(dictionary).filter(function (id) {
    return id.charAt(0) !== '_' && id === dictionary[id].id;
  }).map(function (id) {
    return dictionary[id];
  }).filter(function (node) {
    return node.category && node.id;
  }).reduce(function (lookup, node) {
    if (!lookup[node.category]) {
      lookup[node.category] = [];
    }

    lookup[node.category].push(node);
    return lookup;
  }, {});
  return res;
}
/* eslint-enable no-param-reassign */


var getNodePropertyCount = function getNodePropertyCount(dictionary) {
  var res = (0, _utils.parseDictionaryNodes)(dictionary).reduce(function (acc, node) {
    acc.nodesCount += 1;
    acc.propertiesCount += Object.keys(node.properties).length;
    return acc;
  }, {
    nodesCount: 0,
    propertiesCount: 0
  });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount
  };
};
/**
 * Little components presents an overview of the types in a dictionary organized by category
 *
 * @param {dictionary} params
 */


var DataDictionaryTable = function DataDictionaryTable(_ref) {
  var dictionary = _ref.dictionary,
      highlightingNodeID = _ref.highlightingNodeID,
      onExpandNode = _ref.onExpandNode,
      dictionaryName = _ref.dictionaryName;
  var c2nl = category2NodeList(dictionary);

  var _getNodePropertyCount = getNodePropertyCount(dictionary),
      nodesCount = _getNodePropertyCount.nodesCount,
      propertiesCount = _getNodePropertyCount.propertiesCount;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", null, dictionaryName), /*#__PURE__*/_react.default.createElement("span", null, " dictionary has "), /*#__PURE__*/_react.default.createElement("span", null, nodesCount), /*#__PURE__*/_react.default.createElement("span", null, " nodes and "), /*#__PURE__*/_react.default.createElement("span", null, propertiesCount), /*#__PURE__*/_react.default.createElement("span", null, " properties ")), Object.keys(c2nl).map(function (category) {
    return /*#__PURE__*/_react.default.createElement(_.default, {
      key: category,
      nodes: c2nl[category],
      category: category,
      highlightingNodeID: highlightingNodeID,
      onExpandNode: onExpandNode
    });
  }));
};

DataDictionaryTable.defaultProps = {
  dictionary: {},
  highlightingNodeID: null,
  onExpandNode: function onExpandNode() {},
  dictionaryName: ''
};
var _default = DataDictionaryTable;
exports.default = _default;