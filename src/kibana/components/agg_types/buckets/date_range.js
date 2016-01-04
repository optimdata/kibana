define(function (require) {
  var moment = require('moment');
  var dateRange = require('utils/date_range');
  require('directives/validate_date_math');

  return function DateRangeAggDefinition(Private, config) {
    var BucketAggType = Private(require('components/agg_types/buckets/_bucket_agg_type'));
    var createFilter = Private(require('components/agg_types/buckets/create_filter/date_range'));
    var fieldFormats = Private(require('registry/field_formats'));

    var optionStringEditor = require('text!components/agg_types/controls/option_string.html');

    return new BucketAggType({
      name: 'date_range',
      title: 'Date Range',
      createFilter: createFilter,
      getKey: function (bucket, key, agg) {
        var formatter = agg.fieldOwnFormatter('text', fieldFormats.getDefaultInstance('date'));
        return dateRange.toString(bucket, formatter);
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('string');
      },
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || aggConfig.params.field.displayName + ' date ranges';
      },
      options: [
        {
          name: 'label',
          editor: optionStringEditor,
          default: ''
        }
      ],
      params: [{
        name: 'field',
        filterFieldTypes: 'date',
        default: function (agg) {
          return agg.vis.indexPattern.timeFieldName;
        }
      }, {
        name: 'ranges',
        default: [{
          from: 'now-1w/w',
          to: 'now'
        }],
        editor: require('text!components/agg_types/controls/date_ranges.html')
      }]
    });
  };
});