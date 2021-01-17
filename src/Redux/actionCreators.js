import * as R from 'ramda';
import actionTypes from './actionTypes';

const checkIfError = R.has('error');

const createAction = R.curry((type, payloadName, load) => ({
  type,
  payload: { [payloadName]: load },
}));

const setShowSideNav = (showSideNav) => (dispatch) => R.compose(
  dispatch,
  createAction(actionTypes.SET_SHOWSIDENAV, 'showSideNav'),
)(showSideNav);

const setError = (error) => (dispatch) => R.compose(
  dispatch,
  createAction(actionTypes.SET_ERROR, 'error'),
)(error);

const setUser = (user) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.SET_USER, 'user'),
  ),
)(user);

const logoutUser = (user) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.LOGOUT_USER, 'user'),
  ),
)(user);

const checkIfKeyAndIfNotAddArr = (key) => R.when(
  R.complement(R.has)(key),
  R.assoc(key, []),
);

const addTest = (test) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.ADD_TEST, 'test'),
  ),
  checkIfKeyAndIfNotAddArr('applicationIds'),
)(test);

const setTests = (tests) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.SET_TESTS, 'tests'),
  ),
)(tests);

const updateTest = (test) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.UPDATE_TEST, 'test'),
  ),
)(test);

const deleteTest = (testId) => (dispatch) => R.compose(
  dispatch,
  createAction(actionTypes.DELETE_TEST, 'testId'),
)(testId);

const addApplication = (application) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.ADD_APPLICATION, 'application'),
  ),
)(application);

const setApplications = (applications) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.SET_APPLICATIONS, 'applications'),
  ),
)(applications);

const updateApplication = (application) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.UPDATE_APPLICATION, 'application'),
  ),
)(application);

const deleteApplication = (application) => (dispatch) => R.compose(
  dispatch,
  createAction(actionTypes.DELETE_APPLICATION, 'application'),
)(application);

const actionCreators = {
  setShowSideNav,
  setUser,
  logoutUser,
  setError,
  addTest,
  updateTest,
  deleteTest,
  addApplication,
  updateApplication,
  setTests,
  setApplications,
  deleteApplication,
};

export default actionCreators;
