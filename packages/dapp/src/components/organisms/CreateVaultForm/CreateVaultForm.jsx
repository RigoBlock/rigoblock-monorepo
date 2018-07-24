import './CreateVaultForm.scss'
import { METAMASK } from '../../../constants/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldWithTitle from '../../molecules/SelectFieldWithTitle'
import TextFieldWithTitle from '../../molecules/TextFieldWithTitle'
import get from 'lodash/get'
import vaultActions from '../../../actions/vault-actions'

const hideAccount = (accNumber, provider) => {
  let displayedProvider =
    provider && provider.toLowerCase() === METAMASK.toLowerCase()
      ? METAMASK
      : provider.charAt(0).toUpperCase() + provider.slice(1)
  const returnValue = {
    label: `${displayedProvider || null} **** ${accNumber
      .substring(accNumber.length - 4)
      .toUpperCase()}`,
    value: accNumber
  }
  return returnValue
}

let CreateVaultForm = ({ accounts, createVault, formObject, reset }) => {
  const handleSubmit = e => {
    e.preventDefault()
    createVault(formObject.createVault.values)
  }
  const hiddenAccounts = Object.entries(accounts).map(([accNumber, accData]) =>
    hideAccount(accNumber, accData.provider)
  )
  return (
    <div className="thewrapper">
      <form onSubmit={handleSubmit} className="create-vault-form">
        <SelectFieldWithTitle
          title="Pay [mining] fees with"
          fieldName="accountNumber"
          tooltip="This account will be used to pay mining fees for the transaction"
          fieldProps={{
            id: '0',
            items: hiddenAccounts
          }}
        />
        <TextFieldWithTitle
          title="Vault name"
          fieldName="vaultName"
          fieldProps={{ id: '1' }}
        />
        <TextFieldWithTitle
          title="Vault symbol"
          fieldName="vaultSymbol"
          fieldProps={{
            id: '2',
            fullWidth: false,
            size: 8,
            maxLength: 3,
            placeholder: '3 Letters'
          }}
        />
        <CallToAction>
          <Button onClick={reset}>Cancel</Button>
          <Button appearance={BUTTON_TYPES.INVERTED} type="submit">
            Create
          </Button>
        </CallToAction>
      </form>
    </div>
  )
}

CreateVaultForm.propTypes = {
  accounts: PropTypes.object.isRequired,
  createVault: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  formObject: PropTypes.object.isRequired
}

CreateVaultForm = reduxForm({
  form: 'createVault',
  enableReinitialize: true
})(CreateVaultForm)

CreateVaultForm = connect(
  state => {
    const currentAccount = get(state, 'preferences.currentAccount', null)
    return {
      formObject: state.form,
      initialValues: {
        accountNumber: currentAccount ? currentAccount : null
      },
      accounts: state.blockChain.accounts
    }
  },
  dispatch => bindActionCreators(vaultActions, dispatch)
)(CreateVaultForm)

export default CreateVaultForm
