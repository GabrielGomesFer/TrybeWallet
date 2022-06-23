import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValid: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    }, () => this.validButton());
  };

  validaEmail = () => {
    const { email } = this.state;
    const validator = /\S+@\w+\.\w+/;
    return validator.test(email); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  };

  validButton = () => {
    const { password } = this.state;
    const minpass = 6;
    if (this.validaEmail() && password.length >= minpass) {
      this.setState({
        isValid: false,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  };

  handleCLick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;

    dispatch(getEmail(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, isValid } = this.state;

    return (
      <div>
        <h1> TRYBEWALLET </h1>
        <form>
          <input
            name="email"
            type="email"
            value={ email }
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <br />
          <input
            name="password"
            type="password"
            value={ password }
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            name="submitButton"
            disabled={ isValid }
            onClick={ this.handleCLick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   propLogEmail: state.email,
// });

export default connect()(Login);
