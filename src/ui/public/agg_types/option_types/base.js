define(function (require) {
  return function BaseAggOptionFactory() {
    var _ = require('lodash');

    function BaseAggOption(config) {
      _.assign(this, config);
    }

    return BaseAggOption;
  };
});