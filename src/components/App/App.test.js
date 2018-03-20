import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { render } from 'enzyme'
import App from './App.jsx'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  expect(toJson(render(<App />))).toMatchSnapshot()
})
