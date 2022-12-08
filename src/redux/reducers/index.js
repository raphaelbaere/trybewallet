import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducers = combineReducers({
  user,
  wallet,
});
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

export default rootReducers;
