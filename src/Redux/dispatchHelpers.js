/* eslint-disable no-underscore-dangle */
import * as R from 'ramda';
import actionCreators from './actionCreators';

const handleUser = (dispatch) => R.compose(
  R.prop('tests'),
  R.tap(
    R.compose(
      dispatch,
      actionCreators.setUser,
      R.pick(['id', 'name', 'email']),
    ),
  ),
);

const parseApplicationsToAppIds = (tests) => R.compose(
  R.assoc('applicationIds', R.__, tests),
  R.map(R.prop('id')),
  R.prop('applications'),
)(tests);

const reduceToObject = (a, b) => R.assoc(R.prop('id', b), b, a);

const handleTest = (dispatch) => R.compose(
  R.flatten,
  R.map(R.prop('applications')),
  R.tap(
    R.compose(
      dispatch,
      actionCreators.setTests,
      R.reduce(reduceToObject, {}),
      R.map(R.pick(['id', 'name', 'desc', 'cover', 'createdAt', 'updatedAt', 'applicationIds'])),
      R.map(parseApplicationsToAppIds),
    ),
  ),
);

const handleApplication = (dispatch) => R.compose(
  dispatch,
  actionCreators.setApplications,
  R.reduce(reduceToObject, {}),
);

const handleLogin = (dispatch) => R.compose(
  handleApplication(dispatch),
  handleTest(dispatch),
  handleUser(dispatch),
);
// later we might have to fix this so it only updates user after tests and applications done

const dispatchHelpers = {
  handleLogin,
};

export default dispatchHelpers;
