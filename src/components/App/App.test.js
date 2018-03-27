import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'enzyme'
import App from './App.jsx'
import toJson from 'enzyme-to-json'

describe('App component', () => {
  const createComponent = props => {
    return <App {...props} />
  }
  // temporarily hardcoded
  const createComponentWithTitle = () => {
    return <App title={'RigoBlock'} />
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
