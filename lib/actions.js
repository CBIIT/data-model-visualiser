"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchVersionInfo = exports.fetchDictionary = exports.fetchSchema = exports.fetchProjects = exports.fetchOAuthURL = exports.fetchUserNoRefresh = exports.fetchIsUserLoggedInNoRefresh = exports.logoutAPI = exports.refreshUser = exports.fetchUser = exports.handleResponse = exports.fetchWrapper = exports.fetchWithCredsAndTimeout = exports.fetchWithCreds = exports.fetchCreds = exports.connectionError = exports.updatePopup = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

require("isomorphic-fetch");

var apiPath = "FIXME-apiPath";
var userapiPath = "FIXME-userapiPath";
var headers = "FIXME-headers";
var hostname = "FIXME-hostname";
var submissionApiOauthPath = "FIXME-submissionApiOauthPath";
var submissionApiPath = "FIXME-submissionApiPath";
var graphqlSchemaUrl = "FIXME-graphqlSchemaUrl";

var updatePopup = function updatePopup(state) {
  return {
    type: 'UPDATE_POPUP',
    data: state
  };
};

exports.updatePopup = updatePopup;

var connectionError = function connectionError() {
  console.log('connection error');
  return {
    type: 'REQUEST_ERROR',
    error: 'connection_error'
  };
};

exports.connectionError = connectionError;
var fetchCache = {};

var getJsonOrText = function getJsonOrText(path, response, useCache) {
  var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
  return response.text().then(function (textData) {
    var data = textData;

    if (data) {
      try {
        data = JSON.parse(data);

        if (useCache && method === 'GET' && response.status === 200) {
          fetchCache[path] = textData;
        }
      } catch (e) {// # do nothing
      }
    }

    return {
      response: response,
      data: data,
      status: response.status,
      headers: response.headers
    };
  });
};

var pendingRequest = null;

var fetchCreds = function fetchCreds(opts) {
  if (pendingRequest) {
    return pendingRequest;
  }

  var _opts$path = opts.path,
      path = _opts$path === void 0 ? "".concat(userapiPath, "user/") : _opts$path,
      _opts$method = opts.method,
      method = _opts$method === void 0 ? 'GET' : _opts$method,
      dispatch = opts.dispatch;
  var request = {
    credentials: 'include',
    headers: (0, _objectSpread2.default)({}, headers),
    method: method
  };
  pendingRequest = fetch(path, request).then(function (response) {
    pendingRequest = null;
    return Promise.resolve(getJsonOrText(path, response, false));
  }, function (error) {
    pendingRequest = null;

    if (dispatch) {
      dispatch(connectionError());
    }

    return Promise.reject(error);
  });
  return pendingRequest;
};
/**
 * Little helper issues fetch, then resolves response
 * as text, and tries to JSON.parse the text before resolving, but
 * ignores JSON.parse failure and reponse.status, and returns {response, data} either way.
 * If dispatch is supplied, then dispatch(connectionError()) on fetch reject.
 * If useCache is supplied and method is GET,
 * then text for 200 JSON responses are cached, and re-used, and
 * the result promise only includes {data, status} - where JSON data is re-parsed
 * every time to avoid mutation by the client
 *
 * @method fetchWithCreds
 * @param {path,method=GET,body=null,customHeaders?, dispatch?, useCache?} opts
 * @return Promise<{response,data,status,headers}> or Promise<{data,status}> if useCache specified
 */


exports.fetchCreds = fetchCreds;

var fetchWithCreds = function fetchWithCreds(opts) {
  var path = opts.path,
      _opts$method2 = opts.method,
      method = _opts$method2 === void 0 ? 'GET' : _opts$method2,
      _opts$body = opts.body,
      body = _opts$body === void 0 ? null : _opts$body,
      customHeaders = opts.customHeaders,
      dispatch = opts.dispatch,
      useCache = opts.useCache;

  if (useCache && method === 'GET' && fetchCache[path]) {
    return Promise.resolve({
      status: 200,
      data: JSON.parse(fetchCache[path])
    });
  }

  var request = {
    credentials: 'include',
    headers: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, headers), customHeaders),
    method: method,
    body: body
  };
  return fetch(path, request).then(function (response) {
    if (response.status !== 403 && response.status !== 401) {
      return Promise.resolve(getJsonOrText(path, response, useCache, method));
    }

    return Promise.resolve(fetchCreds({
      dispatch: dispatch
    }).then(function (resp) {
      switch (resp.status) {
        case 200:
          return Promise.resolve(fetch(path, request).then(function (res) {
            return getJsonOrText(path, res, useCache, method);
          }));

        default:
          return {
            response: resp,
            data: {
              data: {}
            },
            status: resp.status,
            headers: resp.headers
          };
      }
    }));
  }, function (error) {
    if (dispatch) {
      dispatch(connectionError());
    }

    return Promise.reject(error);
  });
};

