import React from 'react'
import { storiesOf } from '@storybook/react'
import Title from '../Title'
import Navbar from './Navbar'

storiesOf('Navbar', module).add('default', () => (
  <Navbar>
    <Title>Example of Title</Title>
  </Navbar>
))
