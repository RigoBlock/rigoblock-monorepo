import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import VaultFees from './VaultFees.jsx'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })
const props = { vaultAddress: '0x86a1ba4d485ce346bded508e2426798f825558be' }

const wrapper = shallow(
  <Provider store={store}>
    <VaultFees {...props} />
  </Provider>
)

describe('VaultFees component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
