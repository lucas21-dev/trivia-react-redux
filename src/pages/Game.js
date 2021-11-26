import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import fetchTriviaQuestions from '../helpers/fetchTriviaQuestions';
import { getLocalStorage, setLocalStorage } from '../helpers/handleLocalStorage';
import Questions from '../components/Questions';
import Answers from '../components/Answers';
import '../styles/game.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      triviaData: [],
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
    const token = getLocalStorage('token');
    const response = await fetchTriviaQuestions(token);
    const triviaData = this.createShuffledAsnwerArray(response);

    const { userName, userEmail } = this.props;

    const state = {
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
    };
    setLocalStorage('state', state);

    this.setStateInDidMount(triviaData);
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

    return timerInSecs > 0
      ? this.setState({ timerInSecs: timerInSecs - 1 })
      : this.setState({ isQuestionAnswered: true });
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

  createShuffledAsnwerArray(triviaData) {
    const { results } = triviaData;
    const shuffledTriviaResults = results.reduce((acc, curr) => {
      const {
        category,
        correct_answer: correctAnswer,
        difficulty,
        question,
        incorrect_answers: incorrectAnswers,
        type,
      } = curr;

      const shuffledAnswersArray = this.shuffleAnswers(
        incorrectAnswers,
        correctAnswer,
      );

      acc = [
        ...acc,
        {
          category,
          correctAnswer,
          difficulty,
          question,
          incorrectAnswers,
          type,
          shuffledAnswersArray,
        },
      ];
      return acc;
    }, []);

    return shuffledTriviaResults;
  }

  handleClick({ target }) {
    if (target.id === 'correct-answer') {
      const { triviaData, triviaIndex } = this.state;
      const { userName, userEmail } = this.props;
      const { difficulty } = triviaData[triviaIndex];
      const difficulties = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const DEZ = 10;
      const timer = window.document.getElementById('timer');
      const exactTime = Number(timer.textContent);
      const { player } = getLocalStorage('state');
      const userScore = DEZ + (exactTime * difficulties[difficulty]);

      const state = {
        player: {
          name: userName,
          assertions: 0,
          score: player.score + userScore,
          gravatarEmail: userEmail,
        },
      };
      setLocalStorage('state', state);
    }
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
      correctAnswer,
      shuffledAnswersArray,
    } = triviaData[triviaIndex];

    const btnNextClassList = isQuestionAnswered
      ? 'btn-next-visible'
      : 'btn-next-hidden';

    return (
      <div>
        <Questions category={ category } question={ question } />
        <Answers
          handleClick={ this.handleClick }
          correctAnswer={ correctAnswer }
          answersArray={ shuffledAnswersArray }
          isQuestionAnswered={ isQuestionAnswered }
        />
        <button
          className={ btnNextClassList }
          data-testid="btn-next"
          type="button"
          onClick={ this.handleNextBtnClick }
        >
          Próxima
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

function mapStateToProps(state) {
  return ({ userEmail: state.login.email, userName: state.login.name });
}

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
