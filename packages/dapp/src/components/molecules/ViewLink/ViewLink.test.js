import { shallow } from 'enzyme'
import ViewLink from './ViewLink.jsx'
import toJson from 'enzyme-to-json'

const props = { icon: 'dashboard', link: { text: 'Dashboard', to: '/' } }

describe('ViewLink component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ViewLink, props)))
    ).toMatchSnapshot()
  })
})
