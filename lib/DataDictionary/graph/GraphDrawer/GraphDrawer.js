"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _GraphNode = _interopRequireDefault(require("../GraphNode/GraphNode"));

var _GraphEdge = _interopRequireDefault(require("../GraphEdge/GraphEdge"));

var _utils = require("../../utils");

require("./GraphDrawer.css");

var GraphDrawer = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(GraphDrawer, _React$Component);

  var _super = (0, _createSuper2.default)(GraphDrawer);

  function GraphDrawer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GraphDrawer);
    _this = _super.call(this, props);

    _this.onMouseOverNode = function (node) {
      _this.props.onHoverNode(node.id);
    };

    _this.onMouseOutNode = function () {
      _this.props.onCancelHoverNode();
    };

    _this.onClickNode = function (node) {
      _this.props.onClickNode(node.id);
    };

    _this.getNodeRef = function (nodeID) {
      if (!_this.graphNodeRefs[nodeID]) {
        _this.graphNodeRefs[nodeID] = /*#__PURE__*/_react.default.createRef();
      }

      return _this.graphNodeRefs[nodeID];
    };

    _this.graphDomRef = /*#__PURE__*/_react.default.createRef();
    _this.graphNodeRefs = [];
    _this.nodeSVGElementInitialized = false;
    return _this;
  }

  (0, _createClass2.default)(GraphDrawer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      // check if need update all node's svg elements
      // this only happens once, at the first time graph is rendered
      if (this.props.isGraphView && this.props.layoutInitialized && !this.nodeSVGElementInitialized) {
        var graphNodesSVGElements = this.props.nodes.map(function (node) {
          return {
            nodeID: node.id,
            svgElement: _this2.getNodeRef(node.id).current.getSVGElement()
          };
        }).reduce(function (acc, cur) {
          acc[cur.nodeID] = cur.svgElement;
          return acc;
        }, {});
        this.nodeSVGElementInitialized = true;
        this.props.onGraphNodesSVGElementsUpdated(graphNodesSVGElements);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!this.props.layoutInitialized) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      var boundingBoxLength = this.props.graphBoundingBox[2][0];
      var fittingScale = Math.min(this.props.canvasWidth, this.props.canvasHeight) / boundingBoxLength;
      var fittingTransX = Math.abs((boundingBoxLength - this.props.canvasWidth / fittingScale) / 2);
      var fittingTransY = Math.abs((boundingBoxLength - this.props.canvasHeight / fittingScale) / 2);
      if (isNaN(fittingTransX) || isNaN(fittingTransY) || isNaN(fittingScale)) return /*#__PURE__*/_react.default.createElement("g", null);
      return /*#__PURE__*/_react.default.createElement("g", {
        className: "graph-drawer",
        transform: "scale(".concat(fittingScale, ") translate(").concat(fittingTransX, ", ").concat(fittingTransY, ") "),
        ref: this.graphDomRef
      }, this.props.nodes.map(function (node) {
        var isNodeFaded = false;
        var isNodeClickable = true;
        var isHighlightingNode = false;
        var isNodeHalfFaded = false;
        var isNodeDashed = false;

        if (_this3.props.isSearchMode) {
          isNodeFaded = !_this3.props.matchedNodeIDs.includes(node.id);
          isNodeDashed = _this3.props.matchedNodeIDsInNameAndDescription.length > 0 && !isNodeFaded && !_this3.props.matchedNodeIDsInNameAndDescription.includes(node.id);
          isNodeClickable = !isNodeFaded;
        } else if (_this3.props.highlightingNode) {
          isHighlightingNode = _this3.props.highlightingNode.id === node.id;
          isNodeClickable = _this3.props.highlightingNode.id === node.id || _this3.props.secondHighlightingNodeCandidateIDs.length > 1 && _this3.props.secondHighlightingNodeCandidateIDs.includes(node.id);
          isNodeFaded = !_this3.props.relatedNodeIDs.includes(node.id);

          if (_this3.props.secondHighlightingNodeID) {
            isNodeHalfFaded = !isNodeFaded && !_this3.props.pathRelatedToSecondHighlightingNode.find(function (e) {
              return e.source === node.id || e.target === node.id;
            });
          }
        }

        var matchedNodeNameIndices = [];

        _this3.props.searchResult.forEach(function (item) {
          if (item.item.id === node.id) {
            item.matches.forEach(function (matchItem) {
              if (matchItem.key === 'title') {
                matchedNodeNameIndices = matchItem.indices;
              }
            });
          }
        });

        return /*#__PURE__*/_react.default.createElement(_GraphNode.default, {
          key: node.id,
          node: node,
          isHighlightingNode: isHighlightingNode,
          isFaded: isNodeFaded,
          isHalfFaded: isNodeHalfFaded,
          isDashed: isNodeDashed,
          isClickable: isNodeClickable,
          onMouseOver: function onMouseOver() {
            return _this3.onMouseOverNode(node);
          },
          onMouseOut: _this3.onMouseOutNode,
          onClick: function onClick() {
            return _this3.onClickNode(node);
          },
          ref: _this3.getNodeRef(node.id),
          matchedNodeNameIndices: matchedNodeNameIndices
        });
      }), this.props.edges.map(function (edge, i) {
        var isEdgeFaded = false;
        var isEdgeHalfFaded = false;
        var isEdgeHighlighted = false;

        if (_this3.props.isSearchMode) {
          isEdgeFaded = true;
        } else if (_this3.props.highlightingNode) {
          var isEdgeRelatedToHighlightedNode = _this3.props.relatedNodeIDs.includes(edge.source) && _this3.props.relatedNodeIDs.includes(edge.target);

          if (_this3.props.secondHighlightingNodeID) {
            var isEdgeAlongPathRelatedToSecondHighlightNode = !!_this3.props.pathRelatedToSecondHighlightingNode.find(function (e) {
              return e.source === edge.source && e.target === edge.target;
            });
            isEdgeHalfFaded = isEdgeRelatedToHighlightedNode && !isEdgeAlongPathRelatedToSecondHighlightNode;
            isEdgeFaded = !isEdgeRelatedToHighlightedNode;
            isEdgeHighlighted = isEdgeAlongPathRelatedToSecondHighlightNode;
          } else {
            isEdgeFaded = !isEdgeRelatedToHighlightedNode;
            isEdgeHighlighted = isEdgeRelatedToHighlightedNode;
          }
        }

        return /*#__PURE__*/_react.default.createElement(_GraphEdge.default, {
          key: "".concat(edge.source, "-").concat(edge.target, "-").concat(i),
          edge: edge,
          isRequired: edge.required,
          isFaded: isEdgeFaded,
          isHalfFaded: isEdgeHalfFaded,
          isHighlighted: isEdgeHighlighted
        });
      }));
    }
  }]);
  return GraphDrawer;
}(_react.default.Component);

GraphDrawer.defaultProps = {
  nodes: [],
  edges: [],
  graphBoundingBox: [[0, 0], [0, 1], [1, 1], [1, 0]],
  layoutInitialized: false,
  canvasWidth: 1000,
  canvasHeight: 1000,
  onHoverNode: function onHoverNode() {},
  onCancelHoverNode: function onCancelHoverNode() {},
  onClickNode: function onClickNode() {},
  highlightingNode: null,
  relatedNodeIDs: [],
  secondHighlightingNodeID: null,
  secondHighlightingNodeCandidateIDs: [],
  pathRelatedToSecondHighlightingNode: [],
  isGraphView: true,
  isSearchMode: false,
  matchedNodeIDs: [],
  matchedNodeIDsInNameAndDescription: [],
  onGraphNodesSVGElementsUpdated: function onGraphNodesSVGElementsUpdated() {},
  searchResult: []
};
var _default = GraphDrawer;
exports.default = _default;