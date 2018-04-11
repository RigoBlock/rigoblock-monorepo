import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Counter from '../../components/Counter'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <h1>{this.props.title}</h1>
        <Link to="/vault" className="link">
          Vault
        </Link>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

export default App
