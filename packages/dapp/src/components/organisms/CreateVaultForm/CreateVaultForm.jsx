import './CreateVaultForm.scss'
import { METAMASK } from '../../../constants/user'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from '../../molecules/CallToAction'
import ContentWrapper from '../../molecules/ContentWrapper'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldWithTitle from '../../molecules/SelectFieldWithTitle'
import TextFieldWithTitle from '../../molecules/TextFieldWithTitle'
import Title from '../../atoms/Title'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'
import get from 'lodash/get'

const divider = () => <div className="form-divider" />

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

let CreateVaultForm = ({ accounts }) => {
  const hiddenAccounts = Object.entries(accounts).map(([accNumber, accData]) =>
    hideAccount(accNumber, accData.provider)
  )
  return (
    <div className="create-vault-form">
      <ContentWrapper>
        <WrapperWithDivider Divider={divider}>
          <div className="form-title">
            <Title>Create Vault</Title>
          </div>
          <div className="form-content">
            <SelectFieldWithTitle
              title="Pay [mining] fees with"
              fieldName="accountList"
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
              <Button>Cancel</Button>
              <Button appearance={BUTTON_TYPES.INVERTED}>Create</Button>
            </CallToAction>
          </div>
        </WrapperWithDivider>
      </ContentWrapper>
    </div>
  )
}

CreateVaultForm.propTypes = {
  accounts: PropTypes.object.isRequired
}

CreateVaultForm = reduxForm({
  form: 'createVault',
  enableReinitialize: true
})(CreateVaultForm)

CreateVaultForm = connect(state => {
  const currentAccount = get(state, 'preferences.currentAccount', null)
  return {
    formObject: state.form,
    initialValues: {
      accountList: currentAccount ? currentAccount : null
    },
    accounts: state.blockChain.accounts
  }
})(CreateVaultForm)

export default CreateVaultForm
