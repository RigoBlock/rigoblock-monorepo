import { shallow } from 'enzyme'
import TextFieldForm from './TextFieldForm.jsx'
import toJson from 'enzyme-to-json'

const props = {
  fieldName: 'testField',
  fieldProps: {
    id: 'testTextField',
    fullWidth: false,
    size: 10
  }
}

describe('TextFieldForm component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(TextFieldForm, props)))
    ).toMatchSnapshot()
  })
})
