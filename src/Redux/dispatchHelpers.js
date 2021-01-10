import actionCreators from './actionCreators';

const setShowSideNavTrue = () => actionCreators.setShowSideNav(true);
const setShowSideNavFalse = () => actionCreators.setShowSideNav(false);

const dispatchHelpers = {
  setShowSideNavTrue,
  setShowSideNavFalse,
};

export default dispatchHelpers;
