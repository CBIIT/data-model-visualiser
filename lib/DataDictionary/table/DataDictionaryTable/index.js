"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("../../action");

var _DataDictionaryTable = _interopRequireDefault(require("./DataDictionaryTable"));

var ReduxDataDictionaryTable = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      highlightingNodeID: state.ddgraph.tableExpandNodeID,
      dictionaryName: "Dictionary Utils Viz"
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onExpandNode: function onExpandNode(nodeID) {
        return dispatch((0, _action.setExpandNode)(nodeID));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DataDictionaryTable.default);
}();

var _default = ReduxDataDictionaryTable;
exports.default = _default;