import * as ROUTES from '../../../constants/routes'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import NavigationView from './NavigationView.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'

const mockStore = {
  getState: () => ({
    routing: {
      location: {
        pathname: ROUTES.DRAGOS
      }
    }
  }),
  dispatch: jest.fn(),
  subscribe: () => null
}

const wrapper = mount(
  <Provider store={mockStore}>
    <MemoryRouter>
      <NavigationView />
    </MemoryRouter>
  </Provider>
)

const shallowWrapper = shallow(<NavigationView store={mockStore} />).dive()

describe('NavigationView component', () => {
  it('renders correctly', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot()
  })

  it(`adds active class to drago link if we are in ${
    ROUTES.DRAGOS
  } route`, () => {
    const dragoLink = wrapper.find(`a[href='${ROUTES.DRAGOS}']`)
    expect(dragoLink.hasClass('active')).toBe(true)
  })
})
