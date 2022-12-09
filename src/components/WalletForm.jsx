import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses } from '../redux/actions';
import { getExchangeRates } from '../services/economiaAPI';

class WalletForm extends Component {
  state = {
    valueInput: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  handleExpenses = async () => {
    const { dispatch, expenses } = this.props;
    const { valueInput, description, currency, method, tag, id } = this.state;
    const exchangeRates = await getExchangeRates();
    const expensesObj = {
      id,
      value: valueInput,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpenses(expensesObj));
    this.setState({
      valueInput: '',
      description: '',
      id: expenses.length + 1,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valueInput, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            <input
              type="number"
              id="expenses"
              data-testid="value-input"
              value={ valueInput }
              name="valueInput"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="expenses-desc">
            <input
              type="text"
              id="expenses-desc"
              data-testid="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies">
            <select
              id="expenses-desc"
              data-testid="currency-input"
              value={ currency }
              name="currency"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie }>{ currencie }</option>))}
            </select>
          </label>
          <label htmlFor="card-options">
            <select
              id="card-options"
              data-testid="method-input"
              value={ method }
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expense-category">
            <select
              id="expense-category"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleExpenses }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    forEach: PropTypes.func,
    map: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies, expenses: state.wallet.expenses });

export default connect(mapStateToProps)(WalletForm);
