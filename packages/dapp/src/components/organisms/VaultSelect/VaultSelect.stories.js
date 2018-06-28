import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultSelect from './VaultSelect'

const mockStore = {
  getState: () => ({
    user: {
      preferences: {
        currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
      },
      blockChain: {
        accounts: {
          '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
            vaults: {
              '0x86a1ba4d485ce346bded508e2426798f825558be': {
                id: 0,
                name: 'First Vault',
                symbol: 'asd',
                owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
                group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
                totalSupply: 14
              },
              '0x421e1cef6e85e78da2470e54af64a626f45afb85': {
                id: 2,
                name: 'Third Vault',
                symbol: 'das',
                owner: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d',
                group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
                totalSupply: 20.23498
              }
            }
          }
        }
      }
    }
  }),
  dispatch: () => null,
  subscribe: () => null
}

storiesOf('Organisms/VaultSelect', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add('default', () => <VaultSelect />)
