import * as R from 'ramda';

const ifTrueDoFn = R.curry((arg, pred, fn) => pred(arg) && fn());

const RHelpers = {
  ifTrueDoFn,
};

export default RHelpers;
