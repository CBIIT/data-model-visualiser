"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _react = _interopRequireDefault(require("react"));

function Button(_ref) {
  var label = _ref.label,
      backgroundColor = _ref.backgroundColor,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClick,
    style: backgroundColor && {
      backgroundColor: backgroundColor
    }
  }, label);
}

Button.defaultProps = {
  backgroundColor: null,
  onClick: undefined
};