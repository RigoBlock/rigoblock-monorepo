import './TransactionsTable.scss'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'

const TransactionsTable = ({ tableData, tableColumns }) => (
  <ReactTable
    data={tableData}
    PaginationComponent={TablePagination}
    columns={tableColumns}
    defaultPageSize={10}
    className="-striped"
  />
)

TransactionsTable.propTypes = {
  tableData: PropTypes.array,
  tableColumns: PropTypes.array.isRequired
}

TransactionsTable.defaultProps = {
  tableData: []
}

export default TransactionsTable
