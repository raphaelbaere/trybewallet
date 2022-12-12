import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Cadastro de usuário', () => {
  test('Verifica se a tela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });
  test('Verifica se, inicialmente, o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const enterButton = screen.getByRole('button');
    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeDisabled();
  });
  test('Verifica se, ao preencher os inputs, o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const correctEmail = 'test@test.com';
    const correctPassword = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(enterButton).toBeEnabled();
  });
  test('Verifica se, ao preencher incorretamente os inputs, o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const incorrectEmail = 'testeErrado.com';
    const incorrectPassword = '1234';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, incorrectPassword);
    expect(enterButton).toBeDisabled();
  });
  test('Verifica se, ao preencher apenas um dos campos, ou um dos campos incorretamente, o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const correctEmail = 'test@test.com';
    const incorrectPassword = '1234';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, incorrectPassword);
    expect(enterButton).toBeDisabled();
  });
  test('Verifica se, ao preencher apenas um dos campos, ou um dos campos incorretamente, o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const incorrectEmail = 'teste.com';
    const correctPassword = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(enterButton).toBeDisabled();
  });
});
