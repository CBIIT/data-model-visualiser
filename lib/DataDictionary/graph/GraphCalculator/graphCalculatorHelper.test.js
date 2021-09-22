"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _testData = require("../../../GraphUtils/testData");

var _graphCalculatorHelper = require("./graphCalculatorHelper");

describe('graphCalculatorHelper', function () {
  var _buildTestData = (0, _testData.buildTestData)(),
      dictionary = _buildTestData.dictionary,
      nodes = _buildTestData.nodes,
      edges = _buildTestData.edges;

  it('can calculate layout', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var layout;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _graphCalculatorHelper.calculateGraphLayout)(dictionary);

          case 2:
            layout = _context.sent;
            layout.nodes.forEach(function (n) {
              expect(nodes.find(function (testN) {
                return testN.id === n.id;
              })).toBeDefined();
            });
            layout.edges.forEach(function (e) {
              var found = edges.find(function (testE) {
                return testE.source === e.source && testE.target === e.target;
              });
              expect(found).toBeDefined();
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('can get all types', function () {
    var types = (0, _graphCalculatorHelper.getAllTypes)(_testData.testGraph1.graphNodes);
    expect(types).toEqual(_testData.testGraph1.expectedNodeTypes);
  });
  it('can calculate related highlighting node IDs', function () {
    var relatedHighlightingNodeIDs = (0, _graphCalculatorHelper.calculateHighlightRelatedNodeIDs)(_testData.testGraph1.testClickNode, _testData.testGraph1.graphNodes);
    expect(relatedHighlightingNodeIDs).toEqual(_testData.testGraph1.expectedRelatedNodeIDs);
  });
  it('can calculate second highlighting node path', function () {
    var pathRelatedToSecondHighlightingNode = (0, _graphCalculatorHelper.calculatePathRelatedToSecondHighlightingNode)(_testData.testGraph1.testClickNode, _testData.testGraph1.testSecondClickNodeID, _testData.testGraph1.graphNodes);
    expect(pathRelatedToSecondHighlightingNode).toEqual(_testData.testGraph1.expectedSecondHighlightedPath);
  });
  it('can calculate data model structure', function () {
    var dataModelStructure = (0, _graphCalculatorHelper.calculateDataModelStructure)(_testData.testGraph1.startingNode, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(dataModelStructure).toEqual(_testData.testGraph1.expectedDataModelStructure);
  });
});