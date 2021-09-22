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

var _d3Selection = require("d3-selection");

var _d3Transition = require("d3-transition");

var _d3Ease = require("d3-ease");

var _d3Zoom = require("d3-zoom");

require("./Canvas.css");

var d3 = {
  select: _d3Selection.select,
  zoom: _d3Zoom.zoom,
  zoomTransform: _d3Zoom.zoomTransform,
  zoomIdentity: _d3Zoom.zoomIdentity,
  transition: _d3Transition.transition,
  easeLinear: _d3Ease.easeLinear,

  get event() {
    return _d3Selection.event;
  } // https://stackoverflow.com/a/40048292


};

var Canvas = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Canvas, _React$Component);

  var _super = (0, _createSuper2.default)(Canvas);

  function Canvas(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Canvas);
    _this = _super.call(this, props);

    _this.handleResize = function () {
      if (_this.props.isGraphView) {
        _this.updateCanvasSize();
      }
    };

    _this.handleCanvasUpdate = function () {
      var canvasBoundingRect = _this.canvasElement.current.getBoundingClientRect();

      _this.props.onCanvasBoundingBoxUpdate(canvasBoundingRect);
    };

    _this.handleClick = function () {
      _this.props.onClickBlankSpace();
    };

    _this.zoomAction = function (k) {
      var transform = d3.zoomTransform(_this.zoomCatcher.node()); // if zoomin (k>1), translate toward negative direction, if zoomout, toward positive

      var translateSign = k > 1 ? -1 : +1;

      _this.zoomCatcher.transition(_this.transition).call(_this.zoomBehavior.transform, transform.translate(translateSign * (_this.state.canvasWidth / 2) * Math.abs(k - 1), translateSign * (_this.state.canvasHeight / 2) * Math.abs(k - 1)).scale(k));
    };

    _this.handleZoomIn = function () {
      _this.zoomAction(1.2);
    };

    _this.handleZoomOut = function () {
      _this.zoomAction(0.8);
    };

    _this.handleReset = function () {
      _this.zoomCatcher.transition(_this.transition).call(_this.zoomBehavior.transform, d3.zoomIdentity);
    };

    _this.state = {
      canvasWidth: 0,
      canvasHeight: 0
    };
    _this.canvasElement = /*#__PURE__*/_react.default.createRef();
    _this.svgElement = /*#__PURE__*/_react.default.createRef();
    _this.containerElement = /*#__PURE__*/_react.default.createRef();
    _this.transition = d3.transition().duration(150).ease(d3.easeLinear);
    return _this;
  }

  (0, _createClass2.default)(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.zoomBehavior = d3.zoom().scaleExtent([this.props.minZoom, this.props.maxZoom]).translateExtent([this.props.topLeftTranslateLimit, this.props.bottomRightTranslateLimit]).on('zoom', function () {
        _this2.handleCanvasUpdate();

        _this2.zoomTarget.attr('transform', d3.event.transform);
      });
      this.zoomTarget = d3.select('.canvas__container');
      this.zoomCatcher = d3.select('.canvas__overlay').style('fill', 'none').style('pointer-events', 'all').call(this.zoomBehavior);
      this.updateCanvasSize();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.needReset) {
        this.handleReset();
        this.props.onResetCanvasFinished();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      d3.select('.canvas__overlay').on('.zoom', null);
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: "updateCanvasSize",
    value: function updateCanvasSize() {
      this.setState({
        canvasWidth: this.canvasElement.current.clientWidth,
        canvasHeight: this.canvasElement.current.clientHeight
      });
      this.handleCanvasUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "canvas",
        ref: this.canvasElement,
        style: {
          width: '100%',
          height: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "canvas__zoom-button-group"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "canvas__zoom-button canvas__zoom-button--reset",
        onClick: this.handleReset,
        onKeyPress: this.handleReset,
        role: "button",
        tabIndex: -1
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "canvas__zoom-icon g3-icon g3-icon--reset"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "canvas__zoom-button canvas__zoom-button--zoom-in",
        onClick: this.handleZoomIn,
        onKeyPress: this.handleZoomIn,
        role: "button",
        tabIndex: -1
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "canvas__zoom-icon g3-icon g3-icon--plus"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "canvas__zoom-button canvas__zoom-button--zoom-out",
        onClick: this.handleZoomOut,
        onKeyPress: this.handleZoomOut,
        role: "button",
        tabIndex: -1
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "canvas__zoom-icon canvas__zoom-icon--zoom-in g3-icon g3-icon--minus"
      }))), /*#__PURE__*/_react.default.createElement("svg", {
        className: "canvas__svg",
        ref: this.svgElement,
        width: this.state.canvasWidth,
        height: this.state.canvasHeight,
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("marker", {
        id: "markerArrow",
        markerWidth: "20",
        markerHeight: "20",
        refX: "0",
        refY: "3",
        orient: "auto",
        markerUnits: "strokeWidth"
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: "M0,0 L0,6 L9,3 z",
        fill: "black"
      }))), /*#__PURE__*/_react.default.createElement("rect", {
        className: "canvas__overlay",
        width: this.state.canvasWidth,
        height: this.state.canvasHeight,
        onClick: this.handleClick
      }), /*#__PURE__*/_react.default.createElement("g", {
        className: "canvas__container",
        ref: this.containerElement
      }, _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          canvasWidth: _this3.state.canvasWidth,
          canvasHeight: _this3.state.canvasHeight
        });
      }))));
    }
  }]);
  return Canvas;
}(_react.default.Component);

Canvas.defaultProps = {
  minZoom: 0.1,
  maxZoom: 10,
  topLeftTranslateLimit: [-Infinity, -Infinity],
  bottomRightTranslateLimit: [+Infinity, +Infinity],
  onClickBlankSpace: function onClickBlankSpace() {},
  onCanvasBoundingBoxUpdate: function onCanvasBoundingBoxUpdate() {},
  isGraphView: true,
  needReset: false,
  onResetCanvasFinished: function onResetCanvasFinished() {}
};
var _default = Canvas;
exports.default = _default;