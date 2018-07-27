import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'
import vaultActions from '../../../actions/vault-actions'

describe('CreateVaultForm component', () => {
  const apiMock = {
    contract: {
      DragoRegistry: {
        address: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52la4',
        createAndValidate: jest.fn()
      }
    },
    web3: {
      '._web3': {}
    }
  }

  let CreateVaultForm
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

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../api', () => apiMock)

    CreateVaultForm = require('./CreateVaultForm').default
  })

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreateVaultForm />
      </Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('fires the changePreferences action on submit', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreateVaultForm />
      </Provider>
    )
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(store.dispatch).toHaveBeenCalledWith(
      vaultActions.createVault(vaultData)
    )
  })
})
