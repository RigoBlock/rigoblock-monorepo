import './PreferencesForm.scss'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldWithTitle from '../../molecules/SelectFieldWithTitle'
import moment from 'moment-timezone'
import userActions from '../../../actions/user-actions'

const timeToDecimal = t => {
  t = t.split(':')
  return parseInt(t[0], 10) * 1 + parseInt(t[1], 10) / 60
}

const timeZones = moment.tz.names().reduce((acc, curr) => {
  return acc.add(moment.tz(curr).format('Z'))
}, new Set())
const timeZoneValues = [...timeZones]
  .sort((a, b) => timeToDecimal(a) - timeToDecimal(b))
  .map(timezone => `GMT ${timezone}`)

let PreferencesForm = ({ dispatch, reset, formObject, handleSubmit }) => {
  const timeZoneProps = {
    id: '1',
    items: timeZoneValues
  }
  return (
    <form
      onSubmit={handleSubmit(() =>
        dispatch(userActions.changePreferences(formObject.preferences.values))
      )}
      className="preferences-form"
    >
      <SelectFieldWithTitle
        fieldName={'timezone'}
        fieldProps={timeZoneProps}
        title="Time zone"
      />
      <CallToAction>
        <Button onClick={reset}>Cancel</Button>
        <Button appearance={BUTTON_TYPES.INVERTED} type="submit">
          Save
        </Button>
      </CallToAction>
    </form>
  )
}

PreferencesForm.propTypes = {
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  formObject: PropTypes.shape({
    preferences: PropTypes.shape({
      values: PropTypes.object
    })
  }).isRequired
}

PreferencesForm = reduxForm({
  form: 'preferences',
  enableReinitialize: true
})(PreferencesForm)

PreferencesForm = connect(state => ({
  formObject: state.form,
  initialValues: state.preferences
}))(PreferencesForm)

export default PreferencesForm
