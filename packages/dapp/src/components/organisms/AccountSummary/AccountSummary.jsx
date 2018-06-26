import './AccountSummary.scss'
import { ETHTOWEI } from '../../../constants/utils'
import AccountItem, { ACCOUNT_ITEM_TYPES } from '../../molecules/AccountItem'
import Amount, { AMOUNT_SIZES } from '../../molecules/Amount'
import PropTypes from 'prop-types'
import React from 'react'

const AccountSummary = ({ provider, number, balance }) => {
  const ethBalance = balance / ETHTOWEI
  return (
    <div className="account-summary">
      <AccountItem
        appearance={ACCOUNT_ITEM_TYPES.FULL}
        provider={provider}
        number={number}
      />
      <div className="balances">
        <Amount value={ethBalance} symbol={'ETH'} size={AMOUNT_SIZES.SMALL} />
      </div>
    </div>
  )
}

AccountSummary.propTypes = {
  provider: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired
}

export default AccountSummary
