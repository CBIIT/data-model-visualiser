"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodesAndEdges = createNodesAndEdges;
exports.findRoot = findRoot;
exports.getTreeHierarchy = getTreeHierarchy;
exports.nodesBreadthFirst = nodesBreadthFirst;
exports.assignNodePositions = assignNodePositions;
exports.createDotStrinByNodesEdges = createDotStrinByNodesEdges;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

/**
 * Get subgroup links from link
 * @param {object} link - array of links
 * @param {object} nameToNode - key (node name) value (node object) map
 * @param {string} sourceId - source id for subgroup links
 * This function traverse links recursively and return all nested subgroup lnks
 */
var getSubgroupLinks = function getSubgroupLinks(link, nameToNode, sourceId) {
  var subgroupLinks = [];

  if (link.subgroup) {
    link.subgroup.forEach(function (sgLink) {
      if (sgLink.subgroup) {
        subgroupLinks = subgroupLinks.concat(getSubgroupLinks(sgLink, nameToNode, sourceId));
      } else {
        subgroupLinks.push((0, _objectSpread2.default)({
          source: nameToNode[sourceId],
          target: nameToNode[sgLink.target_type],
          exists: 1
        }, sgLink));
      }
    });
  }

  return subgroupLinks;
};
/**
 * Given a data dictionary that defines a set of nodes
 *    and edges, returns the nodes and edges in correct format
 *
 * @method createNodesAndEdges
 * @param props: Object (normally taken from redux state) that includes dictionary
 *    property defining the dictionary as well as other optional properties
 *    such as counts_search and links_search (created by getCounts) with
 *    information about the number of each type (node) and link (between
 *    nodes with a link's source and target types) that actually
 *    exist in the data
 * @param createAll: Include all nodes and edges or only those that are populated in
 *    counts_search and links_search
 * @param nodesToHide: Array of nodes to hide from graph
 * @returns { nodes, edges } Object containing nodes and edges
 */


function createNodesAndEdges(props, createAll) {
  var nodesToHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['program'];
  var dictionary = props.dictionary;
  var nodes = Object.keys(dictionary).filter(function (key) {
    return !key.startsWith('_') && dictionary[key].type === 'object' && dictionary[key].category !== 'internal' && !nodesToHide.includes(key);
  }).map(function (key) {
    var count = 0;

    if (props.counts_search) {
      count = props.counts_search["_".concat(key, "_count")];
    }

    return (0, _objectSpread2.default)({
      name: dictionary[key].title,
      count: count
    }, dictionary[key]);
  }).filter(function (node) {
    return createAll || node.count !== 0;
  });
  var nameToNode = nodes.reduce(function (db, node) {
    db[node.id] = node;
    return db;
  }, {});
  var hideDb = nodesToHide.reduce(function (db, name) {
    db[name] = true;
    return db;
  }, {});
  var edges = nodes.filter(function (node) {
    return node.links && node.links.length > 0;
  }).reduce( // add each node's links to the edge list
  function (list, node) {
    var newLinks = node.links.map(function (link) {
      return (0, _objectSpread2.default)({
        source: node,
        target: nameToNode[link.target_type],
        exists: 1
      }, link);
    });
    return list.concat(newLinks);
  }, []).reduce( // add link subgroups to the edge list
  function (list, link) {
    var result = list;

    if (link.target) {
      // "subgroup" link entries in dictionary are not links themselves ...
      result.push(link);
    }

    if (link.subgroup) {
      var sgLinks = getSubgroupLinks(link, nameToNode, link.source.id);
      result = result.concat(sgLinks);
    }

    return result;
  }, []).filter( // target type exist and is not in hide list
  function (link) {
    return link.target && link.target.id in nameToNode && !(link.target.id in hideDb);
  }).map(function (link) {
    // decorate each link with its "exists" count if available
    //  (number of instances of link between source and target types in the data)
    var res = link;
    res.exists = props.links_search ? props.links_search["".concat(res.source.id, "_").concat(res.name, "_to_").concat(res.target.id, "_link")] : undefined;
    return res;
  }).filter( // filter out if no instances of this link exists and createAll is not specified
  function (link) {
    return createAll || link.exists || link.exists === undefined;
  });
  return {
    nodes: nodes,
    edges: edges
  };
}
/**
 * Find the root of the given graph (no edges out)
 * @method findRoot
 * @param nodes
 * @param edges
 * @return {string} rootName or null if no root
 */


