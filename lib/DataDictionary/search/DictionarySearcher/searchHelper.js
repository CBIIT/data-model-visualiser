"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchSummary = exports.searchKeyword = exports.ERR_KEYWORD_TOO_LONG = exports.ERR_KEYWORD_TOO_SHORT = exports.prepareSearchData = exports.ZERO_RESULT_FOUND_MSG = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _utils = require("../../utils");

var ZERO_RESULT_FOUND_MSG = '0 results found. Please try another keyword.';
/**
 * Prepare search items for Fuse.io library
 * @params [Object] dictionary
 * @returns [Object] search data
 */

exports.ZERO_RESULT_FOUND_MSG = ZERO_RESULT_FOUND_MSG;

var prepareSearchData = function prepareSearchData(dictionary) {
  var searchData = (0, _utils.parseDictionaryNodes)(dictionary).map(function (node) {
    var properties = Object.keys(node.properties).map(function (propertyKey) {
      var type = (0, _utils.getType)(node.properties[propertyKey]);
      if (type === 'UNDEFINED') type = undefined;
      var propertyDescription = (0, _utils.getPropertyDescription)(node.properties[propertyKey]);
      return {
        name: propertyKey,
        description: propertyDescription,
        type: type
      };
    });
    return {
      id: node.id,
      title: node.title,
      description: node.description,
      properties: properties
    };
  });
  return searchData;
};

exports.prepareSearchData = prepareSearchData;
var ERR_KEYWORD_TOO_SHORT = 'Keyword too short, try longer keyword.';
exports.ERR_KEYWORD_TOO_SHORT = ERR_KEYWORD_TOO_SHORT;
var ERR_KEYWORD_TOO_LONG = 'Keyword too long (more than 32).';
/**
 * Call Fuse search and returns search result
 * @params [Object] searchData - see prepareSearchData returns
 * @params [string] keyword
 * @returns [SearchResultItemShape[]] (see ../../utils).
 */

exports.ERR_KEYWORD_TOO_LONG = ERR_KEYWORD_TOO_LONG;

var searchKeyword = function searchKeyword(searchData, keyword) {
  if (!keyword || keyword.length < 2) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_SHORT
    };
  } // 32 is length limitation of Fuse search library


  if (keyword.length > 32) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_LONG
    };
  }

  var halfLength = Math.round(keyword.length / 2);
  var minMatchCharLength = Math.min(Math.max(halfLength, 10), keyword.length);
  var options = {
    keys: ['title', 'description', 'properties.name', 'properties.description', 'properties.type'],
    includeMatches: true,
    threshold: 0.3,
    shouldSort: true,
    includeScore: true,
    minMatchCharLength: minMatchCharLength
  };
  var handler = new _fuse.default(searchData, options);
  var result = handler.search(keyword).map(function (resItem) {
    // A bug in Fuse sometimes returns wrong indices that end < start
    var matches = resItem.matches.filter(function (matchItem) {
      return matchItem.indices[0][1] >= matchItem.indices[0][0];
    });
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, resItem), {}, {
      matches: matches
    });
  }).map(function (resItem) {
    // filter out matches that is too shorter than keyword
    var matches = resItem.matches.filter(function (matchItem) {
      var matchLen = matchItem.indices[0][1] - matchItem.indices[0][0] + 1;
      return matchLen >= halfLength;
    });
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, resItem), {}, {
      matches: matches
    });
  }).filter(function (resItem) {
    return resItem.matches.length > 0;
  });
  var errorMsg = result && result.length > 0 ? '' : ZERO_RESULT_FOUND_MSG;
  return {
    result: result,
    errorMsg: errorMsg
  };
};
/**
 * Prepare search items for Fuse.io library, call Fuse constructor
 * and return a search instance handler.
 * @params [SearchResultItemShape[]] search result (SearchResultItemShape from '../../utils')
 * @returns [Object] summary
 */


exports.searchKeyword = searchKeyword;

var getSearchSummary = function getSearchSummary(result) {
  var matchedNodeIDsInNameAndDescription = [];
  var matchedNodeIDsInProperties = [];
  var generalMatchedNodeIDs = [];
  var matchedPropertiesCount = 0;
  var matchedNodeNameAndDescriptionsCount = 0;
  result.forEach(function (resItem) {
    var nodeID = resItem.item.id;
    resItem.matches.forEach(function (matchedItem) {
      switch (matchedItem.key) {
        case 'properties.type':
        case 'properties.name':
        case 'properties.description':
          matchedPropertiesCount += 1;

          if (!matchedNodeIDsInProperties.includes(nodeID)) {
            matchedNodeIDsInProperties.push(nodeID);
          }

          if (!generalMatchedNodeIDs.includes(nodeID)) {
            generalMatchedNodeIDs.push(nodeID);
          }

          break;

        case 'title':
        case 'description':
          matchedNodeNameAndDescriptionsCount += 1;

          if (!matchedNodeIDsInNameAndDescription.includes(nodeID)) {
            matchedNodeIDsInNameAndDescription.push(nodeID);
          }

          if (!generalMatchedNodeIDs.includes(nodeID)) {
            generalMatchedNodeIDs.push(nodeID);
          }

          break;

        default:
          break;
      }
    });
  });
  return {
    matchedPropertiesCount: matchedPropertiesCount,
    matchedNodeNameAndDescriptionsCount: matchedNodeNameAndDescriptionsCount,
    matchedNodeIDsInNameAndDescription: matchedNodeIDsInNameAndDescription,
    matchedNodeIDsInProperties: matchedNodeIDsInProperties,
    generalMatchedNodeIDs: generalMatchedNodeIDs
  };
};

exports.getSearchSummary = getSearchSummary;