import './AccountItem.scss'
import { METAMASK } from '../../../constants/user'
import MetaMaskLogo from '../../atoms/SVG/MetaMaskLogo'
import PropTypes from 'prop-types'
import React from 'react'

const AccountItem = ({ provider, number }) => {
  const displayedAccount = `****${number.substr(number.length - 4, 4)}`
  let displayedProvider
  let logoComponent
  if (provider === METAMASK.toLowerCase()) {
    displayedProvider = METAMASK
    logoComponent = <MetaMaskLogo />
  }
  // conditional logic for Parity to be added
  return (
    <div className="accountItem">
      <div className="account-item-logo">{logoComponent}</div>
      <div className="account-item-info">
        <span className="account-item-provider">{displayedProvider}</span>
        <span className="account-item-number">{displayedAccount}</span>
      </div>
    </div>
  )
}

AccountItem.propTypes = {
  provider: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired
}

export default AccountItem
