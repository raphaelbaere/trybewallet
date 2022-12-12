import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0);
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  { email: state.user.email,
    totalExpensesSum: state.wallet.totalExpensesSum,
    expenses: state.wallet.expenses });

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
