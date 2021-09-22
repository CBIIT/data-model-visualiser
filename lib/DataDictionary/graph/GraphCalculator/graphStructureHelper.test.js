"use strict";

var _testData = require("../../../GraphUtils/testData");

var _graphStructureHelper = require("./graphStructureHelper");

describe('graphCalculatorHelper', function () {
  it('can get all children node IDs', function () {
    var resultNodeIDs = (0, _graphStructureHelper.getAllChildrenNodeIDs)(_testData.testGraph1.startingNode.id, _testData.testGraph1.graphNodes);
    expect(resultNodeIDs).toEqual(_testData.testGraph1.expectedChildrenNodeIDs);
  });
  it('can get all children links', function () {
    var resultLinks = (0, _graphStructureHelper.getAllChildrenLinks)(_testData.testGraph1.startingNode.id, _testData.testGraph1.graphNodes);
    expect(resultLinks).toEqual(_testData.testGraph1.expectedChildrenLinks);
  });
  it('can judge articulation node from subgraph', function () {
    var result = (0, _graphStructureHelper.isArticulationNodeInSubgraph)(_testData.testGraph1.expectedArticulationNodesInSubgraph[0], _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(result).toBe(true);
  });
  it('can get articulation nodes from subgraph', function () {
    var result = (0, _graphStructureHelper.getArticulationNodesInSubgraph)(_testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(result).toEqual(_testData.testGraph1.expectedArticulationNodesInSubgraph);
  });
  it('can traverse subgraph in BFS order', function () {
    var bfsResult = (0, _graphStructureHelper.BFSTraverseSubgraph)(true, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(bfsResult).toEqual(_testData.testGraph1.expectedBFSTraverseSubgraph);
    var bfsResult2 = (0, _graphStructureHelper.BFSTraverseSubgraph)(false, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(bfsResult2).toEqual(_testData.testGraph1.expectedBFSTraverseSubgraphReverseDirection);
  });
  it('can sort nodes in subgraph in topology order', function () {
    var sorted = (0, _graphStructureHelper.sortNodesByTopology)(_testData.testGraph1.testNodeIDsForSort, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(sorted).toEqual(_testData.testGraph1.expectedSorteddNodeIDs);
  });
  it('can get nodes and links summary between nodes in subgraph', function () {
    var result = (0, _graphStructureHelper.getNodesAndLinksSummaryBetweenNodesInSubgraph)(_testData.testGraph1.testNode1, _testData.testGraph1.testNode2, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(result).toEqual(_testData.testGraph1.expectedSummary);
  });
  it('can get nodes that have no in/out links in subgraph', function () {
    var resultNodeIDsWithoutInLinks = (0, _graphStructureHelper.getNodeIDsThatHaveNoInOrOutLinks)(true, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    var resultNodeIDsWithoutOutLinks = (0, _graphStructureHelper.getNodeIDsThatHaveNoInOrOutLinks)(false, _testData.testGraph1.testSubgraph, _testData.testGraph1.testSubgraphEdges, _testData.testGraph1.graphNodes);
    expect(resultNodeIDsWithoutInLinks).toEqual(_testData.testGraph1.expectedNodeIDsWithNoInLinks);
    expect(resultNodeIDsWithoutOutLinks).toEqual(_testData.testGraph1.expectedNodeIDsWithNoOutLinks);
  });
});