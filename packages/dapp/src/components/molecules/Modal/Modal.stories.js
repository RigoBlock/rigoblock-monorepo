import '../../_settings/_base.scss'
import { boolean, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Modal from './Modal'
import React from 'react'

const dummyContent = () => <div>Opened!</div>

storiesOf('Molecules/Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: '1024px',
        height: '600px',
        background:
          'linear-gradient(90deg, rgba(73,63,242,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <Modal Component={boolean('OPENED', true) ? dummyContent() : null} />
  ))
