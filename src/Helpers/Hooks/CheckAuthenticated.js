import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import * as R from 'ramda';
import dispatchHelpers from '../../Redux/dispatchHelpers';
import apiHelpers from '../Api/apiService';

const CheckAuthenticated = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    apiHelpers.checkAuth()
      .then((res) => (res.message === 'Not authenticated' ? setCheckingAuth(false) : dispatchHelpers.handleLogin(dispatch)(res)))
      .then(() => setCheckingAuth(false));
  }, []);

  return checkingAuth;
};

export default CheckAuthenticated;
