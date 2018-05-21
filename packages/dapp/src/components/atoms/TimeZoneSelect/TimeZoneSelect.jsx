import './TimeZoneSelect.scss'
import 'react-md/lib/Helpers'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import SelectField from '../SelectField'

const DEFAULT_TIMEZONE = 'GMT+1:00'
const TIMEZONE_VALUES = [
  'GMT-11:00',
  'GMT-10:00',
  'GMT-9:00',
  'GMT-8:00',
  'GMT-7:00',
  'GMT-6:00',
  'GMT-5:00',
  'GMT-4:00',
  'GMT-3:30',
  'GMT-3:00',
  'GMT-1:00',
  'GMT',
  'GMT+1:00',
  'GMT+2:00',
  'GMT+3:00',
  'GMT+3:30',
  'GMT+4:00',
  'GMT+5:00',
  'GMT+5:30',
  'GMT+6:00',
  'GMT+7:00',
  'GMT+8:00',
  'GMT+9:00',
  'GMT+9:30',
  'GMT+10:00',
  'GMT+11:00',
  'GMT+12:00'
]

const TimeZoneSelect = () => {
  const classProps = {
    id: '1',
    defaultValue: DEFAULT_TIMEZONE,
    items: TIMEZONE_VALUES
  }
  const renderSelectField = ({ input }) => {
    return <SelectField onChange={input.onChange} {...classProps} />
  }
  return (
    <form>
      <Field name="Time" component={renderSelectField} />
    </form>
  )
}

TimeZoneSelect.propTypes = {
  input: PropTypes.object
}

TimeZoneSelect.defaultProps = {
  input: {}
}

export default reduxForm({
  form: 'Timezone'
})(TimeZoneSelect)
