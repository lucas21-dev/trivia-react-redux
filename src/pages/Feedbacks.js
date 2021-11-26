import React, { Component } from 'react';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/handleLocalStorage';

class Feedbacks extends Component {
  render() {
    const { player } = getLocalStorage('state');
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { player.assertions >= MIN_ASSERTIONS ? 'Mandou bem!' : 'Podia ser melhor...' }
        </span>
      </div>
    );
  }
}

export default Feedbacks;
