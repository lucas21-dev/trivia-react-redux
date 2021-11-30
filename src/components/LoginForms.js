import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LoginForms extends Component {
  render() {
    const { name, email, isBtnDisabled, handleChange, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">
            <input
              type="text"
              className="px-3 login-input"
              id="name-input"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ handleChange }
              placeholder="Nome"
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            <input
              type="email"
              className="px-3 login-input"
              id="email"
              aria-describedby="emailHelp"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ handleChange }
              placeholder="E-mail"
              required
            />
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Link to="/settings">
            <div data-testid="btn-settings">
              <i className="fas fa-cog settings-btn" />
            </div>
          </Link>
          <button
            data-testid="btn-play"
            type="submit"
            className="ms-5 trivia-btn-round"
            disabled={ isBtnDisabled }
          >
            Jogar
          </button>
        </div>
      </form>
    );
  }
}

LoginForms.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForms;
