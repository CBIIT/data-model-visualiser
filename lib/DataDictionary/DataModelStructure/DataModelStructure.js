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

var _Dropdown = _interopRequireDefault(require("@gen3/ui-component/dist/components/Dropdown"));

var _helper = require("../NodeCategories/helper");

var _utils = require("../utils");

var _utils2 = require("../../utils");

require("./DataModelStructure.css");

var DataModelStructure = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DataModelStructure, _React$Component);

  var _super = (0, _createSuper2.default)(DataModelStructure);

  function DataModelStructure() {
    var _this;

    (0, _classCallCheck2.default)(this, DataModelStructure);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleClickGraphButton = function () {
      _this.props.onSetGraphView(true);

      _this.props.onResetGraphCanvas();
    };

    _this.handleClickOverlayPropertyButton = function () {
      _this.props.onSetGraphView(true);

      _this.props.onSetOverlayPropertyTableHidden(!_this.props.overlayPropertyHidden);
    };

    _this.downloadTemplatesEnabled = function () {
      if (_this.props.relatedNodeIDs.length > _this.props.excludedNodesForTemplates) return true;
      var intersectionNodeIDs = (0, _utils2.intersection)(_this.props.relatedNodeIDs, _this.props.excludedNodesForTemplates);
      return intersectionNodeIDs.length !== _this.props.relatedNodeIDs.length;
    };

    _this.handleDownloadAllTemplates = function (format) {
      var nodesToDownload = {};

      _this.props.relatedNodeIDs.filter(function (nid) {
        return !_this.props.excludedNodesForTemplates.includes(nid);
      }).forEach(function (nid) {
        nodesToDownload[nid] = "".concat(nid, "-template.").concat(format);
      }, []);

      var allRoutes = _this.props.allRoutes.map(function (nodeIDsInRoute) {
        return nodeIDsInRoute.filter(function (nid) {
          return !_this.props.excludedNodesForTemplates.includes(nid);
        });
      });

      _this.props.downloadMultiTemplate(format, nodesToDownload, allRoutes, _this.props.clickingNodeName, _this.props.dictionaryVersion);
    };

    return _this;
  }

  (0, _createClass2.default)(DataModelStructure, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.dataModelStructure) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-model-structure"
      }, /*#__PURE__*/_react.default.createElement("h4", {
        className: "data-model-structure__header"
      }, "Data Model Structure"), /*#__PURE__*/_react.default.createElement("div", {
        className: "data-model-structure__containter"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "data-model-structure__path-line"
      }), this.props.dataModelStructure.map(function (entry, i) {
        var nodeID = entry.nodeID,
            nodeIDsBefore = entry.nodeIDsBefore,
            linksBefore = entry.linksBefore,
            category = entry.category;
        var IconSVG = (0, _helper.getCategoryIconSVG)(category);
        var lastNodeModifier = i === _this2.props.dataModelStructure.length - 1 ? 'data-model-structure__node-name--last' : '';
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: nodeID
        }, nodeIDsBefore.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "data-model-structure__summary-between"
        }, nodeIDsBefore.length, " nodes with ", linksBefore.length, " links"), !_this2.props.isGraphView && /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: _this2.handleClickGraphButton,
          label: "See it on graph",
          className: "data-model-structure__graph-button",
          buttonType: "secondary"
        })), /*#__PURE__*/_react.default.createElement("div", {
          className: "data-model-structure__node"
        }, /*#__PURE__*/_react.default.createElement(IconSVG, {
          className: "data-model-structure__icon"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "data-model-structure__node-name ".concat(lastNodeModifier, " introduction")
        }, nodeID)));
      })), this.props.isGraphView && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: this.handleClickOverlayPropertyButton,
        label: this.props.overlayPropertyHidden ? 'Open properties' : 'Close properties',
        className: "data-model-structure__table-button",
        rightIcon: "list",
        buttonType: "primary"
      }), this.downloadTemplatesEnabled() && /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
        className: "data-model-structure__template-download-dropdown"
      }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Button, null, "Download templates"), /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, null, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
        rightIcon: "download",
        onClick: function onClick() {
          return _this2.handleDownloadAllTemplates('tsv');
        }
      }, "TSV"), /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
        rightIcon: "download",
        onClick: function onClick() {
          return _this2.handleDownloadAllTemplates('json');
        }
      }, "JSON")))));
    }
  }]);
  return DataModelStructure;
}(_react.default.Component);

DataModelStructure.defaultProps = {
  dataModelStructure: null,
  isGraphView: true,
  onSetGraphView: function onSetGraphView() {},
  onSetOverlayPropertyTableHidden: function onSetOverlayPropertyTableHidden() {},
  onResetGraphCanvas: function onResetGraphCanvas() {},
  overlayPropertyHidden: true,
  downloadMultiTemplate: _utils.downloadMultiTemplate,
  excludedNodesForTemplates: ['program', 'project'],
  relatedNodeIDs: [],
  allRoutes: [],
  clickingNodeName: '',
  dictionaryVersion: 'Unknown'
};
var _default = DataModelStructure;
exports.default = _default;