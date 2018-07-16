import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultSelect from '../../components/organisms/VaultSelect'
import VaultTransactionsTable from '../../components/organisms/VaultTransactionsTable'

class Vaults extends Component {
  render() {
    // TODO: use the match prop to render the correct Vault
    // depending on url
    return (
      <BaseTemplate>
        <VaultSelect />
        <VaultTransactionsTable
          vaultAddress="0x86a1ba4d485ce346bded508e2426798f825558be"
          columnWidths={[70, 60, 40]}
        />
      </BaseTemplate>
    )
  }
}

export default Vaults
