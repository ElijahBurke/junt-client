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

const actionCreators = {
  setShowSideNav,
  setUser,
  setError,
};

export default actionCreators;