exports.fetchWithCreds = fetchWithCreds;

var fetchWithCredsAndTimeout = function fetchWithCredsAndTimeout(opts, timeoutInMS) {
  var didTimeOut = false;
  return new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      didTimeOut = true;
      reject(new Error('Request timed out'));
    }, timeoutInMS);
    fetchWithCreds(opts).then(function (response) {
      // Clear the timeout as cleanup
      clearTimeout(timeout);

      if (!didTimeOut) {
        resolve(response);
      }
    }).catch(function (err) {
      // Rejection already happened with setTimeout
      if (didTimeOut) return; // Reject with error

      reject(err);
    });
  });
};
/**
 * Redux 'thunk' wrapper around fetchWithCreds
 * invokes dispatch(handler( { status, data, headers} ) and callback()
 * and propagates {response,data, status, headers} on resolved fetch,
 * otherwise dipatch(connectionError()) on fetch rejection.
 * May prefer this over straight call to fetchWithCreds in Redux context due to
 * conectionError() dispatch on fetch rejection.
 *
 * @param { path, method=GET, body=null, customerHeaders, handler, callback } opts
 * @return Promise
 */


exports.fetchWithCredsAndTimeout = fetchWithCredsAndTimeout;

var fetchWrapper = function fetchWrapper(_ref) {
  var path = _ref.path,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      _ref$body = _ref.body,
      body = _ref$body === void 0 ? null : _ref$body,
      customHeaders = _ref.customHeaders,
      handler = _ref.handler,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function () {
    return null;
  } : _ref$callback;
  return function (dispatch) {
    return fetchWithCreds({
      path: path,
      method: method,
      body: body,
      customHeaders: customHeaders,
      dispatch: dispatch
    }).then(function (_ref2) {
      var response = _ref2.response,
          data = _ref2.data;
      var result = {
        response: response,
        data: data,
        status: response.status,
        headers: response.headers
      };
      var dispatchPromise = handler ? Promise.resolve(dispatch(handler(result))) : Promise.resolve('ok');
      return dispatchPromise.then(function () {
        callback();
        return result;
      });
    });
  };
};

exports.fetchWrapper = fetchWrapper;

var handleResponse = function handleResponse(type) {
  return function (_ref3) {
    var data = _ref3.data,
        status = _ref3.status;

    switch (status) {
      case 200:
        return {
          type: type,
          data: data
        };

      default:
        return {
          type: 'FETCH_ERROR',
          error: data
        };
    }
  };
};

exports.handleResponse = handleResponse;

var handleFetchUser = function handleFetchUser(_ref4) {
  var status = _ref4.status,
      data = _ref4.data;

  switch (status) {
    case 200:
      return {
        type: 'RECEIVE_USER',
        user: data
      };

    case 401:
      return {
        type: 'UPDATE_POPUP',
        data: {
          authPopup: true
        }
      };

    default:
      return {
        type: 'FETCH_ERROR',
        error: data.error
      };
  }
};

var fetchUser = function fetchUser(dispatch) {
  return fetchCreds({
    dispatch: dispatch
  }).then(function (status, data) {
    return handleFetchUser(status, data);
  }).then(function (msg) {
    return dispatch(msg);
  });
};

exports.fetchUser = fetchUser;

var refreshUser = function refreshUser() {
  return fetchUser;
};

exports.refreshUser = refreshUser;

var logoutAPI = function logoutAPI() {
  return function (dispatch) {
    fetchWithCreds({
      path: "".concat(submissionApiOauthPath, "logout"),
      dispatch: dispatch
    }).then(handleResponse('RECEIVE_API_LOGOUT')).then(function (msg) {
      return dispatch(msg);
    }).then(function () {
      return document.location.replace("".concat(userapiPath, "/logout?next=").concat(hostname));
    });
  };
};

exports.logoutAPI = logoutAPI;

var fetchIsUserLoggedInNoRefresh = function fetchIsUserLoggedInNoRefresh(opts) {
  var _opts$path2 = opts.path,
      path = _opts$path2 === void 0 ? "".concat(submissionApiPath) : _opts$path2,
      _opts$method3 = opts.method,
      method = _opts$method3 === void 0 ? 'GET' : _opts$method3,
      dispatch = opts.dispatch;
  var request = {
    credentials: 'include',
    headers: (0, _objectSpread2.default)({}, headers),
    method: method
  };
  var requestPromise = fetch(path, request).then(function (response) {
    requestPromise = null;
    return Promise.resolve(getJsonOrText(path, response, false));
  }, function (error) {
    requestPromise = null;

    if (dispatch) {
      dispatch(connectionError());
    }

    return Promise.reject(error);
  });
  return requestPromise;
};

