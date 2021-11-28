import { setLocalStorage } from '../../helpers/handleLocalStorage';
import { LOGIN, UPDATE_SCORE } from '../actions';

const initialState = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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

  default:
    return state;
  }
}

export default playerInfo;
