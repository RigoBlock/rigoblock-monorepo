import BaseTemplate from '../../components/templates/BaseTemplate'
import CreateVaultForm from '../../components/organisms/CreateVaultForm'
import React, { Component } from 'react'

class Dragos extends Component {
  render() {
    return (
      <BaseTemplate>
        <h1>Dragos</h1>
        <CreateVaultForm />
      </BaseTemplate>
    )
  }
}

export default Dragos
