import { shallow } from 'enzyme'
import Tooltip from './Tooltip.jsx'
import toJson from 'enzyme-to-json'

const props = {
  type: 'help',
  onClick: jest.fn()
}

describe('Tooltip component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Tooltip, props)))
    ).toMatchSnapshot()
  })
  it('calls onClick function when clicked', () => {
    const tooltip = shallow(createComponentWithProps(Tooltip, props))
    tooltip.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
