define(function (require) {
  return function AggTypeMetricCardinalityProvider(Private) {
    var MetricAggType = Private(require('ui/agg_types/metrics/MetricAggType'));
    var fieldFormats = Private(require('ui/registry/field_formats'));
    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new MetricAggType({
      name: 'cardinality',
      title: 'Unique Count',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Unique count of ' + aggConfig.params.field.displayName;
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('number');
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
          name: 'field'
        }
      ]
    });
  };
});
