import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Link, { LINK_SIZES } from './Link'
import React from 'react'

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
