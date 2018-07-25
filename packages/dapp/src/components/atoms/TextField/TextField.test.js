import { shallow } from 'enzyme'
import TextField from './TextField.jsx'
import toJson from 'enzyme-to-json'

const props = {
  id: 'testTextField',
  fullWidth: false,
  size: 10,
  meta: {
    touched: null,
    error: null
  },
  input: {
    value: "I don't work",
    onChange: jest.fn()
  }
}

describe('TextField component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(TextField, props)))
    ).toMatchSnapshot()
  })
  it('calls onChange function when value is selected', () => {
    const textField = shallow(createComponentWithProps(TextField, props))
    textField.simulate('change')
    expect(props.input.onChange).toHaveBeenCalledTimes(1)
  })
})
