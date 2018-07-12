import { shallow } from 'enzyme'
import TablePagination from './TablePagination'
import toJson from 'enzyme-to-json'

const props = {
  page: 0,
  pages: 10,
  onPageChange: () => {},
  canPrevious: true,
  canNext: true
}

describe('TablePagination component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(TablePagination, props)))
    ).toMatchSnapshot()
  })
})
