define(function (require) {
  return function AggTypeMetricAvgProvider(Private) {
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'avg',
      title: 'Average',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Average ' + aggConfig.params.field.displayName;
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
