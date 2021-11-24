export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const login = (payload) => ({ type: LOGIN, payload });

export const requestAPI = () => ({ type: REQUEST_API });

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});
