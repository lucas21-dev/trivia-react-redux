import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Options from '../components/Options';
import fetchCategoriesApi from '../helpers/fetchCategoriesAPI';
import { BASE_URL } from '../helpers/fetchTriviaQuestions';
import { setAPIEndpoint } from '../redux/actions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      quantity: '5',
      difficulty: '',
      type: '',
      category: '',
    };

    this.state = {
      ...this.DEFAULT_STATE,
      categories: [],
      isFetching: true,
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const response = await fetchCategoriesApi();

    this.setState({
      categories: [...response.trivia_categories],
      isFetching: false,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleResetButton() {
    this.setState(this.DEFAULT_STATE);
  }

  handlePlayButton() {
    const { difficulty, type, category, quantity } = this.state;
    const { dispatch, history } = this.props;

    const difficultyURL = difficulty ? `&difficulty=${difficulty}` : '';
    const typeURL = type ? `&type=${type}` : '';
    const categoryURL = category ? `&category=${category}` : '';
    const quantityURL = `amount=${quantity}`;

    const url = `${BASE_URL}${quantityURL}${categoryURL}${difficultyURL}${typeURL}`;

    dispatch(setAPIEndpoint(url));
    history.push('/');
  }

  render() {
    const { categories, isFetching, difficulty, type, category, quantity } = this.state;

    return isFetching ? (
      <Loading />
    ) : (
      <section>
        <Options
          categories={ categories }
          handleChange={ this.handleChange }
          difficulty={ difficulty }
          type={ type }
          category={ category }
          quantity={ quantity }
        />
        <button onClick={ this.handleResetButton } type="button">Resetar</button>
        <button onClick={ this.handlePlayButton } type="button">Jogar</button>
      </section>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
