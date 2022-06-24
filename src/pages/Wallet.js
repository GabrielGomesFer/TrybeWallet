import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  state = {
    price: '',
    description: '',
    inpCurrencies: '',
    method: '',
    tag: '',
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
      inpCurrencies: [coinCodeList],
    });
    dispatch(getCurrencies(coinCodeList));
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      {
        [name]: value,
      },
    );
  };

  render() {
    const { inpCurrencies, price, method, tag, description } = this.state;
    const { email, currencies } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="despesas">
            Despesas
            <input
              id="price"
              data-testid="value-input"
              type="number"
              name="value"
              value={ price }
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
              name="inpCurrencies"
              value={ inpCurrencies }
              onChange={ this.handleChange }
            >
              {/* {currencies && currencies.map((c, i) => (
                <option value={ c } key={ i }>{c}</option>
              ))} */}
              {currencies ? (
                currencies.map((c, i) => (
                  <option value={ c } key={ i }>{c}</option>
                ))
                // console.log('existe')
              ) : (
                null
              )}
            </select>
          </label>
          <label htmlFor="method">
            <select
              id="Pagamento"
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
          <label htmlFor="Category">
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
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
