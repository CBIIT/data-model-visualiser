"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeTitleSVGFragment = exports.getMatchesSummaryForProperties = exports.getMatchInsideProperty = exports.getNodeDescriptionFragment = exports.getNodeTitleFragment = exports.getPropertyDescriptionFragment = exports.getPropertyTypeFragment = exports.getPropertyNameFragment = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var escapeReturnChar = function escapeReturnChar(str, newlineClassName) {
  if (!str) return str;
  var pieces = str.split('\\n');
  if (pieces.length <= 1) return str;
  return pieces.map(function (piece, i) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: "span-".concat(i),
      className: i === 0 || i === pieces.length ? '' : newlineClassName
    }, piece);
  });
};

var addHighlightingSpans = function addHighlightingSpans(str, indices, spanClassName) {
  var cursor = 0;
  var currentIndices = 0;
  var resultFragments = [];
  var highlightSpanClassName = "".concat(spanClassName, "--highlight");
  var newlineClassName = "".concat(spanClassName, "--new-line");

  while (currentIndices < indices.length) {
    if (cursor < indices[currentIndices][0]) {
      resultFragments.push( /*#__PURE__*/_react.default.createElement("div", {
        key: cursor,
        className: spanClassName
      }, escapeReturnChar(str.substring(cursor, indices[currentIndices][0]), newlineClassName)));
    }

    resultFragments.push( /*#__PURE__*/_react.default.createElement("div", {
      key: indices[currentIndices][0],
      className: "".concat(spanClassName, " ").concat(highlightSpanClassName)
    }, escapeReturnChar(str.substring(indices[currentIndices][0], indices[currentIndices][1] + 1), newlineClassName)));
    cursor = indices[currentIndices][1] + 1;
    currentIndices += 1;
  }

  if (cursor < str.length) {
    resultFragments.push( /*#__PURE__*/_react.default.createElement("div", {
      key: cursor,
      className: spanClassName
    }, escapeReturnChar(str.substring(cursor), newlineClassName)));
  }

  return resultFragments;
};

var getPropertyNameFragment = function getPropertyNameFragment(propertyName, matchedItem, spanClassName) {
  var propertyNameFragment = addHighlightingSpans(propertyName, matchedItem ? matchedItem.indices : [], spanClassName);
  return propertyNameFragment;
};

exports.getPropertyNameFragment = getPropertyNameFragment;

var getPropertyTypeFragment = function getPropertyTypeFragment(property, typeMatchList, spanClassName) {
  var type = (0, _utils.getType)(property);
  var propertyTypeFragment;
  console.log(type);

  if (typeof type === 'string') {
    propertyTypeFragment = /*#__PURE__*/_react.default.createElement("li", null, addHighlightingSpans(type, typeMatchList && typeMatchList[0] ? typeMatchList[0].indices : [], spanClassName));
  } else {
    propertyTypeFragment = type.map(function (t, i) {
      var matchedTypeItem = typeMatchList && typeMatchList.find(function (matchItem) {
        return matchItem.value === t;
      });

      if (matchedTypeItem) {
        return /*#__PURE__*/_react.default.createElement("li", {
          key: i
        }, addHighlightingSpans(t, matchedTypeItem.indices, spanClassName));
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        key: i
      }, addHighlightingSpans(t, [], spanClassName));
    });
  }

  return propertyTypeFragment;
};

exports.getPropertyTypeFragment = getPropertyTypeFragment;

var getPropertyDescriptionFragment = function getPropertyDescriptionFragment(property, matchedItem, spanClassName) {
  var descriptionStr = (0, _utils.getPropertyDescription)(property);
  if (!descriptionStr) descriptionStr = 'No Description';
  var propertyDescriptionFragment = addHighlightingSpans(descriptionStr, matchedItem ? matchedItem.indices : [], spanClassName);
  return propertyDescriptionFragment;
};

exports.getPropertyDescriptionFragment = getPropertyDescriptionFragment;

var getNodeTitleFragment = function getNodeTitleFragment(allMatches, title, spanClassName) {
  var matchedItem = allMatches.find(function (item) {
    return item.key === 'title';
  });
  var nodeTitleFragment = addHighlightingSpans(title, matchedItem ? matchedItem.indices : [], spanClassName);
  return nodeTitleFragment;
};

exports.getNodeTitleFragment = getNodeTitleFragment;

var getNodeDescriptionFragment = function getNodeDescriptionFragment(allMatches, description, spanClassName) {
  var matchedItem = allMatches.find(function (item) {
    return item.key === 'description';
  });
  var nodeDescriptionFragment = addHighlightingSpans(description, matchedItem ? matchedItem.indices : [], spanClassName);
  return nodeDescriptionFragment;
};

exports.getNodeDescriptionFragment = getNodeDescriptionFragment;

var getMatchInsideProperty = function getMatchInsideProperty(propertyIndex, propertyKey, property, allMatches) {
  var nameMatch = null;
  var descriptionMatch = null;
  var typeMatchList = [];

  if (allMatches) {
    allMatches.forEach(function (item) {
      if (item.key === 'properties.name' && item.value === propertyKey) {
        nameMatch = item;
      } else if (item.key === 'properties.description') {
        var descriptionStr = (0, _utils.getPropertyDescription)(property); //console.log(descriptionStr);

        if (item.value === descriptionStr) {
          descriptionMatch = item;
        }
      } else if (item.key === 'properties.type') {
        var type = (0, _utils.getType)(property); //console.log(type);

        if (typeof type === 'string') {
          if (type === item.value) {
            typeMatchList.push(item);
          }
        } else if (Array.isArray(type)) {
          //console.log("yes");
          for (var a = 0; a < type.length; a++) {
            if (type[a] == item.value) {
              typeMatchList.push(item);
            }
          }
        }
      }
    });
  }

  return {
    nameMatch: nameMatch,
    descriptionMatch: descriptionMatch,
    typeMatchList: typeMatchList
  };
};

