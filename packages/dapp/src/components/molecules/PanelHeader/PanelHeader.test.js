import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PanelHeader from './PanelHeader.jsx'

const props = { title: 'Test Header', tooltip: 'empty tooltip' }

describe('PanelHeader component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(PanelHeader, props)))
    ).toMatchSnapshot()
  })
})
