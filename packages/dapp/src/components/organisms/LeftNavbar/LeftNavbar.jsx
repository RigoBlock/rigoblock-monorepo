import './LeftNavbar.scss'
import AccountView from '../AccountView'
import NavigationView from '../NavigationView'
import React from 'react'

const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <AccountView />
      <div className="navbar-divider" />
      <NavigationView />
    </div>
  )
}

export default LeftNavbar
