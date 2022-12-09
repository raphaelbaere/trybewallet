import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalExpensesSum } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpensesSum.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  { email: state.user.email, totalExpensesSum: state.wallet.totalExpensesSum });

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpensesSum: PropTypes.isRequired,
};

export default connect(mapStateToProps)(Header);
