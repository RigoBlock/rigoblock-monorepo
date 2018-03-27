import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import toJson from 'enzyme-to-json'

describe('App component', () => {
  const createComponentWithTitle = (title = 'RigoBlock') => {
    return (
      <MemoryRouter>
        <App title={title} />
      </MemoryRouter>
    )
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(createComponentWithTitle(), div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders correctly', () => {
    expect(toJson(render(createComponentWithTitle()))).toMatchSnapshot()
  })
})
