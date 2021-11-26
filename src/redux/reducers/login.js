import { LOGIN, REQUEST_API } from '../actions';

const initialState = {
  email: '',
  name: '',
};

function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case LOGIN: {
    return { ...state, email: payload.email, name: payload.name };
  }
  default:
    return state;
  }
}

export default loginReducer;
