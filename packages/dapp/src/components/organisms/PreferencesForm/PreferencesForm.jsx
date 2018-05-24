import './PreferencesForm.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldRedux from '../../atoms/SelectFieldRedux'
import UserActions from '../../../actions/user-actions'
import moment from 'moment-timezone'

const timeToDecimal = t => {
  t = t.split(':')
  return parseInt(t[0], 10) * 1 + parseInt(t[1], 10) / 60
}

const timeZones = moment.tz.names().reduce((acc, curr) => {
  return acc.add(moment.tz(curr).format('Z'))
}, new Set())
const timeZoneValues = [...timeZones].sort(
  (a, b) => timeToDecimal(a) - timeToDecimal(b)
)

let PreferencesForm = props => {
  const timeZoneProps = {
    id: 1,
    items: timeZoneValues
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.changePreferences(props.formObject.preferences.values)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Time zone</h3>
      <SelectFieldRedux fieldName={'timezone'} fieldProps={timeZoneProps} />
      <CallToAction>
        <Button
          onClick={() => {
            props.reset
          }}
        >
          Cancel
        </Button>
        <Button appearance={BUTTON_TYPES.INVERTED} type="submit">
          Save
        </Button>
      </CallToAction>
    </form>
  )
}

PreferencesForm.propTypes = {
  reset: PropTypes.func.isRequired,
  changePreferences: PropTypes.func.isRequired,
  formObject: PropTypes.shape({
    preferences: PropTypes.shape({
      values: PropTypes.object
    })
  }).isRequired
}

PreferencesForm = reduxForm({
  form: 'preferences'
})(PreferencesForm)

PreferencesForm = connect(
  state => ({
    user: state.user,
    formObject: state.form,
    initialValues: state.user
  }),
  dispatch => bindActionCreators(UserActions, dispatch)
)(PreferencesForm)

export default PreferencesForm
