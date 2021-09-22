"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _GraphCalculator = _interopRequireDefault(require("./GraphCalculator"));

var _testData = require("../../../GraphUtils/testData");

describe('GraphCalculator', function () {
  var data = (0, _testData.buildTestData)();
  var layoutCallback = jest.fn();
  var legendCallback = jest.fn();
  var highlightCallback = jest.fn();
  var candidateCalculatedCallback = jest.fn();
  var pathCallback = jest.fn();
  var dataModelCallback = jest.fn();
  var graphCalculator = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_GraphCalculator.default, {
    dictionary: data.dictionary,
    countsSearch: [],
    linksSearch: [],
    onGraphLayoutCalculated: layoutCallback,
    onGraphLegendCalculated: legendCallback,
    onHighlightRelatedNodesCalculated: highlightCallback,
    onSecondHighlightingNodeCandidateIDsCalculated: candidateCalculatedCallback,
    onPathRelatedToSecondHighlightingNodeCalculated: pathCallback,
    onDataModelStructureCalculated: dataModelCallback
  }));
  it('can calculate layout and legend', function () {
    expect(layoutCallback.mock.calls.length).toBe(1);
    expect(legendCallback.mock.calls.length).toBe(1);
  });
  it('can update related highlighted nodes and clickable nodes when highlighted node changes', function () {
    graphCalculator.setProps({
      nodes: _testData.testGraph1.graphNodes,
      edges: _testData.testGraph1.graphEdges
    });
    graphCalculator.setProps({
      highlightingNode: _testData.testGraph1.testClickNode
    });
    expect(highlightCallback.mock.calls.length).toBe(1);
    expect(candidateCalculatedCallback.mock.calls.length).toBe(1);
    expect(dataModelCallback.mock.calls.length).toBe(1);
    graphCalculator.setProps({
      secondHighlightingNodeID: _testData.testGraph1.testSecondClickNodeID
    });
    expect(pathCallback.mock.calls.length).toBe(1);
    expect(dataModelCallback.mock.calls.length).toBe(2);
  });
});