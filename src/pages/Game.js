import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { updateScore } from '../redux/actions';
import fetchTriviaQuestions from '../helpers/fetchTriviaQuestions';
import { getLocalStorage, sendRankingToStorage } from '../helpers/handleLocalStorage';
import Questions from '../components/Questions';
import Answers from '../components/Answers';
import Timer from '../components/Timer';
import '../styles/game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      triviaData: [],
      isFetching: true,
      triviaIndex: 0,
      isQuestionAnswered: false,
      timerInSecs: 30,
      difficulties: {
        hard: 3,
        medium: 2,
        easy: 1,
      },
    };

    this.timer = 0;
    this.ONE_SECOND = 1000;

    this.renderActualQuestion = this.renderActualQuestion.bind(this);
    this.setStateInDidMount = this.setStateInDidMount.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.clearCountDownInterval = this.clearCountDownInterval.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.calcPlayerScore = this.calcPlayerScore.bind(this);
    this.setRankLocalStorage = this.setRankLocalStorage.bind(this);
    this.createShuffledAsnwerArray = this.createShuffledAsnwerArray.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() {
    this.setStateInDidMount();
    this.startCountDown();
  }

  componentWillUnmount() {
    this.clearCountDownInterval();
  }

  async setStateInDidMount() {
    const token = getLocalStorage('token');
    const response = await fetchTriviaQuestions(token);
    const triviaData = this.createShuffledAsnwerArray(response);

    this.setState({ triviaData: [...triviaData], isFetching: false });
  }

  setRankLocalStorage(userName, gravatarEmail, userScore) {
    const userRank = {
      name: userName,
      score: userScore,
      picture: gravatarEmail,
    };
    sendRankingToStorage(userRank);
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

  calcPlayerScore() {
    const { triviaData, triviaIndex, difficulties, timerInSecs } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = triviaData[triviaIndex];
    const BASE_POINTS = 10;
    const score = BASE_POINTS + (timerInSecs * difficulties[difficulty]);

    dispatch(updateScore(score));
  }

  handleAnswerClick({ target }) {
    if (target.id === 'correct-answer') {
      this.calcPlayerScore();
    }

    this.clearCountDownInterval();
    this.setState({ isQuestionAnswered: true });
  }

  handleNextBtnClick() {
    const { triviaIndex, triviaData } = this.state;
    const { history, userName, gravatarEmail, userScore } = this.props;
    const LAST_QUESTION = triviaData.length - 1;

    if (triviaIndex < LAST_QUESTION) {
      this.setState({
        triviaIndex: triviaIndex + 1,
        isQuestionAnswered: false,
      });
      return this.startCountDown();
    }

    this.setRankLocalStorage(userName, gravatarEmail, userScore);
    history.push('/feedbacks');
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
          handleClick={ this.handleAnswerClick }
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
    const { isFetching, timerInSecs } = this.state;

    return (
      <div>
        <Header />
        <h1>Jogo de Trivia</h1>
        {isFetching ? <Loading /> : this.renderActualQuestion()}
        <Timer timerInSecs={ timerInSecs } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.playerInfo.name,
  userScore: state.playerInfo.score,
  gravatarEmail: state.playerInfo.gravatarEmail,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
