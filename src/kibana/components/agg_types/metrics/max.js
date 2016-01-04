define(function (require) {
  return function AggTypeMetricMaxProvider(Private) {
    var MetricAggType = Private(require('components/agg_types/metrics/_metric_agg_type'));

    var optionStringEditor = require('text!components/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'max',
      title: 'Max',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Max ' + aggConfig.params.field.displayName;
      },
      options : [
        {
          name: 'label',
          editor: optionStringEditor,
          default: ''
        },
        {
          name: 'title',
          editor: optionStringEditor,
          default: ''
        }
      ],
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number,date'
        }
      ]
    });
  };
});