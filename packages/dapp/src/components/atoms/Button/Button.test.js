import { shallow } from 'enzyme'
import Button from './Button.jsx'
import toJson from 'enzyme-to-json'

const props = {
  children: 'Test Button',
  onClick: jest.fn()
}

describe('Button component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Button, props)))
    ).toMatchSnapshot()
  })

  it('calls onClick function when clicked', () => {
    const button = shallow(createComponentWithProps(Button, props))
    button.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
