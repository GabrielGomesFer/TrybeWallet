import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmail } from '../Redux/actions';
import PropTypes from 'prop-types';

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
    const validator = /\S+@\w+\.\w+/;
    return validator.test(email); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  };

  validButton = () => {
    const minpass = 6;
    if (this.validaEmail() && password.length >= minpass) {
      this.setState({
        isValid: false,
      });
    }
  };

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
            onChange={ this.handleChange() }
          />
          <br />
          <input
            name="password"
            type="password"
            value={ password }
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleChange() }
          />
          <Link to="/carteira">
            <button
              type="submit"
              name="submitButton"
              disabled={ isValid }
              onClick={ () => { dispatch(getEmail(email)); } }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  propLogEmail: state.email,
});

export default connect(mapStateToProps)(Login);
