define(function (require) {
  var _ = require('lodash');
  var $ = require('jquery');
  var module = require('modules').get('kibana');

  module.directive('vislibTitleOptions', function ($parse, $compile) {
    return {
      restrict: 'E',
      template: require('text!plugins/vis_types/controls/vislib_title_options.html'),
      replace: true
    };
  });
});
