"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _NodePopup = _interopRequireDefault(require("./NodePopup"));

describe('NodePopup', function () {
  var highlightingNode = {
    id: 'a',
    type: 'test',
    requiredPropertiesCount: 0,
    optionalPropertiesCount: 0
  };
  it('can render popup', function () {
    var closeFunc = jest.fn();
    var openFunc = jest.fn();
    var fakeSVGElem = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement("g", null));
    var svgElems = {
      a: fakeSVGElem
    };
    var popup = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_NodePopup.default, {
      highlightingNode: highlightingNode,
      graphNodesSVGElements: svgElems,
      onClosePopup: closeFunc,
      onOpenOverlayPropertyTable: openFunc
    }));
    expect(popup.find('.node-popup__wrapper').length).toBe(1);
    var openPropertyButtonElem = popup.find('.node-popup__button').first();
    openPropertyButtonElem.simulate('click');
    expect(openFunc.mock.calls.length).toBe(1);
    var closeButtonElem = popup.find('.node-popup__close').first();
    closeButtonElem.simulate('click');
    expect(closeFunc.mock.calls.length).toBe(1);
  });
});