import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { handleClick, correctAnswer, answersArray } = this.props;

    return (
      <div id="trivia-answers">
        { answersArray.map((answer, index) => {
          const testId = (answer === correctAnswer)
            ? 'correct-answer' : `wrong-answer-${index}`;
          const innerHTML = {
            __html: answer,
          };

          return (
            <button
              aria-label="Answer"
              data-testid={ testId }
              className={ testId }
              onClick={ handleClick }
              type="button"
              key={ index }
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
  answersArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answers;
