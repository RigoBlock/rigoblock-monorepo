import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

describe('CreateVaultModal component', () => {
  const apiMock = {
    contract: {
      DragoRegistry: {
        address: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52la4',
        createAndValidate: jest.fn()
      }
    }
  }

  let CreateVaultModal
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

    CreateVaultModal = require('./CreateVaultModal').default
  })

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreateVaultModal />
      </Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
