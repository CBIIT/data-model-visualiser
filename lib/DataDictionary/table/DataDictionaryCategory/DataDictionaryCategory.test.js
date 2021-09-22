"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("./."));

var _2 = _interopRequireDefault(require("../DataDictionaryNode/."));

describe('DataDictionaryCategory', function () {
  var nodes = [{
    id: 'a',
    description: 'node a description'
  }, {
    id: 'b',
    description: 'node b description'
  }];
  var expandFunc = jest.fn();
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_.default, {
    category: "test",
    nodes: nodes,
    highlightingNodeID: null,
    onExpandNode: expandFunc
  }));
  it('can render', function () {
    expect(wrapper.find('.data-dictionary-category').length).toBe(1);
    expect(wrapper.find(_2.default).length).toBe(nodes.length);
  });
});