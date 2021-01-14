import * as R from 'ramda';

const BASE_URL = 'http://localhost:3001';

const defaultOptions = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
};

const fetchRequest = (base, defaults) => (path,
  options = {}) => fetch(base + path, Object.assign(defaults, options))
  .then((res) => (res.status < 400 ? res : Promise.reject(res)))
  .then((res) => (res.status !== 204 ? res.json() : res))
  .catch(() => ({ error: 'Something went wrong' }));

const fetchRequestWithDefaultsAndBaseUrl = fetchRequest(BASE_URL, defaultOptions);

const postBody = R.curry((body, path) => fetchRequestWithDefaultsAndBaseUrl(path, {
  method: 'POST',
  body: JSON.stringify(body),
}));

const apiHelpers = {
  fetchRequestWithDefaultsAndBaseUrl,
  postBody,
};

export default apiHelpers;
