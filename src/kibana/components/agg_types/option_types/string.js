define(function (require) {
  return function FieldAggOptionFactory(Private) {
    var _ = require('lodash');

    var editorHtml = require('text!components/agg_types/controls/string.html');
    var BaseAggOption = Private(require('components/agg_types/option_types/base'));

    _(ScriptAggOption).inherits(BaseAggOption);
    function ScriptAggOption(config) {
      ScriptAggOption.Super.call(this, config);
    }

    ScriptAggOption.prototype.editor = editorHtml;

    /**
     * Write the aggregation parameter.
     *
     * @param  {AggConfig} aggConfig - the entire configuration for this agg
     * @param  {object} output - the result of calling write on all of the aggregations
     *                         parameters.
     * @param  {object} output.options - the final object that will be included as the options
     *                               for the agg
     * @return {undefined}
     */
    ScriptAggOption.prototype.write = function (aggConfig, output) {
      if (aggConfig.options[this.name] && aggConfig.options[this.name].length)
        output.options[this.name] = aggConfig.options[this.name];
    };

    return ScriptAggOption;
  };
});