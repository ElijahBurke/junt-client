import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOWSIDENAV:
      return { ...state, showSideNav: action.payload.showSideNav };
    case actionTypes.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload.error.error };
    case actionTypes.ADD_TEST:
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.test.id]: action.payload.test,
        },
      };
    case actionTypes.ADD_APPLICATION:
      console.log(action);
      console.log('hi');
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
    default:
      return state;
  }
};

export default reducer;
