import './Preferences.scss'
import BaseTemplate from '../../components/templates/BaseTemplate'
import PreferencesForm from '../../components/organisms/PreferencesForm'
import React, { Component } from 'react'

class Preferences extends Component {
  render() {
    return (
      <BaseTemplate>
        <div className="preferences-content">
          <h1>Preferences</h1>
          <PreferencesForm />
        </div>
      </BaseTemplate>
    )
  }
}

export default Preferences
