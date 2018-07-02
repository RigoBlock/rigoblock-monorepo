import './AccountSummary.scss'
import { BigNumber } from 'bignumber.js'
import { ETHTOWEI } from '../../../constants/utils'
import AccountItem, { ACCOUNT_ITEM_TYPES } from '../../molecules/AccountItem'
import Amount, { AMOUNT_SIZES } from '../../molecules/Amount'
import PropTypes from 'prop-types'
import React from 'react'

const AccountSummary = ({ provider, number, balance, tokenBalance }) => {
  const ethBalance = balance.div(ETHTOWEI)
  return (
    <div className="account-summary">
      <AccountItem
        appearance={ACCOUNT_ITEM_TYPES.FULL}
        provider={provider}
        number={number}
      />
      <div className="balances">
        <Amount value={ethBalance} symbol={'ETH'} size={AMOUNT_SIZES.SMALL} />
        <Amount value={tokenBalance} symbol={'GRG'} size={AMOUNT_SIZES.SMALL} />
      </div>
    </div>
  )
}

AccountSummary.propTypes = {
  provider: PropTypes.string.isRequired,
  balance: PropTypes.object,
  tokenBalance: PropTypes.object,
  number: PropTypes.string.isRequired
}

AccountSummary.defaultProps = {
  balance: new BigNumber(0),
  tokenBalance: new BigNumber(0)
}

export default AccountSummary
