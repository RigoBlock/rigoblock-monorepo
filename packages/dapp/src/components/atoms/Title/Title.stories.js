import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Title, { TITLE_SIZES } from './Title'

storiesOf('Atoms/Title', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Title size={selectV2('Title size', TITLE_SIZES)}>
      {text('Title text', 'Example Title')}
    </Title>
  ))