exports.getMatchInsideProperty = getMatchInsideProperty;

var getMatchesSummaryForProperties = function getMatchesSummaryForProperties(allProperties, allMatches) {
  //console.log(allProperties);
  console.log(allMatches);
  var matchedPropertiesSummary = [];
  Object.keys(allProperties).forEach(function (propertyKey, propertyIndex) {
    var property = allProperties[propertyKey];

    var _getMatchInsideProper = getMatchInsideProperty(propertyIndex, propertyKey, property, allMatches),
        nameMatch = _getMatchInsideProper.nameMatch,
        descriptionMatch = _getMatchInsideProper.descriptionMatch,
        typeMatchList = _getMatchInsideProper.typeMatchList; //console.log(descriptionMatch);


    var summaryItem = {
      propertyKey: propertyKey,
      property: property,
      nameMatch: nameMatch,
      descriptionMatch: descriptionMatch,
      typeMatchList: typeMatchList
    };

    if (nameMatch || descriptionMatch || typeMatchList.length > 0) {
      matchedPropertiesSummary.push(summaryItem);
    }
  }); //console.log(matchedPropertiesSummary);

  return matchedPropertiesSummary;
};

exports.getMatchesSummaryForProperties = getMatchesSummaryForProperties;

var getNodeTitleSVGFragment = function getNodeTitleSVGFragment(nodeNames, matchedNodeNameIndices, fontSize, textPadding, textLineGap) {
  var nodeTitleFragment = [];
  var currentRowIndex = 0;
  var rowStartIndex = 0;
  var rowEndIndex;
  var nodeNameRows = nodeNames;
  var currentHighlightIndex = 0;
  var textAttrBase = {
    x: 0,
    textAnchor: 'middle',
    alignmentBaseline: 'hanging',
    fontSize: fontSize,
    className: 'graph-node__text'
  };
  var tspanAttrBase = {
    textAnchor: 'middle',
    alignmentBaseline: 'hanging',
    fontSize: fontSize
  };
  var tspanAttr = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tspanAttrBase), {}, {
    className: 'graph-node__tspan'
  });
  var tspanHighlightAttr = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tspanAttrBase), {}, {
    className: 'graph-node__tspan graph-node__tspan--highlight'
  });

  while (currentRowIndex < nodeNameRows.length) {
    // for each row
    var currentRowStr = nodeNameRows[currentRowIndex];
    rowEndIndex = rowStartIndex + currentRowStr.length;
    var textY = textPadding + currentRowIndex * (fontSize + textLineGap);
    var textAttr = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, textAttrBase), {}, {
      key: currentRowIndex,
      y: textY
    });
    var cursorInRow = 0;
    var currentRowFragment = []; // Go over all highlighted text in current row

    while (currentHighlightIndex < matchedNodeNameIndices.length) {
      var highlightStartIndex = matchedNodeNameIndices[currentHighlightIndex][0];
      var highlightEndIndex = matchedNodeNameIndices[currentHighlightIndex][1] + 1;

      if (highlightStartIndex > rowEndIndex) {
        currentRowFragment.push( /*#__PURE__*/_react.default.createElement("tspan", Object.assign({
          key: cursorInRow
        }, tspanAttr), currentRowStr.substring(cursorInRow)));
        cursorInRow = currentRowStr.length;
        break;
      }

      var highlightStartIndexInRow = highlightStartIndex - rowStartIndex;
      var highlightEndIndexInRow = highlightEndIndex - rowStartIndex;

      if (cursorInRow < highlightStartIndexInRow) {
        currentRowFragment.push( /*#__PURE__*/_react.default.createElement("tspan", Object.assign({
          key: cursorInRow
        }, tspanAttr), currentRowStr.substring(cursorInRow, highlightStartIndexInRow)));
        cursorInRow = highlightStartIndexInRow;
      }

      if (highlightEndIndex <= rowEndIndex) {
        currentRowFragment.push( /*#__PURE__*/_react.default.createElement("tspan", Object.assign({
          key: cursorInRow
        }, tspanHighlightAttr), currentRowStr.substring(cursorInRow, highlightEndIndexInRow)));
        cursorInRow = highlightEndIndexInRow;
        currentHighlightIndex += 1;
      } else {
        currentRowFragment.push( /*#__PURE__*/_react.default.createElement("tspan", Object.assign({
          key: cursorInRow
        }, tspanHighlightAttr), currentRowStr.substring(cursorInRow)));
        cursorInRow = currentRowStr.lenght;
        break;
      }
    } // Check text in the current row are all added to the list


    if (cursorInRow < currentRowStr.length) {
      currentRowFragment.push( /*#__PURE__*/_react.default.createElement("tspan", Object.assign({
        key: cursorInRow
      }, tspanAttr), currentRowStr.substring(cursorInRow)));
    } // Add all fragment of current line to the node title fragment list


    nodeTitleFragment.push( /*#__PURE__*/_react.default.createElement("text", textAttr, currentRowFragment));
    currentRowIndex += 1;
    rowStartIndex += currentRowStr.length + 1;
  } // end of while, go to the next row


  return nodeTitleFragment;
};

exports.getNodeTitleSVGFragment = getNodeTitleSVGFragment;