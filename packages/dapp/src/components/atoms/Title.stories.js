import React from 'react'
import { storiesOf } from '@storybook/react'
import Title, { TitleSize } from './Title'

storiesOf('Title', module)
  .add('small', () => <Title size={TitleSize.SMALL}>Small Title</Title>)
  .add('medium', () => <Title size={TitleSize.MEDIUM}>Medium Title</Title>)
  .add('large', () => <Title size={TitleSize.LARGE}>Large Title</Title>)
