import { shallow } from 'enzyme'
import Link from './Link.jsx'
import toJson from 'enzyme-to-json'

const props = { to: '#', children: 'Test link' }

describe('Link component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Link, props)))
    ).toMatchSnapshot()
  })
})
