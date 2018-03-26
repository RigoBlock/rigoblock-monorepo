import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CounterActions from '../../actions/counter-actions'

class Counter extends Component {
  addCount = () => {
    this.props.add()
  }

  render() {
    return (
      <button className="counter" onClick={this.addCount}>
        {this.props.count}
      </button>
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
