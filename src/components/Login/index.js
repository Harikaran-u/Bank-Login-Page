import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', userPassword: '', isValid: true, errorMessage: ''}

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isValid: false, errorMessage: errorMsg})
  }

  isValidUser = async () => {
    const {userId, userPassword} = this.state
    const userCredentials = {
      user_id: userId,
      pin: userPassword,
    }
    const loginApi = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.isValidUser()
  }

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangeUserPwd = event => {
    this.setState({userPassword: event.target.value})
  }

  render() {
    const {userId, userPassword, isValid, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const app = (
      <div className="login-main-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <h1 className="title">Welcome Back!</h1>
            <label className="label" htmlFor="user-id">
              User ID
            </label>
            <input
              type="text"
              className="user-input"
              id="user-id"
              placeholder="Enter User ID"
              value={userId}
              onChange={this.onChangeUserInput}
            />
            <label className="label" htmlFor="user-pwd">
              PIN
            </label>
            <input
              type="password"
              className="user-input"
              id="user-pwd"
              placeholder="Enter PIN"
              value={userPassword}
              onChange={this.onChangeUserPwd}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {isValid ? '' : <p className="error-msg">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
    return app
  }
}

export default Login
