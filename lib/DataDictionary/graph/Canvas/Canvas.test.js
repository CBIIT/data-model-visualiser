"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _GraphDrawer = _interopRequireDefault(require("../GraphDrawer/GraphDrawer"));

var resizeWindow = function resizeWindow(x, y) {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

describe('Canvas', function () {
  var resizeFunc = jest.fn();
  var clickFunc = jest.fn();
  var resetFunc = jest.fn();
  var canvas = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Canvas.default, {
    onCanvasBoundingBoxUpdate: resizeFunc,
    onClickBlankSpace: clickFunc,
    onResetCanvasFinished: resetFunc
  }, /*#__PURE__*/_react.default.createElement(_GraphDrawer.default, {
    className: "text-drawer"
  })));
  it('can render content inside canvas', function () {
    expect(canvas.find(_Canvas.default).length).toBe(1);
    expect(canvas.find('.text-drawer').length).toBe(1);
  });
  it('can update canvas bounding box when resize window', function () {
    expect(resizeFunc.mock.calls.length).toBe(1);
    resizeWindow(100, 100);
    expect(resizeFunc.mock.calls.length).toBe(2);
  });
  it('can detect clicking on the blank space', function () {
    canvas.find('.canvas__overlay').simulate('click');
    expect(clickFunc.mock.calls.length).toBe(1);
  });
  it('can reset zoom if need', function () {
    canvas.setProps({
      needReset: true
    });
    expect(resetFunc.mock.calls.length).toBe(1);
  });
});