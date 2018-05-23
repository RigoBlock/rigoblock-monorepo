import './PreferencesForm.scss'
import 'react-md/lib/Helpers'
import { reduxForm } from 'redux-form'
import React from 'react'
import SelectFieldRedux from '../../atoms/SelectFieldRedux'
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

const timeZoneProps = {
  id: 1,
  items: timeZoneValues,
  defaultValue: moment.tz(moment.tz.guess()).format('Z')
}

const PreferencesForm = () => {
  const onSubmit = values => console.log(values)
  return (
    <form onSubmit={onSubmit}>
      <h3>Time zone</h3>
      <SelectFieldRedux fieldName={'timezone'} fieldProps={timeZoneProps} />
    </form>
  )
}

export default reduxForm({
  form: 'preferences'
})(PreferencesForm)

// const defaultValue = () => {
//   const userTimezone = moment.tz.guess()
//   let offset = parseInt(moment.tz(userTimezone).format('Z'), 10)
//   offset = offset < 0 ? `GMT ${offset}` : `GMT +${offset}`
//   return offset
// }
