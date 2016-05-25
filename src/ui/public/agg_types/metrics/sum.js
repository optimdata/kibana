define(function (require) {
  return function AggTypeMetricSumProvider(Private) {
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'sum',
      title: 'Sum',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Sum of ' + aggConfig.params.field.displayName;
      },
      options : [
        {
          name: 'label',
          editor: optionStringEditor,
          default: ''
        }
      ],
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number'
        }
      ]
    });
  };
});
