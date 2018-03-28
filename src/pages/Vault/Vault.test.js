import React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Vault from './Vault.jsx'
import toJson from 'enzyme-to-json'

describe('Vault component', () => {
  const createComponent = () => {
    return (
      <MemoryRouter>
        <Vault />
      </MemoryRouter>
    )
  }

  it('renders correctly', () => {
    expect(toJson(render(createComponent()))).toMatchSnapshot()
  })
})
