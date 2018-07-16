import './Table.scss'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'
import Title from '../../atoms/Title'

const Table = ({ tableData, tableColumns, title }) => (
  <div className="table">
    <Title>{title}</Title>
    <ReactTable
      data={tableData}
      PaginationComponent={TablePagination}
      columns={tableColumns}
      defaultPageSize={10}
      className="-striped"
    />
  </div>
)

Table.propTypes = {
  tableData: PropTypes.array,
  title: PropTypes.string.isRequired,
  tableColumns: PropTypes.array.isRequired
}

Table.defaultProps = {
  tableData: []
}

export default Table
