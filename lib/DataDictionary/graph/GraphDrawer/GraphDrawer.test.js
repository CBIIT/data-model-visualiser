"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _GraphDrawer = _interopRequireDefault(require("../GraphDrawer/GraphDrawer"));

var _graphCalculatorHelper = require("../GraphCalculator/graphCalculatorHelper");

var _testData = require("../../../GraphUtils/testData");

describe('GraphDrawer', function () {
  var hoverFunc = jest.fn();
  var cancelHoverFunc = jest.fn();
  var clickFunc = jest.fn();
  it('can render nodes and edges in graph', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var _buildTestData, dictionary, layout, graphDrawer;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _buildTestData = (0, _testData.buildTestData)(), dictionary = _buildTestData.dictionary;
            _context.next = 3;
            return (0, _graphCalculatorHelper.calculateGraphLayout)(dictionary);

          case 3:
            layout = _context.sent;
            graphDrawer = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_GraphDrawer.default, {
              nodes: layout.nodes,
              edges: layout.edges,
              layoutInitialized: true
            }));
            expect(graphDrawer.find(_GraphDrawer.default).length).toBe(1);
            expect(graphDrawer.find('.graph-node').length).toBe(layout.nodes.length);
            expect(graphDrawer.find('.graph-edge').length).toBe(layout.edges.length);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('can hover and click nodes, and update svg element', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var _buildTestData2, dictionary, layout, graphDrawer, firstNodeElem;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _buildTestData2 = (0, _testData.buildTestData)(), dictionary = _buildTestData2.dictionary;
            _context2.next = 3;
            return (0, _graphCalculatorHelper.calculateGraphLayout)(dictionary);

          case 3:
            layout = _context2.sent;
            graphDrawer = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_GraphDrawer.default, {
              nodes: layout.nodes,
              edges: layout.edges,
              layoutInitialized: true,
              onHoverNode: hoverFunc,
              onCancelHoverNode: cancelHoverFunc,
              onClickNode: clickFunc
            }));
            firstNodeElem = graphDrawer.find('.graph-node').first();
            firstNodeElem.simulate('mouseover');
            expect(hoverFunc.mock.calls.length).toBe(1);
            firstNodeElem.simulate('mouseout');
            expect(cancelHoverFunc.mock.calls.length).toBe(1);
            firstNodeElem.simulate('click');
            expect(clickFunc.mock.calls.length).toBe(1);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});