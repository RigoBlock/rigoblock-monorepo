import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ContentWrapper from './ContentWrapper.jsx'

const props = { title: 'Test Wrapper', children: 'test content' }

describe('ContentWrapper component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ContentWrapper, props)))
    ).toMatchSnapshot()
  })
})
