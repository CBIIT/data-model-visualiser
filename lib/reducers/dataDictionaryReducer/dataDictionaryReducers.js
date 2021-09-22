"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _utils = require("../../DataDictionary/utils");

var ddgraphInitialState = {
  isGraphView: true,
  layoutInitialized: false,
  nodes: [],
  edges: [],
  graphBoundingBox: [],
  legendItems: [],
  hoveringNode: null,
  highlightingNode: null,
  relatedNodeIDs: [],
  secondHighlightingNodeID: null,
  dataModelStructure: null,
  overlayPropertyHidden: true,
  canvasBoundingRect: {
    top: 0,
    left: 0
  },
  needReset: false,
  tableExpandNodeID: null,
  searchHistoryItems: (0, _utils.getSearchHistoryItems)(),
  graphNodesSVGElements: null,
  currentSearchKeyword: '',
  searchResult: [],
  matchedNodeIDs: [],
  matchedNodeIDsInProperties: [],
  matchedNodeIDsInNameAndDescription: [],
  isSearchMode: false,
  isSearching: false,
  highlightingMatchedNodeID: null,
  highlightingMatchedNodeOpened: false
};

var dataDictionaryReducer = function dataDictionaryReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ddgraphInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'TOGGLE_GRAPH_TABLE_VIEW':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          isGraphView: action.isGraphView,
          overlayPropertyHidden: true
        });
      }

    case 'GRAPH_LAYOUT_CALCULATED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          nodes: action.nodes,
          edges: action.edges,
          graphBoundingBox: action.graphBoundingBox,
          layoutInitialized: true
        });
      }

    case 'GRAPH_LEGEND_CALCULATED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          legendItems: action.legendItems
        });
      }

    case 'GRAPH_UPDATE_HOVERING_NODE':
      {
        var newHoveringNode = state.nodes.find(function (n) {
          return n.id === action.nodeID;
        });
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          hoveringNode: newHoveringNode
        });
      }

    case 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          canvasBoundingRect: action.canvasBoundingRect
        });
      }

    case 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          relatedNodeIDs: action.relatedNodeIDs
        });
      }

    case 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          secondHighlightingNodeCandidateIDs: action.secondHighlightingNodeCandidateIDs
        });
      }

    case 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          pathRelatedToSecondHighlightingNode: action.pathRelatedToSecondHighlightingNode
        });
      }

    case 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          dataModelStructure: action.dataModelStructure,
          dataModelStructureRelatedNodeIDs: action.dataModelStructureRelatedNodeIDs,
          dataModelStructureAllRoutesBetween: action.routesBetweenStartEndNodes
        });
      }

    case 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          overlayPropertyHidden: action.isHidden
        });
      }

    case 'GRAPH_CANVAS_RESET_REQUIRED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          needReset: action.needReset
        });
      }

    case 'GRAPH_RESET_HIGHLIGHT':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          highlightingNode: null,
          secondHighlightingNodeID: null,
          tableExpandNodeID: null
        });
      }

    case 'GRAPH_CLICK_NODE':
      {
        if (state.isSearchMode) {
          // clicking node in search mode opens property table
          return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
            highlightingMatchedNodeID: action.nodeID,
            highlightingMatchedNodeOpened: false,
            overlayPropertyHidden: false
          });
        }

        var newHighlightingNode = null;
        var newSecondHighlightingNodeID = null;

        if (action.nodeID) {
          // if no node is selected, select this node as highlight node
          if (!state.highlightingNode) {
            newHighlightingNode = state.nodes.find(function (n) {
              return n.id === action.nodeID;
            });
          } else if (state.highlightingNode) {
            newHighlightingNode = state.highlightingNode; // if is clicking the same node

            if (state.highlightingNode.id === action.nodeID) {
              // if no second node is selected, regard this as cancel selecting
              if (!state.secondHighlightingNodeID) {
                newHighlightingNode = null;
              }
            } else if (state.secondHighlightingNodeCandidateIDs.length > 1 && state.secondHighlightingNodeCandidateIDs.includes(action.nodeID)) {
              // regard as canceling selecting second highlight node
              if (state.secondHighlightingNodeID === action.nodeID) {
                newSecondHighlightingNodeID = null;
              } else {
                // select this as second highlight node
                newSecondHighlightingNodeID = action.nodeID;
              }
            }
          }
        }

        var newTableExpandNodeID = newHighlightingNode ? newHighlightingNode.id : null;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          highlightingNode: newHighlightingNode,
          secondHighlightingNodeID: newSecondHighlightingNodeID,
          tableExpandNodeID: newTableExpandNodeID
        });
      }

    case 'GRAPH_CLICK_BLANK_SPACE':
      {
        var _newHighlightingNode = state.highlightingNode;
        var _newSecondHighlightingNodeID = state.secondHighlightingNodeID;
        var _newTableExpandNodeID = state.tableExpandNodeID;

        if (state.highlightingNode) {
          if (state.secondHighlightingNodeID) {
            _newSecondHighlightingNodeID = null;
          } else {
            _newHighlightingNode = null;
            _newTableExpandNodeID = null;
          }
        }

        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          highlightingNode: _newHighlightingNode,
          secondHighlightingNodeID: _newSecondHighlightingNodeID,
          tableExpandNodeID: _newTableExpandNodeID
        });
      }

    case 'TABLE_EXPAND_NODE':
      {
        var _newHighlightingNode2 = null;

        if (action.nodeID) {
          _newHighlightingNode2 = state.nodes.find(function (n) {
            return n.id === action.nodeID;
          });
        }

        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          tableExpandNodeID: action.nodeID,
          highlightingNode: _newHighlightingNode2,
          secondHighlightingNodeID: null
        });
      }

    case 'SEARCH_SET_IS_SEARCHING_STATUS':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          isSearching: action.isSearching
        });
      }

    case 'SEARCH_RESULT_UPDATED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          searchResult: action.searchResult,
          matchedNodeIDs: action.searchResultSummary.generalMatchedNodeIDs,
          matchedNodeIDsInNameAndDescription: action.searchResultSummary.matchedNodeIDsInNameAndDescription,
          matchedNodeIDsInProperties: action.searchResultSummary.matchedNodeIDsInProperties,
          isGraphView: true,
          isSearchMode: true,
          highlightingMatchedNodeID: null,
          highlightingMatchedNodeOpened: false,
          highlightingNode: null,
          secondHighlightingNodeID: null,
          tableExpandNodeID: null
        });
      }

    case 'SEARCH_CLEAR_HISTORY':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          searchHistoryItems: (0, _utils.clearSearchHistoryItems)()
        });
      }

    case 'SEARCH_HISTORY_ITEM_CREATED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          searchHistoryItems: (0, _utils.addSearchHistoryItems)(action.searchHistoryItem)
        });
      }

    case 'GRAPH_NODES_SVG_ELEMENTS_UPDATED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          graphNodesSVGElements: action.graphNodesSVGElements
        });
      }

    case 'SEARCH_RESULT_CLEARED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          searchResult: [],
          matchedNodeIDs: [],
          currentSearchKeyword: '',
          isSearchMode: false,
          highlightingMatchedNodeID: null,
          highlightingMatchedNodeOpened: false
        });
      }

    case 'SEARCH_SAVE_CURRENT_KEYWORD':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          currentSearchKeyword: action.keyword
        });
      }

    case 'GRAPH_MATCHED_NODE_OPENED':
      {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          highlightingMatchedNodeOpened: action.opened
        });
      }

    default:
      return state;
  }
};

var _default = dataDictionaryReducer;
exports.default = _default;