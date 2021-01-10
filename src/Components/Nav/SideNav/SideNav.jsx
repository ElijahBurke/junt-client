import React, { useRef } from 'react';
import './SideNav.scss';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';
import Button from '../../Button/Button';
import UseNavigate from '../../../Helpers/Hooks/UseNavigate';
import actionCreators from '../../../Redux/actionCreators';
import HandleShowSideNav from '../../../Helpers/Hooks/HandleShowSideNav';

function SideNav() {
  const navigate = UseNavigate();
  const dispatch = useDispatch();
  const sideNavRef = useRef();
  const closeButtonRef = useRef();
  const setShowSideNavFalse = () => R.compose(dispatch, actionCreators.setShowSideNav)(false);
  const showSideNav = HandleShowSideNav(sideNavRef, closeButtonRef, setShowSideNavFalse);
  const navigateAndSetShowSideNavFalse = (route) => R.compose(
    setShowSideNavFalse,
    navigate(route),
  );
  return (
    <div className="SideNav__side-nav" ref={sideNavRef} style={{ opacity: `${showSideNav ? 1 : 0}`, transform: `translateX(${showSideNav ? 0 : '-300px'})` }}>
      <div className="side-nav__nav-buttons">
        <div className="nav-buttons__button">
          <Button text="Applications" borderless onClick={navigateAndSetShowSideNavFalse('applications')} />
        </div>
        <div className="nav-buttons__button">
          <Button text="Dashboard" borderless onClick={navigateAndSetShowSideNavFalse('dashboard')} />
        </div>
        <div className="nav-buttons__button">
          <Button text="Log In" borderless onClick={navigateAndSetShowSideNavFalse('login')} />
        </div>
      </div>
      <button className="side-nav__close" type="button" ref={closeButtonRef}>
        X
      </button>
    </div>
  );
}

export default SideNav;
