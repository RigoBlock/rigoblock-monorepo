import { BigNumber } from 'bignumber.js'
import { ETH_TO_WEI } from '../../../constants/utils'
import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Table from '../../molecules/Table'
import moment from 'moment'

let VaultTransactions = ({ transactions }) => {
  const linkComponent = link => (
    <Link to={link}>
      <Icon type="error_outline" className="link-icon" />
    </Link>
  )
  const parsedTransactions = transactions
    ? Object.entries(transactions).map(([hash, data]) => ({
        ...data,
        id: hash,
        transactionLink: linkComponent('#')
      }))
    : null
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
      accessor: d =>
        d.value
          .div(ETH_TO_WEI)
          .toFormat(2, BigNumber.ROUND_FLOOR)
          .toString(),
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
    <Table
      className="vault-transactions"
      tableData={parsedTransactions}
      tableColumns={tableColumns}
      title="Transactions"
      noDataText="No transactions found."
    />
  )
}

VaultTransactions.propTypes = {
  transactions: PropTypes.object
}

VaultTransactions.defaultProps = {
  columnWidths: [],
  transactions: null
}

export default VaultTransactions
