import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/handleLocalStorage';

class Feedbacks extends Component {
  render() {
    const { player } = getLocalStorage('state');
    const MIN_ASSERTIONS = 3;
    const { history } = this.props;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          {player.assertions >= MIN_ASSERTIONS
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </span>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedbacks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedbacks;
