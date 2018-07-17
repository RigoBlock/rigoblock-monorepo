import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import ContentWrapper from './ContentWrapper'
import React from 'react'

const header = (
  <div style={{ height: '60px', padding: '16px', background: 'white' }}>
    <h1>Example Header</h1>
  </div>
)

const content = (
  <div style={{ padding: '16px', background: '#e3eaee' }}>
    Bacon ipsum dolor amet boudin ball tip venison, burgdoggen pork prosciutto
    cupim ribeye meatloaf beef ribs chuck pastrami t-bone picanha rump. Spare
    ribs strip steak buffalo, beef shankle capicola short ribs drumstick biltong
    pancetta leberkas shank. Pancetta capicola boudin chuck. Capicola kevin
    t-bone brisket alcatra. Fatback shankle turducken cow cupim salami biltong
    porchetta ham.
  </div>
)

storiesOf('Molecules/ContentWrapper', module)
  .addDecorator(story => (
    <div style={{ minHeight: '400px', width: '400px' }}>{story()}</div>
  ))
  .add('default', () => (
    <ContentWrapper header={header}>
      {content}
      <div>Hello</div>
      <div>World</div>
    </ContentWrapper>
  ))
  .add('second', () => (
    <ContentWrapper>
      {content}
      <div>Hello</div>
      <div>World</div>
    </ContentWrapper>
  ))
