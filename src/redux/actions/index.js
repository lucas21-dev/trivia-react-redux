export const LOGIN = 'LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SET_API_ENDPOINT = 'SET_API_ENDPOINT';

export const login = (payload) => ({ type: LOGIN, payload });

export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });

export const setAPIEndpoint = (payload) => ({ type: SET_API_ENDPOINT, payload });
