import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import Vaults from './Vaults.jsx'
import mockStore from '../../fixtures/store'
import toJson from 'enzyme-to-json'

const store = mockStore({ mockFn: jest.fn })

const wrapper = shallow(
  <Provider store={store}>
    <Vaults />
  </Provider>
)

describe('Vaults page', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
