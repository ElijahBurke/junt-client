/* eslint-disable eqeqeq */
import * as R from 'ramda';
import actionTypes from './actionTypes';
import initialState from './initialState';

const softEquals = R.curry((x, y) => x == y);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOWSIDENAV:
      return { ...state, showSideNav: action.payload.showSideNav };
    case actionTypes.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: {
          id: 0,
          name: false,
          email: false,
        },
      };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload.error.error };
    case actionTypes.SET_TESTS:
      return {
        ...state,
        tests: { ...state.tests, ...action.payload.tests },
      };
    case actionTypes.ADD_TEST:
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.test.id]: action.payload.test,
        },
      };
    case actionTypes.SET_APPLICATIONS:
      return {
        ...state,
        applications: { ...state.applications, ...action.payload.applications },
      };
    case actionTypes.ADD_APPLICATION:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.application.id]: action.payload.application,
        },
        tests: {
          ...state.tests,
          [action.payload.application.testId]: {
            ...state.tests[action.payload.application.testId],
            applicationIds:
            [
              ...state.tests[action.payload.application.testId].applicationIds,
              action.payload.application.id,
            ],
          },
        },
      };
    case actionTypes.UPDATE_TEST:
      console.log(action.payload.test.id);
      console.log(action.payload.test);
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.test.id]: {
            applicationIds: state.tests[action.payload.test.id].applicationIds,
            ...action.payload.test,
          },
        },
      };
    case actionTypes.UPDATE_APPLICATION:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.application.id]: action.payload.application,
        },
      };
    case actionTypes.DELETE_TEST:
      return {
        ...state,
        tests: R.filter(
          R.compose(
            R.complement(softEquals)(action.payload.testId),
            R.prop('id'),
          ),
          state.tests,
        ),
        applications: R.filter(
          R.compose(
            R.complement(softEquals)(action.payload.testId),
            R.prop('testId'),
          ),
          state.applications,
        ),
      };
    case actionTypes.DELETE_APPLICATION:
      return {
        ...state,
        applications: R.filter(
          R.compose(
            R.complement(softEquals)(action.payload.application.id),
            R.prop('id'),
          ),
          state.applications,
        ),
        tests: {
          ...state.tests,
          [action.payload.application.testId]: {
            ...state.tests[action.payload.application.testId],
            applicationIds: R.filter(
              R.complement(softEquals)(action.payload.application.id),
              state.tests[action.payload.application.testId].applicationIds,
            ),
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
