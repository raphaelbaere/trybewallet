import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a Table e...', () => {
  const expenseOne = {
    id: '0',
    value: '10',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: 'Dez dólares',
    exchangeRates: mockData,
  };
  const expenseTwo = {
    id: '1',
    value: '15',
    currency: 'EUR',
    method: 'Dinheiro',
    tag: 'Saúde',
    description: 'Medicinal Weed',
    exchangeRates: mockData,
  };
  test('Verifica se é possível editar os elementos da tabela.', async () => {
    const addExpense = 'Adicionar despesa';
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        expenses: [expenseOne, expenseTwo],
        editing: false,
        idToEdit: '0',
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const editButtonForm = screen.getByRole('button', { name: addExpense });
    const editButton = screen.getAllByTestId('edit-btn');
    userEvent.click(editButton[0]);
    expect(editButtonForm.textContent).toBe('Editar despesa');
    const valueInput = screen.getByTestId('value-input');
    const currencyInput = await screen.getByTestId('currency-input');
    const EUROption = await screen.findByRole('option', { name: 'EUR' });
    const descInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const cashOption = screen.getByRole('option', { name: 'Dinheiro' });
    const eatOption = screen.getByRole('option', { name: 'Alimentação' });
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '20');
    userEvent.selectOptions(currencyInput, EUROption);
    userEvent.type(descInput, 'Vinte euros');
    userEvent.selectOptions(methodInput, cashOption);
    userEvent.selectOptions(tagInput, eatOption);
    userEvent.click(editButtonForm);
    const buttonEditable = await screen.findByRole('button', { name: addExpense });
    expect(buttonEditable.textContent).toBe(addExpense);
  });
  test('Verifica se é possível excluir um elemento da tabela', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        expenses: [expenseOne, expenseTwo],
        editing: false,
        idToEdit: '0',
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const firstDesc = screen.getByText(/Dez dólares/i);
    const deleteButtons = screen.getAllByTestId('delete-btn');
    userEvent.click(deleteButtons[0]);
    expect(firstDesc).not.toBeInTheDocument();
  });
});
