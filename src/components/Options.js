import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  render() {
    const { categories, handleChange } = this.props;
    return (
      <div>
        <div>
          <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
          <div className="quantity">
            <div className="option-title">
              QUANTIDADE DE PERGUNTAS:
            </div>
            <select onChange={ handleChange } name="quantity" defaultValue="any-quantity">
              <option disabled value="any-quantity">-</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="difficulty">
            <div className="option-title">
              DIFICULDADE:
            </div>
            <select onChange={ handleChange } name="category" defaultValue="any-category">
              <option disabled value="any-category">-</option>
              {categories.map(({ name, id }) => (
                <option key={ id } value={ id }>{name}</option>
              ))}
            </select>
          </div>
          <div className="category">
            <div className="option-title">
              CATEGORIA:
            </div>
            <select
              onChange={ handleChange }
              name="difficulty"
              defaultValue="any-difficulty"
            >
              <option disabled value="any-difficulty">-</option>
              <option value="">Misturado</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
          <div className="type">
            <div className="option-title">
              TIPO DE PERGUNTAS:
            </div>
            <select onChange={ handleChange } name="type" defaultValue="any-type">
              <option disabled value="any-type">-</option>
              <option value="">Misturado</option>
              <option value="multiple">Múltipla Escolha</option>
              <option value="boolean">Verdadeiro ou Falso</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Options;
