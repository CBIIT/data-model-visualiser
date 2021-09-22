"use strict";

var _utils = require("./utils");

var _testData = require("./testData");

describe('the DataModelGraph utils helper', function () {
  it('can find the root of a graph', function () {
    var _buildTestData = (0, _testData.buildTestData)(),
        nodes = _buildTestData.nodes,
        edges = _buildTestData.edges;

    expect((0, _utils.findRoot)(nodes, edges)).toBe('project');
  });
  it('extracts nodes and edges from a dictionary', function () {
    var testData = (0, _testData.buildTestData)();

    var _createNodesAndEdges = (0, _utils.createNodesAndEdges)({
      dictionary: testData.dictionary
    }, true),
        nodes = _createNodesAndEdges.nodes,
        edges = _createNodesAndEdges.edges;

    expect(nodes.length).toBe(testData.nodes.length);
    expect(edges.length).toBe(testData.edges.length);
  });
  it('can ignore a node type in the dictionary', function () {
    var testData = (0, _testData.buildTestData)();

    var _createNodesAndEdges2 = (0, _utils.createNodesAndEdges)({
      dictionary: testData.dictionary
    }, true, ['project']),
        nodes = _createNodesAndEdges2.nodes,
        edges = _createNodesAndEdges2.edges;

    expect(nodes.length).toBe(testData.nodes.length - 1);
    expect(edges.length).toBe(testData.edges.length - 2);
  });
  it('can determines the hierarchy of a tree', function () {
    var _buildTestData2 = (0, _testData.buildTestData)(),
        nodes = _buildTestData2.nodes,
        edges = _buildTestData2.edges;

    var name2EdgesIn = edges.reduce(function (db, edge) {
      var targetName = typeof edge.target === 'object' ? edge.target.id : edge.target;

      if (db[targetName]) {
        db[targetName].push(edge);
      } else {
        console.error("Edge points to unknown node: ".concat(targetName));
      }

      return db;
    }, // initialize emptyDb - include nodes that have no incoming edges (leaves)
    nodes.reduce(function (emptyDb, node) {
      var res = emptyDb;
      res[node.id] = [];
      return res;
    }, {}));
    var hierarchy = (0, _utils.getTreeHierarchy)((0, _utils.findRoot)(nodes, edges), name2EdgesIn);
    expect(hierarchy.get('project').size).toBe(7);
    expect(hierarchy.get('b').size).toBe(6);
    expect(hierarchy.get('c').size).toBe(2);
    expect(hierarchy.get('d').size).toBe(1);
    expect(hierarchy.get('a').size).toBe(1);
    expect(hierarchy.get('x').size).toBe(1);
    expect(hierarchy.get('y').size).toBe(1);
  });
  it('knows how to order nodes breadth first', function () {
    var _buildTestData3 = (0, _testData.buildTestData)(),
        nodes = _buildTestData3.nodes,
        edges = _buildTestData3.edges,
        expectedTree = _buildTestData3.expectedTree;

    var _nodesBreadthFirst = (0, _utils.nodesBreadthFirst)(nodes, edges),
        bfOrder = _nodesBreadthFirst.bfOrder,
        treeLevel2Names = _nodesBreadthFirst.treeLevel2Names,
        name2Level = _nodesBreadthFirst.name2Level;

    expect(bfOrder.length).toBe(nodes.length - 1); // node z is floating ...

    expect(treeLevel2Names.length).toBe(expectedTree.length);

    for (var i = 0; i < treeLevel2Names.length; i += 1) {
      expect(treeLevel2Names[i].length).toBe(expectedTree[i].length);
    }

    expect(name2Level.d).toBe(3); // d on level 3

    var _loop = function _loop(level) {
      treeLevel2Names[level].forEach(function (nodeName) {
        expect(name2Level[nodeName]).toBe(level);
      });
    };

    for (var level = 0; level < treeLevel2Names.length; level += 1) {
      _loop(level);
    }
  });
  it('assigns positions to nodes', function () {
    var _buildTestData4 = (0, _testData.buildTestData)(),
        nodes = _buildTestData4.nodes,
        edges = _buildTestData4.edges;

    (0, _utils.assignNodePositions)(nodes, edges);
    nodes.filter(function (nd) {
      return nd.position;
    }).forEach(function (node) {
      var _nodesBreadthFirst2 = (0, _utils.nodesBreadthFirst)(nodes, edges),
          treeLevel2Names = _nodesBreadthFirst2.treeLevel2Names,
          name2Level = _nodesBreadthFirst2.name2Level;

      expect(Array.isArray(node.position)).toBe(true);
      expect(node.position[0] > 0 && node.position[0] <= 1).toBe(true);
      expect(node.position[1] > 0 && node.position[1] <= 1).toBe(true);
      expect(node.positionIndex[1]).toBe(name2Level[node.id]);
      expect(treeLevel2Names[node.positionIndex[1]][node.positionIndex[0]]).toBe(node.id);
    });
  });
  it('can organize nodes into rows', function () {
    var _buildTestData5 = (0, _testData.buildTestData)(),
        nodes = _buildTestData5.nodes,
        edges = _buildTestData5.edges;

    (0, _utils.assignNodePositions)(nodes, edges, {
      numPerRow: 2
    }); // up to 2 nodes per row, root on own row

    var maxRows = 1 + Math.round((nodes.length - 1) / 2);
    nodes.filter(function (nd) {
      return nd.position;
    }).forEach(function (node) {
      expect(Array.isArray(node.position)).toBe(true);
      expect(node.position[0] > 0 && node.position[0] <= 1).toBe(true);
      expect(node.position[1] > 0 && node.position[1] <= 1).toBe(true);
      expect(node.positionIndex[0] < 2).toBe(true); // at most 2 nodes per row

      expect(node.positionIndex[1]).toBeLessThan(maxRows);
    });
  });
});