import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { fetchCurrencies } from './redux/actions';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/carteira" render={ (props) => <Wallet { ...props } /> } />
      </Switch>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
