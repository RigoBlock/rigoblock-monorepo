import * as ROUTES from '../../constants/routes'
import { connect } from 'react-redux'
import BaseTemplate from '../../components/templates/BaseTemplate'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import VaultSelect from '../../components/organisms/VaultSelect'

class Vaults extends Component {
  render() {
    // TODO: use the match prop to render the correct Vault
    // depending on url
    return this.props.location === ROUTES.VAULTS ? (
      <BaseTemplate>
        <VaultSelect />
      </BaseTemplate>
    ) : (
      <BaseTemplate>
        <VaultSelect />
        {/* vault view component */}
      </BaseTemplate>
    )
  }
}

Vaults.propTypes = {
  location: PropTypes.string.isRequired
}

export default connect(state => ({
  location: state.routing.location.pathname
}))(Vaults)
