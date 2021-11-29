import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  render() {
    const { categories, handleChange } = this.props;
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <div>
          <div>
            <select onChange={ handleChange } name="quantity" defaultValue="any-quantity">
              <option disabled value="any-quantity">-</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div>
            <select onChange={ handleChange } name="category" defaultValue="any-category">
              <option disabled value="any-category">-</option>
              {categories.map(({ name, id }) => (
                <option key={ id } value={ id }>{name}</option>
              ))}
            </select>
          </div>
          <div>
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
          <div>
            <select onChange={ handleChange } name="type" defaultValue="any-type">
              <option disabled value="any-type">-</option>
              <option value="">Misturado</option>
              <option value="multiple">Múltipla Escolha</option>
              <option value="boolean">Verdadeiro ou Falso</option>
            </select>
          </div>
        </div>
      </>
    );
  }
}

Options.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Options;
