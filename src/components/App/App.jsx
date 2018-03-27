import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../store'
import PropTypes from 'prop-types'
import Counter from '../Counter'
import './App.scss'

const store = configureStore()
class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <h1>{this.props.title}</h1>
        <Provider store={store}>
          <Counter />
        </Provider>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

export default App
