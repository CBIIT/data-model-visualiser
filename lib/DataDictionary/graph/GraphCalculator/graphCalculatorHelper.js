"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDataModelStructure = exports.calculatePathRelatedToSecondHighlightingNode = exports.calculateHighlightRelatedNodeIDs = exports.calculateGraphLayout = exports.getAllTypes = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/toConsumableArray"));

var _viz = _interopRequireDefault(require("viz.js"));

var _full = require("viz.js/full.render");

var _underscore = _interopRequireDefault(require("underscore"));

var _utils = require("../../../GraphUtils/utils");

var _utils2 = require("../../utils");

var _graphStructureHelper = require("./graphStructureHelper.js");

var _helper = require("../../NodeCategories/helper");

/**
 * Get a set of types from an array of nodes
 * @param {Node[]} nodes
 * @returns {string[]} array of type names(duplicating names removed) of given nodes
 */
var getAllTypes = function getAllTypes(nodes) {
  var types = nodes.map(function (node) {
    return node.type;
  });

  var uniqueTypes = _underscore.default.uniq(types);

  return uniqueTypes;
};
/* eslint-disable no-underscore-dangle */


exports.getAllTypes = getAllTypes;

var calculateGraphLayout = function calculateGraphLayout(dictionary, countsSearch, linksSearch) {
  var _createNodesAndEdges = (0, _utils.createNodesAndEdges)({
    dictionary: dictionary,
    counts_search: countsSearch,
    links_search: linksSearch
  }, true, []),
      nodes = _createNodesAndEdges.nodes,
      edges = _createNodesAndEdges.edges;

  var dotString = (0, _utils.createDotStrinByNodesEdges)(nodes, edges);
  var viz = new _viz.default({
    Module: _full.Module,
    render: _full.render
  });
  return viz.renderJSONObject(dotString).then(function (renderedJSON) {
    //console.log(renderedJSON);
    // draw nodes
    var renderedNodes = renderedJSON.objects.filter(function (n) {
      return !n.rank;
    }).map(function (n) {
      var boundingBox = n._draw_[1].points.reduce(function (acc, cur) {
        if (acc.x1 > cur[0]) acc.x1 = cur[0];
        if (acc.y1 > cur[1]) acc.y1 = cur[1];
        if (acc.x2 < cur[0]) acc.x2 = cur[0];
        if (acc.y2 < cur[1]) acc.y2 = cur[1];
        return acc;
      }, {
        x1: Infinity,
        y1: Infinity,
        x2: -Infinity,
        y2: -Infinity
      });

      var iconRadius = _utils2.graphStyleConfig.nodeIconRadius;
      var topCenterX = (boundingBox.x1 + boundingBox.x2) / 2;
      var topCenterY = boundingBox.y1;
      var width = boundingBox.x2 - boundingBox.x1;
      var height = boundingBox.y2 - boundingBox.y1;
      var originNode = nodes.find(function (node) {
        return node.id === n.name;
      });
      var outLinks = edges.filter(function (edge) {
        return edge.source.id === n.name;
      }).map(function (edge) {
        return edge.target.id;
      });
      var inLinks = edges.filter(function (edge) {
        return edge.target.id === n.name;
      }).map(function (edge) {
        return edge.source.id;
      });
      var nodeType = n.type.toLowerCase();
      var nodeColor = (0, _helper.getCategoryColor)(nodeType);
      var textPadding = _utils2.graphStyleConfig.nodeContentPadding;
      var fontSize = _utils2.graphStyleConfig.nodeTextFontSize;
      var textLineGap = _utils2.graphStyleConfig.nodeTextLineGap;
      var nodeNames = (0, _utils2.truncateLines)(n.label);
      var rectMinHeight = height;
      var rectHeight = Math.max(rectMinHeight, textPadding * 2 + nodeNames.length * (fontSize + textLineGap));
      var requiredPropertiesCount = originNode.required ? originNode.required.length : 0;
      var optionalPropertiesCount = originNode.properties ? Object.keys(originNode.properties).length - requiredPropertiesCount : 0;
      var nodeLevel = 0;

      if (originNode && originNode.positionIndex && originNode.positionIndex.length >= 2) {
        nodeLevel = originNode.positionIndex[1];
      }

      return {
        id: n.name,
        type: nodeType,
        boundingBox: boundingBox,
        topCenterX: topCenterX,
        topCenterY: topCenterY,
        width: width,
        height: rectHeight,
        color: nodeColor,
        iconRadius: iconRadius,
        textPadding: textPadding,
        fontSize: fontSize,
        textLineGap: textLineGap,
        names: nodeNames,
        label: n.label,
        level: nodeLevel,
        outLinks: outLinks,
        inLinks: inLinks,
        _gvid: n._gvid,
        requiredPropertiesCount: requiredPropertiesCount,
        optionalPropertiesCount: optionalPropertiesCount
      };
    }); // draw edges

    var renderedEdges = renderedJSON.edges.map(function (edge) {
      var controlPoints = edge._draw_[1].points;
      var pathString = "M".concat(controlPoints[0].join(','), "C").concat(controlPoints.slice(1).map(function (pair) {
        return "".concat(pair[0], ",").concat(pair[1]);
      }).join(' '));
      var sourceNode = renderedNodes.find(function (node) {
        return node._gvid === edge.tail;
      });
      var targetNode = renderedNodes.find(function (node) {
        return node._gvid === edge.head;
      });

      if (sourceNode.level === targetNode.level + 1) {
        var sourePosition = [(sourceNode.boundingBox.x1 + sourceNode.boundingBox.x2) / 2, sourceNode.boundingBox.y1];
        var targetPosition = [(targetNode.boundingBox.x1 + targetNode.boundingBox.x2) / 2, targetNode.boundingBox.y2];
        pathString = "M".concat(sourePosition[0], " ").concat(sourePosition[1], " \n              L ").concat(targetPosition[0], " ").concat(targetPosition[1]);
      }

      var required = edges.find(function (e) {
        return e.source.id === sourceNode.id && e.target.id === targetNode.id;
      }).required;
      return {
        source: sourceNode.id,
        target: targetNode.id,
        controlPoints: controlPoints,
        pathString: pathString,
        required: required
      };
    }); // get bounding box for whole graph

    var graphBoundingBox = renderedJSON._draw_.find(function (entry) {
      return entry.op === 'P';
    }).points;

    var layoutResult = {
      nodes: renderedNodes,
      edges: renderedEdges,
      graphBoundingBox: graphBoundingBox
    };
    return layoutResult;
  }).catch(function (e) {
    throw e;
  });
};
/* eslint-enable no-underscore-dangle */

