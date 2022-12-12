import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editMode, handleExpenseDelete } from '../redux/actions';

class Table extends Component {
  handleEditBtn = (e, id) => {
    const { dispatch } = this.props;
    dispatch(editMode(id));
  };

  handleDeleteBtn = (e, id) => {
    const { expenses, dispatch } = this.props;
    const expenseToBeDeletedIndex = expenses.findIndex((expense) => expense.id === id);
    const expenseToBeDeleted = expenses[expenseToBeDeletedIndex];
    const expenseWithDeletedId = expenses.filter((expense) => expense.id !== id);
    dispatch(handleExpenseDelete(expenseToBeDeleted, expenseWithDeletedId));
  };

  render() {
    const { expenses } = this.props;
    const showExpenses = expenses.map(({
      id,
      description,
      currency,
      tag,
      method,
      value,
      exchangeRates,
    }) => (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{(Number(exchangeRates[currency].ask) * Number(value)).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            id="edit-btn"
            data-testid="edit-btn"
            onClick={ (e) => this.handleEditBtn(e, id) }
          >
            Edit
          </button>
          <button
            id="delete-btn"
            type="button"
            data-testid="delete-btn"
            onClick={ (e) => this.handleDeleteBtn(e, id) }
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {showExpenses.sort((a, b) => a.key - b.key)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(Table);
