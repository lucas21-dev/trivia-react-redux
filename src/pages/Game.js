import React, { Component } from 'react';
import Loading from '../components/Loading';
import fetchTriviaQuestions from '../helpers/fetchTriviaQuestions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      triviaData: '',
      loading: true,
      triviaIndex: 0,
    };

    this.renderActualQuestion = this.renderActualQuestion.bind(this);
    this.setStateInDidMount = this.setStateInDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    // aqui tem que puxar o token do localStorage para acessar a API que será passada por parâmetro da função abaixo;
    const triviaData = await fetchTriviaQuestions('token');
    this.setStateInDidMount(triviaData);
  }

  setStateInDidMount(triviaData) {
    this.setState({
      triviaData,
      loading: false,
    });
  }

  handleClick() {
    const { triviaIndex } = this.state;
    const MAX_QUESTIONS = 5;

    if (triviaIndex < MAX_QUESTIONS) {
      this.setState({
        triviaIndex: triviaIndex + 1,
      });
    }
  }

  //   {
  //     "response_code":0,
  //     "results":[
  //        {
  //           "category":"Entertainment: Video Games",
  //           "type":"multiple",
  //           "difficulty":"easy",
  //           "question":"What is the first weapon you acquire in Half-Life?",
  //           "correct_answer":"A crowbar",
  //           "incorrect_answers":[
  //              "A pistol",
  //              "The H.E.V suit",
  //              "Your fists"
  //           ]
  //        }
  //     ]
  //  }
  renderActualQuestion() {
    const { triviaData, triviaIndex } = this.state;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = triviaData[triviaIndex].results;

    return (
      <div>
        <div id="trivia-question">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div>
          <button
            data-testid="correct-answer"
            onClick={ this.handleClick }
            type="button"
          >
            { correctAnswer }
          </button>
          { incorrectAnswers.map((incorrect, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
              type="button"
              key={ index }
            >
              { incorrect }
            </button>
          )) }
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>Jogo de Trivia</h1>
        { loading ? <Loading /> : this.renderActualQuestion() }
      </div>
    );
  }
}

export default Game;
