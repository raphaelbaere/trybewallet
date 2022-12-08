import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            <input type="text" id="expenses" data-testid="value-input" />
          </label>
          <label htmlFor="expenses-desc">
            <input type="text" id="expenses-desc" data-testid="description-input" />
          </label>
          <label htmlFor="currencies">
            <select id="expenses-desc" data-testid="currency-input">
              {currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>))}
            </select>
          </label>
          <label htmlFor="card-options">
            <select id="card-options" data-testid="method-input">
              <option value="">Dinheiro</option>
              <option value="">Cartão de crédito</option>
              <option value="">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expense-category">
            <select id="expense-category" data-testid="tag-input">
              <option value="">Alimentação</option>
              <option value="">Lazer</option>
              <option value="">Trabalho</option>
              <option value="">Transporte</option>
              <option value="">Saúde</option>
            </select>
          </label>
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
};

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
