import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import PreferencesForm from './PreferencesForm.jsx'
import React from 'react'
import mockStore from '../../../fixtures/store'
import toJson from 'enzyme-to-json'
import userActions from '../../../actions/user-actions'

const store = mockStore({ mockFn: jest.fn })

const wrapper = mount(
  <Provider store={store}>
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
    expect(store.dispatch).toHaveBeenCalledWith(
      userActions.changePreferences({ timezone: '+02:00' })
    )
  })
})
