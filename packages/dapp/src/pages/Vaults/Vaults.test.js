import { shallow } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

describe('Vaults page', () => {
  const apiMock = {
    contract: {
      DragoRegistry: {
        address: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52la4',
        createAndValidate: jest.fn()
      }
    },
    web3: {}
  }
  let Vaults

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../api', () => apiMock)

    Vaults = require('./Vaults').default
  })
  it('renders correctly', () => {
    expect(toJson(shallow(<Vaults />))).toMatchSnapshot()
  })
})
