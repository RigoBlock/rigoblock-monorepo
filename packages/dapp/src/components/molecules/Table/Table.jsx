import './Table.scss'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'
import Title from '../../atoms/Title'
import classNames from 'classnames'

const Table = ({ tableData, tableColumns, title, className }) => (
  <div className={classNames('table', className)}>
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
  tableColumns: PropTypes.array.isRequired,
  className: PropTypes.string
}

Table.defaultProps = {
  tableData: [],
  className: ''
}

export default Table
