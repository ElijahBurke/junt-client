import actionTypes from './actionTypes';

const setShowSideNav = (showSideNav) => {
  const action = {
    type: actionTypes.SET_SHOWSIDENAV,
    payload: { showSideNav },
  };
  return (dispatch) => dispatch(action);
};

const actionCreators = {
  setShowSideNav,
};

export default actionCreators;
