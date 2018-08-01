import './BaseTemplate.scss'
import { connect } from 'react-redux'
import LeftNavbar from '../../organisms/LeftNavbar'
import Modal from '../../molecules/Modal'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import TopNavbar from '../../organisms/TopNavbar'
import classNames from 'classnames'
import globalActions from '../../../actions/global-actions'

class BaseTemplate extends PureComponent {
  render() {
    const { children, className, modalComponent, dispatch } = this.props
    const contentClass = classNames('page-main-content', className)
    return (
      <div>
        <TopNavbar />
        <div className="page-content-section">
          <LeftNavbar />
          <div className={contentClass}>{children}</div>
        </div>
        <Modal
          Component={modalComponent}
          onClickOutside={() => dispatch(globalActions.closeModal())}
        />
      </div>
    )
  }
}

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalComponent: PropTypes.element
}

BaseTemplate.defaultProps = {
  className: undefined, // TODO use null
  modalComponent: null
}

BaseTemplate = connect(state => {
  const { modalComponent } = state.globalReducer
  return { modalComponent }
})(BaseTemplate)

export default BaseTemplate
