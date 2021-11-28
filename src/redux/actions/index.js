export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const GET_USER_ICON = 'GET_USER_ICON';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const login = (payload) => ({ type: LOGIN, payload });

export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });
