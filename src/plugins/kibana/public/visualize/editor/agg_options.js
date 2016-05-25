define(function (require) {
  var IndexedArray = require('ui/IndexedArray');

  require('ui/modules')
  .get('app/visualize')
  .directive('visEditorAggOptions', function ($compile, $parse, Private, Notifier, $filter) {
    var _ = require('lodash');
    var $ = require('jquery');
    var aggTypes = Private(require('ui/agg_types/index'));
    require('ui/filters/match_any');
    require('plugins/kibana/visualize/editor/agg_option');

    var notify = new Notifier({
      location: 'visAggGroup'
    });

    return {
      restrict: 'E',
      template: require('plugins/kibana/visualize/editor/agg_options.html'),
      scope: true,
      link: function ($scope, $el, attr) {
        $scope.$bind('agg', attr.agg);
        $scope.$bind('groupName', attr.groupName);

        $scope.aggTypeOptions = aggTypes.byType[$scope.groupName];

        // this will contain the controls for the schema (rows or columns?), which are unrelated to
        // controls for the agg, which is why they are first
        var $schemaEditor = $('<div>').addClass('schemaEditors').appendTo($el);

        if ($scope.agg.schema.editor) {
          $schemaEditor.append($scope.agg.schema.editor);
          $compile($schemaEditor)($scope.$new());
        }

        // options for the selected agg, these are rebuilt every time the agg in $aggSelect changes
        var $aggOptionEditors; //  container for agg type param editors
        var $aggOptionEditorsScope;
        $scope.$watch('agg.type', function updateAggOptionEditor(newType, oldType) {
          if ($aggOptionEditors) {
            $aggOptionEditors.remove();
            $aggOptionEditors = null;
          }

          // if there's an old scope, destroy it
          if ($aggOptionEditorsScope) {
            $aggOptionEditorsScope.$destroy();
            $aggOptionEditorsScope = null;
          }

          // create child scope, used in the editors
          $aggOptionEditorsScope = $scope.$new();

          var agg = $scope.agg;
          if (!agg) return;

          var type = $scope.agg.type;

          if (newType !== oldType) {
            // don't reset on initial load, the
            // saved options should persist
            agg.resetOptions();
          }

          if (!type) return;

          var aggOptionHTML = {
            basic: []
          };

          // build collection of agg options html
          type.options.forEach(function (option, i) {
            var aggOption;

            if ($aggOptionEditorsScope.indexedFields) {
              var hasIndexedFields = $aggOptionEditorsScope.indexedFields.length > 0;
              var isExtraOption = i > 0;
              if (!hasIndexedFields && isExtraOption) { // don't draw the rest of the options if their are no indexed fields.
                return;
              }
            }

            var type = 'basic';

            if (aggOption = getAggOptionHTML(option, i)) {
              aggOptionHTML[type].push(aggOption);
            }

          });

          // compile the optionEditors html elements
          var optionEditors = aggOptionHTML.basic;

          $aggOptionEditors = $(optionEditors).appendTo($el);
          $compile($aggOptionEditors)($aggOptionEditorsScope);
        });

        // build HTML editor given an aggOption and index
        function getAggOptionHTML(option, idx) {
          // don't show options without an editor
          if (!option.editor) {
            return;
          }

          var attrs = {
            'agg-option': 'agg.type.options[' + idx + ']'
          };

          return $('<vis-agg-option-editor>')
          .attr(attrs)
          .append(option.editor)
          .get(0);
        }
      }
    };
  });
});