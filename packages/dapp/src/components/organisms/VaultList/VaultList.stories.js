import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultList from './VaultList'

const mockStore = {
  getState: () => ({
    preferences: {
      currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
    },
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
          vaults: {
            '0x86a1ba4d485ce346bded508e2426798f825558be': {
              id: new BigNumber('0'),
              name: 'First Vault',
              symbol: 'asd',
              owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
              group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
              totalSupply: new BigNumber('14000000')
            },
            '0x421e1cef6e85e78da2470e54af64a626f45afb85': {
              id: new BigNumber('2'),
              name: 'Third Vault',
              symbol: 'das',
              owner: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d',
              group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
              totalSupply: new BigNumber('2023498')
            }
          }
        }
      }
    }
  }),
  dispatch: () => null,
  subscribe: () => null
}

storiesOf('Organisms/VaultList', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add('default', () => <VaultList />)
