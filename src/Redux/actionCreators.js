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

// const checkIfKeyAndIfNotAddArr = R.curry((obj, key) => {
//   if (!obj[key]) obj[key] = [];
//   return obj;
// });

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

const addApplication = (application) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.ADD_APPLICATION, 'application'),
  ),
)(application);

const updateApplication = (application) => (dispatch) => R.compose(
  dispatch,
  R.ifElse(
    checkIfError,
    createAction(actionTypes.SET_ERROR, 'error'),
    createAction(actionTypes.UPDATE_APPLICATION, 'application'),
  ),
)(application);

const actionCreators = {
  setShowSideNav,
  setUser,
  setError,
  addTest,
  addApplication,
  updateApplication,
};

export default actionCreators;
