import React from 'react'
import { storiesOf } from '@storybook/react'
import ContentWrapper from './ContentWrapper'
import '../../_settings/_base.scss'

storiesOf('Atoms/ContentWrapper', module).add('default', () => (
  <ContentWrapper title="Content Wrapper" />
))
