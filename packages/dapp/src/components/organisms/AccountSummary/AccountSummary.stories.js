import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import AccountSummary from './AccountSummary'
import React from 'react'

const props = {
  provider: 'metamask',
  number: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
  balance: '57999999999960203063'
}

storiesOf('Organisms/AccountSummary', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: '335px',
        background: 'white',
        padding: '16px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => <AccountSummary {...props} />)
