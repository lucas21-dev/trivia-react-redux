import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { timerInSecs } = this.props;
    return (
      <div>
        <span id="timer">
          { timerInSecs }
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  timerInSecs: PropTypes.number.isRequired,
};

export default Timer;
