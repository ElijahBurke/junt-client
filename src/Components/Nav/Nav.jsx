import React from 'react';
import './Nav.scss';
import Button from '../Button/Button';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';
import GetScreenWidth from '../../Helpers/Hooks/GetScreenWidth';
import Hamburger from './Hamburger.svg';

function Nav() {
  const navigate = UseNavigate();
  const width = GetScreenWidth();
  return (
    <div className="Nav__nav">
      <div className="nav__nav-inner">
        <div className="nav-inner__logo">
          Junt
        </div>
        {width > 650
          ? (
            <div className="nav-inner__nav-buttons">
              <div className="nav-buttons__button">
                <Button text="Applications" borderless onClick={navigate('applications')} />
              </div>
              <div className="nav-buttons__button">
                <Button text="Dashboard" borderless onClick={navigate('dashboard')} />
              </div>
              <div className="nav-buttons__button">
                <Button text="Log In" onClick={navigate('login')} />
              </div>
            </div>
          )
          : (
            <img src={Hamburger} alt="hamburger menu icon" />
          )}
      </div>
    </div>
  );
}

export default Nav;
