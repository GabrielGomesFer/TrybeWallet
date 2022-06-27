import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, thunkWallet } from '../actions';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
    id: 0,
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const { dispatch } = this.props;

    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    delete data.USDT;
    const coinCodeList = Object.keys(data);
    // console.log(coinCodeList);

    this.setState({
      currency: [coinCodeList],
    });
    dispatch(getCurrencies(coinCodeList));
  };

  // fetchExchange = async () => {
  //   const url = 'https://economia.awesomeapi.com.br/json/all';
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   this.setState({
  //     exchangeRate: data,
  //   });
  // };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onClickSave = () => {
    const { dispatch } = this.props;
    dispatch(thunkWallet(this.state));

    this.setState((prevState) => ({ // https://stackoverflow.com/questions/54807454/what-is-prevstate-in-reactjs
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      id: prevState.id + 1,
    }));
  };

  render() {
    const { currency, value, method, tag, description } = this.state;
    const { email, currencies, expenses } = this.props;

    const acumulaTudo = expenses.reduce(
      (acc, crr) => acc + crr.value * crr.exchangeRates[crr.currency].ask,
      0,
    );

    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{ acumulaTudo.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Despesas
            <input
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descrição">
            Descrição
            <input
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {/* {currencies && currencies.map((c, i) => (
                <option value={ c } key={ i }>{c}</option>
              ))} */}
              {currencies
                ? currencies.map((c, i) => (
                  <option value={ c } key={ i }>
                    {c}
                  </option>
                ))
                : (// console.log('existe')
                  null
                )}
            </select>
          </label>
          <label htmlFor="method">
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.onClickSave }>
            Adicionar despesa
          </button>
        </form>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
          <tbody>
            {
              expenses.length > 0
          && expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>
                {exp.description}
              </td>
              <td>
                {exp.tag}
              </td>
              <td>
                {exp.method}
              </td>
              <td>
                {parseInt(exp.value, 10).toFixed(2)}
              </td>
              <td>
                {exp.exchangeRates[exp.currency].name.split('/')[0]}
                {/* o colchetes traz só aquela parte do q foi cortado */}
              </td>
              <td>
                {parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}
              </td>
              <td>
                {parseFloat(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)}
              </td>
              <td>
                Real
              </td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