function findRoot(nodes, edges) {
  var couldBeRoot = edges.reduce(function (db, edge) {
    // At some point the d3 force layout converts
    //   edge.source and edge.target into node references ...
    var sourceName = typeof edge.source === 'object' ? edge.source.id : edge.source;

    if (db[sourceName]) {
      db[sourceName] = false;
    }

    return db;
  }, // initialize emptyDb - any node could be the root
  nodes.reduce(function (emptyDb, node) {
    var res = emptyDb;
    res[node.id] = true;
    return res;
  }, {}));
  var rootNode = nodes.find(function (n) {
    return couldBeRoot[n.id];
  });
  return rootNode ? rootNode.id : null;
}
/**
 * Recursive helper function for getTreeHierarchy
 * Returns the hierarchy of the tree in the form of a map
 * Each (key, value) consists of (node, node's descendants including the node itself)
 * @method getTreeHierarchyHelper
 * @param root
 * @param name2EdgesIn
 * @param hierarchy
 * @return {map}
 */


function getTreeHierarchyHelper(node, name2EdgesIn, hierarchy) {
  var descendants = new Set();
  descendants.add(node);
  hierarchy.set(node, descendants);
  name2EdgesIn[node].forEach(function (edge) {
    var sourceName = typeof edge.source === 'object' ? edge.source.id : edge.source;

    if (!hierarchy.get(sourceName)) {
      // don't want to visit node again
      hierarchy = getTreeHierarchyHelper(sourceName, name2EdgesIn, hierarchy);
      descendants.add(sourceName);
      hierarchy.get(sourceName).forEach(function (n) {
        descendants.add(n);
      });
    }
  });
  hierarchy.set(node, descendants);
  return hierarchy;
}
/**
 * Returns the hierarchy of the tree in the form of a map
 * Each (key, value) consists of (node, node's descendants including the node itself)
 * @method getTreeHierarchy
 * @param root
 * @param name2EdgesIn
 * @return {map}
 */


function getTreeHierarchy(root, name2EdgesIn) {
  return getTreeHierarchyHelper(root, name2EdgesIn, new Map());
}
/**
 * Arrange nodes in dictionary graph breadth first, and build level database.
 * If a node links to multiple parents, then place it under the highest parent ...
 * Exported for testing.
 *
 * @param {Array} nodes
 * @param {Array} edges
 * @return { nodesBreadthFirst, treeLevel2Names, name2Level } where
 *          nodesBreadthFirst is array of node names, and
 *          treeLevel2Names is an array of arrays of node names,
 *          and name2Level is a mapping of node name to level
 */


function nodesBreadthFirst(nodes, edges) {
  var result = {
    bfOrder: [],
    treeLevel2Names: [],
    name2Level: {}
  }; // mapping of node name to edges that point into that node

  var name2EdgesIn = edges.reduce(function (db, edge) {
    // At some point the d3 force layout converts edge.source
    //   and edge.target into node references ...
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
  }, {})); // root node has no edges coming out of it, just edges coming in

  var root = findRoot(nodes, edges);

  if (!root) {
    console.log('Could not find root of given graph');
    return result;
  }

  var processedNodes = new Set(); // account for nodes that link to multiple other nodes

  var queue = [];
  queue.push({
    query: root,
    level: 0
  }); // just 2b safe - could be user gives us a graph without a 'project'

  if (!name2EdgesIn[root]) {
    name2EdgesIn[root] = [];
  }

  var name2ActualLvl = {};
  var hierarchy = getTreeHierarchy(root, name2EdgesIn); // Run through this once to determine the actual level of each node

  var _loop = function _loop(head) {
    var _queue$head = queue[head],
        query = _queue$head.query,
        level = _queue$head.level; // breadth first

    name2ActualLvl[query] = level; // eslint-disable-next-line

    name2EdgesIn[query].forEach(function (edge) {
      // At some point the d3 force layout converts edge.source
      //   and edge.target into node references ...
      var sourceName = typeof edge.source === 'object' ? edge.source.id : edge.source;

      if (name2EdgesIn[sourceName]) {
        var isAncestor = hierarchy.get(sourceName).has(query); // only push node if it is not an ancestor of the current node, or else --> cycle

        if (!isAncestor) {
          queue.push({
            query: sourceName,
            level: level + 1
          });
        }
      } else {
        console.log("Edge comes from unknown node ".concat(sourceName));
      }
    });
  };

  for (var head = 0; head < queue.length; head += 1) {
    _loop(head);
  } // Reset and run for real
  // eslint-disable-next-line


  queue = [];
  queue.push({
    query: root,
    level: 0
  }); // queue.shift is O(n), so just keep pushing, and move the head

  var _loop2 = function _loop2(_head) {
    var _queue$_head = queue[_head],
        query = _queue$_head.query,
        level = _queue$_head.level; // breadth first

    result.bfOrder.push(query);
    processedNodes.add(query);

    if (result.treeLevel2Names.length <= level) {
      result.treeLevel2Names.push([]);
    }

    result.treeLevel2Names[level].push(query);
    result.name2Level[query] = level;
    name2EdgesIn[query].forEach(function (edge) {
      // At some point the d3 force layout converts edge.source
      //   and edge.target into node references ...
      var sourceName = typeof edge.source === 'object' ? edge.source.id : edge.source;

      if (name2EdgesIn[sourceName]) {
        if (!processedNodes.has(sourceName) && name2ActualLvl[sourceName] === level + 1) {
          //
          // edge source has not yet been processed via another link from the source
          // to a node higher in the graph
          //
          processedNodes.add(sourceName); // don't double-queue a node

          queue.push({
            query: sourceName,
            level: level + 1
          });
        }
      } else {
        console.log("Edge comes from unknown node ".concat(sourceName));
      }
    });
  };

  for (var _head = 0; _head < queue.length; _head += 1) {
    _loop2(_head);
  }

  return result;
}
/**
 * Decorate the nodes of a graph with a position based on the node's position in the graph
 * Exported for testing.  Decorates nodes with position property array [x,y] on a [0,1) space
 *
 * @method assignNodePositions
 * @param nodes
 * @param edges
 * @param opts {breadthFirstInfo,numPerRow} breadthFirstInfo is output
 *          from nodesBreadthFirst - otherwise call it ourselves,
 *          numPerRow specifies number of nodes per row if we want a
 *          grid under the root rather than the tree structure
 */


