import { shallow } from 'enzyme'
import SelectField from './SelectField.jsx'
import toJson from 'enzyme-to-json'

const props = {
  items: ['item1', 2, { label: 'test', value: '1' }],
  placeholder: 'placeholder',
  id: 1,
  meta: {
    touched: null,
    error: null
  },
  input: {
    value: "I don't work",
    onChange: jest.fn()
  }
}

describe('SelectField component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(SelectField, props)))
    ).toMatchSnapshot()
  })

  it('calls onChange function when value is selected', () => {
    const selectField = shallow(createComponentWithProps(SelectField, props))
    selectField.simulate('change')
    expect(props.input.onChange).toHaveBeenCalledTimes(1)
  })
})
