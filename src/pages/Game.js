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
    const { userName } = this.props;
    const icon = window.document.getElementById('user-icon');
    console.log(icon)
    const token = getLocalStorage('token');
    const ranking = {
      name: userName,
      score: 0,
      picture: icon.src,
    };
    setLocalStorage('ranking', ranking);
    console.log(ranking);
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

  handleClick({ target }) {
    if (target.id === 'correct-answer') {
      const icon = window.document.getElementById('user-icon');
      const { triviaData, triviaIndex } = this.state;
      const { userName } = this.props;
      const { difficulty } = triviaData.results[triviaIndex];
      const difficulties = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const DEZ = 10;
      const timer = window.document.getElementById('timer');
      const exactTime = Number(timer.textContent);
      const lastScore = JSON.parse(localStorage.getItem('ranking'));
      const userScore = DEZ + (exactTime * difficulties[difficulty]);
      const ranking = {
        name: userName,
        score: lastScore.score + userScore,
        picture: icon.src,
      };
      setLocalStorage('ranking', ranking);
      console.log(ranking);
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
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = triviaData.results[triviaIndex];

    const shuffledAnswersArray = this.shuffleAnswers(
      incorrectAnswers,
      correctAnswer,
    );

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
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
