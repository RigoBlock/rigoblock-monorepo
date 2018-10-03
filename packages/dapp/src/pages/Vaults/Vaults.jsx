import './Vaults.scss'
import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultPanel from '../../components/organisms/VaultPanel'
import VaultSelect from '../../components/organisms/VaultSelect'

class Vaults extends Component {
  render() {
    return (
      <BaseTemplate className="vaults">
        <VaultSelect />
        <VaultPanel />
      </BaseTemplate>
    )
  }
}

export default Vaults
