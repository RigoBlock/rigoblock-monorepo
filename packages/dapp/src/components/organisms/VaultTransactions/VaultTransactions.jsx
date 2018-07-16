import './VaultTransactions.scss'
import { ETH_TO_WEI } from '../../../constants/utils'
import { connect } from 'react-redux'
import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Title from '../../atoms/Title'
import TransactionsTable from '../../molecules/TransactionsTable'
import moment from 'moment'

let VaultTransactions = ({ transactions, vaultAddress }) => {
  const linkComponent = link => (
    <Link to={link}>
      <Icon type="error_outline" className="link-icon" />
    </Link>
  )

  const vaultTransactions = transactions[vaultAddress]
  const parsedTransactions = vaultTransactions
    ? Object.keys(vaultTransactions).map(hash => ({
        ...vaultTransactions[hash],
        date: moment(vaultTransactions[hash].date).format('DD/MM/YY'),
        id: hash,
        transactionLink: linkComponent('#')
      }))
    : []

  const tableColumns = [
    {
      Header: 'ID',
      id: 'id',
      accessor: d => d.id.substr(d.id.length - 5, 5).toUpperCase(),
      maxWidth: 60
    },
    {
      Header: 'Date',
      id: 'date',
      accessor: d => moment(d.date).format('DD/MM/YY'),
      maxWidth: 70
    },
    {
      Header: 'Type',
      accessor: 'type',
      maxWidth: 75
    },
    {
      Header: 'Symbol',
      accessor: 'symbol',
      maxWidth: 60
    },
    {
      Header: 'Value',
      id: 'value',
      accessor: d => d.value.div(ETH_TO_WEI).toString(),
      maxWidth: 50
    },
    {
      Header: 'Units',
      id: 'units',
      accessor: d => d.units.toString(),
      maxWidth: 90
    },
    {
      Header: '',
      accessor: 'transactionLink',
      width: 40,
      sortable: false
    }
  ]

  return (
    <div className="vault-transactions">
      <Title>Transactions</Title>
      <TransactionsTable
        tableData={parsedTransactions}
        tableColumns={tableColumns}
      />
    </div>
  )
}

VaultTransactions.propTypes = {
  vaultAddress: PropTypes.string.isRequired,
  transactions: PropTypes.object
}

VaultTransactions.defaultProps = {
  transactions: {},
  columnWidths: []
}

VaultTransactions = connect(state => {
  const { currentAccount } = state.preferences
  return {
    transactions: currentAccount
      ? state.blockChain.accounts[currentAccount].vaultTransactions
      : {},
    location: state.routing.location.pathname
  }
})(VaultTransactions)

export default VaultTransactions
