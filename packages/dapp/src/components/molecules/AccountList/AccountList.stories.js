import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountList from './AccountList'
import React from 'react'

const props = {
  accounts: {
    '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196': {
      provider: 'metamask'
    },
    '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d': {
      provider: 'metamask'
    },
    '0x8bb7481495d45ccd5cffae1c3a84155fea85a323': {
      provider: 'metamask'
    },
    '0xe198d98b76c529886affb5a74be8b435624bd310': {
      provider: 'metamask'
    },
    '0x927aa991a628aab6851a890fb790a4a7cd0ec446': {
      provider: 'metamask'
    }
  }
}

storiesOf('Molecules/AccountList', module)
  .addDecorator(withKnobs)
  .add('default', () => <AccountList {...props} />)
