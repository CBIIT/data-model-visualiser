"use strict";

var _interopRequireDefault = require("/Users/udosent2/Dev/data-viewer/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryColor = exports.getCategoryIconSVG = void 0;

var _icon_administrative = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_administrative.svg"));

var _icon_analysis = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_analysis.svg"));

var _icon_biospecimen = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_biospecimen.svg"));

var _icon_clinical = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_clinical.svg"));

var _icon_clinical_assessment = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_clinical_assessment.svg"));

var _icon_data_file = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_data_file.svg"));

var _icon_metadata = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_metadata.svg"));

var _icon_notation = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_notation.svg"));

var _icon_index_file = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_index_file.svg"));

var _icon_data_observations = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_data_observations.svg"));

var _icon_default = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_default.svg"));

var _icon_experimental_methods = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_experimental_methods.svg"));

var _icon_subject_characteristics = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_subject_characteristics.svg"));

var _icon_imaging = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_imaging.svg"));

var _icon_study_administration = _interopRequireDefault(require("-!react-svg-loader!./icons/icon_study_administration.svg"));

// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax
var nodeCategoryList = {
  clinical: {
    icon: _icon_clinical.default,
    color: '#05B8EE'
  },
  biospecimen: {
    icon: _icon_biospecimen.default,
    color: '#27AE60'
  },
  data_file: {
    icon: _icon_data_file.default,
    color: '#7EC500'
  },
  metadata_file: {
    icon: _icon_metadata.default,
    color: '#F4B940'
  },
  analysis: {
    icon: _icon_analysis.default,
    color: '#FF7ABC'
  },
  administrative: {
    icon: _icon_administrative.default,
    color: '#AD91FF'
  },
  notation: {
    icon: _icon_notation.default,
    color: '#E74C3C'
  },
  index_file: {
    icon: _icon_index_file.default,
    color: '#26D9B1'
  },
  clinical_assessment: {
    icon: _icon_clinical_assessment.default,
    color: '#3283C8'
  },
  medical_history: {
    icon: _icon_clinical.default,
    color: '#05B8EE'
  },
  data_observations: {
    icon: _icon_data_observations.default,
    color: '#FF8585'
  },
  experimental_methods: {
    icon: _icon_experimental_methods.default,
    color: '#E74C3C'
  },
  subject_characteristics: {
    icon: _icon_subject_characteristics.default,
    color: '#05B8EE'
  },
  imaging: {
    icon: _icon_imaging.default,
    color: '#7EC500'
  },
  study_administration: {
    icon: _icon_study_administration.default,
    color: '#733EA3'
  }
};
var defaultCategory = {
  icon: _icon_default.default,
  color: '#9B9B9B'
};

var getCategoryIconSVG = function getCategoryIconSVG(category) {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].icon;
  }

  return defaultCategory.icon;
};

exports.getCategoryIconSVG = getCategoryIconSVG;

var getCategoryColor = function getCategoryColor(category) {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};

exports.getCategoryColor = getCategoryColor;