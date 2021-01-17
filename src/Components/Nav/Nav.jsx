import React from 'react';
import './Nav.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import Button from '../Button/Button';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';
import GetScreenWidth from '../../Helpers/Hooks/GetScreenWidth';
import Hamburger from './Hamburger.svg';
import actionCreators from '../../Redux/actionCreators';

function Nav() {
  const navigate = UseNavigate();
  const width = GetScreenWidth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const setShowSideNavTrue = () => R.compose(dispatch, actionCreators.setShowSideNav)(true);

  return (
    <nav className="Nav__nav">
      <div className="nav__nav-inner">
        <div className="nav-inner__logo">
          Junt
        </div>
        {width > 650
          ? (
            <div className="nav-inner__nav-buttons">
              <div className="nav-buttons__button">
                <Button text="Tests" borderless onClick={navigate('tests')} />
              </div>
              <div className="nav-buttons__button">
                <Button text="Applications" borderless onClick={navigate('applications')} />
              </div>
              <div className="nav-buttons__button">
                <Button text="Dashboard" borderless onClick={navigate('dashboard')} />
              </div>
              {!user.name
              && (
              <div className="nav-buttons__button">
                <Button text="Log In" onClick={navigate('login')} />
              </div>
              )}
            </div>
          )
          : (
            <button
              className="nav-inner__hamburger"
              type="button"
              onClick={setShowSideNavTrue}
            >
              <img
                src={Hamburger}
                alt="hamburger menu icon"
              />
            </button>
          )}
      </div>
    </nav>
  );
}

export default Nav;
