import './VaultTransactionsTable.scss'
import { ETH_TO_WEI } from '../../../constants/utils'
import { connect } from 'react-redux'
import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'
import moment from 'moment'

let vaultTransactionsTable = ({ vaultAddress, transactions, columnWidths }) => {
  const linkComponent = link => (
    <Link to={link}>
      <Icon type="error_outline" className="link-icon" />
    </Link>
  )
  const vaultTransactions = transactions[vaultAddress]
  const parsedTransactions = vaultTransactions
    ? Object.keys(vaultTransactions).map(hash => ({
        ...vaultTransactions[hash],
        id: hash,
        transactionLink: linkComponent('#')
      }))
    : []
  const [DATE_COLUMN_WIDTH, MAX_COLUMN_WIDTH, LINK_COLUMN_WIDTH] = columnWidths
  return (
    <ReactTable
      data={parsedTransactions}
      PaginationComponent={TablePagination}
      columns={[
        {
          Header: 'ID',
          id: 'id',
          accessor: d => d.id.substr(d.id.length - 5, 5).toUpperCase(),
          maxWidth: MAX_COLUMN_WIDTH || null
        },
        {
          Header: 'Date',
          id: 'date',
          accessor: d => moment(d.date).format('DD/MM/YY'),
          maxWidth: DATE_COLUMN_WIDTH || null
        },
        {
          Header: 'Type',
          accessor: 'type',
          maxWidth: MAX_COLUMN_WIDTH || null
        },
        {
          Header: 'Symbol',
          accessor: 'symbol',
          maxWidth: MAX_COLUMN_WIDTH || null
        },
        {
          Header: 'Value',
          id: 'value',
          accessor: d => d.value.div(ETH_TO_WEI).toString(),
          maxWidth: MAX_COLUMN_WIDTH || null
        },
        {
          Header: 'Units',
          id: 'units',
          accessor: d => d.units.toString()
        },
        {
          Header: '',
          accessor: 'transactionLink',
          width: LINK_COLUMN_WIDTH || null,
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
  vaultAddress: PropTypes.string.isRequired,
  columnWidths: PropTypes.array
}

vaultTransactionsTable.defaultProps = {
  transactions: {},
  vaults: {},
  columnWidths: []
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
