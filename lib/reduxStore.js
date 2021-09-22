"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxPersist = require("redux-persist");

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _dictionary = _interopRequireDefault(require("./dictionary"));

var _reducers = _interopRequireDefault(require("./reducers"));

// import { mockStore, dev } from './localconf';
var store;
var storePromise;
/* eslint-disable no-underscore-dangle */

/**
 * Little lazy redux store singleton factory.
 * We want some Relayjs adapters to also update the Redux store,
 * so it's handy to be able to access the store outside of
 * the normal react-redux 'connect' mechanism.
 *
 * @return Promise<Store>
 */

var getReduxStore = function getReduxStore() {
  if (store) {
    // singleton
    return Promise.resolve(store);
  }

  if (storePromise) {
    // store setup is in process
    return storePromise;
  }

  storePromise = new Promise(function (resolve, reject) {
    try {
      if (false) {// let data = {};
        // if (mockStore) {
        //   data = { user: { username: 'test' }, submission: { dictionary: dict, nodeTypes: Object.keys(dict).slice(2) }, status: {} };
        // }
        // store = compose(
        //   applyMiddleware(thunk), // routerMiddleware(browserHistory)),
        //   autoRehydrate(),
        // )(createStore)(
        //   reducers,
        //   data,
        //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        // );
      } else {
        store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk.default), // routerMiddleware(browserHistory)),
        (0, _reduxPersist.autoRehydrate)())(_redux.createStore)(_reducers.default, {
          user: {},
          status: {}
        }, (0, _reduxPersist.autoRehydrate)());
      }

      (0, _reduxPersist.persistStore)(store, {
        whitelist: ['certificate']
      }, function () {
        resolve(store);
      });
    } catch (e) {
      reject(e);
    }
  });
  return storePromise;
};

var _default = getReduxStore;
exports.default = _default;