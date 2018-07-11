import 'react-table/react-table.css'
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import './VaultTransactionsTable.scss'
import { ETHTOWEI } from '../../../constants/utils'
import { connect } from 'react-redux'
import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'
import moment from 'moment'

let vaultTransactionsTable = ({ vaultAddress, transactions }) => {
  const linkComponent = link => (
    <Link to={link}>
      <Icon type="error_outline" className="link-icon" />
    </Link>
  )
  const vaultTransactions = transactions[vaultAddress]
  const parsedTransactions = vaultTransactions
    ? Object.keys(vaultTransactions).map(hash => ({
        id: hash,
        date: vaultTransactions[hash].date,
        type: vaultTransactions[hash].type,
        symbol: vaultTransactions[hash].symbol,
        units: vaultTransactions[hash].units,
        value: vaultTransactions[hash].value,
        transactionLink: linkComponent('#')
      }))
    : []
  const maxColumnWidth = 60
  return (
    <ReactTable
      data={parsedTransactions}
      PaginationComponent={TablePagination}
      columns={[
        {
          Header: 'ID',
          id: 'id',
          accessor: d => d.id.substr(d.id.length - 5, 5).toUpperCase(),
          maxWidth: maxColumnWidth
        },
        {
          Header: 'Date',
          id: 'date',
          accessor: d => moment(d.date).format('DD/MM/YY'),
          maxWidth: maxColumnWidth
        },
        {
          Header: 'Type',
          accessor: 'type',
          maxWidth: maxColumnWidth
        },
        {
          Header: 'Symbol',
          accessor: 'symbol',
          maxWidth: maxColumnWidth
        },
        {
          Header: 'Value',
          id: 'value',
          accessor: d => d.value.div(ETHTOWEI).toString(),
          maxWidth: maxColumnWidth
        },
        {
          Header: 'Units',
          id: 'units',
          accessor: d => d.units.toString()
        },
        {
          Header: '',
          accessor: 'transactionLink',
          width: 40,
          sortable: false
        }
      ]}
      defaultPageSize={10}
      className="-striped"
    />
  )
}

vaultTransactionsTable.propTypes = {
  transactions: PropTypes.object,
  vaultAddress: PropTypes.string.isRequired
}

vaultTransactionsTable.defaultProps = {
  transactions: {},
  vaults: {}
}

vaultTransactionsTable = connect(state => {
  const { currentAccount } = state.preferences
  return {
    transactions: currentAccount
      ? state.blockChain.accounts[currentAccount].vaultTransactions
      : {},
    vaults: currentAccount
      ? state.blockChain.accounts[currentAccount].vaults
      : {},
    location: state.routing.location.pathname
  }
})(vaultTransactionsTable)

export default vaultTransactionsTable
