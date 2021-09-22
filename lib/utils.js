"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncSetInterval = asyncSetInterval;
exports.legendCreator = legendCreator;
exports.addArrows = addArrows;
exports.addLinks = addLinks;
exports.calculatePosition = calculatePosition;
exports.sortCompare = sortCompare;
exports.computeLastPageSizes = computeLastPageSizes;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.intersection = intersection;
exports.minus = minus;
exports.isFooterHidden = exports.isPageFullScreen = exports.parseParamWidth = exports.getCategoryColor = exports.predictFileType = exports.jsonToString = exports.getSubmitPath = exports.humanFileSize = void 0;

var _regenerator = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var d3 = _interopRequireWildcard(require("d3-scale"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import { submissionApiPath } from './localconf';
var submissionApiPath = "FIXME-submissionApiPath";

var humanFileSize = function humanFileSize(size) {
  if (typeof size !== 'number') {
    return '';
  }

  var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  var sizeStr = (size / Math.pow(1024, i)).toFixed(2) * 1;
  var suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return "".concat(sizeStr, " ").concat(suffix);
};

exports.humanFileSize = humanFileSize;

var getSubmitPath = function getSubmitPath(project) {
  var path = project.split('-');
  var programName = path[0];
  var projectCode = path.slice(1).join('-');
  return "".concat(submissionApiPath, "/").concat(programName, "/").concat(projectCode);
};

exports.getSubmitPath = getSubmitPath;

var jsonToString = function jsonToString(data) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var replacer = function replacer(key, value) {
    if (value === null) {
      return undefined;
    }

    if (schema[key] === 'number') {
      var castedValue = Number(value);

      if (isNaN(castedValue)) {
        return value;
      }

      return castedValue;
    }

    return value;
  };

  return JSON.stringify(data, replacer, '  ');
};

exports.jsonToString = jsonToString;

var predictFileType = function predictFileType(dirtyData, fileType) {
  var predictType = fileType;
  var jsonType = 'application/json';
  var tsvType = 'text/tab-separated-values';
  var data = dirtyData.trim();

  if (data.indexOf('{') !== -1 || data.indexOf('}') !== -1) {
    return jsonType;
  }

  if (data.indexOf('\t') !== -1) {
    return tsvType;
  }

  return predictType;
};
/**
 * Little wrapper around setinterval with a guard to prevent an async function
 * from being invoked multiple times.
 *
 * @param {()=>Promise} lambda callback should return a Promise
 * @param {int} timeoutMs passed through to setinterval
 * @return the setinterval id (can be passed to clearinterval)
 */


exports.predictFileType = predictFileType;

function asyncSetInterval(_x, _x2) {
  return _asyncSetInterval.apply(this, arguments);
}

function _asyncSetInterval() {
  _asyncSetInterval = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(lambda, timeoutMs) {
    var isRunningGuard;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isRunningGuard = false;
            return _context.abrupt("return", setInterval(function () {
              if (!isRunningGuard) {
                isRunningGuard = true;
                lambda().then(function () {
                  isRunningGuard = false;
                });
              }
            }, timeoutMs));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _asyncSetInterval.apply(this, arguments);
}

var getCategoryColor = function getCategoryColor(category) {
  var colorMap = {
    clinical: '#05B8EE',
    biospecimen: '#27AE60',
    data_file: '#7EC500',
    metadata_file: '#F4B940',
    analysis: '#FF7ABC',
    administrative: '#AD91FF',
    notation: '#E74C3C',
    index_file: '#26D9B1',
    clinical_assessment: '#3283C8',
    medical_history: '#05B8EE',
    satellite: d3.schemeCategory20[11],
    radar: d3.schemeCategory20[16],
    stream_gauge: d3.schemeCategory20[19],
    weather_station: d3.schemeCategory20[10],
    data_observations: d3.schemeCategory20[3],
    experimental_methods: d3.schemeCategory20[4],
    Imaging: d3.schemeCategory20[5],
    study_administration: d3.schemeCategory20[6],
    subject_characteristics: d3.schemeCategory20[7]
  };
  var defaultColor = '#9B9B9B';
  return colorMap[category] ? colorMap[category] : defaultColor;
};

exports.getCategoryColor = getCategoryColor;

function legendCreator(legendGroup, nodes, legendWidth) {
  // Find all unique categories
  var uniqueCategoriesList = nodes.reduce(function (acc, elem) {
    if (acc.indexOf(elem.category) === -1) {
      acc.push(elem.category);
    }

    return acc;
  }, []);
  uniqueCategoriesList.sort(function (aIn, bIn) {
    var a = aIn.toLowerCase();
    var b = bIn.toLowerCase();

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }

    return 0;
  });
  var legendFontSize = '0.9em'; // Make Legend

  legendGroup.selectAll('text').data(uniqueCategoriesList).enter().append('text').attr('x', legendWidth / 2).attr('y', function (d, i) {
    return "".concat(1.5 * (2.5 + i), "em");
  }).attr('text-anchor', 'middle').attr('fill', function (d) {
    return getCategoryColor(d);
  }).style('font-size', legendFontSize).text(function (d) {
    return d;
  });
  legendGroup.append('text').attr('x', legendWidth / 2).attr('y', "".concat(2, "em")).attr('text-anchor', 'middle').text('Categories').style('font-size', legendFontSize).style('text-decoration', 'underline');
}

function addArrows(graphSvg) {
  graphSvg.append('svg:defs').append('svg:marker').attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10').attr('fill', 'darkgray').attr('refX', 0).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('svg:path').attr('d', 'M0,-5L10,0L0,5');
}

function addLinks(graphSvg, edges) {
  return graphSvg.append('g').selectAll('path').data(edges).enter().append('path').attr('stroke-width', 2).attr('marker-mid', 'url(#end-arrow)').attr('stroke', 'darkgray').attr('fill', 'none');
}
/**
 * Compute SVG coordinates fx, fy for each node in nodes.
 * Decorate each node with .fx and .fy property as side effect.
 *
 * @param {Array<Node>} nodes each decorated with a position [width,height] in [0,1]
 * @param {*} graphWidth
 * @param {*} graphHeight
 */


function calculatePosition(nodes, graphWidth, graphHeight) {
  // Calculate the appropriate position of each node on the graph
  var fyVals = [];
  var retNodes = nodes;

  for (var i = 0; i < nodes.length; i += 1) {
    retNodes[i].fx = retNodes[i].position[0] * graphWidth;
    retNodes[i].fy = retNodes[i].position[1] * graphHeight;

    if (fyVals.indexOf(retNodes[i].fy) === -1) {
      fyVals.push(retNodes[i].fy);
    }
  }

  return {
    retNodes: retNodes,
    fyValsLength: fyVals.length
  };
}
/**
 * Type agnostic compare thunk for Array.sort
 * @param {*} a
 * @param {*} b
 */


function sortCompare(a, b) {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

function computeLastPageSizes(filesMap, pageSize) {
  return Object.keys(filesMap).reduce(function (d, key) {
    var result = d;
    result[key] = filesMap[key].length % pageSize;
    return result;
  }, {});
}

function capitalizeFirstLetter(str) {
  var res = str.replace(/_/gi, ' ');
  return res.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
/**
 * Avoid importing underscore just for this ... export for testing
 * @method intersection
 * @param aList {Array<String>}
 * @param bList {Array<String>}
 * @return list of intersecting elements
 */


function intersection(aList, bList) {
  var key2Count = aList.concat(bList).reduce(function (db, it) {
    var res = db;

    if (res[it]) {
      res[it] += 1;
    } else {
      res[it] = 1;
    }

    return res;
  }, {});
  return Object.entries(key2Count).filter(function (kv) {
    return kv[1] > 1;
  }).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        k = _ref2[0];

    return k;
  });
}

function minus(aList, bList) {
  var key2Count = aList.concat(bList).concat(aList).reduce(function (db, it) {
    var res = db;

    if (res[it]) {
      res[it] += 1;
    } else {
      res[it] = 1;
    }

    return res;
  }, {});
  return Object.entries(key2Count).filter(function (kv) {
    return kv[1] === 2;
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
        k = _ref4[0];

    return k;
  });
}

var parseParamWidth = function parseParamWidth(width) {
  return typeof width === 'number' ? "".concat(width, "px") : width;
};

exports.parseParamWidth = parseParamWidth;

var isPageFullScreen = function isPageFullScreen(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/') || pathname.toLowerCase() === '/cohort-tools' || pathname.toLowerCase().startsWith('/cohort-tools/')));
};

exports.isPageFullScreen = isPageFullScreen;

var isFooterHidden = function isFooterHidden(pathname) {
  return !!(pathname && (pathname.toLowerCase() === '/dd' || pathname.toLowerCase().startsWith('/dd/')));
};

exports.isFooterHidden = isFooterHidden;