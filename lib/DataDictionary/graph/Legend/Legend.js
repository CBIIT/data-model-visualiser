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

var _utils = require("../../../utils");

var _helper = require("../../NodeCategories/helper");

require("./Legend.css");

var Legend = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Legend, _React$Component);

  var _super = (0, _createSuper2.default)(Legend);

  function Legend(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Legend);
    _this = _super.call(this, props);

    _this.toggleLegend = function () {
      _this.setState(function (state) {
        return {
          show: !state.show
        };
      });
    };

    _this.state = {
      show: true
    };
    return _this;
  }

  (0, _createClass2.default)(Legend, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-graph-legend ".concat(this.state.show ? '' : 'data-dictionary-graph-legend--toggled')
      }, this.state.show ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("i", {
        className: "data-dictionary-graph-legend__close g3-icon g3-icon--cross",
        onClick: this.toggleLegend,
        onKeyPress: this.toggleLegend,
        role: "button",
        tabIndex: 0
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-dictionary-graph-legend__item body"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "data-dictionary-graph-legend__required-icon data-dictionary-graph-legend__required-icon g3-icon g3-icon--minus"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-graph-legend__text"
      }, "Relationships")), this.props.items.map(function (category) {
        var itemColor = (0, _helper.getCategoryColor)(category);
        var IconSvg = (0, _helper.getCategoryIconSVG)(category);
        return /*#__PURE__*/_react.default.createElement("div", {
          key: category,
          className: "data-dictionary-graph-legend__item body"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "data-dictionary-graph-legend__circle-wrapper"
        }, IconSvg ? /*#__PURE__*/_react.default.createElement(IconSvg, null) : /*#__PURE__*/_react.default.createElement("span", {
          className: "data-dictionary-graph-legend__circle",
          style: {
            backgroundColor: itemColor
          }
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: "data-dictionary-graph-legend__text"
        }, (0, _utils.capitalizeFirstLetter)(category)));
      })) : /*#__PURE__*/_react.default.createElement("span", {
        className: "data-dictionary-graph-legend__info",
        onClick: this.toggleLegend,
        onKeyPress: this.toggleLegend,
        role: "button",
        tabIndex: 0
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "data-dictionary-graph-legend__info-icon g3-icon g3-icon--question-mark"
      })));
    }
  }]);
  return Legend;
}(_react.default.Component);

Legend.defaultProps = {
  items: []
};
var _default = Legend;
exports.default = _default;