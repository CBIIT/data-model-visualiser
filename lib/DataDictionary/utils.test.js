"use strict";

var _utils = require("./utils");

describe('the DataDictionaryNode', function () {
  it('knows how to extract type info from a node property', function () {
    expect((0, _utils.getType)({
      type: 'string'
    })).toBe('string');
    var enumProp = {
      enum: ['A', 'B', 'C']
    };
    expect((0, _utils.getType)(enumProp)).toEqual(['A', 'B', 'C']);
    var oneOf = (0, _utils.getType)({
      oneOf: [{
        enum: ['A', 'B', 'C']
      }, {
        oneOf: [{
          enum: ['D', 'E', 'F']
        }, {
          enum: ['G']
        }]
      }]
    });
    expect(oneOf).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    var anyOf = (0, _utils.getType)({
      anyOf: [{
        enum: ['A', 'B', 'C']
      }, {
        anyOf: [{
          enum: ['D', 'E', 'F']
        }, {
          enum: ['G']
        }]
      }]
    });
    expect(anyOf).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
  });
  it('knows how to break sentences', function () {
    var testStr = 'The quick brown fox jumps over the lazy dog';
    var breakResult = ['The quick', 'brown fox', 'jumps over', 'the lazy', 'dog'];
    expect((0, _utils.truncateLines)(testStr)).toEqual(breakResult);
    expect((0, _utils.truncateLines)('test')).toEqual(['test']);
    var longStr = 'testareallinglongstringwithoutspace';
    var longStrBreakResult = ['testareal-', 'linglongs-', 'tringwith-', 'outspace'];
    expect((0, _utils.truncateLines)(longStr)).toEqual(longStrBreakResult);
    var testStrWithALongWord = 'The quick brown fox jumps over a lazyyyyyyyyyy dog';
    var withALongWordResult = ['The quick', 'brown fox', 'jumps over', 'a lazyyyy-', 'yyyyyy dog'];
    expect((0, _utils.truncateLines)(testStrWithALongWord)).toEqual(withALongWordResult);
    expect((0, _utils.truncateLines)('Publication')).toEqual(['Publication']);
  });
  it('could download data dictionary template', function () {
    window.open = jest.fn();
    (0, _utils.downloadTemplate)('tsv', 'test-id');
    expect(window.open).toBeCalled();
  });
  it('knows how to get, add, and clear search history from localStorage', function () {
    var ls1 = (0, _utils.getSearchHistoryItems)();
    expect(ls1).toEqual(null);
    var item1 = {
      keywordStr: 'test keyword',
      matchedCount: 10
    };
    var item2 = {
      keywordStr: 'test keyword2',
      matchedCount: 11
    };
    var ls2 = (0, _utils.addSearchHistoryItems)(item1);
    expect(ls2).toEqual([item1]);
    var ls3 = (0, _utils.addSearchHistoryItems)(item2);
    expect(ls3).toEqual([item2, item1]);
    expect((0, _utils.clearSearchHistoryItems)()).toEqual([]);
  });
});