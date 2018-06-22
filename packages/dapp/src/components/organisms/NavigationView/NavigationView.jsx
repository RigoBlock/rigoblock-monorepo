import './NavigationView.scss'
import * as ROUTES from '../../../constants/routes'
import { connect } from 'react-redux'
import List from '../List'
import PropTypes from 'prop-types'
import React from 'react'
import ViewLink from '../../molecules/ViewLink'
import classNames from 'classnames'

let NavigationView = ({ currentUrl }) => {
  let navLinks = [
    {
      icon: 'dashboard',
      link: { to: ROUTES.DASHBOARD, text: 'Dashboard' }
    },
    {
      icon: 'account_balance_wallet',
      link: { to: ROUTES.DRAGOS, text: 'Dragos' }
    },
    {
      icon: 'lock',
      link: { to: ROUTES.VAULTS, text: 'Vaults' }
    }
  ]

  navLinks = navLinks.map(navLink => {
    return {
      ...navLink,
      className: classNames({ active: currentUrl === navLink.link.to })
    }
  })

  return (
    <div>
      <List
        Component={ViewLink}
        data={navLinks}
        className={'navigation-view'}
      />
    </div>
  )
}

NavigationView.propTypes = {
  currentUrl: PropTypes.string.isRequired
}

NavigationView = connect(state => ({
  currentUrl: state.routing.location.pathname
}))(NavigationView)

export default NavigationView
