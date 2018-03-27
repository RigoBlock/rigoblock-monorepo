import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import CounterActions from '../../actions/counter-actions'
import './Counter.scss'

class Counter extends Component {
  addCount = () => {
    this.props.add()
  }

  render() {
    return (
      <div>
        <p>Test counter</p>
        <button onClick={this.addCount} className="counter">
          {this.props.count}
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  add: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
}

export default connect(
  state => {
    return {
      count: state.counter
    }
  },
  dispatch => bindActionCreators(CounterActions, dispatch)
)(Counter)
