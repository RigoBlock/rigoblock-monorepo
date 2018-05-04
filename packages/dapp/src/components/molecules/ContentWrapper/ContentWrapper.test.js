import { shallow } from 'enzyme'
import ContentWrapper from './ContentWrapper.jsx'
import toJson from 'enzyme-to-json'

const props = { header: 'string header', children: 'test content' }

describe('ContentWrapper component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ContentWrapper, props)))
    ).toMatchSnapshot()
  })
})
