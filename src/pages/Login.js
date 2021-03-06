import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForms from '../components/LoginForms';
import { login } from '../redux/actions';
import { setLocalStorage } from '../helpers/handleLocalStorage';
import { fetchTokenAPI } from '../helpers/fetchTokenAPI';
import brain from '../images/brain.png';
import thunder from '../images/raio.png';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.createGravatarEmail = this.createGravatarEmail.bind(this);
  }

  isFormValid() {
    const { name, email } = this.state;

    const isNameAndEmailValid = name.length > 0 && email.length > 0;

    return isNameAndEmailValid
      ? this.setState({ isBtnDisabled: false })
      : this.setState({ isBtnDisabled: true });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.isFormValid);
  }

  createGravatarEmail(email) {
    const emailRash = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${emailRash}`;

    return gravatarEmail;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    const gravatarEmail = this.createGravatarEmail(email);
    const { token } = await fetchTokenAPI();

    const payload = {
      name,
      email,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };

    setLocalStorage('token', token);
    dispatch(login(payload));

    history.push('/game');
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <section className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col w-50">
              <img
                className="brain-img"
                src={ brain }
                alt="C??rebro laranja comemorando"
              />
            </div>
            <div className="form-wrapper col w-50">
              <div className="d-flex">
                <h1 className="trivia-title">TRIVIA</h1>
                <img
                  className="title-thunder"
                  src={ thunder }
                  alt="tr??s raios laranjas"
                />
              </div>
              <LoginForms
                name={ name }
                email={ email }
                isBtnDisabled={ isBtnDisabled }
                handleChange={ this.handleChange }
                handleSubmit={ this.handleSubmit }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
