import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import fetchTriviaQuestions from '../helpers/fetchTriviaQuestions';
import { getLocalStorage } from '../helpers/handleLocalStorage';
import Questions from '../components/Questions';
import Answers from '../components/Answers';

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
    const token = getLocalStorage('token');
    const triviaData = await fetchTriviaQuestions(token);
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
    const MAX_QUESTIONS = 4;

    if (triviaIndex < MAX_QUESTIONS) {
      this.setState({
        triviaIndex: triviaIndex + 1,
      });
    }
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

  renderActualQuestion() {
    const { triviaData, triviaIndex } = this.state;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = triviaData.results[triviaIndex];

    const shuffledAnswersArray = this.shuffleAnswers(incorrectAnswers, correctAnswer);

    return (
      <div>
        <Questions category={ category } question={ question } />
        <Answers
          handleClick={ this.handleClick }
          correctAnswer={ correctAnswer }
          answersArray={ shuffledAnswersArray }
        />
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Header />
        <h1>Jogo de Trivia</h1>
        { loading ? <Loading /> : this.renderActualQuestion() }
      </div>
    );
  }
}

export default Game;
