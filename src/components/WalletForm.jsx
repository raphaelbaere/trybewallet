import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, editExpenses } from '../redux/actions';
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

  handleExpenses = async (e) => {
    const { dispatch, expenses, idToEdit } = this.props;
    const { valueInput, description, currency, method, tag, id } = this.state;
    if (e.target.innerText === 'Adicionar despesa') {
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
    } else {
      const exchangeRates = await getExchangeRates();
      const expenseEdited = {
        id: idToEdit,
        value: valueInput,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      const expensesFiltered = expenses.filter((expense) => expense.id !== idToEdit);
      expensesFiltered.push(expenseEdited);
      dispatch(editExpenses(expensesFiltered));
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valueInput, description, currency, method, tag } = this.state;
    const { currencies, editing } = this.props;
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
            onClick={ (e) => this.handleExpenses(e) }
          >
            {editing ? 'Editar despesa' : 'Adicionar despesa'}
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
  editing: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    find: PropTypes.func,
    findIndex: PropTypes.func,
    length: PropTypes.number.isRequired,
  }).isRequired,
  idToEdit: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    editing: state.wallet.editing,
    idToEdit: state.wallet.idToEdit,
    totalExpensesSum: state.wallet.totalExpensesSum });

export default connect(mapStateToProps)(WalletForm);
