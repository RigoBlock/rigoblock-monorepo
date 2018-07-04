import { shallow } from 'enzyme'
import Tooltip from './Tooltip.jsx'
import toJson from 'enzyme-to-json'

const props = {
  tooltipText: 'Test tooltip.'
}

describe('Tooltip component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Tooltip, props)))
    ).toMatchSnapshot()
  })
})
