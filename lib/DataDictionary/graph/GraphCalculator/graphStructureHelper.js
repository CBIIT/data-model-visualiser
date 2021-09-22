"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRoutesBetweenTwoNodes = exports.getNodesAndLinksSummaryBetweenNodesInSubgraph = exports.getSingleEndDescendentNodeID = exports.sortNodesByTopology = exports.BFSTraverseSubgraph = exports.getArticulationNodesInSubgraph = exports.isArticulationNodeInSubgraph = exports.getNodeIDsThatHaveNoInOrOutLinks = exports.getAllChildrenLinks = exports.getAllChildrenNodeIDs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/toConsumableArray"));

/**
 * @typedef {Object} Node
 * @property {string} id - ID of this node
 * @property {string[]} inLinks - array of soure node IDs that link to this node
 * @property {string[]} outLinks - array of target node IDs that are linked from this node
 */

/**
 * @typedef {Object} Edge
 * @property {string} source - edge source node ID
 * @property {string} target - edge target node ID
 */

/**
 * Get all descendent node IDs from a given node
 * @param {string} startingNodeID
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of descendent node IDs
 */
var getAllChildrenNodeIDs = function getAllChildrenNodeIDs(startingNodeID, wholeGraphNodes) {
  var relatedNodeIDs = [];
  var startingNode = wholeGraphNodes.find(function (n) {
    return n.id === startingNodeID;
  });
  var currentLevelNodeIDs = startingNode.outLinks;

  var _loop = function _loop() {
    var nextLevelNodeIDs = [];
    currentLevelNodeIDs.forEach(function (nodeId) {
      if (relatedNodeIDs.includes(nodeId) || nextLevelNodeIDs.includes(nodeId)) return;
      relatedNodeIDs.push(nodeId);
      var originNode = wholeGraphNodes.find(function (n) {
        return n.id === nodeId;
      });
      var nextLevel = originNode.outLinks;
      nextLevel.forEach(function (outNodeId) {
        nextLevelNodeIDs.push(outNodeId);
      });
    });
    currentLevelNodeIDs = nextLevelNodeIDs;
  };

  while (currentLevelNodeIDs && currentLevelNodeIDs.length > 0) {
    _loop();
  }

  return relatedNodeIDs;
};
/**
 * Get all children links from a given node
 * @param {string} startingNodeID
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {Edge[]} array of descendent links
 */


exports.getAllChildrenNodeIDs = getAllChildrenNodeIDs;

var getAllChildrenLinks = function getAllChildrenLinks(startingNodeID, wholeGraphNodes) {
  var startingNode = wholeGraphNodes.find(function (n) {
    return n.id === startingNodeID;
  });
  var currentLevelNodeIDs = startingNode.outLinks;
  var relatedLinks = currentLevelNodeIDs.map(function (outID) {
    return {
      source: startingNode.id,
      target: outID
    };
  });
  var sourceNodeHistory = {};

  while (currentLevelNodeIDs.length > 0) {
    var nextLevelNodeIDs = [];

    var _loop2 = function _loop2(i) {
      var nodeID = currentLevelNodeIDs[i];
      if (sourceNodeHistory[nodeID]) return "continue"; // eslint-disable-line no-continue

      var originNode = wholeGraphNodes.find(function (n) {
        return n.id === nodeID;
      });
      var nextLevel = originNode.outLinks;

      for (var j = 0; j < nextLevel.length; j += 1) {
        var outNodeID = nextLevel[j];
        relatedLinks.push({
          source: nodeID,
          target: outNodeID
        });
        sourceNodeHistory[nodeID] = true;
        nextLevelNodeIDs.push(outNodeID);
      }
    };

    for (var i = 0; i < currentLevelNodeIDs.length; i += 1) {
      var _ret = _loop2(i);

      if (_ret === "continue") continue;
    }

    currentLevelNodeIDs = nextLevelNodeIDs;
  }

  return relatedLinks;
};
/**
 * Get all inlinks or outlinks for a given node, in subgraph
 * @param {string} nodeID - ID of the given node
 * @param {boolean} inOrOut - true: get inlinks, false: get outlinks
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of node IDs that are inlinks or outlinks of the given node
 */


exports.getAllChildrenLinks = getAllChildrenLinks;

