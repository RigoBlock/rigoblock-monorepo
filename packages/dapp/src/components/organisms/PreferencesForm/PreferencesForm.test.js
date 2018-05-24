import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

const actionSpy = jest.fn()

const userActionsMock = {
  changePreferences: actionSpy
}

jest.doMock('../../../actions/user-actions', () => userActionsMock)
const PreferencesForm = require('./PreferencesForm.jsx').default

const mockStore = {
  getState: () => ({
    user: {
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
  dispatch: () => null,
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
    expect(actionSpy).toHaveBeenCalled()
  })
})
