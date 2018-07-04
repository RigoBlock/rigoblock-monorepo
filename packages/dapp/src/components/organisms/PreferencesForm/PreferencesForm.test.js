import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import PreferencesForm from './PreferencesForm.jsx'
import React from 'react'
import toJson from 'enzyme-to-json'
import userActions from '../../../actions/user-actions'

const mockStore = {
  getState: () => ({
    preferences: {
      timezone: '+02:00'
    },
    form: {
      preferences: {
        values: {
          timezone: '+02:00'
        },
        initial: {
          timezone: '+02:00'
        }
      }
    }
  }),
  dispatch: jest.fn(),
  subscribe: () => null
}

const wrapper = mount(
  <Provider store={mockStore}>
    <PreferencesForm />
  </Provider>
)

describe('PreferencesForm component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('fires the changePreferences action on submit', () => {
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      userActions.changePreferences({ timezone: '+02:00' })
    )
  })
})
