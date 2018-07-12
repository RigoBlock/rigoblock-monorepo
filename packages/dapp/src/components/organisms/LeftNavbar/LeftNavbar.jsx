import './LeftNavbar.scss'
import AccountView from '../AccountView'
import NavigationView from '../NavigationView'
import React from 'react'
import WrapperWithDivider from '../../molecules/WrapperWIthDivider'

const divider = () => <div className="left-navbar-divider" />

const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <WrapperWithDivider Divider={divider}>
        <AccountView />
        <NavigationView />
      </WrapperWithDivider>
    </div>
  )
}

export default LeftNavbar
