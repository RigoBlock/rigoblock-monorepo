import { shallow } from 'enzyme'
import Icon from './Icon.jsx'
import toJson from 'enzyme-to-json'

const props = {
  type: 'help',
  onClick: jest.fn()
}

describe('Icon component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Icon, props)))
    ).toMatchSnapshot()
  })
  it('calls onClick function when clicked', () => {
    const tooltip = shallow(createComponentWithProps(Icon, props))
    tooltip.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
