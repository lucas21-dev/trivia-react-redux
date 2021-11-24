import { LOGIN } from '../actions';
import { setLocalStorage } from '../../helpers/handleLocalStorage';

const initialState = {
  email: '',
  name: '',
};

function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
  case LOGIN: {
    setLocalStorage(payload.keyName, payload.token);
    return { ...state, email: payload.email, name: payload.name };
  }
  default:
    return state;
  }
}

export default loginReducer;
