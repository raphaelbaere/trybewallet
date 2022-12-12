// Coloque aqui suas actions
import getCurrencies from '../../services/economiaAPI';

const addUser = (value) => ({
  type: 'ADD_USER',
  value: value.email,
});

const receiveCurrenciesInfo = (currenciesInfo) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies: currenciesInfo,
});

export const handleExpenseDelete = (expenseToBeDeleted, expensesDeleted) => ({
  type: 'EXPENSES_DELETED_ID',
  expenses: expensesDeleted,
  expenseToBeDeleted,
});

export const addExpenses = (expenses) => ({
  type: 'ADD_EXPENSES',
  expenses,
});

export const editMode = (id) => ({
  type: 'EDIT_MODE',
  id,
});

export const editExpenses = (editedExpenses) => ({
  type: 'EDIT_EXPENSES',
  expenses: editedExpenses,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    const currenciesInfo = await getCurrencies();
    dispatch(receiveCurrenciesInfo(currenciesInfo));
  }
);

export default addUser;
