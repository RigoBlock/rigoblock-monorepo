import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Tab from './'
import Title from '../../atoms/Title'
import mockStore from '../../../fixtures/store'

const store = mockStore()

const title = () => <Title>Tab Title</Title>
const form = () => <div>Placeholder Form</div>

storiesOf('Molecules/Tab', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <Tab Header={title} forms={[form]} />)
