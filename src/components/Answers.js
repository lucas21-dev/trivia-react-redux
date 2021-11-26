import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answers extends Component {
  render() {
    const { handleClick, correctAnswer, answersArray, isQuestionAnswered } = this.props;
    const wrongAsnwer = 'wrong-answer';
    let testId;
    let classList;

    return (
      <div id="trivia-answers">
        { answersArray.map((answer, index) => {
          if (answer === correctAnswer) {
            testId = 'correct-answer';
            classList = 'correct-answer';
          } else {
            testId = `${wrongAsnwer}-${index}`;
            classList = wrongAsnwer;
          }

          classList = isQuestionAnswered ? classList : '';

          const innerHTML = {
            __html: answer,
          };

          return (
            <button
              aria-label="Answer"
              data-testid={ testId }
              onClick={ handleClick }
              type="button"
              key={ index }
              className={ classList }
              dangerouslySetInnerHTML={ innerHTML }
              disabled={ isQuestionAnswered }
            />
          );
        }) }
      </div>
    );
  }
}

Answers.propTypes = {
  handleClick: PropTypes.func.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  isQuestionAnswered: PropTypes.bool.isRequired,
  answersArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answers;
