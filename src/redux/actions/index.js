export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const GET_USER_ICON = 'GET_USER_ICON';

export const login = (payload) => ({ type: LOGIN, payload });

export const requestAPI = () => ({ type: REQUEST_API });

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

export const getUserIcon = (payload) => ({ type: GET_USER_ICON, payload });
