import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../helpers/handleLocalStorage';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = getLocalStorage('ranking');
    const sortedRank = ranking.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {sortedRank.map(({ name, picture, score }, index) => (
          <p key={ index }>
            <img src={ picture } alt={ `User icon from ${name}` } />
            <span data-testid={ `player-name-${index}` }>{name}</span>
            <span data-testid={ `player-score-${index}` }>{score}</span>
          </p>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Pagina inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
