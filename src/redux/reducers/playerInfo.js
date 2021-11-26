import { LOGIN, REQUEST_API, GET_USER_ICON } from '../actions';

const initialState = {
  email: '',
  name: '',
  userIcon: '',
};

function playerInfo(state = initialState, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case LOGIN: {
    return { ...state, email: payload.email, name: payload.name };
  }
  case GET_USER_ICON:
    return { ...state, userIcon: payload };
  default:
    return state;
  }
}

export default playerInfo;
