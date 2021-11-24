import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.isFormValid);
  }

  isFormValid() {
    const { name, email } = this.state;

    const isNameAndEmailValid = name.length > 0 && email.length > 0;

    return isNameAndEmailValid
      ? this.setState({ isBtnDisabled: false })
      : this.setState({ isBtnDisabled: true });
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <section className="d-flex justify-content-center align-items-center">
        <form>
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
                onChange={ this.handleChange }
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
                onChange={ this.handleChange }
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
      </section>
    );
  }
}

export default Login;
