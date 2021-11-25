import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForms extends Component {
  render() {
    const { name, email, isBtnDisabled, handleChange, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">
            Usuário
            <input
              type="text"
              className="form-control"
              id="name-input"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ handleChange }
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            Email
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ handleChange }
              required
            />
          </label>
        </div>
        <button
          data-testid="btn-play"
          type="submit"
          className="btn btn-primary"
          disabled={ isBtnDisabled }
        >
          Jogar
        </button>
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
