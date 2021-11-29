import { setLocalStorage } from '../../helpers/handleLocalStorage';
import { LOGIN, UPDATE_SCORE, SET_API_ENDPOINT } from '../actions';

const initialState = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  apiURL: 'https://opentdb.com/api.php?amount=5',
};

function playerInfo(state = initialState, { type, payload }) {
  switch (type) {
  case LOGIN: {
    const { name, assertions, score, gravatarEmail } = payload;
    const playerState = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };

    setLocalStorage('state', playerState);
    return { ...state, ...payload };
  }

  case UPDATE_SCORE: {
    const playerState = {
      player: {
        name: state.name,
        assertions: state.assertions + 1,
        score: state.score + payload,
        gravatarEmail: state.gravatarEmail,
      },
    };

    setLocalStorage('state', playerState);
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  }

  case SET_API_ENDPOINT: {
    return {
      ...state,
      apiURL: payload,
    };
  }
  default:
    return state;
  }
}

export default playerInfo;