/**
 * Get all node IDs that are descendent of the first highlighting node
 * @param {Node} highlightingNode - the first highlighting node
 * @param {Node[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of node IDs that are descendent of the first highlighting node
 */


exports.calculateGraphLayout = calculateGraphLayout;

var calculateHighlightRelatedNodeIDs = function calculateHighlightRelatedNodeIDs(highlightingNode, wholeGraphNodes) {
  if (!highlightingNode) {
    return [];
  }

  var relatedNodeIDs = (0, _graphStructureHelper.getAllChildrenNodeIDs)(highlightingNode.id, wholeGraphNodes);

  if (!relatedNodeIDs.includes(highlightingNode.id)) {
    return [highlightingNode.id].concat((0, _toConsumableArray2.default)(relatedNodeIDs));
  }

  return relatedNodeIDs;
};
/**
 * Get all routes that pass the second highlighting node and ends at the first highlighting node
 * @param {Node} highlightingNode - the first highlighting node
 * @param {string} secondHighlightingNodeID - the second highlighting node ID
 * @param {Node[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {Edge[]} array of links along  routes that pass
 *                   the second and ends at the first highlighting node
 */


exports.calculateHighlightRelatedNodeIDs = calculateHighlightRelatedNodeIDs;

var calculatePathRelatedToSecondHighlightingNode = function calculatePathRelatedToSecondHighlightingNode(highlightingNode, secondHighlightingNodeID, wholeGraphNodes) {
  if (!highlightingNode || !secondHighlightingNodeID) {
    return [];
  }

  var pathRelatedToSecondHighlightingNode = (0, _graphStructureHelper.getAllChildrenLinks)(secondHighlightingNodeID, wholeGraphNodes);
  pathRelatedToSecondHighlightingNode.push({
    source: highlightingNode.id,
    target: secondHighlightingNodeID
  });
  return pathRelatedToSecondHighlightingNode;
};
/**
 * For a given node in subgraph, summary about how do its descendent structure look like.
 * I.e., which nodes along the descendent structure, and how many nodes/links between.
 * (A node's descendent structure means nodes and links that are started from this node)
 * @param {Node} startingNode
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Node[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {Object[]} array of ordered items, each refers to a descendent node,
 *                     its category, nodes and links between this item and previous item
 * Calculating process:
 *    step.1: find all critical nodes in subgraph
             (critical nodes here means all articulation nodes in subgraph and the starting node)
 *    step.2: sort those nodes by linking order (source nodes come before target node)
 *    step.3: if there's a single node that is also descendent to all other node, add it to list
 *    step.4: for all nodes in critical node list, get summary description for all pairs
 *           of neighbor nodes (summary description means how many nodes and links between)
 *    step.4.1 (optional): if there isn't a single descendent node, get summary description
 *           for all of the rest nodes
 *    step.5: if there is a single descendent node, get all routes between this node and
 *           the starting Node
 *    step.6: return final data model structure
 */


