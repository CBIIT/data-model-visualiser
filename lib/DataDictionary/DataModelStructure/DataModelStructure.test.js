"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DataModelStructure = _interopRequireDefault(require("./DataModelStructure"));

describe('DataModelStructure', function () {
  /*
   * example structure:
   *
   *     a
   *     |
   *     b
   *    / \
   *   c   d
   *    \ /
   *     e
   *
   */
  var nodeESummary = {
    nodeID: 'e',
    nodeIDsBefore: ['c', 'd'],
    linksBefore: [{
      source: 'b',
      target: 'c'
    }, {
      source: 'b',
      target: 'd'
    }, {
      source: 'c',
      target: 'e'
    }, {
      source: 'd',
      target: 'e'
    }],
    category: 'test'
  };
  var dataModelStructure = [{
    nodeID: 'a',
    nodeIDsBefore: [],
    linksBefore: [],
    category: 'test'
  }, {
    nodeID: 'b',
    nodeIDsBefore: [],
    linksBefore: [{
      source: 'a',
      target: 'b'
    }],
    category: 'test'
  }, nodeESummary];
  var graphFunc = jest.fn();
  var overlayFunc = jest.fn();
  var resetFunc = jest.fn();
  var downloadMultiTemplateFunc = jest.fn();
  var allRoutes = [['a', 'b', 'c', 'e'], ['a', 'b', 'd', 'e']];
  var clickingNodeName = 'e';
  var dictionaryVersion = '1';
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_DataModelStructure.default, {
    dataModelStructure: dataModelStructure,
    isGraphView: true,
    overlayPropertyHidden: true,
    onSetGraphView: graphFunc,
    onSetOverlayPropertyTableHidden: overlayFunc,
    onResetGraphCanvas: resetFunc,
    downloadMultiTemplate: downloadMultiTemplateFunc,
    excludedNodesForTemplates: ['a'],
    relatedNodeIDs: ['a', 'b', 'c', 'd', 'e'],
    allRoutes: allRoutes,
    clickingNodeName: clickingNodeName,
    dictionaryVersion: dictionaryVersion
  }));
  it('can render', function () {
    expect(wrapper.find('.data-model-structure').length).toBe(1);
    expect(wrapper.find('.data-model-structure__node').length).toBe(3); // 'a', 'b', 'e'

    expect(wrapper.find('.data-model-structure__summary-between').text()).toEqual("".concat(nodeESummary.nodeIDsBefore.length, " nodes with ").concat(nodeESummary.linksBefore.length, " links"));
  });
  it('can open overlay table or switch to graph view ', function () {
    // click overlay table button
    var tableButton = wrapper.find('.data-model-structure__table-button').first();
    tableButton.simulate('click');
    expect(overlayFunc.mock.calls.length).toBe(1);
    expect(graphFunc.mock.calls.length).toBe(1); // click "see it in graph" button

    wrapper.setProps({
      isGraphView: false
    });
    var graphButton = wrapper.find('.data-model-structure__graph-button').first();
    graphButton.simulate('click');
    expect(graphFunc.mock.calls.length).toBe(2);
    expect(resetFunc.mock.calls.length).toBe(1);
  });
  it('can download templates for selected nodes', function () {
    wrapper.setProps({
      isGraphView: true
    });
    expect(wrapper.find('div.data-model-structure__template-download-dropdown').length).toBe(1);
    var dropdownButton = wrapper.find('div.data-model-structure__template-download-dropdown').first();
    dropdownButton.simulate('click');
    expect(wrapper.find('.g3-dropdown__item').length).toBe(2); // 'tsv', 'json'

    var tsvButton = wrapper.find('.g3-dropdown__item').first();
    tsvButton.simulate('click');
    expect(downloadMultiTemplateFunc.mock.calls.length).toBe(1);
    var expectedFormatArg = 'tsv';
    var expectedNodesToDownloadArg = {
      b: 'b-template.tsv',
      c: 'c-template.tsv',
      d: 'd-template.tsv',
      e: 'e-template.tsv'
    };
    var expectedRoutes = [['b', 'c', 'e'], ['b', 'd', 'e']];
    expect(downloadMultiTemplateFunc.mock.calls[0][0]).toBe(expectedFormatArg);
    expect(downloadMultiTemplateFunc.mock.calls[0][1]).toEqual(expectedNodesToDownloadArg);
    expect(downloadMultiTemplateFunc.mock.calls[0][2]).toEqual(expectedRoutes);
    expect(downloadMultiTemplateFunc.mock.calls[0][3]).toEqual(clickingNodeName);
    expect(downloadMultiTemplateFunc.mock.calls[0][4]).toEqual(dictionaryVersion);
  });
  it('cannot download templates if selected nodes are all excluded', function () {
    wrapper.setProps({
      excludedNodesForTemplates: ['a', 'b', 'c', 'd', 'e']
    });
    expect(wrapper.find('div.data-model-structure__template-download-dropdown').length).toBe(0);
  });
});