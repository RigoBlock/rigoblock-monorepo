import { shallow } from 'enzyme'
import SelectField from './SelectField.jsx'
import toJson from 'enzyme-to-json'

const itemList = ['item1', 2, { label: 'test', value: '1' }]

const props = {
  id: '1',
  items: itemList,
  onChange: jest.fn(),
  defaultValue: 'item1'
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
    expect(props.onChange).toHaveBeenCalledTimes(1)
  })
})