exports.calculatePathRelatedToSecondHighlightingNode = calculatePathRelatedToSecondHighlightingNode;

var calculateDataModelStructure = function calculateDataModelStructure(startingNode, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  if (!startingNode) return null;
  var startingNodeID = startingNode.id; // step.1

  var articulationNodeIDs = (0, _graphStructureHelper.getArticulationNodesInSubgraph)(subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  var unsortedCriticalNodeIDs = articulationNodeIDs.includes(startingNodeID) ? articulationNodeIDs : [].concat((0, _toConsumableArray2.default)(articulationNodeIDs), [startingNodeID]);
  if (!unsortedCriticalNodeIDs || unsortedCriticalNodeIDs.length === 0) return null; // step.2

  var sortedCriticalNodeIDs = (0, _graphStructureHelper.sortNodesByTopology)(unsortedCriticalNodeIDs, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);

  if (!sortedCriticalNodeIDs || sortedCriticalNodeIDs.length === 0) {
    // loop in graph
    return null;
  }

  var resultCriticalNodeIDs = sortedCriticalNodeIDs; // step.3 if there's a single end descendent node

  var singleDescendentNodeID = (0, _graphStructureHelper.getSingleEndDescendentNodeID)(subgraphNodeIDs, subgraphEdges, wholeGraphNodes); // add single descendent node if not counted in critical nodes list

  if (singleDescendentNodeID && !resultCriticalNodeIDs.includes(singleDescendentNodeID)) {
    resultCriticalNodeIDs.push(singleDescendentNodeID);
  } // step.4


  var resultStructure = [];

  for (var i = 1; i < resultCriticalNodeIDs.length; i += 1) {
    var _getNodesAndLinksSumm = (0, _graphStructureHelper.getNodesAndLinksSummaryBetweenNodesInSubgraph)(resultCriticalNodeIDs[i - 1], resultCriticalNodeIDs[i], subgraphNodeIDs, subgraphEdges, wholeGraphNodes),
        nodeIDs = _getNodesAndLinksSumm.nodeIDs,
        links = _getNodesAndLinksSumm.links;

    resultStructure.push({
      nodeID: resultCriticalNodeIDs[i - 1],
      nodeIDsBefore: nodeIDs,
      linksBefore: links
    });
  }

  var routesBetweenStartEndNodes = [];

  if (singleDescendentNodeID) {
    resultStructure.push({
      nodeID: singleDescendentNodeID,
      nodeIDsBefore: [],
      linksBefore: []
    }); // step.5 get all routes between the starting node and this single descendent node

    routesBetweenStartEndNodes = (0, _graphStructureHelper.getAllRoutesBetweenTwoNodes)(startingNodeID, singleDescendentNodeID, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  } else {
    // step.4.1 (optional)
    // Summary for all rest descendent nodes after last critical node
    // (normally we won't need this step, because there should be only one single last
    // descendent node (root note) "program", just in case that more than one appear in graph)
    var lastCriticalNodeID = resultCriticalNodeIDs[resultCriticalNodeIDs.length - 1];
    var nodeIDsBeforeNode = (0, _graphStructureHelper.getAllChildrenNodeIDs)(lastCriticalNodeID, wholeGraphNodes);
    var linksBeforeNode = (0, _graphStructureHelper.getAllChildrenLinks)(lastCriticalNodeID, wholeGraphNodes);
    resultStructure.push({
      nodeID: lastCriticalNodeID,
      nodeIDsBefore: nodeIDsBeforeNode,
      linksBefore: linksBeforeNode
    }); // step.5.1 (optional)
    // Get all routes between the starting node and the all rest descendent nodes
    // (normally we won't need this step, because there should be only one single last
    // descendent node (root note) "program", just in case that more than one appear in graph)

    nodeIDsBeforeNode.forEach(function (nid) {
      routesBetweenStartEndNodes = routesBetweenStartEndNodes.concat((0, _graphStructureHelper.getAllRoutesBetweenTwoNodes)(startingNodeID, nid, subgraphNodeIDs, subgraphEdges, wholeGraphNodes));
    });
  } // step.6


  resultStructure = resultStructure.map(function (entry) {
    var nodeID = entry.nodeID,
        nodeIDsBefore = entry.nodeIDsBefore,
        linksBefore = entry.linksBefore;
    var category = wholeGraphNodes.find(function (n) {
      return n.id === nodeID;
    }).type;
    return {
      nodeID: nodeID,
      nodeIDsBefore: nodeIDsBefore,
      linksBefore: linksBefore,
      category: category
    };
  }).reverse();
  return {
    dataModelStructure: resultStructure,
    routesBetweenStartEndNodes: routesBetweenStartEndNodes
  };
};

exports.calculateDataModelStructure = calculateDataModelStructure;