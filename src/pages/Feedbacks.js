import React, { Component } from 'react';
import Header from '../components/Header';

class Feedbacks extends Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          Feedback...
        </span>
      </div>
    );
  }
}

export default Feedbacks;
