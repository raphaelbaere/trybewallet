import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Cadastro de usuário', () => {
  test('Verifica se ao fazer o login, é redirecionado para a página /Wallet', () => {
    renderWithRouterAndRedux(<App />);
    const correctEmail = 'test@test.com';
    const correctPassword = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(enterButton);
    const loggedEmail = screen.getByText(/test@test\.com/i);
    const totalExpensesSum = screen.getByText(/0\.00/i);
    const actualCurrency = screen.getByText(/brl/i);
    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(loggedEmail).toBeInTheDocument();
    expect(totalExpensesSum).toBeInTheDocument();
    expect(actualCurrency).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  test('Verifica se é possível adicionar despesas', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = await screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const cashOption = screen.getByRole('option', { name: 'Dinheiro' });
    const eatOption = screen.getByRole('option', { name: 'Alimentação' });
    const USDOption = await screen.findByRole('option', { name: 'USD' });
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueInput, '11');
    userEvent.type(descInput, 'Onze dólares');
    userEvent.selectOptions(currencyInput, USDOption);
    userEvent.selectOptions(methodInput, cashOption);
    userEvent.selectOptions(tagInput, eatOption);
    userEvent.click(addExpenses);
  });
});