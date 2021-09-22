"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _NodeTooltip = _interopRequireDefault(require("./NodeTooltip"));

describe('NodeTooltip', function () {
  var hoveringNode = {
    id: 'a',
    type: 'test',
    label: 'node A'
  };
  it('can render tooltip', function () {
    var tooltip = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_NodeTooltip.default, {
      hoveringNode: hoveringNode
    }));
    expect(tooltip.find('.node-tooltip__wrapper').length).toBe(1);
    var tooltipWithoutHoveringNode = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_NodeTooltip.default, {
      hoveringNode: null
    }));
    expect(tooltipWithoutHoveringNode.find('.node-tooltip__wrapper').length).toBe(0);
  });
});