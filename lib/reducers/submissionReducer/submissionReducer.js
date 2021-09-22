"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getNodeTypes = exports.getFileNodes = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var getFileNodes = function getFileNodes(dictionary) {
  return Object.keys(dictionary).filter(function (node) {
    return dictionary[node].category === 'data_file';
  });
};

exports.getFileNodes = getFileNodes;

var getNodeTypes = function getNodeTypes(dictionary) {
  return Object.keys(dictionary).filter(function (node) {
    return node.charAt(0) !== '_';
  });
};

exports.getNodeTypes = getNodeTypes;

var excludeSystemProperties = function excludeSystemProperties(node) {
  var properties = node.properties && Object.keys(node.properties).filter(function (key) {
    return node.systemProperties ? !node.systemProperties.includes(key) : true;
  }).reduce(function (acc, key) {
    acc[key] = node.properties[key];
    return acc;
  }, {});
  return properties;
};

var getDictionaryWithExcludeSystemProperties = function getDictionaryWithExcludeSystemProperties(dictionary) {
  var ret = Object.keys(dictionary).map(function (nodeID) {
    var node = dictionary[nodeID];
    if (!node.properties) return node;
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, node), {}, {
      properties: excludeSystemProperties(node)
    });
  }).reduce(function (acc, node) {
    acc[node.id] = node;
    return acc;
  }, {});
  return ret;
};

var submissionReducer = function submissionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'REQUEST_UPLOAD':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        file: action.file,
        file_type: action.file_type
      });

    case 'UPDATE_FILE':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        file: action.file,
        file_type: action.file_type
      });

    case 'UPDATE_FORM_SCHEMA':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        formSchema: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state.formSchema), action.formSchema)
      });

    case 'RECEIVE_PROJECTS':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        projects: action.data.reduce(function (map, p) {
          var res = map;
          res[p.code] = p.project_id;
          return res;
        }, {}),
        projectAvail: action.data.reduce(function (map, p) {
          var res = map;
          res[p.project_id] = p.availability_type;
          return res;
        }, {})
      });

    case 'RECEIVE_NODE_TYPES':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        nodeTypes: action.data
      });

    case 'RECEIVE_DICTIONARY':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        dictionary: getDictionaryWithExcludeSystemProperties(action.data),
        nodeTypes: getNodeTypes(action.data),
        file_nodes: getFileNodes(action.data)
      });

    case 'RECEIVE_AUTHORIZATION_URL':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        oauth_url: action.url
      });

    case 'RECEIVE_SUBMISSION_LOGIN':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        login: state.result,
        error: state.error
      });

    case 'RECEIVE_SUBMISSION':
      {
        var prevCounts = 'submit_entity_counts' in state ? state.submit_entity_counts : {};
        var newCounts = (action.data.entities || []).map(function (ent) {
          return ent.type || 'unknown';
        }).reduce(function (db, type) {
          var res = db;
          res[type] = (res[type] || 0) + 1;
          return res;
        }, prevCounts);
        var data = state.submit_result ? state.submit_result.concat(action.data.entities || []) : action.data.entities;
        var status = state.submit_status ? Math.max(state.submit_status, action.submit_status) : action.submit_status;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          submit_entity_counts: newCounts,
          submit_result: data,
          submit_result_string: state.submit_result_string.concat(JSON.stringify(action.data, null, '    ')).concat('\n\n'),
          submit_status: status,
          submit_counter: state.submit_counter + 1,
          submit_total: action.total
        });
      }

    case 'SUBMIT_SEARCH_FORM':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        search_form: action.data
      });

    case 'RECEIVE_SEARCH_ENTITIES':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        search_result: action.data,
        search_status: action.search_status
      });

    case 'RECEIVE_COUNTS':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        counts_search: action.data,
        links_search: Object.entries(action.data).reduce(function (acc, entry) {
          acc[entry[0]] = entry[1].length;
          return acc;
        }, {})
      });

    case 'CLEAR_COUNTS':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        counts_search: null,
        links_search: null
      });

    case 'RECEIVE_UNMAPPED_FILES':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        unmappedFiles: action.data
      });

    case 'RECEIVE_UNMAPPED_FILE_STATISTICS':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        unmappedFileCount: action.data.count,
        unmappedFileSize: action.data.totalSize
      });

    case 'RECEIVE_FILES_TO_MAP':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        filesToMap: action.data
      });

    case 'RESET_SUBMISSION_STATUS':
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
        submit_entity_counts: [],
        submit_result: null,
        submit_result_string: '',
        submit_status: 0,
        submit_counter: 0,
        submit_total: 0
      });

    default:
      return state;
  }
};

var _default = submissionReducer;
exports.default = _default;