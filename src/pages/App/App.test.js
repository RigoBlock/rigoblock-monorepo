import React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './App.jsx'
import toJson from 'enzyme-to-json'

describe('App component', () => {
  const mockStore = configureStore()
  let store = mockStore({
    counter: 0
  })
  const createComponentWithTitle = (title = 'RigoBlock') => {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <App title={title} />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders correctly', () => {
    expect(toJson(render(createComponentWithTitle()))).toMatchSnapshot()
  })
})
