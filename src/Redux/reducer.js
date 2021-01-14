import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOWSIDENAV:
      return { ...state, showSideNav: action.payload.showSideNav };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload.user };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload.error.error };
    case actionTypes.ADD_TEST:
      return { ...state, tests: [...state.tests, action.payload.test] };
    case actionTypes.ADD_APPLICATION:
      console.log(action);
      return {
        ...state,
        application: {
          ...state.application,
          [action.payload.application.id]: action.payload.application,
        },
      };
    default:
      return state;
  }
};

export default reducer;
