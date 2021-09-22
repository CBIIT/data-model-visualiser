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

var _graphCalculatorHelper = require("./graphCalculatorHelper");

var GraphCalculator = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(GraphCalculator, _React$Component);

  var _super = (0, _createSuper2.default)(GraphCalculator);

  function GraphCalculator(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GraphCalculator);
    _this = _super.call(this, props);
    _this.oldHighlightingNode = null;
    _this.oldSecondHighlightingNodeID = null;
    return _this;
  }

  (0, _createClass2.default)(GraphCalculator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.layoutInitialized) {
        (0, _graphCalculatorHelper.calculateGraphLayout)(this.props.dictionary, this.props.countsSearch, this.props.linksSearch).then(function (layoutResult) {
          _this2.props.onGraphLayoutCalculated(layoutResult);

          var legendItems = (0, _graphCalculatorHelper.getAllTypes)(layoutResult.nodes);

          _this2.props.onGraphLegendCalculated(legendItems);
        });
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      // if the highlighted node is updated, calculate related highlighted nodes
      var newHighlightingNode = nextProps.highlightingNode;
      var newSecondHighlightingNodeID = nextProps.secondHighlightingNodeID;

      if (this.oldHighlightingNode !== newHighlightingNode) {
        var relatedHighlightedNodeIDs = (0, _graphCalculatorHelper.calculateHighlightRelatedNodeIDs)(newHighlightingNode, this.props.nodes);
        this.props.onHighlightRelatedNodesCalculated(relatedHighlightedNodeIDs);
        var secondHighlightingNodeCandidateIDs = newHighlightingNode ? newHighlightingNode.outLinks : [];
        this.props.onSecondHighlightingNodeCandidateIDsCalculated(secondHighlightingNodeCandidateIDs);
      } // if the second highlighting node is updated, calculate related highlighting nodes


      if (this.oldSecondHighlightingNodeID !== newSecondHighlightingNodeID) {
        var pathRelatedToSecondHighlightingNode = (0, _graphCalculatorHelper.calculatePathRelatedToSecondHighlightingNode)(newHighlightingNode, newSecondHighlightingNodeID, this.props.nodes);
        this.props.onPathRelatedToSecondHighlightingNodeCalculated(pathRelatedToSecondHighlightingNode);
      } // update data model structure if update highlighting/secondHighlighting node


      if (this.oldHighlightingNode !== newHighlightingNode || this.oldSecondHighlightingNodeID !== newSecondHighlightingNodeID) {
        if (newSecondHighlightingNodeID) {
          var _this$getDataModelStr = this.getDataModelStructureForSecondHighlightingNodes(newHighlightingNode, newSecondHighlightingNodeID),
              dataModelStructure = _this$getDataModelStr.dataModelStructure,
              dataModelStructureRelatedNodeIDs = _this$getDataModelStr.dataModelStructureRelatedNodeIDs,
              routesBetweenStartEndNodes = _this$getDataModelStr.routesBetweenStartEndNodes;

          this.props.onDataModelStructureCalculated(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes);
        } else {
          this.props.onDataModelStructureCalculated(null);
        }
      }

      this.oldHighlightingNode = newHighlightingNode;
      this.oldSecondHighlightingNodeID = newSecondHighlightingNodeID;
    }
  }, {
    key: "getDataModelStructureForHighlightedNodes",
    value: function getDataModelStructureForHighlightedNodes(newHighlightingNode) {
      var relatedHighlightedNodeIDs = (0, _graphCalculatorHelper.calculateHighlightRelatedNodeIDs)(newHighlightingNode, this.props.nodes);
      var subgraphEdges = this.props.edges.filter(function (e) {
        return relatedHighlightedNodeIDs.includes(e.source) && relatedHighlightedNodeIDs.includes(e.target);
      }).map(function (e) {
        return {
          source: e.source,
          target: e.target
        };
      });

      var _calculateDataModelSt = (0, _graphCalculatorHelper.calculateDataModelStructure)(newHighlightingNode, relatedHighlightedNodeIDs, subgraphEdges, this.props.nodes),
          dataModelStructure = _calculateDataModelSt.dataModelStructure,
          routesBetweenStartEndNodes = _calculateDataModelSt.routesBetweenStartEndNodes;

      return {
        dataModelStructure: dataModelStructure,
        dataModelStructureRelatedNodeIDs: relatedHighlightedNodeIDs,
        routesBetweenStartEndNodes: routesBetweenStartEndNodes
      };
    }
  }, {
    key: "getDataModelStructureForSecondHighlightingNodes",
    value: function getDataModelStructureForSecondHighlightingNodes(newHighlightingNode, newSecondHighlightingNodeID) {
      var subgraphNodeIDs = [];
      var pathRelatedToSecondHighlightingNode = (0, _graphCalculatorHelper.calculatePathRelatedToSecondHighlightingNode)(newHighlightingNode, newSecondHighlightingNodeID, this.props.nodes);
      pathRelatedToSecondHighlightingNode.forEach(function (e) {
        if (!subgraphNodeIDs.includes(e.source)) subgraphNodeIDs.push(e.source);
        if (!subgraphNodeIDs.includes(e.target)) subgraphNodeIDs.push(e.target);
      });

      var _calculateDataModelSt2 = (0, _graphCalculatorHelper.calculateDataModelStructure)(newHighlightingNode, subgraphNodeIDs, pathRelatedToSecondHighlightingNode, this.props.nodes),
          dataModelStructure = _calculateDataModelSt2.dataModelStructure,
          routesBetweenStartEndNodes = _calculateDataModelSt2.routesBetweenStartEndNodes;

      return {
        dataModelStructure: dataModelStructure,
        dataModelStructureRelatedNodeIDs: subgraphNodeIDs,
        routesBetweenStartEndNodes: routesBetweenStartEndNodes
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  }]);
  return GraphCalculator;
}(_react.default.Component);

GraphCalculator.defaultProps = {
  dictionary: {},
  countsSearch: [],
  linksSearch: [],
  onGraphLayoutCalculated: function onGraphLayoutCalculated() {},
  onGraphLegendCalculated: function onGraphLegendCalculated() {},
  highlightingNode: null,
  nodes: [],
  edges: [],
  onHighlightRelatedNodesCalculated: function onHighlightRelatedNodesCalculated() {},
  secondHighlightingNodeID: null,
  onSecondHighlightingNodeCandidateIDsCalculated: function onSecondHighlightingNodeCandidateIDsCalculated() {},
  onPathRelatedToSecondHighlightingNodeCalculated: function onPathRelatedToSecondHighlightingNodeCalculated() {},
  onDataModelStructureCalculated: function onDataModelStructureCalculated() {},
  layoutInitialized: false
};
var _default = GraphCalculator;
exports.default = _default;