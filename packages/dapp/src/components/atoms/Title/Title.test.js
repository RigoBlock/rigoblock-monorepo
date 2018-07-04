import { shallow } from 'enzyme'
import Title from './Title.jsx'
import toJson from 'enzyme-to-json'

const props = { children: 'Test title' }

describe('Title component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Title, props)))
    ).toMatchSnapshot()
  })
})
