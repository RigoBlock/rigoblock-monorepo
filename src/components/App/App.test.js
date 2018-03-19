import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './App.jsx'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer
    .create(
      <div>
        <h1>RigoBlock</h1>
      </div>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
