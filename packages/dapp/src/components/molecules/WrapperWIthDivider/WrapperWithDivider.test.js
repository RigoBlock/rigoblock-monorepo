import { shallow } from 'enzyme'
import WrapperWithDivider from './WrapperWithDivider.jsx'
import toJson from 'enzyme-to-json'

const props = { header: 'string header', children: 'test content' }

describe('WrapperWithDivider component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(WrapperWithDivider, props)))
    ).toMatchSnapshot()
  })
})
