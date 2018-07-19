import { shallow } from 'enzyme'
import TextField from './TextField.jsx'
import toJson from 'enzyme-to-json'

const props = {
  id: 'testTextField',
  fullWidth: false,
  size: 10
}

describe('TextField component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(TextField, props)))
    ).toMatchSnapshot()
  })
})
