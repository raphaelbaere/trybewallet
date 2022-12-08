import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEnterButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const PASSWORD_MIN_CHAR = 5;
      const REGX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (password.length > PASSWORD_MIN_CHAR && email.match(REGX)) {
        this.setState({
          isEnterButtonDisabled: false,
        });
      } else {
        this.setState({
          isEnterButtonDisabled: true,
        });
      }
    });
  };

  render() {
    const { email, password, isEnterButtonDisabled } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ this.onInputChange }
          placeholder="E-mail"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ this.onInputChange }
          placeholder="Password"
        />
        <button
          type="button"
          onClick={ () => {
            history.push('/carteira');
            dispatch(addUser({ email }));
          } }
          disabled={ isEnterButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
