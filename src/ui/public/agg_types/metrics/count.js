define(function (require) {
  return function AggTypeMetricCountProvider(Private) {
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var fieldFormats = Private(require('ui/registry/field_formats'));
    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'count',
      title: 'Count',
      hasNoDsl: true,
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Count';
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('number');
      },
      getValue: function (agg, bucket) {
        return bucket.doc_count;
      },
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
