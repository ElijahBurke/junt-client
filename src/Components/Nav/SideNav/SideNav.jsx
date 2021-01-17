/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import './SideNav.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import Button from '../../Button/Button';
import UseNavigate from '../../../Helpers/Hooks/UseNavigate';
import actionCreators from '../../../Redux/actionCreators';
import Rhelpers from '../../../Helpers/Ramda/Rhelpers';
import apiHelpers from '../../../Helpers/Api/apiService';

function SideNav() {
  const [showSideNav, user] = useSelector((state) => [state.showSideNav, state.user]);
  const [eventListenerFunc, setEventListenerFunc] = useState(null);

  const navigate = UseNavigate();
  const sideNavRef = useRef();
  const closeButtonRef = useRef();
  const dispatch = useDispatch();

  const setShowSideNavFalse = () => R.compose(dispatch, actionCreators.setShowSideNav)(false);

  const navigateAndSetShowSideNavFalse = (route) => R.compose(
    setShowSideNavFalse,
    navigate(route),
  );

  useEffect(() => {
    if (sideNavRef.current && closeButtonRef.current) {
      const checkPathIncludesCloseButton = R.includes(closeButtonRef.current);

      const checkPathDoesntIncludeSideNav = R.compose(R.not,
        R.includes(sideNavRef.current));

      const shouldCloseNav = (e) => R.or(
        checkPathIncludesCloseButton(e.path),
        checkPathDoesntIncludeSideNav(e.path),
      );

      const closeNavIfShouldCloseNav = Rhelpers.ifTrueDoFn(
        R.__, shouldCloseNav, setShowSideNavFalse,
      );

      setEventListenerFunc(() => closeNavIfShouldCloseNav);
    }
  }, [sideNavRef, closeButtonRef, showSideNav]);

  useEffect(() => {
    if (eventListenerFunc && showSideNav) {
      window.addEventListener('click', eventListenerFunc);
    }
    return () => window.removeEventListener('click', eventListenerFunc);
  }, [eventListenerFunc, showSideNav]);

  const logout = () => apiHelpers.logout()
    .then(R.compose(navigateAndSetShowSideNavFalse('login'), dispatch, actionCreators.logoutUser));

  return (
    <div className="SideNav__side-nav" ref={sideNavRef} style={{ opacity: `${showSideNav ? 1 : 0}`, transform: `translateX(${showSideNav ? 0 : '-300px'})` }}>
      <div className="side-nav__nav-buttons">
        <div className="nav-buttons__button">
          <Button text="Tests" borderless onClick={navigateAndSetShowSideNavFalse('tests')} />
        </div>
        <div className="nav-buttons__applications">
          <Button text="Applications" borderless onClick={navigateAndSetShowSideNavFalse('applications')} />
        </div>
        <div className="nav-buttons__button">
          <Button text="Dashboard" borderless onClick={navigateAndSetShowSideNavFalse('dashboard')} />
        </div>
        {!user.name
        && (
        <div className="nav-buttons__button">
          <Button text="Log In" borderless onClick={navigateAndSetShowSideNavFalse('login')} />
        </div>
        )}
        {user.name
        && (
        <div className="nav-buttons__button">
          <Button text="Log Out" borderless onClick={logout} />
        </div>
        )}
      </div>
      <button className="side-nav__close" type="button" ref={closeButtonRef}>
        X
      </button>
    </div>
  );
}

export default SideNav;
