import './AccountList.scss'
import AccountItem from '../AccountItem'
import PropTypes from 'prop-types'
import React from 'react'

const AccountList = ({ accounts }) => {
  const accountList = Object.keys(accounts).map(account => ({
    number: account,
    provider: accounts[account].provider
  }))
  const listItems = accountList.map((account, i) => (
    <AccountItem key={i} {...account} />
  ))
  return <div className="account-list">{listItems}</div>
}

AccountList.propTypes = {
  accounts: PropTypes.object.isRequired
}

export default AccountList
