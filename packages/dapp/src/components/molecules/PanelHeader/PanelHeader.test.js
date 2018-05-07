import { shallow } from 'enzyme'
import PanelHeader from './PanelHeader.jsx'
import toJson from 'enzyme-to-json'

const props = { title: 'Test Header', tooltip: 'empty tooltip' }

describe('PanelHeader component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(PanelHeader, props)))
    ).toMatchSnapshot()
  })
})
