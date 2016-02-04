define(function (require) {
  return function SignificantTermsAggDefinition(Private) {
    var _ = require('lodash');
    var BucketAggType = Private(require('ui/agg_types/buckets/_bucket_agg_type'));
    var createFilter = Private(require('ui/agg_types/buckets/create_filter/terms'));

    var optionStringEditor = require('ui/agg_types/controls/option_string.html');

    return new BucketAggType({
      name: 'significant_terms',
      title: 'Significant Terms',
      makeLabel: function (aggConfig) {
        return aggConfig.options.label || 'Top ' + aggConfig.params.size + ' unusual terms in ' + aggConfig.params.field.displayName;
      },
      createFilter: createFilter,
      options: [
        {
          name: 'label',
          editor: optionStringEditor,
          default: ''
        }
      ],
      params: [
        {
          name: 'field',
          filterFieldTypes: 'string'
        },
        {
          name: 'size',
          editor: require('ui/agg_types/controls/order_and_size.html'),
        },
        {
          name: 'exclude',
          type: 'regex',
          advanced: true
        },
        {
          name: 'include',
          type: 'regex',
          advanced: true
        }
      ]
    });
  };
});
