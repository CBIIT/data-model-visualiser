"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@gen3/ui-component/dist/components/Button"));

require("./ActionLayer.css");

/**
* A layer over the graph.
* Put action buttons here.
*/
var ActionLayer = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ActionLayer, _React$Component);

  var _super = (0, _createSuper2.default)(ActionLayer);

  function ActionLayer() {
    var _this;

    (0, _classCallCheck2.default)(this, ActionLayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleClearSearch = function () {
      _this.props.onClearSearchResult();
    };

    return _this;
  }

  (0, _createClass2.default)(ActionLayer, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "action-layer"
      }, this.props.isSearchMode && /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "action-layer__clear-search",
        onClick: this.handleClearSearch,
        label: "Clear Search Result"
      }));
    }
  }]);
  return ActionLayer;
}(_react.default.Component);

ActionLayer.defaultProps = {
  isSearchMode: false,
  onClearSearchResult: function onClearSearchResult() {}
};
var _default = ActionLayer;
exports.default = _default;