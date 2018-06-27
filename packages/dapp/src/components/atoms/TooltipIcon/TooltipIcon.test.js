import { shallow } from 'enzyme'
import TooltipIcon from './TooltipIcon.jsx'
import toJson from 'enzyme-to-json'

const props = {
  type: 'help',
  onClick: jest.fn()
}

describe('TooltipIcon component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(TooltipIcon, props)))
    ).toMatchSnapshot()
  })
  it('calls onClick function when clicked', () => {
    const tooltip = shallow(createComponentWithProps(TooltipIcon, props))
    tooltip.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
