define(function (require) {
  var _ = require('lodash');

  require('modules')
  .get('app/visualize')
  .directive('visAggOptionEditor', function (config, $parse, Private) {
    return {
      restrict: 'E',
      scope: true,
      template: function ($el) {
        return $el.html();
      },
      link: {
        pre: function ($scope, $el, attr) {
          $scope.$bind('aggOption', attr.aggOption);
        },
        post: function ($scope, $el, attr) {
          $scope.config = config;

          $scope.optionEnabled = function (option) {
            if (option && _.isFunction(option.enabled)) {
              return option.enabled($scope.agg);
            }

            return true;
          };
        }
      }
    };
  });
});