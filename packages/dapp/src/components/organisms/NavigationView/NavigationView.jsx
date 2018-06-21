import './NavigationView.scss'
import * as ROUTES from '../../../constants/routes'
import List from '../List'
import PropTypes from 'prop-types'
import React from 'react'
import ViewLink from '../../molecules/ViewLink'

const NavigationView = () => {
  const navLinks = [
    {
      icon: 'dashboard',
      link: ROUTES.DASHBOARD
    },
    {
      icon: 'lock',
      link: ROUTES.VAULTS
    }
  ]
  return (
    <div className="navigation-view">
      <List Component={ViewLink} data={navLinks} />
    </div>
  )
}

NavigationView.propTypes = {
  accounts: PropTypes.object.isRequired
}

export default NavigationView
