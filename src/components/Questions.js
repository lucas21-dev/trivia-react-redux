import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { category, question } = this.props;
    const innerHTML = {
      __html: question,
    };

    return (
      <div id="trivia-question">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text" dangerouslySetInnerHTML={ innerHTML } />
      </div>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default Questions;
