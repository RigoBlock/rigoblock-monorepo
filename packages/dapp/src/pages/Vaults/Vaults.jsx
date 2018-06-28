import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultSelect from '../../components/organisms/VaultSelect'

class Vaults extends Component {
  render() {
    return (
      <BaseTemplate>
        <h1>Vaults</h1>
        <VaultSelect />
      </BaseTemplate>
    )
  }
}

export default Vaults
