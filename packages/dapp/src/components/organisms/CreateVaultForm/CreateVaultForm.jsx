import './CreateVaultForm.scss'
import { METAMASK } from '../../../constants/user'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldWithTitle from '../../molecules/SelectFieldWithTitle'
import TextFieldWithTitle from '../../molecules/TextFieldWithTitle'
import api from '../../../api'
import get from 'lodash/get'
import globalActions from '../../../actions/global-actions'
import vaultActions from '../../../actions/vault-actions'

const hideAccount = (accNumber, provider) => {
  const accProvider = provider ? provider : 'RPC provider'
  let displayedProvider =
    accProvider.toLowerCase() === METAMASK.toLowerCase()
      ? METAMASK
      : accProvider.charAt(0).toUpperCase() + accProvider.slice(1)
  return {
    label: `${displayedProvider || null} **** ${accNumber
      .substring(accNumber.length - 4)
      .toUpperCase()}`,
    value: accNumber
  }
}

const validate = values => {
  const errors = {}
  if (!values.vaultSymbol) {
    errors.vaultSymbol = 'Field is required.'
  }

  if (!values.vaultName) {
    errors.vaultName = 'Field is required.'
  }

  if (values.vaultSymbol && values.vaultSymbol.length !== 3) {
    errors.vaultSymbol = 'Vault symbol must be 3 letters.'
  }

  return errors
}

const asyncValidate = async values => {
  const vaultExistError = { vaultName: 'Vault already exists.' }
  const registry = await api.contract.DragoRegistry.createAndValidate(
    api.web3._web3,
    api.contract.DragoRegistry.address
  )
  try {
    const res = await registry.fromName(values.vaultName)
    if (res) {
      throw vaultExistError
    }
  } catch (e) {
    return e === vaultExistError ? e : null
  }
}

let CreateVaultForm = ({ accounts, formObject, dispatch, handleSubmit }) => {
  const hiddenAccounts = Object.entries(accounts).map(([accNumber, accData]) =>
    hideAccount(accNumber, accData.provider)
  )
  return (
    <form
      onSubmit={handleSubmit(() =>
        dispatch(vaultActions.createVault(formObject.createVault.values))
      )}
      className="create-vault-form"
    >
      <SelectFieldWithTitle
        title="Pay [mining] fees with"
        fieldName="accountNumber"
        tooltip="This account will be the vault's owner."
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
          placeholder: '3 Letters'
        }}
      />
      <CallToAction>
        <Button onClick={() => dispatch(globalActions.closeModal())}>
          Cancel
        </Button>
        <Button appearance={BUTTON_TYPES.INVERTED} type="submit">
          Create
        </Button>
      </CallToAction>
    </form>
  )
}

CreateVaultForm.propTypes = {
  accounts: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formObject: PropTypes.object.isRequired
}

CreateVaultForm = reduxForm({
  form: 'createVault',
  validate,
  asyncValidate,
  enableReinitialize: true
})(CreateVaultForm)

CreateVaultForm = connect(state => {
  const currentAccount = get(state, 'preferences.currentAccount', null)
  return {
    formObject: state.form,
    initialValues: {
      accountNumber: currentAccount ? currentAccount : null
    },
    accounts: state.blockChain.accounts
  }
})(CreateVaultForm)

export default CreateVaultForm
