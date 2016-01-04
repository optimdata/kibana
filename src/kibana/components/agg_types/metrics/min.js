define(function (require) {
  return function AggTypeMetricMinProvider(Private) {
    var MetricAggType = Private(require('components/agg_types/metrics/_metric_agg_type'));

    var optionStringEditor = require('text!components/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'min',
      title: 'Min',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Min ' + aggConfig.params.field.displayName;
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
          filterFieldTypes: 'number,date'
        }
      ]
    });
  };
});