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
        <h1>RigoBlock</h1>
        <Provider store={store}>
          <Counter />
        </Provider>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
