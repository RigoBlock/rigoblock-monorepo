import './Table.scss'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTable from 'react-table'
import TablePagination from '../../atoms/TablePagination'
import Title from '../../atoms/Title'
import classNames from 'classnames'

const Table = ({ tableData, tableColumns, title, className, noDataText }) =>
  tableData ? (
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
  ) : (
    <div className="no-data-table">
      <Title>{title}</Title>
      <div className="table-replacer">{noDataText}</div>
    </div>
  )

Table.propTypes = {
  tableData: PropTypes.array,
  title: PropTypes.string.isRequired,
  tableColumns: PropTypes.array.isRequired,
  className: PropTypes.string,
  noDataText: PropTypes.string
}

Table.defaultProps = {
  tableData: [],
  className: '',
  noDataText: ''
}

export default Table
