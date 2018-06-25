import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountItem from './AccountItem'
import React from 'react'

const props = {
  provider: 'metamask',
  number: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
}

storiesOf('Molecules/AccountItem', module)
  .addDecorator(withKnobs)
  .add('default', () => <AccountItem {...props} />)
