import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mockStore } from '../../../constants/utils'
import { mount, shallow } from 'enzyme'
import NavigationView from './NavigationView.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const store = mockStore(jest.fn)

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NavigationView />
    </MemoryRouter>
  </Provider>
)

const shallowWrapper = shallow(<NavigationView store={store} />).dive()

describe('NavigationView component', () => {
  it('renders correctly', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot()
  })

  it(`adds active class to drago link if we are in ${
    ROUTES.DRAGOS
  } route`, () => {
    const vaultLink = wrapper.find(`a[href='${ROUTES.VAULTS}']`)
    expect(vaultLink.hasClass('active')).toBe(true)
  })
})
