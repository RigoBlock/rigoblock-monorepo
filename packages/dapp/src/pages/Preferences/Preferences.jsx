import './Preferences.scss'
import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import TimeZoneSelect from '../../components/atoms/TimeZoneSelect'

class Preferences extends Component {
  render() {
    return (
      <BaseTemplate>
        <div className="preferences-content">
          <h1>Preferences</h1>
          <h3>Time zone</h3>
          <TimeZoneSelect />
        </div>
      </BaseTemplate>
    )
  }
}

export default Preferences
