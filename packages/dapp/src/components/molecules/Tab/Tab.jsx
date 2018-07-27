import './Tab.scss'
import PropTypes from 'prop-types'
import React from 'react'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'

const divider = () => <div className="tab-divider" />

const Tab = ({ Header, forms }) => {
  if (forms.length === 1) {
    const Form = forms[0]
    return (
      <div className="tab">
        <WrapperWithDivider Divider={divider}>
          <div className="tab-header">
            <Header />
          </div>
          <div className="tab-content">
            <Form />
          </div>
        </WrapperWithDivider>
      </div>
    )
  }
  // TODO: add logic to support multiple forms
}

Tab.propTypes = {
  forms: PropTypes.array.isRequired,
  Header: PropTypes.func.isRequired
}

export default Tab
