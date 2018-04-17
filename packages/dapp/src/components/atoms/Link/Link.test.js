import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from './Link.jsx'

const props = { to: '#', children: 'Test link' }

describe('Link component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Link, props)))
    ).toMatchSnapshot()
  })
})
