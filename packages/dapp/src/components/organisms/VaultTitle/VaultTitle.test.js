import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import VaultTitle from './VaultTitle.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })
const props = { vaultAddress: '0x86a1ba4d485ce346bded508e2426798f825558be' }

const wrapper = mount(
  <Provider store={store}>
    <VaultTitle {...props} />
  </Provider>
)

describe('VaultTitle component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