var inOrOutLinksFromGivenNode = function inOrOutLinksFromGivenNode(nodeID, inOrOut, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var node = wholeGraphNodes.find(function (n) {
    return n.id === nodeID;
  });
  var links = inOrOut ? node.inLinks : node.outLinks;

  var inLinksFilterFunc = function inLinksFilterFunc(e, neighborNodeID) {
    return e.target === nodeID && e.source === neighborNodeID && subgraphNodeIDs.includes(e.source);
  };

  var outLinksFilterFunc = function outLinksFilterFunc(e, neighborNodeID) {
    return e.source === nodeID && e.target === neighborNodeID && subgraphNodeIDs.includes(e.target);
  };

  return links.filter(function (neighborNodeID) {
    return subgraphNodeIDs.includes(neighborNodeID);
  }).filter(function (neighborNodeID) {
    return subgraphEdges.find(function (e) {
      if (inOrOut) return inLinksFilterFunc(e, neighborNodeID);
      return outLinksFilterFunc(e, neighborNodeID);
    });
  }).filter(function (neighborNodeID) {
    return neighborNodeID !== nodeID;
  });
};
/**
 * Inside a subgraph, get all nodes that have no inlinks or outlinks
 * (inlinks of a node means links that is pointing at this node)
 * (node without inlinks means no other nodes inside subgraph is pointing at it)
 * (outlinks of a node means links that is starting from this node)
 * (node without outlinks means this node is not pointing at any other nodes in subgraph)
 * @param {boolean} inOrOut - true: get inlinks, false: get outlinks
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of node IDs that have no inlinks or outlinks
 */


var getNodeIDsThatHaveNoInOrOutLinks = function getNodeIDsThatHaveNoInOrOutLinks(inOrOut, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var resultIDs = [];
  subgraphNodeIDs.forEach(function (nodeID) {
    var links = inOrOutLinksFromGivenNode(nodeID, inOrOut, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);

    if (!links || links.length === 0) {
      resultIDs.push(nodeID);
    }
  });
  return resultIDs;
};
/**
 * Judge if a given node is articulation node inside subgraph
 * (An articulation node of a graph is a node whose removal will disconnect the graph)
 * @param {string} targetNodeID - the target node to validate
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {boolean} whether this node is articulation node inside subgraph
 */


exports.getNodeIDsThatHaveNoInOrOutLinks = getNodeIDsThatHaveNoInOrOutLinks;

