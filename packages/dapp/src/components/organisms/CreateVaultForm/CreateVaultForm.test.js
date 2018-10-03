import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import globalActions from '../../../actions/global-actions'
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
    }
  }

  let CreateVaultForm
  const vaultData = {
    accountNumber: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
    vaultName: 'New Vault',
    vaultSymbol: 'VLT'
  }

  let store

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../api', () => apiMock)

    store = mockStore({
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

  it('fires the createVault action on submit', () => {
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

  it('fires the closeModal action on cancel', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreateVaultForm />
      </Provider>
    )
    const button = wrapper.find('div.call-to-action button').at(0)
    button.simulate('click')
    expect(store.dispatch).toHaveBeenCalledWith(globalActions.closeModal())
  })

  describe('with a real store', () => {
    const createStore = require('redux').createStore
    const defaultState = require('../../../fixtures/store').defaultState
    const rootReducer = require('../../../reducers').default
    let wrapper

    beforeEach(() => {
      store = createStore(rootReducer, defaultState)
      wrapper = mount(
        <Provider store={store}>
          <CreateVaultForm />
        </Provider>
      )
    })

    it('allows you to modify vault name', () => {
      const input = wrapper.find('input[id="1"]')
      input.simulate('change', { target: { value: 'Changed' } })
      expect(input.instance().value).toEqual('Changed')
    })

    it('allows you to modify vault symbol', () => {
      const input = wrapper.find('input[id="2"]')
      input.simulate('change', { target: { value: 'Changed' } })
      expect(input.instance().value).toEqual('Changed')
    })

    it('prevents you to add non-alphanumeric characters to vault name', () => {
      const input = wrapper.find('input[id="1"]')
      input.simulate('change', { target: { value: 'valid name' } })
      expect(input.instance().value).toEqual('valid name')
      input.simulate('change', { target: { value: 'valid name!@£$%' } })
      expect(input.instance().value).toEqual('valid name')
    })

    it('prevents you to add non-alphanumeric characters to vault symbol', () => {
      const input = wrapper.find('input[id="2"]')
      input.simulate('change', { target: { value: 'SYM' } })
      expect(input.instance().value).toEqual('SYM')
      input.simulate('change', { target: { value: 'SYM!@£$%' } })
      expect(input.instance().value).toEqual('SYM')
    })

    it('prevents you to submit an empty vault name', () => {
      const input = wrapper.find('input[id="1"]')
      input.simulate('change', { target: { value: '' } })
      expect(input.instance().value).toEqual('')

      const form = wrapper.find('form')
      form.simulate('submit')

      const errorMessage = wrapper.find('.md-text-field-message').at(0)
      expect(errorMessage).toMatchSnapshot()
    })

    it('prevents you to submit an invalid vault symbol', () => {
      const input = wrapper.find('input[id="2"]')
      input.simulate('change', { target: { value: 'Changed' } })
      expect(input.instance().value).toEqual('Changed')

      const form = wrapper.find('form')
      form.simulate('submit')

      const errorMessage = wrapper.find('.md-text-field-message').at(1)
      expect(errorMessage).toMatchSnapshot()
    })
  })
})
