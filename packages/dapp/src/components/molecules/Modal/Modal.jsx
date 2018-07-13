import './Modal.scss'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Modal extends PureComponent {
  onClickOutside = e => {
    const { onClickOutside } = this.props
    if (!this.modalContent.contains(e.target)) {
      onClickOutside()
    }
  }

  render() {
    const { Component } = this.props
    return Component ? (
      <div className="modal-wrapper" onClick={this.onClickOutside}>
        <div
          className="modal-content"
          ref={modalContent => (this.modalContent = modalContent)}
        >
          <Component />
        </div>
      </div>
    ) : null
  }
}

Modal.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onClickOutside: PropTypes.func
}

Modal.defaultProps = {
  Component: null,
  onClickOutside: () => {}
}

export default Modal
