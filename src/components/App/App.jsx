import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from '../Counter'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        {/* <h1>{this.props.title}</h1> */}
        <h1>RigoBlock</h1>
      </div>
    )
  }
}

// App.propTypes = {
//   title: PropTypes.string.isRequired
// }

export default App
