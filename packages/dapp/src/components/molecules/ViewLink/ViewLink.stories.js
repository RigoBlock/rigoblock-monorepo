import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import ViewLink from './ViewLink'

const props = {
  link: { text: 'Dashboard', to: '/' },
  icon: 'dashboard'
}

storiesOf('Molecules/ViewLink', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <ViewLink {...props} />)
