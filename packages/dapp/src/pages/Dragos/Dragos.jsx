import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import TextFieldWithTitle from '../../components/molecules/TextFieldWithTitle'

const props = {
  tooltip: "Write here the vault's name",
  title: 'Vault name',
  fieldName: 'vaultName',
  fieldProps: {
    id: 'testTextField'
  }
}

class Dragos extends Component {
  render() {
    return (
      <BaseTemplate>
        <h1>Dragos</h1>
        <TextFieldWithTitle {...props} />
      </BaseTemplate>
    )
  }
}

export default Dragos
