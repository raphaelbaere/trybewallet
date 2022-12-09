const CURRENCIES_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const response = await fetch(CURRENCIES_BASE_API);
  const json = await response.json();
  const currenciesKEYS = Object.keys(json);
  const currenciesARRAY = [];
  const currenciesFILTEREDARRAY = [];
  currenciesKEYS.forEach((currencieKey) => {
    currenciesARRAY.push(json[currencieKey]);
  });
  const currencieFILT = currenciesARRAY.filter((currencie) => (
    currencie.codein !== 'BRLT'));
  currencieFILT.forEach((currencie) => {
    currenciesFILTEREDARRAY.push(currencie.code);
  });
  return currenciesFILTEREDARRAY;
};

export default getCurrencies;

export const getExchangeRates = async () => {
  const response = await fetch(CURRENCIES_BASE_API);
  const json = await response.json();
  return json;
};
