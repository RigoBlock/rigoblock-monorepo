import './AccountItem.scss'
import { METAMASK } from '../../../constants/user'
import MetaMaskLogo from '../../../images/metamask-fox.svg'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip, { TOOLTIP_SIZES } from '../../atoms/Tooltip'

export const ACCOUNT_ITEM_TYPES = {
  FULL: 'full',
  SHORT: 'short'
}

const AccountItem = ({ provider, number, appearance }) => {
  const hiddenAccount = `**** ${number.substr(number.length - 4, 4)}`
  let displayedProvider = provider && provider.toLowerCase()
  let logoComponent = (
    <img src={`https://identicon-api.herokuapp.com/${number}/24?format=png`} />
  )

  if (displayedProvider === METAMASK.toLowerCase()) {
    displayedProvider = METAMASK
    logoComponent = <MetaMaskLogo />
  }
  // conditional logic for Parity to be added
  return appearance === ACCOUNT_ITEM_TYPES.SHORT ? (
    <div className="account-item-short">
      <div className="logo">{logoComponent}</div>
      <div className="info">
        <span className="provider">{displayedProvider}</span>
        <span className="account-number">{hiddenAccount}</span>
      </div>
    </div>
  ) : (
    <div className="account-item-full">
      <div className="provider">
        <div className="logo">{logoComponent}</div>
        <span className="name">{displayedProvider}</span>
      </div>
      <span className="account-number">
        <span>{number}</span>
        {/* TODO: add copy to clipboard function */}
        <Tooltip type="filter_none" size={TOOLTIP_SIZES.SMALL} />
      </span>
    </div>
  )
}

AccountItem.propTypes = {
  provider: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf([
    ACCOUNT_ITEM_TYPES.FULL,
    ACCOUNT_ITEM_TYPES.SHORT
  ])
}

AccountItem.defaultProps = {
  appearance: ACCOUNT_ITEM_TYPES.SHORT
}

export default AccountItem
