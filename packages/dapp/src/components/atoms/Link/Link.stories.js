import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react'
import { MemoryRouter } from 'react-router-dom'
import '../../_settings/_base.scss'
import Link, { LINK_SIZES } from './Link'

storiesOf('Atoms/Link', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Link
      size={selectV2('Tooltip size', LINK_SIZES, LINK_SIZES.SMALL)}
      to={text('Links to', '/')}
    >
      Small Link
    </Link>
  ))
