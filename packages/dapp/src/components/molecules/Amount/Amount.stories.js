import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { ETH } from '../../../constants/blockchain'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Amount, { AMOUNT_SIZES } from './Amount'
import React from 'react'

storiesOf('Molecules/Amount', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: '250px',
        background: 'white',
        padding: '16px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <Amount
      size={selectV2('Amount size', AMOUNT_SIZES, AMOUNT_SIZES.SMALL)}
      symbol={text('Amount symbol', ETH)}
      value={new BigNumber('8000.23')}
    />
  ))
