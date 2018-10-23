import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { select, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Title, { TITLE_SIZES } from './Title'

storiesOf('Atoms/Title', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Title size={select('Title size', TITLE_SIZES, TITLE_SIZES.SMALL)}>
      {text('Title text', 'Example Title')}
    </Title>
  ))
