define(function (require) {
  return function AggTypeMetricAvgProvider(Private) {
    var MetricAggType = Private(require('components/agg_types/metrics/_metric_agg_type'));

    var optionStringEditor = require('text!components/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'avg',
      title: 'Average',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Average ' + aggConfig.params.field.displayName;
      },
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number'
        }
      ],
      options : [
        {
          name: 'label',
          editor: optionStringEditor,
          default: ''
        }
      ]
    });
  };
});
