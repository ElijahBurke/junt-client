import React from 'react';
import './LogIn.scss';

function LogIn() {
  return (
    <div className="LogIn__log-in">
      <div className="log-in__inner-container">
        <div className="inner-container__login">
          <div className="login__title">
            Log In To Save Your
          </div>
        </div>
        <div className="inner-container__seperator" />
        <div className="inner-container__signup">
          <div className="signup">
            Don't have an account?
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
