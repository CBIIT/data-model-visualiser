"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _action = require("./action.js");

var _DataDictionary = _interopRequireDefault(require("./DataDictionary"));

var ReduxDataDictionary = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      isGraphView: state.ddgraph.isGraphView
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onSetGraphView: function onSetGraphView(isGraphView) {
        return dispatch((0, _action.setGraphView)(isGraphView));
      }
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DataDictionary.default);
}();

var _default = ReduxDataDictionary; // const ReduxDataDictionary = (props) => {
//   return(
//     <DataDictionary {...props} />
//   )
// }
// const mapStateToProps = state => ({
//   isGraphView: state.ddgraph.isGraphView,
// });
// const mapDispatchToProps = dispatch => ({
//   onSetGraphView: isGraphView => dispatch(setGraphView(isGraphView)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(ReduxDataDictionary);

exports.default = _default;