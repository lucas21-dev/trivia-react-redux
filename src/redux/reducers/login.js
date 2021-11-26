import { LOGIN, REQUEST_API } from '../actions';
import { setLocalStorage } from '../../helpers/handleLocalStorage';

const initialState = {
  email: '',
  name: '',
};

function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case LOGIN: {
    setLocalStorage(payload.keyName, payload.token);
    return { ...state, email: payload.email, name: payload.name };
  }
  default:
    return state;
  }
}

export default loginReducer;
