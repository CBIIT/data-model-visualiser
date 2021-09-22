"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Legend = _interopRequireDefault(require("./Legend"));

describe('Legend', function () {
  var items = ['c1', 'c2', 'c3'];
  it('can render and toggle', function () {
    var legend = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Legend.default, {
      items: items
    }));
    expect(legend.find(_Legend.default).length).toBe(1);
    expect(legend.state('show')).toBe(true);
    expect(legend.find('.data-dictionary-graph-legend__info').length).toBe(0);
    var toggleElem = legend.find('.data-dictionary-graph-legend__close');
    toggleElem.simulate('click');
    expect(legend.state('show')).toBe(false);
    var infoElem = legend.find('.data-dictionary-graph-legend__info');
    infoElem.simulate('click');
    expect(legend.state('show')).toBe(true);
  });
});