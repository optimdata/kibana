define(function (require) {
  return function AggTypeMetricMaxProvider(Private) {
    var _ = require('lodash');
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var getResponseAggConfigClass = Private(require('ui/agg_types/metrics/getResponseAggConfigClass'));
    var percentiles = Private(require('ui/agg_types/metrics/percentiles'));
    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'median',
      dslName: 'percentiles',
      title: 'Median',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Median ' + aggConfig.params.field.displayName;
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
        },
        {
          name: 'percents',
          default: [50]
        }
      ],
      getResponseAggs: percentiles.getResponseAggs,
      getValue: percentiles.getValue
    });
  };
});
