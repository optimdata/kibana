import _ from 'lodash';
import $ from 'jquery';
import uiModules from 'ui/modules';
import vislibTitleOptionsTemplate from 'plugins/kbn_vislib_vis_types/controls/vislib_title_options.html';
const module = uiModules.get('kibana');

module.directive('vislibTitleOptions', function ($parse, $compile) {
  return {
    restrict: 'E',
    template: vislibTitleOptionsTemplate,
    replace: true
  };
});
