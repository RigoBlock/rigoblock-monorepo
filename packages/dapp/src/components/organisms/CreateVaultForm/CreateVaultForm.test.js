import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import CreateVaultForm from './CreateVaultForm.jsx'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'
import vaultActions from '../../../actions/vault-actions'

const vaultData = {
  accountNumber: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
  vaultName: 'New Vault',
  vaultSymbol: 'VLT'
}

const store = mockStore({
  mockFn: jest.fn,
  optionalState: {
    form: {
      createVault: {
        values: vaultData,
        initial: vaultData
      }
    }
  }
})

const wrapper = mount(
  <Provider store={store}>
    <CreateVaultForm />
  </Provider>
)

describe('CreateVaultForm component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('fires the changePreferences action on submit', () => {
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(store.dispatch).toHaveBeenCalledWith(
      vaultActions.createVault(vaultData)
    )
  })
})
