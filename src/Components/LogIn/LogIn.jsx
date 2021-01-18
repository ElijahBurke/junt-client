/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import './LogIn.scss';
import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import GetScreenWidth from '../../Helpers/Hooks/GetScreenWidth';
import LogInImg from './LogInImg.svg';
import apiHelpers from '../../Helpers/Api/apiService';
import actionCreators from '../../Redux/actionCreators';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';
import UserLoggedInInfo from './UserLoggedInInfo/UserLoggedInInfo';
import dispatchHelpers from '../../Redux/dispatchHelpers';
import FullPageModal from '../FullPageModal/FullPageModal';

const UserLoggedInModal = FullPageModal(UserLoggedInInfo);

function LogIn() {
  const defaultState = {
    name: '',
    email: '',
    password: '',
    confirm: '',
  };

  const loggingInStyles = {
    pointerEvents: 'none',
    transform: 'translateX(-30px)',
    opacity: 0,
  };

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [formState, setFormState] = useState(defaultState);
  const [user, error] = useSelector((state) => [state.user, state.error]);
  const width = GetScreenWidth();
  const confirmFieldRef = useRef();
  const dispatch = useDispatch();
  const navigate = UseNavigate();

  const checkPropsEq = R.curry((prop, value, o) => R.equals(o[prop], value));

  const onChange = R.curry((prop, e) => {
    setFormState((state) => R.assoc(prop, e.target.value, state));
    return e.target.value;
  });

  const setPasswordFieldInvalid = (ref) => () => ref.current.setCustomValidity('Passwords do not match.');
  const setPasswordFieldValid = (ref) => () => ref.current.setCustomValidity('');

  const confirmPasswordAndCheckValid = R.compose(
    R.ifElse(
      checkPropsEq('password', R.__, formState),
      setPasswordFieldValid(confirmFieldRef),
      setPasswordFieldInvalid(confirmFieldRef),
    ),
    onChange('confirm'),
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLoggingIn) {
      apiHelpers.postBody(formState, '/users/create')
        .then(R.compose(dispatch, actionCreators.setUser));
    } else {
      apiHelpers.postBody(formState, '/users/login')
        .then(dispatchHelpers.handleLogin(dispatch));
    }
  };

  useEffect(R.ifElse(
    () => R.identity(user.name),
    () => setTimeout(navigate('tests'), 2000),
    () => {},
  ), [user]);

  return (
    <div className="LogIn__log-in">
      <div className="log-in__inner-container" style={{ width: `${width > 900 ? '40%' : ''}` }}>
        <div className="inner-container__choose">
          <button
            type="button"
            className={`choose__login ${isLoggingIn ? 'active' : ''}`}
            onClick={() => setIsLoggingIn(true)}
          >
            Log In
          </button>
          <button
            type="button"
            className={`choose__signup ${isLoggingIn ? '' : 'active'}`}
            onClick={() => setIsLoggingIn(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="inner-container__error">
          {error}
        </div>
        <form onSubmit={onSubmit} autoComplete="off">
          <label className="transition" style={isLoggingIn ? loggingInStyles : {}}>
            Name:
            <input
              type="text"
              name="name"
              required={!isLoggingIn}
              value={formState.name}
              onChange={onChange('name')}
              minLength="1"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={formState.email}
              onChange={onChange('email')}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              required
              value={formState.password}
              onChange={onChange('password')}
              minLength="6"
            />
          </label>
          <label className="transition" style={isLoggingIn ? loggingInStyles : {}}>
            Confirm Password:
            <input
              type="password"
              name="confirm-password"
              required={!isLoggingIn}
              value={formState.confirm}
              onChange={confirmPasswordAndCheckValid}
              ref={confirmFieldRef}
              minLength="6"
            />
          </label>
          <input type="submit" value="Submit" className="form__button" />
        </form>
      </div>
      {width > 900 && (
        <div className="log-in__img">
          <img src={LogInImg} alt="login filler" />
        </div>
      )}
      {user.name
      && (
      <UserLoggedInModal cb={navigate('tests')} user={user} />
      )}
    </div>
  );
}

export default LogIn;
