import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Tooltip from './Tooltip.jsx'

const props = { type: 'help' }

describe('Tooltip component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Tooltip, props)))
    ).toMatchSnapshot()
  })
})
