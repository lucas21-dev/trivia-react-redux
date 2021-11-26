import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/handleLocalStorage';

class Feedbacks extends Component {
  render() {
    const { player } = getLocalStorage('state');
    const { assertions, score } = player;
    const { history } = this.props;
    const MIN_ASSERTIONS = 3;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= MIN_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>

        <p>
          Você acertou
          <span data-testid="feedback-total-question">{` ${assertions} `}</span>
          questões e ganhou
          <span data-testid="feedback-total-score">{` ${score} `}</span>
          pontos!
        </p>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedbacks.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});

export default Feedbacks;
