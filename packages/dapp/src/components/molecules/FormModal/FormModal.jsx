import './FormModal.scss'
import PropTypes from 'prop-types'
import React from 'react'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'

const divider = () => <div className="modal-divider" />

const FormModal = ({ Header, Form }) => {
  return (
    <div className="form-modal">
      <WrapperWithDivider Divider={divider}>
        <div className="form-header">
          <Header />
        </div>
        <div className="form-content">
          <Form />
        </div>
      </WrapperWithDivider>
    </div>
  )
}

FormModal.propTypes = {
  Form: PropTypes.func.isRequired,
  Header: PropTypes.func.isRequired
}

export default FormModal
