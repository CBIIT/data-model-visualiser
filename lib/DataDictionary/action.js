"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHighlightingMatchedNodeOpened = exports.saveCurrentSearchKeyword = exports.clearSearchResult = exports.setGraphNodesSVGElements = exports.addSearchHistoryItem = exports.clearSearchHistoryItems = exports.setSearchResult = exports.setIsSearching = exports.setNeedReset = exports.setGraphView = exports.setExpandNode = exports.setOverlayPropertyTableHidden = exports.resetGraphHighlight = exports.clickNode = exports.hoverNode = exports.setGraphLegend = exports.setGraphLayout = exports.setRelatedNodeIDs = exports.setDataModelStructure = exports.setPathRelatedToSecondHighlightingNode = exports.setSecondHighlightingNodeCandidateIDs = exports.setCanvasBoundingRect = exports.clickBlankSpace = void 0;

var clickBlankSpace = function clickBlankSpace() {
  return {
    type: 'GRAPH_CLICK_BLANK_SPACE'
  };
};

exports.clickBlankSpace = clickBlankSpace;

var setCanvasBoundingRect = function setCanvasBoundingRect(canvasBoundingRect) {
  return {
    type: 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT',
    canvasBoundingRect: canvasBoundingRect
  };
};

exports.setCanvasBoundingRect = setCanvasBoundingRect;

var setSecondHighlightingNodeCandidateIDs = function setSecondHighlightingNodeCandidateIDs(secondHighlightingNodeCandidateIDs) {
  return {
    type: 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES',
    secondHighlightingNodeCandidateIDs: secondHighlightingNodeCandidateIDs
  };
};

exports.setSecondHighlightingNodeCandidateIDs = setSecondHighlightingNodeCandidateIDs;

var setPathRelatedToSecondHighlightingNode = function setPathRelatedToSecondHighlightingNode(pathRelatedToSecondHighlightingNode) {
  return {
    type: 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE',
    pathRelatedToSecondHighlightingNode: pathRelatedToSecondHighlightingNode
  };
};

exports.setPathRelatedToSecondHighlightingNode = setPathRelatedToSecondHighlightingNode;

var setDataModelStructure = function setDataModelStructure(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes) {
  return {
    type: 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE',
    dataModelStructure: dataModelStructure,
    dataModelStructureRelatedNodeIDs: dataModelStructureRelatedNodeIDs,
    routesBetweenStartEndNodes: routesBetweenStartEndNodes
  };
};

exports.setDataModelStructure = setDataModelStructure;

var setRelatedNodeIDs = function setRelatedNodeIDs(relatedNodeIDs) {
  return {
    type: 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE',
    relatedNodeIDs: relatedNodeIDs
  };
};

exports.setRelatedNodeIDs = setRelatedNodeIDs;

var setGraphLayout = function setGraphLayout(layout) {
  return {
    type: 'GRAPH_LAYOUT_CALCULATED',
    nodes: layout.nodes,
    edges: layout.edges,
    graphBoundingBox: layout.graphBoundingBox
  };
};

exports.setGraphLayout = setGraphLayout;

var setGraphLegend = function setGraphLegend(legendItems) {
  return {
    type: 'GRAPH_LEGEND_CALCULATED',
    legendItems: legendItems
  };
};

exports.setGraphLegend = setGraphLegend;

var hoverNode = function hoverNode(nodeID) {
  return {
    type: 'GRAPH_UPDATE_HOVERING_NODE',
    nodeID: nodeID
  };
};

exports.hoverNode = hoverNode;

var clickNode = function clickNode(nodeID) {
  return {
    type: 'GRAPH_CLICK_NODE',
    nodeID: nodeID
  };
};

exports.clickNode = clickNode;

var resetGraphHighlight = function resetGraphHighlight() {
  return {
    type: 'GRAPH_RESET_HIGHLIGHT'
  };
};

exports.resetGraphHighlight = resetGraphHighlight;

var setOverlayPropertyTableHidden = function setOverlayPropertyTableHidden(isHidden) {
  return {
    type: 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN',
    isHidden: isHidden
  };
};

exports.setOverlayPropertyTableHidden = setOverlayPropertyTableHidden;

var setExpandNode = function setExpandNode(nodeID) {
  return {
    type: 'TABLE_EXPAND_NODE',
    nodeID: nodeID
  };
};

exports.setExpandNode = setExpandNode;

var setGraphView = function setGraphView(isGraphView) {
  return {
    type: 'TOGGLE_GRAPH_TABLE_VIEW',
    isGraphView: isGraphView
  };
};

exports.setGraphView = setGraphView;

var setNeedReset = function setNeedReset(needReset) {
  return {
    type: 'GRAPH_CANVAS_RESET_REQUIRED',
    needReset: needReset
  };
};

exports.setNeedReset = setNeedReset;

var setIsSearching = function setIsSearching(isSearching) {
  return {
    type: 'SEARCH_SET_IS_SEARCHING_STATUS',
    isSearching: isSearching
  };
};

exports.setIsSearching = setIsSearching;

var setSearchResult = function setSearchResult(searchResult, searchResultSummary) {
  return {
    type: 'SEARCH_RESULT_UPDATED',
    searchResult: searchResult,
    searchResultSummary: searchResultSummary
  };
};

exports.setSearchResult = setSearchResult;

var clearSearchHistoryItems = function clearSearchHistoryItems() {
  return {
    type: 'SEARCH_CLEAR_HISTORY'
  };
};

exports.clearSearchHistoryItems = clearSearchHistoryItems;

var addSearchHistoryItem = function addSearchHistoryItem(searchHistoryItem) {
  return {
    type: 'SEARCH_HISTORY_ITEM_CREATED',
    searchHistoryItem: searchHistoryItem
  };
};

exports.addSearchHistoryItem = addSearchHistoryItem;

var setGraphNodesSVGElements = function setGraphNodesSVGElements(graphNodesSVGElements) {
  return {
    type: 'GRAPH_NODES_SVG_ELEMENTS_UPDATED',
    graphNodesSVGElements: graphNodesSVGElements
  };
};

exports.setGraphNodesSVGElements = setGraphNodesSVGElements;

var clearSearchResult = function clearSearchResult() {
  return {
    type: 'SEARCH_RESULT_CLEARED'
  };
};

exports.clearSearchResult = clearSearchResult;

var saveCurrentSearchKeyword = function saveCurrentSearchKeyword(keyword) {
  return {
    type: 'SEARCH_SAVE_CURRENT_KEYWORD',
    keyword: keyword
  };
};

exports.saveCurrentSearchKeyword = saveCurrentSearchKeyword;

var setHighlightingMatchedNodeOpened = function setHighlightingMatchedNodeOpened(opened) {
  return {
    type: 'GRAPH_MATCHED_NODE_OPENED',
    opened: opened
  };
};

exports.setHighlightingMatchedNodeOpened = setHighlightingMatchedNodeOpened;