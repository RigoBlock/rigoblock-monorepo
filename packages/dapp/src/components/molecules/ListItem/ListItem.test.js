import { shallow } from 'enzyme'
import ListItem from './ListItem.jsx'
import toJson from 'enzyme-to-json'

const props = { itemName: 'Rocksolid Vault', itemSymbol: 'VLT' }

describe('ListItem component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ListItem, props)))
    ).toMatchSnapshot()
  })
})
