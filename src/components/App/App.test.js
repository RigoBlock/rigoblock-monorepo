import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'enzyme'
import App from './App.jsx'
import toJson from 'enzyme-to-json'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  expect(toJson(render(<App />))).toMatchSnapshot()
})
