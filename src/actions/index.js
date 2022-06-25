export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const getExpense = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
});

export const fetchExchange = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const thunkWallet = (payload) => async (dispatch) => {
  const objt = await fetchExchange();
  const teste = {
    ...payload,
    exchangeRates: objt,
  };
  dispatch(getExpense(teste));
};