function assignNodePositions(nodes, edges, opts) {
  var breadthFirstInfo = opts && opts.breadthFirstInfo ? opts.breadthFirstInfo : nodesBreadthFirst(nodes, edges);
  var name2Node = nodes.reduce(function (db, node) {
    var res = db;
    res[node.id] = node;
    return res;
  }, {}); // the tree has some number of levels with some number of nodes each,
  // but we may want to break each level down into multiple rows
  // @return {rowNumber:[nodeNameList]}

  var row2Names = function () {
    if (!opts || !opts.numPerRow) {
      return breadthFirstInfo.treeLevel2Names;
    }

    var numPerRow = opts.numPerRow;
    var bfOrder = breadthFirstInfo.bfOrder; // put the root on its own level

    return bfOrder.reduce(function (db, node) {
      if (db.length < 2) {
        // put root node on its own level
        db.push([node]);
      } else {
        var lastRow = db[db.length - 1];

        if (lastRow.length < numPerRow) {
          lastRow.push(node);
        } else {
          db.push([node]);
        }
      }

      return db;
    }, []);
  }(); // Assign a (x,y) position in [0,1) space to each node based on its level in the tree


  var numLevels = row2Names.length;
  row2Names.forEach(function (nodesAtLevel, level) {
    var numNodesAtLevel = nodesAtLevel.length;
    nodesAtLevel.forEach(function (nodeName, posAtLevel) {
      var node = name2Node[nodeName];
      node.position = [// (x,y) in [0,1) coordinates
      (posAtLevel + 1) / (numNodesAtLevel + 1), (level + 1) / (numLevels + 1)];
      node.positionIndex = [posAtLevel, level];
    });
  });
  return breadthFirstInfo;
}
/**
 * convert graph structure to string using DOT language
 * DOT Language ref: http://www.graphviz.org/doc/info/lang.html
 * @param {Array} nodes
 * @param {Array} edges
 * @params {Object} treeLevel2Names - levels and nodes in each level, {levelNum:[nodeNameList]}
 * @returns {string} graph translated into DOT language
 */


var buildGraphVizDOTString = function buildGraphVizDOTString(nodes, edges, treeLevel2Names) {
  var whRatio = 1;
  var canvasSize = 5;
  var nodeWidth = 1.2;
  var nodeHeight = 0.8;
  var graphString = 'digraph dictionary {\n';
  graphString += "size=\"".concat(canvasSize, ", ").concat(canvasSize, "\"\n");
  graphString += "ratio=".concat(whRatio, "\n");
  nodes.forEach(function (node) {
    graphString += "".concat(node.id, " [type=\"").concat(node.category, "\" label=\"").concat(node.name, "\" fixedsize=true width=").concat(nodeWidth, " height=").concat(nodeHeight, " shape=rectangle\n]\n");
  });
  edges.forEach(function (edge) {
    graphString += "".concat(edge.source.id, " -> ").concat(edge.target.id, "[arrowhead=none tailport=s ]\n");
  });

  if (treeLevel2Names) {
    treeLevel2Names.forEach(function (IDsInThisLevel, i) {
      graphString += "{rank=".concat(i, " ").concat(IDsInThisLevel.join(' '), "}\n");
    });
  }

  graphString += '}';
  return graphString;
};

function createDotStrinByNodesEdges(nodes, edges) {
  var posInfo = assignNodePositions(nodes, edges);
  var dotString = buildGraphVizDOTString(nodes, edges, posInfo.treeLevel2Names);
  return dotString;
}