import './AccountItem.scss'
import { METAMASK } from '../../../constants/user'
import Icon, { ICON_SIZES } from '../../atoms/Icon'
import MetaMaskLogo from '../../../images/metamask-fox.svg'
import PropTypes from 'prop-types'
import React from 'react'

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
        <div>
          <span className="name">{displayedProvider}</span>
          <span className="account-number">
            <span>{number}</span>
            {/* TODO: add copy to clipboard function */}
            <Icon type="filter_none" size={ICON_SIZES.SMALL} />
          </span>
        </div>
      </div>
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
