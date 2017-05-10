import _ from 'lodash';
import AggTypesMetricsMetricAggTypeProvider from 'ui/agg_types/metrics/metric_agg_type';

export default function AggTypeMetricScriptedMetricProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);
  const fieldFormats = Private(require('ui/registry/field_formats'));
  const stringEditor = require('ui/agg_types/controls/string.html');

  return new MetricAggType({
    name: 'scripted_metric',
    title: 'Scripted Metric',
    makeLabel: function () {
      return 'Scripted Metric';
    },
    getFormat: function () {
      return fieldFormats.getDefaultInstance('number') || fieldFormats.getDefaultInstance('percent');
    },
    supportsOrderBy: false,
    params: [
      {
        name: 'init_script',
        editor: stringEditor,
        default: ''
      }, {
        name: 'map_script',
        editor: stringEditor,
        default: ''
      }, {
        name: 'combine_script',
        editor: stringEditor,
        default: ''
      }, {
        name: 'reduce_script',
        editor: stringEditor,
        default: ''
      }
    ]
  });
}
