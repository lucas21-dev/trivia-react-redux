import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import fetchTriviaQuestions from '../helpers/fetchTriviaQuestions';
import { getLocalStorage } from '../helpers/handleLocalStorage';
import Questions from '../components/Questions';
import Answers from '../components/Answers';
import '../styles/gameStyle.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      triviaData: '',
      loading: true,
      triviaIndex: 0,
      isQuestionAnswered: false,
      timerInSecs: 30,
    };

    this.timer = 0;
    this.ONE_SECOND = 1000;

    this.renderActualQuestion = this.renderActualQuestion.bind(this);
    this.setStateInDidMount = this.setStateInDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.clearCountDownInterval = this.clearCountDownInterval.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
  }

  async componentDidMount() {
    const { triviaData } = this.state;
    const token = getLocalStorage('token');

    if (!triviaData) {
      const response = await fetchTriviaQuestions(token);

      this.setStateInDidMount(response);
    }
    this.startCountDown();
  }

  setStateInDidMount(triviaData) {
    this.setState({
      triviaData,
      loading: false,
    });
  }

  startCountDown() {
    this.setState({ timerInSecs: 30 });
    this.timer = setInterval(this.countDown, this.ONE_SECOND);
  }

  clearCountDownInterval() {
    clearInterval(this.timer);
  }

  countDown() {
    const { timerInSecs } = this.state;

    if (timerInSecs > 0) this.setState({ timerInSecs: timerInSecs - 1 });
  }

  shuffleAnswers(incorrectAnswers, correctAnswer) {
    const newArray = [...incorrectAnswers, correctAnswer];
    const randomIndex = Math.floor(Math.random() * newArray.length);
    const answersArray = [
      ...incorrectAnswers.slice(0, randomIndex),
      correctAnswer,
      ...incorrectAnswers.slice(randomIndex),
    ];

    return answersArray;
  }

  handleClick() {
    this.clearCountDownInterval();

    this.setState({
      isQuestionAnswered: true,
    });
  }

  handleNextBtnClick() {
    const { triviaIndex } = this.state;
    const MAX_QUESTIONS = 4;

    if (triviaIndex < MAX_QUESTIONS) {
      this.setState({
        triviaIndex: triviaIndex + 1,
        isQuestionAnswered: false,
      });
      this.startCountDown();
    }
  }

  renderActualQuestion() {
    const { triviaData, triviaIndex, isQuestionAnswered } = this.state;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = triviaData.results[triviaIndex];

    const shuffledAnswersArray = this.shuffleAnswers(
      incorrectAnswers,
      correctAnswer,
    );

    return (
      <div>
        <Questions category={ category } question={ question } />
        <Answers
          handleClick={ this.handleClick }
          correctAnswer={ correctAnswer }
          answersArray={ shuffledAnswersArray }
          isQuestionAnswered={ isQuestionAnswered }
        />
        <button type="button" onClick={ this.handleNextBtnClick }>
          Próxima pergunta
        </button>
      </div>
    );
  }

  render() {
    const { loading, timerInSecs } = this.state;

    return (
      <div>
        <Header />
        <h1>Jogo de Trivia</h1>
        {loading ? <Loading /> : this.renderActualQuestion()}
        <Timer timerInSecs={ timerInSecs } />
      </div>
    );
  }
}

export default Game;
