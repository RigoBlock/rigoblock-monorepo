import { shallow } from 'enzyme'
import SelectFieldForm from './SelectFieldForm.jsx'
import toJson from 'enzyme-to-json'

const itemList = ['item1', 2, { label: 'test', value: '1' }]

const props = {
  fieldName: 'testField',
  fieldProps: {
    id: 1,
    items: itemList,
    onChange: jest.fn()
  }
}

describe('SelectFieldForm component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(SelectFieldForm, props)))
    ).toMatchSnapshot()
  })
})