exports.fetchIsUserLoggedInNoRefresh = fetchIsUserLoggedInNoRefresh;

var fetchUserNoRefresh = function fetchUserNoRefresh(dispatch) {
  return fetchIsUserLoggedInNoRefresh({
    dispatch: dispatch
  }).then(function (status, data) {
    return handleFetchUser(status, data);
  }).then(function (msg) {
    return dispatch(msg);
  });
};
/**
 * Retrieve the oath endpoint for the service under the given oathPath
 *
 * @param {String} oauthPath
 * @return {(dispatch) => Promise<string>} dispatch function
 */


exports.fetchUserNoRefresh = fetchUserNoRefresh;

var fetchOAuthURL = function fetchOAuthURL(oauthPath) {
  return function (dispatch) {
    return fetchWithCreds({
      path: "".concat(oauthPath, "authorization_url"),
      dispatch: dispatch,
      useCache: true
    }).then(function (_ref5) {
      var status = _ref5.status,
          data = _ref5.data;

      switch (status) {
        case 200:
          return {
            type: 'RECEIVE_AUTHORIZATION_URL',
            url: data
          };

        default:
          return {
            type: 'FETCH_ERROR',
            error: data.error
          };
      }
    }).then(function (msg) {
      dispatch(msg);

      if (msg.url) {
        return msg.url;
      }

      throw new Error('OAuth authorization failed');
    });
  };
};
/*
 * redux-thunk support asynchronous redux actions via 'thunks' -
 * lambdas that accept dispatch and getState functions as arguments
 */


exports.fetchOAuthURL = fetchOAuthURL;

var fetchProjects = function fetchProjects() {
  return function (dispatch) {
    return fetchWithCreds({
      path: "".concat(submissionApiPath, "graphql"),
      body: JSON.stringify({
        query: 'query { project(first:0) {code, project_id, availability_type}}'
      }),
      method: 'POST'
    }).then(function (_ref6) {
      var status = _ref6.status,
          data = _ref6.data;

      switch (status) {
        case 200:
          return {
            type: 'RECEIVE_PROJECTS',
            data: data.data.project,
            status: status
          };

        default:
          return {
            type: 'FETCH_ERROR',
            error: data,
            status: status
          };
      }
    }).then(function (msg) {
      return dispatch(msg);
    });
  };
};
/**
 * Fetch the schema for graphi, and stuff it into redux -
 * handled by router
 */


exports.fetchProjects = fetchProjects;

var fetchSchema = function fetchSchema(dispatch) {
  return fetchWithCreds({
    path: graphqlSchemaUrl,
    dispatch: dispatch
  }).then(function (_ref7) {
    var status = _ref7.status,
        data = _ref7.data;

    switch (status) {
      case 200:
        return dispatch({
          type: 'RECEIVE_SCHEMA_LOGIN',
          schema: data
        });

      default:
        return Promise.resolve('NOOP');
    }
  });
};

exports.fetchSchema = fetchSchema;

var fetchDictionary = function fetchDictionary(dispatch) {
  return fetchWithCreds({
    path: "".concat(submissionApiPath, "_dictionary/_all"),
    method: 'GET',
    useCache: true
  }).then(function (_ref8) {
    var status = _ref8.status,
        data = _ref8.data;

    switch (status) {
      case 200:
        return {
          type: 'RECEIVE_DICTIONARY',
          data: data
        };

      default:
        return {
          type: 'FETCH_ERROR',
          error: data
        };
    }
  }).then(function (msg) {
    return dispatch(msg);
  });
};

exports.fetchDictionary = fetchDictionary;

var fetchVersionInfo = function fetchVersionInfo(dispatch) {
  return fetchWithCreds({
    path: "".concat(apiPath, "_version"),
    method: 'GET',
    useCache: true
  }).then(function (_ref9) {
    var status = _ref9.status,
        data = _ref9.data;

    switch (status) {
      case 200:
        return {
          type: 'RECEIVE_VERSION_INFO',
          data: data
        };

      default:
        return {
          type: 'FETCH_ERROR',
          error: data
        };
    }
  }).then(function (msg) {
    return dispatch(msg);
  });
};

exports.fetchVersionInfo = fetchVersionInfo;