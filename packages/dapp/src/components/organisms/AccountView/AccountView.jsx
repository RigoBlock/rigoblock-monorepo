import './AccountView.scss'
import { connect } from 'react-redux'
import AccountItem from '../../molecules/AccountItem'
import List from '../List'
import PropTypes from 'prop-types'
import React from 'react'
import Title, { TITLE_SIZES } from '../../atoms/Title'

let AccountView = ({ currentAccount, accounts }) => {
  const accountList = Object.keys(accounts).map(account => ({
    number: account,
    provider: accounts[account].provider
  }))
  return currentAccount ? (
    <div className="account-view">
      <Title size={TITLE_SIZES.SMALL}>Accounts</Title>
      <List
        Component={AccountItem}
        data={accountList}
        className={'account-list'}
      />
    </div>
  ) : (
    <div className="account-view">
      <h1>Accounts</h1>
      <div className="typeface">¯\_(ツ)_/¯</div>
    </div>
  )
}

AccountView.propTypes = {
  accounts: PropTypes.object.isRequired,
  currentAccount: PropTypes.string
}

AccountView.defaultProps = {
  currentAccount: null
}

AccountView = connect(state => ({
  currentAccount: state.preferences.currentAccount,
  accounts: state.blockChain.accounts
}))(AccountView)

export default AccountView
