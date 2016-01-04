define(function (require) {
  return function AggOptionsFactory(Private) {
    require('filters/label');
    var _ = require('lodash');
    var IndexedArray = require('utils/indexed_array/index');

    var optionTypeMap = {
      string: Private(require('components/agg_types/option_types/string')),
      _default: Private(require('components/agg_types/option_types/base'))
    };

    /**
     * Wraps a list of {{#crossLink "AggOption"}}{{/crossLink}} objects; owned by an {{#crossLink "AggType"}}{{/crossLink}}
     *
     * used to create:
     *   - `FieldAggParam` – When the config has `name: "field"`
     *   - `*AggParam` – When the type matches something in the map above
     *   - `BaseAggParam` – All other params
     *
     * @class AggOptions
     * @constructor
     * @extends IndexedArray
     * @param {object[]} options - array of options that get new-ed up as AggOptions objects as descibed above
     */
    _(AggOptions).inherits(IndexedArray);
    function AggOptions(options) {
      AggOptions.Super.call(this, {
        index: ['name'],
        initialSet: options.map(function (config) {
          var type = config.name === 'field' ? config.name : config.type;
          var Class = optionTypeMap[type] || optionTypeMap._default;
          return new Class(config);
        })
      });
    }

    /**
     * Reads an aggConfigs
     *
     * @method write
     * @param  {AggConfig} aggConfig
     *         the AggConfig object who's type owns these aggOptions and contains the option values for our option defs
     * @param  {object} [locals]
     *         an array of locals that will be available to the write function (can be used to enhance
     *         the quality of things like date_histogram's "auto" interval)
     * @return {object} output
     *         output of the write calls, reduced into a single object. A `options: {}` property is exposed on the
     *         output object which is used to create the agg dsl for the search request. All other properties
     *         are dependent on the AggOptions#write methods which should be studied for each AggType.
     */
    AggOptions.prototype.write = function (aggConfig, locals) {
      var output = { options: {} };
      locals = locals || {};

      this.forEach(function (option) {
        if (option.write) {
          option.write(aggConfig, output, locals);
        } else {
          output.options[option.name] = aggConfig.options[option.name];
        }
      });

      return output;
    };

    return AggOptions;
  };
});