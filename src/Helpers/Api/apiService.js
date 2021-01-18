import * as R from 'ramda';

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'https://junt-backend.herokuapp.com';

const defaultOptions = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
};

const fetchRequest = (base, defaults) => (
  path,
  options = {},
) => {
  console.log(base + path);
  return fetch(base + path, Object.assign(defaults, options))
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch(() => ({ error: 'Something went wrong' }));
};

const fetchRequestWithDefaultsAndBaseUrl = fetchRequest(BASE_URL, defaultOptions);

const postBody = R.curry((body, path) => fetchRequestWithDefaultsAndBaseUrl(path, {
  method: 'POST',
  body: JSON.stringify(body),
}));

const deleteViaParam = R.curry((path, id) => fetchRequestWithDefaultsAndBaseUrl(`${path}/${id}`, {
  method: 'DELETE',
}));

const checkAuth = () => fetchRequestWithDefaultsAndBaseUrl('/auth/check', {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const logout = () => fetchRequestWithDefaultsAndBaseUrl('/logout');

const apiHelpers = {
  fetchRequestWithDefaultsAndBaseUrl,
  postBody,
  deleteViaParam,
  checkAuth,
  logout,
};

export default apiHelpers;
