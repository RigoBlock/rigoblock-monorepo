import './AccountView.scss'
import { connect } from 'react-redux'
import AccountItem from '../../molecules/AccountItem'
import List from '../List'
import PropTypes from 'prop-types'
import React from 'react'

let AccountView = ({ accounts }) => {
  const accountList = Object.keys(accounts).map(account => ({
    number: account,
    provider: accounts[account].provider
  }))
  return (
    <div className="account-view">
      <h1 />
      <List
        Component={AccountItem}
        data={accountList}
        className={'account-list'}
      />
    </div>
  )
}

AccountView.propTypes = {
  accounts: PropTypes.object.isRequired
}

AccountView = connect(state => ({ accounts: state.user.blockChain.accounts }))(
  AccountView
)

export default AccountView