var isArticulationNodeInSubgraph = function isArticulationNodeInSubgraph(targetNodeID, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  // step.1: calculate connected node count if there's no target node in subgraph
  var nodeIdsWithoutInLinks = getNodeIDsThatHaveNoInOrOutLinks(true, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  if (nodeIdsWithoutInLinks.includes(targetNodeID)) return false;
  var currentLevelNodeIDs = nodeIdsWithoutInLinks;
  var nodeIDsInSubgraphWithoutTargetNode = [];

  var _loop3 = function _loop3() {
    var nextLevelNodeIDs = [];
    currentLevelNodeIDs.forEach(function (nodeID) {
      if (nodeIDsInSubgraphWithoutTargetNode.includes(nodeID) || nextLevelNodeIDs.includes(nodeID)) return;
      nodeIDsInSubgraphWithoutTargetNode.push(nodeID);
      var node = wholeGraphNodes.find(function (n) {
        return n.id === nodeID;
      });
      var inNeighbors = node.inLinks.filter(function (inNodeID) {
        return subgraphEdges.find(function (e) {
          return e.source === inNodeID && e.target === nodeID;
        });
      });
      var outNeighbors = node.outLinks.filter(function (outNodeID) {
        return subgraphEdges.find(function (e) {
          return e.target === outNodeID && e.source === nodeID;
        });
      });
      var neighborNodeIDs = [].concat((0, _toConsumableArray2.default)(inNeighbors), (0, _toConsumableArray2.default)(outNeighbors));
      neighborNodeIDs.filter(function (nid) {
        return subgraphNodeIDs.includes(nid);
      }).filter(function (nid) {
        return nid !== targetNodeID;
      }).forEach(function (nid) {
        nextLevelNodeIDs.push(nid);
      });
    });
    currentLevelNodeIDs = nextLevelNodeIDs;
  };

  while (currentLevelNodeIDs.length > 0) {
    _loop3();
  } // step.2: if node count equals subgraph's node count - 1, then not articulation node


  return nodeIDsInSubgraphWithoutTargetNode.length !== subgraphNodeIDs.length - 1;
};
/**
 * Get all articulation node is articulation inside subgraph
 * (An articulation node of a graph is a node whose removal will disconnect the graph)
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of articulation node IDs inside subgraph
 */


exports.isArticulationNodeInSubgraph = isArticulationNodeInSubgraph;

var getArticulationNodesInSubgraph = function getArticulationNodesInSubgraph(subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var articulationNodeIDs = [];
  subgraphNodeIDs.forEach(function (nodeID) {
    if (isArticulationNodeInSubgraph(nodeID, subgraphNodeIDs, subgraphEdges, wholeGraphNodes)) {
      articulationNodeIDs.push(nodeID);
    }
  });
  return articulationNodeIDs;
};
/**
 * Traverse a subgraph via breath Breadth-first search algorithm
 * @param {boolean} alongLinkDirection - if want traverse from link direction
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of node IDs in BFS traverse
 * Note that this function only consider union of `subgraphNodeIDs` and `subgraphEdges`,
 * if a node is in `subgraphEdges` but not in `subgraphNodeIDs`, it'll be ignored.
 */


exports.getArticulationNodesInSubgraph = getArticulationNodesInSubgraph;

var BFSTraverseSubgraph = function BFSTraverseSubgraph(alongLinkDirection, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var currentLevelNodeIDs = getNodeIDsThatHaveNoInOrOutLinks(alongLinkDirection, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  var resultNodeIDs = [];

  while (currentLevelNodeIDs.length > 0) {
    var nextLevelNodeIDs = [];

    var _loop4 = function _loop4(i) {
      var nodeID = currentLevelNodeIDs[i];
      if (!resultNodeIDs.includes(nodeID)) resultNodeIDs.push(nodeID);
      var node = wholeGraphNodes.find(function (n) {
        return n.id === nodeID;
      });

      if (node) {
        var links = alongLinkDirection ? node.outLinks : node.inLinks;
        var linkNeighbors = links.filter(function (neighborNodeID) {
          if (!subgraphNodeIDs.includes(neighborNodeID)) return false;

          if (alongLinkDirection) {
            return subgraphEdges.find(function (e) {
              return e.source === nodeID && neighborNodeID === e.target;
            });
          }

          return subgraphEdges.find(function (e) {
            return e.target === nodeID && neighborNodeID === e.source;
          });
        });

        for (var j = 0; j < linkNeighbors.length; j += 1) {
          var neighborNodeID = linkNeighbors[j];

          if (!currentLevelNodeIDs.includes(neighborNodeID) && !nextLevelNodeIDs.includes(neighborNodeID)) {
            nextLevelNodeIDs.push(neighborNodeID);
          }
        }
      }
    };

    for (var i = 0; i < currentLevelNodeIDs.length; i += 1) {
      _loop4(i);
    }

    currentLevelNodeIDs = nextLevelNodeIDs;
  }

  return resultNodeIDs;
};
/**
 * Get topological sorting of an array of node inside subgraph
 * I.e., order nodes so that for each link A->B, A comes before B in the ordering
 * @param {string[]} nodeIDsToSort - array of node IDs to sort
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string[]} array of node IDs in topological order
 */


exports.BFSTraverseSubgraph = BFSTraverseSubgraph;

var sortNodesByTopology = function sortNodesByTopology(nodeIDsToSort, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var graphBFSTraverse = BFSTraverseSubgraph(true, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  var sortedNodeIDs = graphBFSTraverse.filter(function (nodeID) {
    return nodeIDsToSort.includes(nodeID);
  });
  return sortedNodeIDs;
};
/**
 * Find a node that is descendent of all other nodes inside subgraph
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Node[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {string} if find, return node ID, otherwise return null
 */


exports.sortNodesByTopology = sortNodesByTopology;

var getSingleEndDescendentNodeID = function getSingleEndDescendentNodeID(subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var nodeIDs = getNodeIDsThatHaveNoInOrOutLinks(false, subgraphNodeIDs, subgraphEdges, wholeGraphNodes);
  if (nodeIDs.length === 1) return nodeIDs[0];
  return null;
};
/**
 * @typedef {Object} Summary
 * @property {string[]} nodeIDs - array of node IDs between two given nodes
 * @property {Edge[]} links - array of links between two given nodes
 */

/**
 * Get summary of how many nodes and links are between given two nodes inside subgraph
 * I.e., nodes and links along the route between given two nodes
 * @param {string} startingNodeID
 * @param {string} endingNodeID
 * @param {string[]} subgraphNodeIDs - array of node IDs in subgraph
 * @param {Edge[]} subgraphEdges - array of edges in subgraph
 * @param {Object[]} wholeGraphNodes - array of nodes in the origin whole graph
 * @returns {Summary}
 */


exports.getSingleEndDescendentNodeID = getSingleEndDescendentNodeID;

var getNodesAndLinksSummaryBetweenNodesInSubgraph = function getNodesAndLinksSummaryBetweenNodesInSubgraph(startingNodeID, endingNodeID, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var startingNode = wholeGraphNodes.find(function (node) {
    return node.id === startingNodeID;
  });
  var betweenNodeIDs = [];
  var firstLevelOutNodeIDs = startingNode.outLinks.filter(function (outNodeID) {
    return subgraphEdges.find(function (e) {
      return e.source === startingNodeID && e.target === outNodeID;
    });
  });
  var currentLevelNodeIDs = firstLevelOutNodeIDs;
  var betweenLinks = firstLevelOutNodeIDs.map(function (outID) {
    return {
      source: startingNodeID,
      target: outID
    };
  });

  var _loop5 = function _loop5() {
    var nextLevelNodeIDs = [];
    currentLevelNodeIDs.forEach(function (nodeID) {
      if (betweenNodeIDs.includes(nodeID) || nextLevelNodeIDs.includes(nodeID) || nodeID === endingNodeID) return;
      betweenNodeIDs.push(nodeID);
      var node = wholeGraphNodes.find(function (n) {
        return n.id === nodeID;
      });
      var outNOdeIDsInSubgraph = node.outLinks.filter(function (outNodeID) {
        return subgraphNodeIDs.includes(outNodeID);
      }).filter(function (outNodeID) {
        return subgraphEdges.find(function (e) {
          return e.source === nodeID && e.target === outNodeID;
        });
      });
      outNOdeIDsInSubgraph.forEach(function (outNodeID) {
        betweenLinks.push({
          source: nodeID,
          target: outNodeID
        });
      });
      outNOdeIDsInSubgraph.filter(function (outNodeID) {
        return outNodeID !== endingNodeID;
      }).forEach(function (outNodeID) {
        nextLevelNodeIDs.push(outNodeID);
      });
    });
    currentLevelNodeIDs = nextLevelNodeIDs;
  };

  while (currentLevelNodeIDs.length > 0) {
    _loop5();
  }

  var sortedBetweenNodeIDs = BFSTraverseSubgraph(false, betweenNodeIDs, subgraphEdges, wholeGraphNodes);
  return {
    nodeIDs: sortedBetweenNodeIDs,
    links: betweenLinks
  };
};

exports.getNodesAndLinksSummaryBetweenNodesInSubgraph = getNodesAndLinksSummaryBetweenNodesInSubgraph;

var getAllRoutesBetweenTwoNodes = function getAllRoutesBetweenTwoNodes(startingNodeID, endingNodeID, subgraphNodeIDs, subgraphEdges, wholeGraphNodes) {
  var resultRoutes = [];

  var takeOneStep = function takeOneStep(curID, curPath) {
    if (curID === endingNodeID) {
      var resultPath = Array.from(curPath);
      resultPath.reverse(); // we actually want route from top to bottom

      resultRoutes.push(resultPath);
      return;
    }

    var curNode = wholeGraphNodes.find(function (n) {
      return n.id === curID;
    });
    curNode.outLinks.forEach(function (oid) {
      if (curPath.has(oid)) return; // avoid loop

      if (!subgraphNodeIDs.includes(oid)) return;
      if (!subgraphEdges.find(function (e) {
        return e.target === oid && e.source === curID;
      })) return;
      curPath.add(oid);
      takeOneStep(oid, curPath);
      curPath.delete(oid);
    });
  };

  takeOneStep(startingNodeID, new Set([startingNodeID]));
  return resultRoutes;
};

exports.getAllRoutesBetweenTwoNodes = getAllRoutesBetweenTwoNodes;