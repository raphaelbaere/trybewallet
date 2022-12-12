// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpensesSum: 0,
  editing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'EXPENSES_DELETED_ID':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'EDIT_MODE':
    return {
      ...state,
      editing: true,
      idToEdit: action.id,
    };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      expenses: action.expenses.sort((a, b) => a.id - b.id),
      editing: false,
    };
  default:
    return state;
  }
};

export default wallet;
