const boolSet = _.flow(_.chunk(2), _.filter(_.last), _.map(_.head), _.flatten);
