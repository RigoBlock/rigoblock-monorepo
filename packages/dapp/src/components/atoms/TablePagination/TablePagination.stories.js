import '../../_settings/_base.scss'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import TablePagination from './TablePagination'

const props = {
  page: 0,
  pages: 10,
  onPageChange: () => {},
  canPrevious: true,
  canNext: true
}

storiesOf('Atoms/TablePagination', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <TablePagination {...props} />)
