import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultSelect from '../../components/organisms/VaultSelect'

class Vaults extends Component {
  render() {
    // TODO: use the match prop to render the correct Vault
    // depending on url
    return (
      <BaseTemplate>
        <VaultSelect />
      </BaseTemplate>
    )
  }
}

export default Vaults
