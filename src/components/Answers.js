import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { handleClick, correctAnswer, answersArray, isQuestionAnswered } = this.props;

    return (
      <div id="trivia-answers">
        { answersArray.map((answer, index) => {
          const testId = (answer === correctAnswer)
            ? 'correct-answer' : `wrong-answer-${index}`;
          const className = (answer === correctAnswer)
            ? 'correct-answer' : 'wrong-answer';
          const classList = isQuestionAnswered ? className : '';

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
