import React, { Component } from 'react'
import BaseTemplate from '../../components/templates/BaseTemplate'
import './Login.scss'

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <BaseTemplate>
          <div className="login">
            <h1>Hello there!</h1>
            <p>
              Rigoblock is a decentralized app that runs on Ethereum Blockchain.
              To start using it, just follow these 3 simple steps
            </p>
          </div>
        </BaseTemplate>
      </div>
    )
  }
}

export default Login
