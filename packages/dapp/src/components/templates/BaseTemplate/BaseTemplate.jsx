import './BaseTemplate.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GlobalActions from '../../../actions/global-actions'
import LeftNavbar from '../../organisms/LeftNavbar'
import Modal from '../../molecules/Modal'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import TopNavbar from '../../organisms/TopNavbar'
import classNames from 'classnames'

class BaseTemplate extends PureComponent {
  render() {
    const { children, className, modalComponent, closeModal } = this.props
    const contentClass = classNames('page-main-content', className)
    return (
      <div>
        <TopNavbar />
        <div className="page-content-section">
          <LeftNavbar />
          <div className={contentClass}>{children}</div>
        </div>
        <Modal Component={modalComponent} onClickOutside={closeModal} />
      </div>
    )
  }
}

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalComponent: PropTypes.element
}

BaseTemplate.defaultProps = {
  className: undefined, // TODO use null
  modalComponent: null
}

BaseTemplate = connect(
  state => {
    const { modalComponent } = state.globalReducer
    return { modalComponent }
  },
  dispatch => bindActionCreators(GlobalActions, dispatch)
)(BaseTemplate)

export default BaseTemplate
