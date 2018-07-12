import './TablePagination.scss'
import Icon from '../Icon'
import PropTypes from 'prop-types'
import React from 'react'

const TablePagination = ({
  page,
  pages,
  onPageChange,
  canPrevious,
  canNext
}) => {
  const changePage = newPage =>
    page !== newPage ? onPageChange(newPage) : null
  return (
    <div className="pagination">
      <div className="table-navigation">
        <span className="first-page" onClick={() => changePage(0)}>
          <Icon type="navigate_before" className="stacked-icon" />
          <Icon type="navigate_before" />
        </span>
        <Icon
          type="navigate_before"
          onClick={() => (canPrevious ? changePage(page - 1) : null)}
        />
        <span className="page-number">{page + 1}</span>
        <Icon
          type="navigate_next"
          onClick={() => (canNext ? changePage(page + 1) : null)}
        />
        <span className="last-page" onClick={() => changePage(pages)}>
          <Icon type="navigate_next" />
          <Icon type="navigate_next" className="stacked-icon" />
        </span>
      </div>
    </div>
  )
}
TablePagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  canNext: PropTypes.bool.isRequired,
  canPrevious: PropTypes.bool.isRequired
}

export default TablePagination
